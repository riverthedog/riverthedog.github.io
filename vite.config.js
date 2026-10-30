import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { CONFIG } from './src/config.js';
import { isValidPhone } from './src/lib/phone.js';

// `npm run build:preview` makes one self-contained HTML file in preview/: phone layout only,
// with the location flow simulated. Handy for showing changes before they go live.
const preview = process.env.PREVIEW === '1';

// Previews always show the phone layout, so drop wide-screen (min-width) media queries.
const phoneOnly = {
  postcssPlugin: 'phone-only',
  AtRule: { media: (rule) => /min-width/.test(rule.params) && rule.remove() },
};

// The engraved tag points at this site, so never deploy it without real phone numbers.
function requireRealNumbers() {
  const extras = CONFIG.contacts.map((contact) => contact.phone).filter(Boolean);
  if (!isValidPhone(CONFIG.owner.phone) || !extras.every(isValidPhone)) {
    throw new Error('src/config.js needs a real phone number for the owner (and any contacts) before building.');
  }
}

export default defineConfig(({ command }) => {
  if (command === 'build' && !preview) requireRealNumbers();
  return {
    base: './',
    plugins: [svelte(), preview && viteSingleFile()].filter(Boolean),
    define: { __PREVIEW__: JSON.stringify(preview) },
    css: preview ? { postcss: { plugins: [phoneOnly] } } : undefined,
    build: { outDir: preview ? 'preview' : 'dist', emptyOutDir: true },
  };
});
