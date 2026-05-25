# Getting Started — Your Launch Roadmap

> **Reader: Michael.** This is your operator's manual for taking this project from "files on my machine" to "live website that real prospects can visit." Estimated time end-to-end: ~3 hours, spread across two or three sittings.

---

## What you have right now

A complete, production-ready static website on your machine. Six pages, one shared stylesheet, every file ready to deploy. No broken links, no placeholder design — just placeholder content in a few spots (email, phone, LinkedIn URL) that you'll fill in as those are real.

## What you'll do to launch

1. **Install the tools you'll need** (~15 minutes, one-time)
2. **Verify the site runs on your machine** (~5 minutes)
3. **Push it to GitHub** (~15 minutes, one-time)
4. **Deploy to Cloudflare Pages** (~15 minutes, one-time)
5. **Register the domain and connect it** (~30 minutes — depends on whether you already own `norroena.com`)
6. **Update the placeholder content** (~30 minutes)
7. **Wire up the forms** (~15 minutes with Formspree)
8. **Quick pre-launch polish** (~30 minutes — favicon, OG tags, analytics)

Each step is below. Don't try to do them all in one day. Aim for one section per sitting.

---

## Step 1 — Install the tools (~15 min, one-time)

You probably already have most of these. Run each command in Terminal to check.

### Node.js (for the dev server alternative — optional but useful)

```bash
node --version
```

If you see a version number (any recent version works), you're set. If not:

- **macOS** with Homebrew: `brew install node`
- **macOS** without Homebrew: download from [nodejs.org](https://nodejs.org)
- **Windows:** download from [nodejs.org](https://nodejs.org)

### Python 3 (used by the default dev server)

```bash
python3 --version
```

Should already be installed on macOS. If not, also on [python.org](https://python.org).

### Git

```bash
git --version
```

Should already be on macOS. If not: `xcode-select --install` (this installs Git as part of Apple's developer tools).

### Claude Code

```bash
claude --version
```

If you don't have it:

```bash
npm install -g @anthropic-ai/claude-code
```

Then run `claude` and follow the login prompt.

### GitHub account

You'll need one. [github.com/signup](https://github.com/signup) — free.

### Cloudflare account

You'll need one. [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up) — free.

---

## Step 2 — Verify the site runs locally (~5 min)

Open Terminal, navigate to this project folder, and run:

```bash
npm run dev
```

You should see something like:

```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

Open a browser to **http://localhost:8000**. You should see the homepage exactly as expected — parchment background, dark header, runic ornaments rendering correctly.

Click through every nav link. Test the audit form. Test the contact form. Drag the browser window narrow to verify mobile layout.

When you're done, return to Terminal and press `Ctrl+C` to stop the server.

**If anything looks broken**, that's a bug to fix before deploying — open a Claude Code session in this folder and ask it to investigate.

---

## Step 3 — Push to GitHub (~15 min, one-time)

### Create the repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `norroena-website`
3. Set to **Private** (recommended — you're not seeking outside contributors)
4. Do NOT check "Initialize with README" — we already have one
5. Click **Create repository**

GitHub will show you a page with setup instructions. Use the **"…or push an existing repository from the command line"** section.

### Push from your machine

In Terminal, from inside this project folder:

```bash
git init
git add .
git commit -m "Initial commit — production-ready site v1.0"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/norroena-website.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

**On the password prompt:** GitHub doesn't accept passwords from the command line anymore. You'll need a Personal Access Token. Easiest path: install [GitHub CLI](https://cli.github.com) (`brew install gh`), run `gh auth login`, and it handles authentication for you.

After the push succeeds, refresh the GitHub repo page in your browser — you should see all the files.

---

## Step 4 — Deploy to Cloudflare Pages (~15 min, one-time)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Workers & Pages** (left sidebar) → **Create application** → **Pages** → **Connect to Git**
3. Click **Connect GitHub** and authorize Cloudflare
4. Select the `norroena-website` repo
5. **Set up builds and deployments:**
   - Project name: `norroena`
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: **(leave blank)**
   - Build output directory: `/`
6. Click **Save and Deploy**

Watch the build log. After ~30 seconds you should see "Success! Your site was deployed."

The live URL appears at the top — something like **`https://norroena.pages.dev`**. Click it. Your site is live on the public internet.

Take a moment. Don't rush past this. You just shipped.

---

## Step 5 — Register and connect the domain (~30 min)

### If you don't own norroena.com yet

1. Check availability and register at any reputable registrar — Cloudflare itself sells domains at cost (no markup), so [domains.cloudflare.com](https://domains.cloudflare.com) is a great choice and skips the next step.
2. If you use a different registrar (Namecheap, Hover, Porkbun, etc.), that's fine.

### Connect the domain

In the Cloudflare Pages project:

1. Click **Custom domains** → **Set up a custom domain**
2. Enter `norroena.com` → Continue
3. Cloudflare will guide you through DNS. The simplest path:
   - If you registered through Cloudflare: it's automatic.
   - If you registered elsewhere: Cloudflare will tell you to either (a) transfer the domain to Cloudflare's DNS, or (b) add specific DNS records at your registrar.
4. Repeat with `www.norroena.com` so both work.

SSL certificate provisions automatically in ~5 minutes. Then `https://norroena.com` is live.

---

## Step 6 — Update placeholder content (~30 min)

Open the files below in any editor (VS Code is a great choice if you don't have a preference). Make these replacements, then commit and push:

### `contact.html`

- Search for `michael@norroena.com` → leave as-is once you have the email set up
- Search for `(801) 555-0000` → replace with your real number, or remove the phone row entirely
- Search for `linkedin.com/in/michaelknudson` → replace with your actual LinkedIn URL

### Across all files

- Search for `Highland, Utah` → confirm or change

### Save, commit, push

```bash
git add .
git commit -m "Fill in real contact details"
git push
```

Cloudflare auto-deploys in ~30 seconds.

---

## Step 7 — Wire up the forms (~15 min)

For the simplest launch path, use Formspree:

1. Create an account at [formspree.io](https://formspree.io) (free tier covers 50/month)
2. Create a form for the audit. Copy the endpoint URL (looks like `https://formspree.io/f/xyzabc123`)
3. In `audit.html`, find the line that starts with `<form class="audit-form"` and change it to:

```html
<form class="audit-form" action="https://formspree.io/f/xyzabc123" method="POST">
```

(Remove the `onsubmit="..."` JavaScript — Formspree handles redirection.)

4. Repeat for the contact form in `contact.html` — create a separate Formspree form for it (so submissions don't mingle in your inbox).

5. Test by submitting each form on the live site. The email should arrive at your Formspree-registered address within a minute.

Commit, push, deploy:

```bash
git add .
git commit -m "Wire up form submissions via Formspree"
git push
```

---

## Step 8 — Pre-launch polish (~30 min)

Three small adds that make the site feel professional.

### Favicon

You need a tiny image that appears in browser tabs and bookmarks. A simple option:

1. Create a square image with a runic glyph (the ᛒ rune in bronze on parchment is a nice option) — Canva, Figma, or any image editor works
2. Export at 512x512 PNG
3. Use [realfavicongenerator.net](https://realfavicongenerator.net) to generate the full favicon set
4. Drop the generated files into the project root
5. Add the favicon HTML they provide to the `<head>` of every page

### Open Graph tags

These make link previews look good when the site is shared. Add this to the `<head>` of every page (customize the title and description per page):

```html
<meta property="og:title" content="Norrœna Solutions — The bridge between people and process">
<meta property="og:description" content="Custom HR technology, automation, and AI built by a practitioner who understands both the compliance requirement and the code.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://norroena.com">
<meta property="og:image" content="https://norroena.com/og-image.png">
<meta name="twitter:card" content="summary_large_image">
```

You'll need a `og-image.png` — a 1200x630 image with the wordmark on parchment. Even a simple text-only version is fine for v1.

### Analytics

In the Cloudflare dashboard → **Analytics & Logs** → **Web Analytics** → **Add a site**. Enter `norroena.com`. They give you a `<script>` tag. Add it to every page just before `</body>`.

That's it. Pageviews, visitors, top pages — all tracked, no cookies, no GDPR banner needed.

---

## You're live

After all eight steps:

- ✅ Site lives at `https://norroena.com`
- ✅ Auto-deploys on every git push
- ✅ Real forms submitting to your email
- ✅ Analytics tracking
- ✅ Search-engine-indexable
- ✅ Looks polished when shared

Total monthly cost: ~$5–$6 (mostly the domain and email).

---

## What to do next, in priority order

1. **Email yourself the audit form** to test the whole flow as a real prospect would experience it.
2. **Share the URL with three trusted people** for feedback — your most thoughtful peer, an HR director friend, and someone outside the industry who can sanity-check whether the value proposition lands.
3. **Update the case studies** as real engagements close and you collect quotes.
4. **Add a personal favicon** — make it feel finished.
5. **Write the first "On the names" or "Field notes" piece** — see whether you want to add a small writing/blog section over time.

---

## A few questions before you start

1. **Do you already own `norroena.com`, or do you need to register it?** That changes Step 5.
2. **Have you used Git before, or is this your first time?** No wrong answer. If new, I can walk you through the basics in more depth.
3. **What's your timeline target?** "Live this week" and "live this month" lead to different sequencing.

Open a Claude Code session in this folder when you're ready to start — just type `claude` in Terminal from inside the project directory, and the AI will read `CLAUDE.md` first to get oriented.

Welcome to launch.
