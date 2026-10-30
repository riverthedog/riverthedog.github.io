<script>
  import { CONFIG } from '../config.js';
  import { hello, smsHref, telHref } from '../lib/contact.js';
  import { readable } from '../lib/phone.js';
  import { createSpotShare } from '../lib/share.svelte.js';
  import Icon from './Icon.svelte';
  import ChatSheet from './ChatSheet.svelte';
  import './actions.css';

  // Call, Text, and a third action, laid out per CONFIG.ui.actions:
  //   buttons: Call / Text / Share this spot, one per line
  //   compact: Call on top, Text and Share side by side
  //   chat:    Call / Text / Message, which opens a chat thread with a one-tap map pin
  let { showNumber = false } = $props();
  const { owner } = CONFIG;
  const layout = CONFIG.ui.actions;
  const spot = createSpotShare();
  let chatOpen = $state(false);

  const spotIcon = $derived(spot.busy ? 'spinner' : spot.phase === 'sent' ? 'check' : 'pin');
  const shortLabel = $derived({ idle: 'Share spot', locating: 'Locating…', sending: 'Sending…', sent: 'Shared' }[spot.phase]);
</script>

<div class="actions" data-layout={layout}>
  <a class="btn btn--call" href={telHref(owner.phone)}>
    <span class="btn__badge"><Icon name="phone" /></span>
    <span class="btn__text">
      <span class="btn__label">Call {owner.name}</span>
      {#if showNumber}<span class="btn__meta">{readable(owner.phone)}</span>{/if}
    </span>
  </a>

  {#if layout === 'compact'}
    <div class="actions__pair">
      <a class="btn btn--alt" href={smsHref(owner.phone, hello())}>
        <span class="btn__badge"><Icon name="message" /></span>
        <span class="btn__label">Text</span>
      </a>
      <button type="button" class="btn btn--alt" onclick={spot.share} disabled={spot.busy}>
        <span class="btn__badge"><Icon name={spotIcon} class={spot.busy ? 'spin' : ''} /></span>
        <span class="btn__label">{shortLabel}</span>
      </button>
    </div>
    <p class="actions__hint">Share spot sends {owner.name} a map pin of where you are.</p>
  {:else}
    <a class="btn btn--alt" href={smsHref(owner.phone, hello())}>
      <span class="btn__badge"><Icon name="message" /></span>
      <span class="btn__label">Text {owner.name}</span>
    </a>
    {#if layout === 'chat'}
      <button type="button" class="btn btn--alt" onclick={() => (chatOpen = true)}>
        <span class="btn__badge"><Icon name="chat" /></span>
        <span class="btn__text">
          <span class="btn__label">Message {owner.name}</span>
          <span class="btn__meta">Share this spot or leave a note</span>
        </span>
      </button>
    {:else}
      <button type="button" class="btn btn--alt" onclick={spot.share} disabled={spot.busy}>
        <span class="btn__badge"><Icon name={spotIcon} class={spot.busy ? 'spin' : ''} /></span>
        <span class="btn__text">
          <span class="btn__label">{spot.label}</span>
          <span class="btn__meta">Sends {owner.name} a map pin</span>
        </span>
      </button>
    {/if}
  {/if}

  <div class="actions__status" role="status" aria-live="polite" data-kind={layout === 'chat' ? undefined : spot.result?.kind}>
    {#if spot.result && layout !== 'chat'}
      <span class="actions__mark"><Icon name={spot.result.kind === 'ok' ? 'check' : 'alert'} /></span>
      <p>{spot.result.message}</p>
      {#if spot.result.link}<a class="actions__chip" href={spot.result.link.href}>{spot.result.link.text}</a>{/if}
    {/if}
  </div>
</div>

{#if chatOpen}
  <ChatSheet onclose={() => (chatOpen = false)} />
{/if}
