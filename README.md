# Norrœna Solutions — Marketing Website

> The bridge between people and process.

The marketing website for [Norrœna Solutions](https://norroenasolutions.com), a solo HR-technology consultancy founded by Michael Knudson. Custom HR technology, automation, and AI — built by a practitioner who understands both the compliance requirement and the code.

---

## Quick start

```bash
# Clone the repo and enter it
git clone <repo-url> norroena
cd norroena

# Run the local development server
npm run dev

# The site is now available at http://localhost:8000
```

That's it — there's no build step, no framework, no bundler. The files in this directory are exactly what's served in production.

---

## Project structure

```
.
├── CLAUDE.md              # AI-assistant brief — read this first if you're Claude or another AI
├── README.md              # This file
├── package.json           # Local dev server config
├── index.html             # Homepage
├── practice.html          # The four pillars in depth
├── founder.html           # Founder essay
├── case-studies.html      # Sanitized capability narratives
├── audit.html             # Audit request form (wedge offer)
├── contact.html           # General contact
├── assets/
│   ├── norroena.css       # Shared design system
│   └── norroena.js        # Scroll reveals + utilities
└── docs/
    ├── DESIGN_CANON.md    # Locked design decisions
    ├── BRAND_VOICE.md     # Editorial voice & content rules
    └── DEPLOYMENT.md      # How to deploy to production
```

## The four pillars

The Norrœna practice is organized into four interlocking domains, each authentically named from Old Norse mythology:

- **Bifröst** (Platforms) — full HR information & management suite
- **Draupnir** (Processes) — modular automations, custom reports, integrations
- **Mímir** (Assistants) — AI built on your own documentation
- **Rún** (Counsel) — audits and advisory, including the lead HR Operations Audit

See `docs/DESIGN_CANON.md` for the full system.

---

## Tech stack

By deliberate choice, this is a **static HTML site**.

- HTML5 + CSS3 + minimal vanilla JavaScript
- No framework, no build step
- Google Fonts: Fraunces, Inter Tight, JetBrains Mono
- Deployed to Cloudflare Pages (free tier; see `docs/DEPLOYMENT.md`)

The simplicity is a feature. The site is meant to be readable, portable, and durable for a decade — not a tech-stack showcase.

---

## Development

### Running locally

```bash
npm run dev
```

This starts a local HTTP server (Python's built-in `http.server` under the hood) on port 8000. Open `http://localhost:8000` in any browser.

**Why a local server, not just opening `index.html`?** The `file://` protocol breaks some things (relative paths to CSS work, but more advanced features like service workers or fetch don't). Using `http://localhost:8000` matches the production behavior exactly.

### Making changes

1. Edit any HTML/CSS file directly
2. Save
3. Refresh your browser — changes appear immediately (no rebuild needed)

### Before committing

- Test the site in at least Chrome and Safari at desktop width
- Drag your browser window narrow to verify responsive behavior holds
- Check the four pillar names match the canon (Bifröst, Draupnir, Mímir, Rún)
- Verify any new runic inscriptions are real Elder Futhark, not made up

---

## Deployment

See `docs/DEPLOYMENT.md` for the full guide. Short version:

1. Push to the `main` branch on GitHub
2. Cloudflare Pages auto-deploys
3. Live in ~30 seconds

---

## Contributing

This is a solo-operated project. For AI assistants (Claude, etc.) working on this codebase, please read `CLAUDE.md` before making any changes.

## License

© 2026 Norrœna Solutions, LLC. All rights reserved.
