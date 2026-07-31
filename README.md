# amp.ire — website

Static site for **ampireaudio.com**. No build step, no framework, no dependencies.
Edit the HTML, drop files into `assets/`, push. That's the whole workflow.

```
.
├── index.html        amp.ire home — the two areas
├── music.html         releases + streaming links
├── software.html      software overview (built to hold more plugins later)
├── alter-ego.html      product page
├── about.html          about + contact
├── styles.css          one stylesheet, both themes
├── site.js              theme toggle + image fallbacks
├── assets/              screenshots, audio demos, covers, portrait
└── legal/                imprint, privacy, terms, refunds — still to be written
```

This repo is separate from the plugin source (`ampire-sound/Altruist`) on purpose:
different audience, different deploy cadence, and the plugin repo is private while
this one carries no secrets.

## Themes

Both themes come straight out of `Source/UI/Theme.h` in the plugin repo, so the site and
the plugin use the same palette. Dark is the default; the toggle in the nav follows the
visitor's OS until they choose manually, then the choice is remembered.

**Screenshots switch with the theme.** Every plugin screenshot needs two files —
`*-dark.png` and `*-light.png`. Take each one twice with the plugin set to the matching
theme. The site shows whichever fits the currently active theme.

## Local preview

```bash
open index.html                    # good enough for everything
python3 -m http.server 8000        # if you want proper URLs: localhost:8000
```

## Assets to produce

Missing files show a labelled placeholder instead of a broken image icon — the
placeholder disappears on its own once the file exists. Nothing to edit in the HTML.

### Plugin screenshots — two of each, dark and light

| File | What it shows |
|---|---|
| `assets/hero-dark.png` / `hero-light.png` | Main view, 2400 × 1500 px |
| `assets/explore-dark.png` / `explore-light.png` | Explore view |
| `assets/matrix-dark.png` / `matrix-light.png` | Slot matrix |
| `assets/key-dark.png` / `key-light.png` | Key / harmony display |

### Audio

`assets/demo-source.mp3`, `demo-pad.mp3`, `demo-arp.mp3`, `demo-groove.mp3`

All four from the **same** source sample — that is the whole point of the comparison.
15–25 seconds each, 192 kbps is plenty.

### Music & brand

- `assets/releases/release-01.jpg` … — square, 1200 × 1200 px
- `assets/portrait.jpg` — 4:5, roughly 1000 × 1250 px
- `assets/favicon.png` — 512 × 512 px
- `assets/og-image.png`, `assets/og-alter-ego.png` — 1200 × 630 px, for link previews

## Placeholders to replace

Domain is already wired in (`ampireaudio.com`). Search for the rest:

| Token | Replace with |
|---|---|
| `YOUR LEGAL NAME` | your actual legal name — required, see below |
| `PRICE` | the price, e.g. `69` |
| `COUNT` | machines allowed per licence |
| `POLAR_CHECKOUT_URL_PLACEHOLDER` | Polar checkout URL |
| `DEMO_DOWNLOAD_URL_PLACEHOLDER` | demo download link |
| `TRANSFER_FEE_TEXT` | e.g. "Transfers are free." |
| `DEMO_LIMITATION_TEXT` | what the demo does not do |
| `REFUND_TEXT` | refund policy — have this reviewed |
| `RELEASE TITLE` | actual release titles in `music.html` |

```bash
grep -rn "YOUR LEGAL NAME\|PLACEHOLDER\|_TEXT\b" .
```

The copy is scaffolding written to sound like you might — **rewrite it in your own
voice** before launch. It is deliberately plain rather than hyped, which tends to work
better in this market, but it is not your writing yet.

> **Legal name, not just amp.ire.** German imprint rules want the actual person behind
> the site, and Polar's domain verification expects the seller's legal name in the
> imprint and terms. amp.ire stays the brand; the imprint carries your name.

## Polar checkout

The plain links work as-is once you paste the checkout URL. For the nicer overlay
checkout: open the product in the Polar dashboard → **Copy Embed Code** → replace the
`<a class="btn btn-primary">` in `alter-ego.html` with that snippet and add
`data-polar-checkout-theme="dark"`. There are two buy buttons on the page (hero and
price card).

## Deploy — Cloudflare Pages, free

1. Repo lives at `ampire-sound/website` on GitHub, already connected — Cloudflare Pages
   watches it directly.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → connect this repo.
3. Build command: *none*. Build output directory: `/` (repo root).
4. Add `ampireaudio.com` under **Custom domains**.

Every push to `main` redeploys. Previews per branch/PR come for free.

The same Cloudflare account will later hold the licence-activation Worker and the D1
ownership table — see `docs/LICENSING_PLAN.md` in the plugin repo. One account for
everything: DNS, site, and eventually the licence backend.

## Domain

Decided: **`ampireaudio.com`** (registered via IONOS, DNS delegated to Cloudflare).
`ampireaudio.de` was registered alongside it as a defensive duplicate — point it at the
same Cloudflare Pages project or set up a redirect once DNS is live.

## Still to come

- `legal/imprint.html`, `privacy.html`, `terms.html`, `refunds.html`
- Wiring the buy button to a real Polar product
- A download page for the demo build
