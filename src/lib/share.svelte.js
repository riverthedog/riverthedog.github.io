import { CONFIG } from '../config.js';
import { capitalize, hello, smsHref } from './contact.js';

const { owner, dog } = CONFIG;
const PREVIEW_SPOT = { coords: { latitude: 33.4269, longitude: -117.6120, accuracy: 9 } };
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const hasRelay = () => Boolean(CONFIG.relayEndpoint) || __PREVIEW__;
const previewNote = __PREVIEW__ ? ' (Preview: nothing was sent.)' : '';

// Ask the browser for the finder's position. It shows its own permission prompt first.
function locate() {
  if (__PREVIEW__) return wait(900).then(() => PREVIEW_SPOT);
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) return reject({ code: 2 });
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 });
  });
}

const mapLinkFor = ({ coords }) => `https://maps.google.com/?q=${coords.latitude.toFixed(5)},${coords.longitude.toFixed(5)}`;

// POST to the relay (e.g. Formspree). Field names show up in the email.
async function relay(fields) {
  if (__PREVIEW__) return wait(800);
  const body = new FormData();
  body.append('_subject', `${dog.name}'s tag was scanned`);
  for (const [key, value] of Object.entries(fields)) if (value) body.append(key, value);
  body.append('time', new Date().toLocaleString());
  const res = await fetch(CONFIG.relayEndpoint, { method: 'POST', body, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

// One tap "Share this spot": find the finder's location and get a map pin to the owner.
export function createSpotShare() {
  const LABELS = { idle: 'Share this spot', locating: 'Finding this spot…', sending: 'Sending…', sent: 'Spot shared' };
  let phase = $state('idle');
  let result = $state(null); // { kind: 'ok' | 'warn', message, link?: { text, href } }

  async function share() {
    result = null;
    phase = 'locating';
    let mapLink;
    try {
      mapLink = mapLinkFor(await locate());
    } catch (err) {
      phase = 'idle';
      result = {
        kind: 'warn',
        message: err?.code === 1 ? 'Location is blocked for this page. You can text where you are instead.' : "Couldn't find this spot. Try again, or text where you are.",
        link: { text: `Text ${owner.name}`, href: smsHref(owner.phone, hello(" We're at: ")) },
      };
      return;
    }
    const textPin = { text: 'Text the pin', href: smsHref(owner.phone, hello(` We're here: ${mapLink}`)) };
    if (!hasRelay()) {
      phase = 'idle';
      result = { kind: 'ok', message: `Found this spot. Send the pin to ${owner.name}:`, link: textPin };
      return;
    }
    phase = 'sending';
    try {
      await relay({ message: `Someone found ${dog.name} and shared this spot.`, map: mapLink });
      phase = 'sent';
      result = { kind: 'ok', message: `${capitalize(owner.name)} got a map pin.${previewNote}`, link: { ...textPin, text: 'Text it too' } };
    } catch {
      phase = 'idle';
      result = { kind: 'warn', message: "The pin didn't send. Text it instead:", link: textPin };
    }
  }

  return {
    get phase() { return phase; },
    get label() { return LABELS[phase]; },
    get busy() { return phase === 'locating' || phase === 'sending'; },
    get result() { return result; },
    share,
  };
}

// The chat thread: River greets the finder, who can send notes and one-tap map pins.
// Each outgoing message tracks its own status (sending, then delivered), like a texting app.
export function createChat() {
  let messages = $state([
    { id: 0, from: 'dog', kind: 'text', text: `Hi! Thanks for finding me. Want to tell ${owner.name} where we are, or leave a note?` },
  ]);
  let draft = $state('');
  let locating = $state(false);
  let nextId = 1;
  let thanked = false;

  const add = (message) => {
    messages.push({ id: nextId++, ...message });
    return messages[messages.length - 1]; // the reactive copy, so status updates re-render
  };

  function thank() {
    if (thanked) return;
    thanked = true;
    setTimeout(() => add({ from: 'dog', kind: 'text', text: `Thank you! ${capitalize(owner.name)} will reach out soon.` }), 900);
  }

  async function deliver(message, fields, smsBody) {
    const asText = smsHref(owner.phone, hello(smsBody));
    if (!hasRelay()) {
      message.status = 'text';
      message.href = asText;
      return;
    }
    message.status = 'sending';
    try {
      await relay(fields);
      message.status = __PREVIEW__ ? 'preview' : 'delivered';
      thank();
    } catch {
      message.status = 'failed';
      message.href = asText;
    }
  }

  async function send() {
    const text = draft.trim();
    if (!text) return;
    draft = '';
    const message = add({ from: 'me', kind: 'text', text, status: 'sending' });
    await deliver(message, { message: text }, ` ${text}`);
  }

  async function shareSpot() {
    if (locating) return;
    locating = true;
    const message = add({ from: 'me', kind: 'spot', status: 'locating' });
    try {
      const position = await locate();
      message.map = mapLinkFor(position);
    } catch (err) {
      message.status = 'failed';
      message.error = err?.code === 1 ? 'Location is blocked for this page.' : "Couldn't find this spot.";
      message.href = smsHref(owner.phone, hello(" We're at: "));
      locating = false;
      return;
    }
    locating = false;
    await deliver(message, { message: `Someone found ${dog.name} and shared this spot.`, map: message.map }, ` We're here: ${message.map}`);
  }

  return {
    get messages() { return messages; },
    get draft() { return draft; },
    set draft(value) { draft = value; },
    get locating() { return locating; },
    send,
    shareSpot,
  };
}
