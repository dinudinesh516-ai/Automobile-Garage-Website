# SMK Automobiles — Website

The website for **SMK Automobiles – Multi Brand Car Service Center**, Sundakkamuthur, Coimbatore.
It's built with **React 19 + Vite** and **Bootstrap 5 compiled from Sass**, in the business card's red, black and white.
Customer reviews are pulled **live from Google** through a Vercel serverless function.

## Features

- **Brand logo**: a vector (SVG) recreation of the business-card logo, used in the navbar, the footer and the favicon
- Sticky glassmorphism navbar with scroll-spy and an accessible mobile drawer (no Bootstrap JS)
- Hero with a live **Open now / Closed** badge, calculated in IST from the real business hours
- A red **"We service all brands"** marquee: popular makes plus "& every other make"
- Sections: Services (white), About, Gallery (workshop jobs), Reviews (white, real reviewer names), and Contact & Booking
- **Booking form → WhatsApp**: Name, Mobile, Service, Vehicle, Preferred Date and Notes are validated, then WhatsApp opens with the booking pre-filled. No email and no backend needed.
- **WhatsApp click-to-chat** everywhere (floating button, each service card, hero) and **tap-to-call** for all three team members
- **Live Google reviews**: the latest rating, review count and reviews, with loading skeletons and an automatic fallback
- **Google Maps** embed (dark-styled, lazy-mounted) with **Get Directions** to the exact listing
- Per-section **error boundaries**, toasts, `prefers-reduced-motion` support and LocalBusiness JSON-LD
- Responsive from 320 px up to 4K

## Project structure

```
api/
  reviews.js            Vercel function → Google Places API (New), CDN-cached
public/                 favicon.svg (SMK mark), robots.txt
src/
  data/business.js      ← ALL business info (phones, hours, services, images, fallback reviews)
  components/           BrandLogo, Navbar, Hero, BrandStrip, Services, About, Gallery,
                        Reviews, Contact, BookingForm, LocationMap, Footer,
                        FloatingActions, ToastProvider, ErrorBoundary, Reveal, SectionHeading, Icon
  hooks/                useGoogleReviews, useOpenStatus, useScrolled, useActiveSection
  utils/whatsapp.js     wa.me link builders + message templates
  styles/               _variables.scss (theme tokens) · _base.scss · _components.scss
vite.config.js          also serves /api/* on the dev server
vercel.json             build config + cache/security headers
```

To change business details, edit **`src/data/business.js`** only.

## Local development

```bash
npm install
npm run dev               # http://localhost:5173
```

The site works fully without any keys. Until a Google key is added, the Reviews section shows the bundled reviews.

```bash
npm run build && npm run preview   # production build check
```

## Live Google reviews (optional, about 10 minutes)

1. Open the Google Cloud Console, create a project and **enable billing**. Google requires billing, but this usage stays within the free monthly allowance (see below).
2. **APIs & Services → Library**: enable **Places API (New)**.
3. **APIs & Services → Credentials → Create credentials → API key**.
   Restrict the key to the **Places API (New)** API only.
4. Add the key:
   - locally, in a `.env` file: `GOOGLE_PLACES_API_KEY=your-key` (copy `.env.example`)
   - on Vercel: **Project → Settings → Environment Variables** → `GOOGLE_PLACES_API_KEY`, then redeploy

The Place ID for SMK Automobiles (`ChIJ14jcSqpbqDsRzL-THQhBOOE`) is built in. Set `GOOGLE_PLACE_ID` only if you need to override it.

**Cost:** Vercel's CDN caches the response for 6 hours, so Google is called only a few times a day however many people visit. That should stay well within the free monthly allowance. To be safe, set a daily quota cap under **APIs & Services → Places API (New) → Quotas**.

**Limitation:** Google's API returns at most **5** reviews per place. The site sorts them newest-first and shows the 3 latest. A "Read all reviews" link opens the full list on Google.

> Never prefix the key with `VITE_`. Vite would then bundle it into the public JavaScript.

## Deploy

```bash
git init
git add .
git commit -m "Initial commit: SMK Automobiles website"
git branch -M main
git remote add origin https://github.com/<you>/smk-automobiles.git
git push -u origin main
```

Then go to vercel.com/new, import the repo (Vite is detected automatically), optionally add `GOOGLE_PLACES_API_KEY`, and deploy.

## Before launch

- [ ] Swap the Unsplash photos for real photos of the workshop at work (`gallery`, `heroImage` and `aboutImage` in `business.js`).
- [ ] Confirm the landmark spelling: the card says **"Thangam Building"**, while Google Maps says "Thadagam Building".
- [ ] Confirm the WhatsApp number (`whatsappNumber`). It currently uses C.A Mansoor's number, 99448 21516.
- [ ] If you have the original logo file (SVG/AI/PDF), it can replace the recreated SVG in `BrandLogo.jsx`.
