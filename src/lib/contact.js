import { CONFIG } from '../config.js';

const isIOS =
  /iP(hone|od|ad)/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

export const telHref = (phone) => `tel:${phone}`;

// iOS and Android disagree on how a prefilled text body is attached.
export const smsHref = (phone, body) =>
  `sms:${phone}${body ? `${isIOS ? '&' : '?'}body=${encodeURIComponent(body)}` : ''}`;

export const hello = (extra = '') => `Hi! I found ${CONFIG.dog.name}.${extra}`;

export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
