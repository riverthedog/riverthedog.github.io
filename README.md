# River's tag

The page behind the QR code on River's tag, built with Svelte and Vite. Every push to `main`
rebuilds it and publishes it to GitHub Pages.

## Editing

Everything personal lives in `src/config.js`: contacts, care notes, carousel photos, and the
button layout. Edit it, commit, and the site redeploys in about a minute.

- `npm install`, then `npm run dev` for a live-reloading local copy.
- `npm run build:preview` writes one self-contained HTML file to `preview/`, handy for showing
  a change before it goes live.

## Where things are

- `src/page/`: the page and its styles
- `src/components/`: buttons, chat, carousel, notes, contacts, dock
- `src/lib/`: location sharing, chat, and phone formatting
- `src/assets/`: photos, cutouts, and the font
