# Deployment Guide — Norrœna Solutions

> Production hosting recommendation: **Cloudflare Pages**. Free for this site's scale, fast globally, integrates cleanly with GitHub, and gives you a working URL in about ten minutes.

---

## Why Cloudflare Pages (over the alternatives)

| Host | Pros | Cons |
|---|---|---|
| **Cloudflare Pages** ⭐ | Free, fast global CDN, generous limits, clean GitHub integration, free SSL, free custom domain, no surprise bills, includes Cloudflare Access if needed later, Workers for forms in the future | Slightly less polished UI than Vercel |
| Vercel | Beautiful UI, very fast | Hobby tier has commercial-use restrictions — a paid-customer-facing business site technically requires Pro ($20/mo) |
| Netlify | Mature platform, great form handling out of the box | Free tier has lower bandwidth limits; form submissions capped on free |
| GitHub Pages | Free, simple | No serverless functions, no form handling, limited build options |
| AWS S3 + CloudFront | Total control | Significant configuration; surprise bills possible; not worth it for a static site |

The clear winner for this project is Cloudflare Pages. The form-handling question can be solved separately (see "Forms" below).

---

## First-time setup — step by step

### Step 1 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `norroena-website` (or whatever you prefer)
3. **Private** is fine; Cloudflare Pages works with private repos.
4. Don't initialize with README/.gitignore — we have our own
5. Create the repository

### Step 2 — Push this project to GitHub

From inside this project folder:

```bash
git init
git add .
git commit -m "Initial commit — production-ready site"
git branch -M main
git remote add origin https://github.com/<your-username>/norroena-website.git
git push -u origin main
```

### Step 3 — Connect Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) (create a free account if needed)
2. In the left sidebar, click **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Authorize Cloudflare to access your GitHub
4. Select the `norroena-website` repo
5. Configuration:
   - **Project name:** `norroena` (this becomes the subdomain — `norroena.pages.dev`)
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/` (the root — there's no build step)
6. Click **Save and Deploy**

After about 30 seconds, the site is live at `https://norroena.pages.dev`.

### Step 4 — Connect a custom domain (when ready)

Once you've registered `norroena.com` (or whatever domain you choose):

1. In the Cloudflare Pages project, go to **Custom domains** → **Set up a custom domain**
2. Enter `norroena.com`
3. Cloudflare will guide you through DNS — easiest path is to transfer your domain to Cloudflare's free DNS service, but you can also keep your registrar and point an A record / CNAME
4. SSL certificate provisions automatically within ~5 minutes
5. Add `www.norroena.com` as a second custom domain so both work

---

## The ongoing workflow

Once the connection is set up, the workflow becomes very simple:

```bash
# Make changes to any file
# ...

# Stage and commit
git add .
git commit -m "Describe what changed"
git push

# Cloudflare auto-deploys in ~30 seconds
# Check https://norroena.pages.dev (or norroena.com)
```

Every push to `main` deploys automatically. Every push to a non-main branch creates a preview deployment at a unique URL — useful for showing work to clients before merging.

---

## Forms — the remaining gap

The audit and contact forms are currently **visually complete but do not submit anywhere**. They show a confirmation panel and nothing else. When you're ready to make them real, here are the three best paths.

### Option A — Formspree (simplest, recommended for first launch)

[formspree.io](https://formspree.io)

- Free tier: 50 submissions/month — plenty for an early-stage consultancy
- Paid tier ($10/mo): unlimited submissions, file uploads, custom redirects

**Setup:**

1. Create a Formspree account
2. Create a new form, copy the form endpoint URL (looks like `https://formspree.io/f/xyzabc123`)
3. In `audit.html` and `contact.html`, change the form tags:

```html
<!-- Before -->
<form class="audit-form" onsubmit="event.preventDefault(); ...">

<!-- After -->
<form class="audit-form" action="https://formspree.io/f/xyzabc123" method="POST">
```

4. Remove or simplify the `onsubmit` JavaScript — Formspree handles the redirect to a thank-you page.

**Pros:** Working in 10 minutes. Spam filtering included.
**Cons:** Third-party dependency. Adds a small bit of "powered by Formspree" branding unless paid.

### Option B — Cloudflare Workers (cleaner, more work)

Since you're already on Cloudflare Pages, you can write a small Worker that receives form POSTs and sends emails (via the Resend API or similar).

**Pros:** Fully self-owned, no third-party dependency, very fast, free at this volume.
**Cons:** Requires writing ~30 lines of Worker code and configuring an email-sending service. Worth doing once you're past launch.

### Option C — mailto: fallback (zero infrastructure)

Change the form's `action` attribute to a `mailto:` URL:

```html
<form action="mailto:michael@norroena.com" method="POST" enctype="text/plain">
```

**Pros:** No third-party service, works immediately.
**Cons:** Opens the user's email client, which is a friction point. Not a real submission. **Recommend only as an absolute last-resort fallback.**

---

## Analytics — when you're ready

The site has no analytics wired up yet. When you're ready:

### Recommended: Cloudflare Web Analytics

- Free, privacy-respecting (no cookies, GDPR-friendly), built into the platform you're already using
- Set up in the Cloudflare dashboard under **Analytics → Web Analytics**
- Add the small `<script>` tag they provide to the bottom of each HTML file (before `</body>`)
- About 60 seconds of setup total

### Alternatives

- **Plausible** ($9/mo) — Beautiful, privacy-respecting, even better UI than Cloudflare's
- **Fathom** ($14/mo) — Similar to Plausible
- **Google Analytics 4** — Free but adds cookies, GDPR consent banner, and is heavier. Not recommended for a brand focused on restraint.

---

## Performance & SEO checklist

Before going fully public, verify:

- [ ] All images have descriptive `alt` text (currently the site has minimal imagery, so this is small)
- [ ] Every page has a unique `<title>` and `<meta name="description">` — already in place
- [ ] Open Graph tags for social sharing (TBD — see below)
- [ ] `robots.txt` and `sitemap.xml` (TBD — easy to add)
- [ ] Fonts are loaded with `font-display: swap` (already in place via Google Fonts)
- [ ] Run [pagespeed.web.dev](https://pagespeed.web.dev) on the production URL — target 95+ on all metrics

### Pending additions before launch

1. **Open Graph meta tags** — for when someone shares the site link in Slack, LinkedIn, etc. Adds a preview card.
2. **Favicon** — currently no favicon configured. Will need an icon file (`favicon.ico` plus modern PNG sizes).
3. **robots.txt** — allow indexing; point to sitemap.
4. **sitemap.xml** — six URLs, regenerable manually or via a small script.

Each is small. Worth doing in a single "pre-launch polish" session.

---

## Custom-domain email

The website references `michael@norroena.com` as the contact email. **This email does not yet exist** — when the domain is registered, you'll need to set up email hosting.

Recommended:

- **Google Workspace** ($7/user/mo) — best deliverability, familiar UI
- **Fastmail** ($5/user/mo) — privacy-respecting, no Google
- **ProtonMail** ($4/user/mo) — encrypted, privacy-respecting

For a solo practice, any of the three is fine. Fastmail is my recommendation for the brand fit.

---

## Rollback procedure

If a deployment ever breaks the site:

1. Go to the Cloudflare Pages project → **Deployments** tab
2. Find the previous working deployment
3. Click `⋯` → **Rollback to this deployment**

Cloudflare keeps deployment history; rollback takes ~10 seconds and restores the previous version exactly.

---

## A note on cost

At this site's scale (~6 pages, expected traffic of a niche consultancy):

| Service | Monthly cost |
|---|---|
| Cloudflare Pages | $0 |
| GitHub (private repo) | $0 |
| Domain registration | ~$1/mo (averaged over $10–$15/year) |
| Email hosting (Fastmail or similar) | ~$5/mo |
| Formspree (free tier) | $0 |
| **Total** | **~$6/mo** |

Add ~$10–$20/mo if you upgrade form handling, analytics, or want premium email. Still less than a single hour of consulting revenue.

---

## A note on Cloudflare and ad-tracking

By default, Cloudflare's web analytics is privacy-respecting and adds no cookies. Cloudflare does not sell visitor data. The site, as configured here, will not place tracking pixels or third-party ad cookies on visitors' devices. **Keep it that way** — it's on-brand for a firm that markets itself on restraint and judgment.
