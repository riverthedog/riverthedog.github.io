// One phone field everywhere, written any way you like:
// '760-123-4567', '(760) 123-4567' and '+1 760 123 4567' all work.

// For tel: and sms: links, e.g. +17601234567
export function dialable(phone) {
  const digits = String(phone ?? '').replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return digits ? `+${digits}` : '';
}

// For showing on the page, e.g. (760) 123-4567
export function readable(phone) {
  const dial = dialable(phone);
  const us = dial.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
  return us ? `(${us[1]}) ${us[2]}-${us[3]}` : dial;
}

export const isValidPhone = (phone) => /^\+\d{10,15}$/.test(dialable(phone));
