# Design Canon — Norrœna Solutions

> Version 1.0 · Locked
> These decisions are not preferences. They are commitments. Anything that contradicts them is a bug.

---

## 1. Aesthetic direction

**Editorial gravitas × Nordic craft.**

The site should feel like a small, considered cultural publication — the kind of website *The Drift*, *The Paris Review*, *MIT Technology Review*, or *Aeon* might produce if they were also a design studio. Crossed with the restraint of well-made Nordic design — Acne Studios, A Magazine, OMA's print work.

**What this means:**

- Typography does the heavy lifting; ornament is sparing
- Generous whitespace, asymmetric layout
- Warm, parchment-like backgrounds — never pure white
- Ink-on-paper feel, with subtle texture (the SVG grain overlay)
- One restrained accent color (bronze) doing most of the emphasis work
- One ceremonial accent (rune-red) used only for the wax-seal device

**What this does NOT mean:**

- ❌ Fantasy Viking aesthetic — no axes, no Norse-warrior tropes, no Skyrim font
- ❌ Heavy runic ornamentation as decoration — runes appear only as deliberate marks
- ❌ Dark/moody theme — the site is light, parchment-based, restrained
- ❌ Generic SaaS clean — no flat icons, no gradient buttons, no avatar testimonial cards
- ❌ Maximalist or "design-y" — restraint reads as confidence; flair reads as insecurity

---

## 2. Color palette

All colors are exposed as CSS custom properties at the top of `assets/norroena.css`. Reference them by variable name, never by hex code, in component CSS.

| Variable | Hex | Use |
|---|---|---|
| `--ink` | `#0F1115` | Primary text; primary dark sections |
| `--ink-soft` | `#1C1F26` | Hover state for dark sections; secondary dark |
| `--parchment` | `#F2EBDD` | Primary page background |
| `--parchment-deep` | `#E8DFC9` | Alternate-band background (problem section, closer section) |
| `--bronze` | `#8B6F3F` | Primary accent — eyebrows, runes, monospace text, hairlines |
| `--bronze-deep` | `#6B5530` | Emphasis accent — italicized emphasis, button hovers |
| `--steel` | `#3B5363` | Secondary accent — used in the Bifröst arc gradient |
| `--steel-deep` | `#2A3D4A` | Used sparingly, currently for hover states only |
| `--rune-red` | `#8C2D2D` | **Ceremonial only** — the wax-seal device. Never used for body text, links, errors, or any other UI affordance. |

**Critical rule:** `--rune-red` is reserved. If you find yourself reaching for it for an alert, an error, or a "required field" indicator, stop. The form's required-field markers currently use rune-red, which is the *one* exception, and even there the goal is to feel like a wax-stamp seal of officialdom, not an error state.

---

## 3. Typography

Three families, loaded from Google Fonts:

| Family | Role | Where |
|---|---|---|
| **Fraunces** (variable serif) | Display | All headlines (h1–h3), pull-quotes, italicized emphasis, the wordmark |
| **Inter Tight** (sans-serif) | Body | Paragraph text, UI labels, form inputs |
| **JetBrains Mono** (monospace) | Utility | Eyebrow labels, all-caps tracked text, section markers, form labels, technical details (case study IDs, runic inscriptions) |

### Display sizes (from `norroena.css`)

| Class | Size | Use |
|---|---|---|
| `.display-xl` | `clamp(2.75rem, 6.5vw, 5.5rem)` | Hero headlines |
| `.display-lg` | `clamp(2rem, 4.5vw, 3.75rem)` | Section headlines |
| `.display-md` | `clamp(1.75rem, 3vw, 2.5rem)` | Sub-section headlines |
| `.deck` | `1.2rem` | Subheadings under display headlines |

### Display weight

Fraunces is always **300 (light)** for display. Never 400+, never bold. The weight comes from the size, not the stroke.

### Emphasis rules

- **Italics in `--bronze-deep`** is the *only* emphasis device. Use `<em>` for emphasis; the CSS automatically renders it in bronze italic against the display headlines.
- **Bold is forbidden** for emphasis in body copy. Bold may be used inside form labels and inline `<strong>` tags only where it signals UI structure, not emphasis.
- **ALL CAPS** is for monospace eyebrow labels only (small caps via `letter-spacing: 0.3em` and `text-transform: uppercase`). Never used in display or body.

---

## 4. Layout principles

### Asymmetric grids

Two-column layouts use intentionally uneven ratios:

- Hero: `1fr 1fr` (the only 50/50, justified by the manifesto-pullquote pairing)
- Problem section: `1fr 1fr`
- Founder card + story: `0.85fr 1.15fr`
- Audit intake: `1.4fr 1fr` (form + sidecar)

50/50 splits read corporate. Uneven splits read editorial.

### Reading column constraints

Long-form prose (founder essay, case study narratives) is constrained to `max-width: 64ch` (~600px). This is non-negotiable. Long-line prose at full viewport width is unreadable.

### Whitespace rhythm

Section padding follows `clamp()` patterns so it scales with viewport:

- Major sections: `padding: clamp(5rem, 10vw, 8rem) var(--gutter)`
- Hero: `padding: clamp(4rem, 10vw, 8rem) var(--gutter) clamp(3rem, 7vw, 6rem)`
- The `--gutter` variable scales from `1.25rem` to `3rem`

### Sticky sidecars

On `audit.html` and `contact.html`, the right-column sidecar uses `position: sticky` so it remains visible as the user scrolls through the form. This is intentional UX — it keeps the offer or directory visible at all times.

---

## 5. Component motifs

These are the recurring visual devices. Use them deliberately; don't multiply them.

### The § eyebrow
```html
<div class="section-label">Section name</div>
```
Renders as `§ SECTION NAME` in monospace bronze. The `§` is a `::before` pseudo-element.

### The italicized emphasis
```html
<h1 class="display-xl">Software built for the work you actually <em>do.</em></h1>
```
The `<em>` automatically renders in bronze italic — no styling needed in markup.

### The pillar card (homepage, four-up grid)
```html
<a href="practice.html#pillar-id" class="pillar">
  <div>
    <div class="pillar-eyebrow">## · Domain</div>
    <h3 class="pillar-name">Name</h3>
    <div class="pillar-rune">RUNIC-INSCRIPTION</div>
    <p class="pillar-desc">Description.</p>
  </div>
  <div class="pillar-link">Explore Name <span>→</span></div>
  <span class="glyph" aria-hidden="true">RUNE</span>
</a>
```

### The runic ornament row
```html
<div class="craft-runes" aria-hidden="true">
  <span class="runes">ᛒ ᛞ ᛗ ᚱ</span>
</div>
```
Renders as a horizontal divider with hairlines on either side and four runes centered. **DO NOT** use `letter-spacing` for the spacing — use the `.runes` inner span and `gap` on the parent. (See the painful debugging story in chat history.)

### The wax-seal device
```html
<div class="seal">Wedge<br>offer</div>
```
A 64px circular `--rune-red` element with white text, rotated `-8deg`, with subtle shadow. Reserved for the wedge-offer card (closer section on index.html, sidecar on audit.html).

### The Bifröst arc (background ornament)
```html
<svg class="hero-ornament" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="arc">
      <stop offset="0" stop-color="#8B6F3F"/>
      <stop offset="0.5" stop-color="#3B5363"/>
      <stop offset="1" stop-color="#8C2D2D"/>
    </linearGradient>
  </defs>
  <!-- arc paths -->
</svg>
```
Used as a faint (`opacity: 0.07`) background watermark in the hero. The gradient bronze→steel→rune-red is the visual signature.

---

## 6. The Elder Futhark commitment

The site uses **Elder Futhark** runes throughout. This is a deliberate choice for internal consistency. Three principles:

1. **The four pillar glyphs** (ᛒ ᛞ ᛗ ᚱ) are all valid Elder Futhark.
2. **The four pillar inscriptions** (ᛒᛁᚠᚱᛟᛋᛏ, ᛞᚱᚨᚢᛈᚾᛁᚱ, ᛗᛁᛗᛁᚱ, ᚱᚢᚾ) are all transliterated character-by-character against the Elder Futhark chart. Each character is verified — see the etymology research in chat history.
3. **The Tiwaz rune (ᛏ)** appears *only* as a legitimate letter inside the Bifröst inscription. It is not a pillar glyph. If you see ᛏ standing alone anywhere, that's a bug.

**Never add a new runic inscription without verifying it character-by-character.** The temptation to "make something that looks Norse" is real and must be resisted.

---

## 7. Responsive behavior

The site is built mobile-first using CSS Grid and Flexbox. Breakpoints:

- `@media (max-width: 900px)` — collapse two-column grids to single column
- `@media (max-width: 640px)` — header becomes vertical, footer wraps
- `@media (max-width: 540px)` — pillar grid drops to single column

Test at all three breakpoints whenever changing layout.

---

## 8. Animation principles

Animations are restrained.

- **Scroll reveals** — `.scroll-reveal` elements fade in and translate up when entering the viewport, via IntersectionObserver in `norroena.js`. Threshold: 0.12. Duration: 0.9s. Easing: `cubic-bezier(.2,.7,.2,1)`.
- **Hover transitions** — links and buttons transition 0.2–0.3s.
- **Pillar card hover** — `transform: translateY(-6px)` and a subtle background shift.
- **Glyph hover** — pillars' background runic glyph rotates slightly (`-8deg`) and lifts on hover.

**No bounces, no springs, no scroll-jacking, no parallax.** The site reads as a document, not a presentation.
