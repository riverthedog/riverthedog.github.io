# River's tag

The page behind the QR code on River's tag. Built with Svelte 5 + Vite and deployed to
GitHub Pages by a GitHub Action on every push to `main`.

## First deploy

1. Fill in the TODOs in `src/config.js`:
   - `owner`: your sister's first name, her number as `+1` plus 10 digits, and how it should
     look on the page, like `(949) 123-4567`.
   - `contacts`: your name and number.

   The build refuses to run until the owner's number is filled in, so a page with blank
   numbers can't go live.
2. In the GitHub repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Replace the placeholder `index.html` in the repo with these files, then commit and push to `main`.
4. Open the **Actions** tab. When "Deploy to GitHub Pages" finishes, the site is live at the
   same address that's engraved on the tag. Scan the tag to check.

## Making changes

- `npm install` once, then `npm run dev` for a live-reloading local copy.
- Everything personal lives in `src/config.js`: contacts, care notes, carousel photos, and the
  button layout. Edit, commit, push, and the site redeploys.
- `npm run build:preview` makes one shareable HTML file in `preview/` (phone layout, with the
  location flow simulated), for showing changes before they go live.

## Where things are

- `src/config.js`: River's details
- `src/page/`: the Golden hour page and its styles
- `src/components/`: the call, text and share buttons, chat sheet, carousel, notes, contacts, dock
- `src/lib/share.svelte.js`: location sharing and chat logic
- `src/assets/`: photos, the River cutouts, and the font

## Later

- `relayEndpoint`: paste a Formspree form URL to email map pins to your sister, instead of
  opening a text with the pin in it.
- `ui.actions: 'chat'`: switches the third button to the chat thread.
- Push notifications and the family group chat need a small backend (not built yet).
