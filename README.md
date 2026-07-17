# Links Time Co. — Dimple Dial storefront

Single-page Next.js site, deploys to Vercel the same way as Adunda.

## Deploy
1. Push this folder to a GitHub repo
2. In Vercel: New Project -> import the repo -> deploy (no config needed)

## Before launch (2 edits in lib/config.js)
1. CHECKOUT_URL — create a Stripe Payment Link (Stripe dashboard ->
   Product catalog -> create "Dimple Dial" at $350 -> Payment Links).
   Turn ON "Collect shipping address" and set US only. Paste the link.
   Until this is set, the buy button falls back to an email order.
2. CONTACT_EMAIL — set to your real orders email.

## Swapping photos
Replace files in public/images/ keeping the same names:
hero.jpg, detail-1.jpg, detail-2.jpg, detail-3.jpg, wrist.jpg

## Local dev
npm install
npm run dev
