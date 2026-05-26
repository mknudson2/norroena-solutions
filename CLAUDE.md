# CLAUDE.md — A brief for AI assistants

> **Read this file before doing anything else in this repository.** It is the single source of truth for the design canon, voice, conventions, and current state of the Norrœna Solutions website. If something here conflicts with anything else in the codebase, this file wins — flag the conflict to the human operator and ask which should be updated.

---

## What this project is

The marketing website for **Norrœna Solutions**, a solo HR-technology consultancy founded by Michael Knudson. The site exists to:

1. Establish credibility for a brand-new firm whose founder has unusual hybrid expertise (Ph.D., PHR, Full-Stack Developer)
2. Convert visitors into "HR Operations Audit" engagements — the wedge offer (operations-first framing, with compliance as one dimension among several)
3. Educate sophisticated buyers (HR directors, COOs, founders of mid-sized SMBs) on a four-pillar service practice: platforms, processes, AI assistants, and counsel
4. Read as a _considered editorial publication_, not a SaaS brochure

This is a **static HTML site** by deliberate choice. No React, no Next.js, no build step beyond a tiny local dev server. The site is meant to be readable, portable, and durable for a decade — not a tech-stack showcase.

**Positioning note:** The firm's identity is _HR-technologist who happens to understand compliance deeply_ — not _HR compliance consultant who also does some technology work_. The compliance literacy is what makes the technical work defensible; the technical work is what makes the firm differentiated. When in doubt about framing, lead with the technical/operations identity and let compliance show up as proof of depth.

---

## Stack & tooling

- **HTML5** — six static pages, no framework
- **CSS3** — one shared stylesheet (`assets/norroena.css`) plus page-specific `<style>` blocks
- **JavaScript** — minimal vanilla JS (`assets/norroena.js`), one IntersectionObserver for scroll reveals plus inline filter logic on case-studies.html
- **Fonts** — Google Fonts (Fraunces, Inter Tight, JetBrains Mono) loaded via `<link>`
- **No build process** — files are deployed as-is

**Local development:** `npm run dev` (runs a local HTTP server on port 8000). See `package.json`.

**Production hosting:** Cloudflare Pages. See `docs/DEPLOYMENT.md`.

---

## File structure

```
/
├── CLAUDE.md                  ← THIS FILE — read first
├── README.md                  ← Human-facing project overview
├── package.json               ← Dev server config
├── .gitignore                 ← Don't commit junk
├── index.html                 ← Homepage
├── practice.html              ← The four pillars in depth
├── founder.html               ← Founder essay (Michael's story)
├── case-studies.html          ← Sanitized capability narratives
├── audit.html                 ← Audit request form (wedge offer)
├── contact.html               ← Long-tail contact page
├── assets/
│   ├── norroena.css           ← Shared design system (CANON)
│   └── norroena.js            ← Scroll-reveal observer
└── docs/
    ├── DESIGN_CANON.md        ← Locked design decisions
    ├── BRAND_VOICE.md         ← Editorial voice & content rules
    └── DEPLOYMENT.md          ← Production deployment notes
```

---

## Design canon — DO NOT DEVIATE without explicit operator approval

These are locked. They have been refined through deliberate iteration. Treat them as canonical.

### Aesthetic direction

**Editorial gravitas × Nordic craft.** Think of a small, considered cultural publication — _The Drift_, _Harper's_, _MIT Technology Review_ — crossed with the restraint of well-made Nordic design. **NOT** fantasy Viking, NOT runic-marketing, NOT moody dark theme, NOT generic SaaS clean.

### Color palette (CSS custom properties in `norroena.css`)

- `--ink: #0F1115` — primary dark
- `--ink-soft: #1C1F26` — secondary dark
- `--parchment: #F2EBDD` — primary background (warm, never pure white)
- `--parchment-deep: #E8DFC9` — alternate band background
- `--bronze: #8B6F3F` — primary accent
- `--bronze-deep: #6B5530` — emphasis accent (italics, hover states)
- `--steel: #3B5363` — secondary accent
- `--steel-deep: #2A3D4A` — used sparingly
- `--rune-red: #8C2D2D` — used only for the wax-seal device, NEVER for body text or links

### Typography

- **Fraunces** (variable serif) — all display headlines, pull-quotes, italicized emphasis
- **Inter Tight** (sans-serif) — body copy, UI text
- **JetBrains Mono** (monospace) — eyebrow labels, section markers, all-caps tracking text, form labels, technical details

### Recurring motifs

- Parchment grain (SVG noise filter, applied as fixed `body::before` overlay)
- Runic glyphs as ornament (large, low-opacity, positioned absolute behind pillar cards)
- Italicized emphasis in `--bronze-deep` (e.g. `<em>do.</em>` reads in dark bronze italic)
- `§` section markers in front of eyebrow labels
- Monospace eyebrows in `--bronze` (tracking 0.3em–0.4em, uppercase)
- `※` as list bullet (instead of standard disc)
- Bifröst arc watermark (SVG, gradient bronze→steel→rune-red, low opacity)
- Wax-seal device (circular, rune-red, rotated -8deg, used on wedge-offer cards)

### Layout principles

- Generous whitespace — pages breathe
- Asymmetric splits (1.4fr / 1fr, 0.85fr / 1.15fr) — never 50/50, which reads corporate
- Narrow reading columns for prose (max-width: 64ch on founder.html)
- Sticky sidecars on form-heavy pages (audit.html, contact.html)
- Mobile-first, but desktop is the primary viewing context

---

## Brand voice — DO NOT DEVIATE without explicit operator approval

See `docs/BRAND_VOICE.md` for the full treatment. The short version:

- **Editorial, confident, restrained.** Never breathless. Never excitable. Never sales-y.
- **First-person where intimate** (founder page), third-person where institutional (case studies)
- **Quietly precise.** Use specific numbers ("31+ states", "~350 employees") not vague hype ("scale", "enterprise-grade")
- **Em-dashes are encouraged.** They're an editorial signal.
- **Italicize emphasis sparingly.** The italic is the _only_ emphasis device — no bold for emphasis, no ALL CAPS.
- **Avoid corporate jargon.** "Solutions," "synergy," "leverage," "best-in-class" — none of these. Plain English wins.
- **The honest-disclosure move.** When something is sanitized, fictionalized, or limited, say so plainly. Confidentiality is a feature, not a bug.

---

## The four-pillar brand system — LOCKED & VERIFIED

These names have been etymologically verified against Old Norse sources. **Every name is authentic mythological vocabulary.** Do not invent additional Norse-sounding names without explicit operator approval; if you do, flag it clearly as a coinage.

| #   | Domain     | Name         | Pronunciation | Rune | Inscription | Source                                                                                 |
| --- | ---------- | ------------ | ------------- | ---- | ----------- | -------------------------------------------------------------------------------------- |
| 01  | Platforms  | **Bifröst**  | BIV-rurst     | ᛒ    | ᛒᛁᚠᚱᛟᛋᛏ     | The rainbow bridge — _Prose & Poetic Edda_                                             |
| 02  | Processes  | **Draupnir** | DROUP-neer    | ᛞ    | ᛞᚱᚨᚢᛈᚾᛁᚱ    | Odin's gold ring that drips eight identical rings every ninth night — _Skáldskaparmál_ |
| 03  | Assistants | **Mímir**    | MEE-meer      | ᛗ    | ᛗᛁᛗᛁᚱ       | The wise counselor, guardian of the well of wisdom — _Eddas_                           |
| 04  | Counsel    | **Rún**      | ROON          | ᚱ    | ᚱᚢᚾ         | Secret, mystery, whispered counsel — root of the word "rune"                           |

The runic glyphs are valid in **Elder Futhark** (which is what we use throughout for internal consistency). The Tiwaz rune (ᛏ) appears _only_ as a legitimate letter inside the Bifröst inscription (ᛒᛁᚠᚱᛟᛋᛏ — B-I-F-R-O-S-**T**) — never as a pillar glyph in its own right.

A previous draft used a constructed word "Týrst" for the Processes pillar. **Týrst is not a real Old Norse word and has been removed from the canon.** If you find it anywhere in the codebase, that's a bug — replace it with Draupnir.

---

## Wedge offer — the conversion target

The single highest-leverage conversion goal of the website is to drive sophisticated visitors to the **HR Operations Audit**. This is:

- A fixed-fee diagnostic engagement, $3,000–$4,500
- Frames around "where is your team losing time?" rather than "are you compliant?" — the diagnostic is operations-first, with compliance posture covered as one dimension among several
- Delivered as a written findings report plus walkthrough — the deliverable is an operations & automation roadmap, not a compliance gap report
- Designed to be an easy yes — the fee credits forward into follow-on work
- Natural follow-on is platform/process work (Bifröst/Draupnir/Mímir engagements), not "fix the compliance gaps"
- Surfaced prominently on `index.html` (closer section), in the nav (the "Begin with an audit" CTA), and is the destination of `audit.html`

**Every interior page ends with an audit CTA.** This is intentional. Do not remove or weaken these CTAs without operator approval.

### Important context — strategic repositioning, 2026-05-25

The site originally positioned the wedge as a "Multi-State HR Compliance & Process Audit." This was strategically wrong: it overemphasized compliance and underemphasized the technical-craft identity that is the firm's actual differentiator. The operator (Michael Knudson, Ph.D./PHR/full-stack developer) is unusual in combining HR compliance literacy with software engineering — leading with compliance positions him as a typical HR consultant rather than what he actually is. The repositioning to "HR Operations Audit" with operations-first framing is deliberate. Do NOT drift back toward compliance-first framing without explicit operator approval.

The compliance literacy is the **substrate of credibility**, not the **product**. Don't invert this.

---

## Conventions for editing this codebase

### When changing HTML/CSS

- The shared design system (header, footer, nav, page-hero, eyebrows, buttons) lives in `assets/norroena.css`. Edit it there once; do not duplicate into page-specific `<style>` blocks.
- Page-specific styles go in the page's own `<style>` block at the top of the HTML file.
- When in doubt about whether something belongs in the shared file or the per-page block: **if it appears on two or more pages, it belongs in the shared file.**

### When changing copy

- Read `docs/BRAND_VOICE.md` first.
- The header nav and footer link list are duplicated across all six pages. If you change one, change all six. (A future refactor may move these into a shared template; for now, manual sync.)
- The `aria-current="page"` attribute on the nav indicates which page the user is on — update this when adding a new page.

### When adding a new pillar offering or case study

- Pillar offerings live in `practice.html` inside the relevant pillar spread (`#bifrost`, `#draupnir`, `#mimir`, `#run`).
- The case-studies page (`case-studies.html`) currently documents **systems in production** built by the operator in his current employed role — NOT fictional client engagements. This was a deliberate choice (made 2026-05-25) to be honest about Norrœna being new while still demonstrating capability. The framing is "selected systems, in production" with the disclosure paragraph naming the source ("the sole HR specialist for a 350-employee firm operating across 31+ states"). Do NOT replace this framing with fictional client case studies; do NOT remove the disclosure.
- When real Norrœna client engagements close and publication consent is granted, ADD them to the page (don't replace the in-production systems). The page can grow to mix both categories with the in-production systems remaining as foundational capability proof.
- Each case article uses `<article class="case">` blocks with a `data-pillars` attribute listing the applicable pillars (space-separated). The filter chips at the top reference these values.
- Each case ends with a `.case-engagement-parallel` paragraph in italic that translates "system I built" into "what a Norrœna engagement at this scope would cost." This bridges demonstration into the sales motion. Maintain this pattern.

### When adding a new page

1. Copy an existing page as a starting point (founder.html is a good template for content pages, audit.html for forms).
2. Link `assets/norroena.css` and `assets/norroena.js`.
3. Update the nav on the new page with `aria-current="page"` on the right link.
4. Add the new page to the nav AND the footer link list on every other page.
5. Update this file's "File structure" section.

### When adding runic vocabulary

- DO NOT invent words. Search Old Norse / Younger / Elder Futhark sources first.
- If you must coin something, flag it in the commit message AND in this file under "Coinages" (which currently does not exist — if you need to add it, that's a signal to reconsider).
- Verify any runic inscription character-by-character against an Elder Futhark chart before committing.

---

## Current state (last updated: 2026-05-25)

- ✅ All six pages built and design-canonical
- ✅ Shared CSS extracted, single source of truth
- ✅ Týrst → Draupnir swap complete and verified
- ✅ Runic inscriptions verified against Elder Futhark
- ✅ Domain registered: `norroenasolutions.com` (via Cloudflare)
- ✅ Site deployed to Netlify, live at https://norroenasolutions.com
- ✅ SSL certificate provisioned (Let's Encrypt via Netlify)
- ✅ DNS managed at Cloudflare, traffic routed to Netlify
- ✅ Custom email at michael@norroenasolutions.com (Fastmail)
- ✅ Brand identity system: wordmark + monogram + favicon (Bifröst rune ᛒ)
- ✅ Favicons installed (svg, ico, apple-touch-icon, android-chrome 192/512)
- ✅ Open Graph image (og-image.png 1200×630) installed
- ✅ Per-page OG metadata wired into every HTML file
- ✅ site.webmanifest for PWA-style icon behavior
- ✅ Wedge offer repositioned to "HR Operations Audit" (operations-first framing; was "Multi-State HR Compliance & Process Audit")
- ✅ Case studies repositioned as "systems in production" portfolio (5 documented systems demonstrating all four pillars: ATS+AI, HR Platform, Mímir Assistant, FMLA, Reporting+Request)
- ⏳ Forms are visually complete but do not yet submit anywhere (placeholder confirmation panels only)
- ⏳ Phone number on contact.html is a placeholder
- ⏳ LinkedIn URL is a placeholder
- ⏳ Real client testimonials pending (will be added to case studies page as engagements close)
- ⏳ Analytics not yet wired up

## Pending decisions for the operator

- Form submission backend: Formspree vs. Basin vs. Cloudflare Workers (see `docs/DEPLOYMENT.md`)
- Domain registration & DNS provider
- Real testimonials (pending NDA waivers from first clients)
- Whether to add a "Lexicon" / "On the names" page (deferred — see chat history)

---

## What to do when picking up this project

1. Read this file in full.
2. Read `docs/DESIGN_CANON.md` and `docs/BRAND_VOICE.md`.
3. Run `npm run dev` and view the site at http://localhost:8000.
4. Ask the operator what task they want to accomplish — do not start changing things based on what _looks_ improvable. The taste here is deliberate.
5. When in doubt, ask. The operator (Michael) prefers a clarifying question to an unwanted rewrite.
