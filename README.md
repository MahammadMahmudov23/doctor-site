# Dr. [Name] — Private Medical Specialist

A premium single-page website for an independent private medical specialist in Baku. Calm, clinical-but-warm, discreet. The **specialty is swappable** (urologist used as the example).

- **Identity:** deep teal `#0E6E78` + warm amber `#C77F4A` on warm off-white. Type: **Spectral** (serif) + **IBM Plex Sans**.
- **Signature:** the "vital line" — a calm pulse that draws on scroll.
- **Stack:** static HTML/CSS/JS · GSAP + ScrollTrigger · Lenis · no build step.

## Run locally
Open `index.html`, or serve it: `python3 -m http.server 8000`.

## Sections
Home · About & credentials · Services (₼ prices) · Process · Resources (+ example article modal) · Testimonials · FAQ · Booking (→ WhatsApp + email) · Contact. Floating WhatsApp button on every screen.

## (a) Placeholders to replace
Search the project for these:
- `Dr. [Name]` — the doctor's name (in `index.html`)
- `[Street Address]`, `[District]`, `[University]`, `[sub-specialty]`, `[18]`
- `clinic@example.az` — email (in `index.html` **and** `js/app.js`)
- `994000000000` — WhatsApp number (in `js/app.js` and every `wa.me/` link)
- `+994 00 000 00 00` / `tel:+994000000000` — phone
- Prices (₼ values) in the Services section
- Social links (`href="#"`)
- The map: replace the `.map .ph` block with a Google Maps `<iframe>`

## (b) Adding real photos
Each photo slot is a `.ph` block with `aria-label="IMAGE: …"`. Replace it with:
```html
<img src="assets/portrait.webp" alt="Dr. [Name] in the consulting room" loading="lazy"
     style="width:100%;height:100%;object-fit:cover">
```
Suggested sizes: hero portrait 1000×1250, about 1000×1000, article cover 1200×675.

## (c) Change the WhatsApp number
In `js/app.js`, set `const WA = '994000000000'` to the real number (digits only, country code first). Then find-replace `994000000000` across `index.html` for the static `wa.me/` links.

## (d) Change the medical specialty  ⭐
Open `js/app.js` — at the very top is a `SPECIALTY` config:
```js
const SPECIALTY = {
  word:  'urology',                 // hero: "a calmer path through urology"
  role:  'Urologist',               // the title shown throughout
  area:  'urological',              // adjective: "urological health"
  organ: 'urinary and men’s health',// plain-language scope
  focus: ['…','…','…'],
};
```
Edit those five strings (e.g. `word:'dermatology'`, `role:'Dermatologist'`, `area:'skin'`, `organ:'skin, hair and nails'`) and every `data-spec` spot updates automatically. Then skim `index.html` for any remaining hand-written specialty wording in the Services/Article copy and adjust to taste, and update the `<title>`/meta description.

## Deploy (GitHub Pages)
```bash
git init && git add . && git commit -m "Doctor site"
gh repo create doctor-site --public --source=. --push
# Settings → Pages → Deploy from a branch → main → /root → Save
```

> This site is for general information and does not provide medical advice or guarantee outcomes. All imagery is placeholder — add real photos before launch.
