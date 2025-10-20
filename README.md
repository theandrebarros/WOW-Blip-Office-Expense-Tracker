# WOW, Office Visit Expenses Tracker

A lightweight, single‑file web app to plan and track quarterly office‑visit expenses. Works on desktop and mobile, supports Light/Dark mode, GBP↔EUR conversion, and auto‑syncs your data to a private GitHub Gist (no server needed).

## Features
- Quarterly tracking with per‑field details (flight to office, flight home, hotel)
- Annual totals and remaining budget per quarter
- Theme: FD Base Light/Dark, brand tokens, semantic alerts
- Currency: input in GBP (with conversion to EUR), hotel always in EUR; dual EUR/GBP display
- Cross‑device sync via GitHub Gist (private), plus offline cache (localStorage)
- CSV export; Reset all
- i18n: EN/PT toggle

## Live
- Publish with GitHub Pages (Settings → Pages → Deploy from branch, root).  
  URL will be: `https://<your-username>.github.io/<repo>/`

## Sync (GitHub Gist)
- Click “Connect GitHub” in the app header
  - Paste your Personal Access Token (Gists: Read/Write only)
  - Paste your Gist ID (the long hash)
- After that:
  - Loads from Gist on start
  - Auto‑saves on changes (best effort)
  - “Sync” button to push manually

Security notes
- PAT is stored locally on your device in localStorage.
- Scope it strictly to “Gists” and revoke anytime from GitHub settings.

## Development
- Single file: `index.html`
- No build step; just open in a browser or host statically (GitHub Pages / Netlify)

## Export/Backup
- Use “Export CSV” for a quick backup of quarter totals.
