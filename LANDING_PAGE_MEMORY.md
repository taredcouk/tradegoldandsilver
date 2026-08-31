# TradeGoldAndSilver Landing Page Memory

Last updated: 2026-08-31 (UTC)

## Scope
- Build a simple static landing page for `tradegoldandsilver.online`.
- Keep design responsive for all device sizes.
- Main CTA button: `Open Account` linking to:
  - `https://www.bullionvaultaffiliate.com/taredcouk/en`
- Use existing server reverse proxy and auto SSL stack.
- Any photo used on the page must be saved locally in this project folder.

## Tech Decisions
- Chosen stack: static `HTML + CSS + JavaScript` (no Next.js runtime).
- Deployment target: Docker container behind existing `nginx-proxy` + `acme-companion`.

## Project Structure
- `assets/images/` local images used by landing page
- `assets/css/` stylesheets
- `assets/js/` JavaScript
- `nginx/` nginx config for static serving

## Progress Log
- Step 1 complete:
  - Created base folder structure for landing page.
  - Created this memory file for ongoing updates.
- Step 2 complete:
  - Created initial responsive landing page files:
    - `index.html`
    - `assets/css/styles.css`
    - `assets/js/main.js`
  - Added local hero image asset:
    - `assets/images/hero-gold-silver.svg`
  - Wired all `Open Account` CTA links to:
    - `https://www.bullionvaultaffiliate.com/taredcouk/en`
  - Added referral disclosure text and basic SEO/Open Graph meta tags.
- Step 3 complete:
  - Added Docker image definition for static nginx serving:
    - `Dockerfile`
  - Added nginx site config for static routing and asset caching:
    - `nginx/default.conf`
  - Added Docker Compose service integrated with existing reverse proxy SSL flow:
    - `compose.yaml`
  - Added `.dockerignore` for leaner build context.
  - Configured domains in app env:
    - `tradegoldandsilver.online`
    - `www.tradegoldandsilver.online`
- Step 4 complete:
  - Deployed service with:
    - `docker compose up -d --build`
  - Resolved container startup hardening issues by updating `compose.yaml` capabilities:
    - added `CHOWN`, `SETGID`, `SETUID` (kept `NET_BIND_SERVICE`)
  - Verified container is healthy (`tradegoldandsilver-web` is `Up`).
  - Verified Let's Encrypt certificate issuance completed for:
    - `tradegoldandsilver.online`
    - `www.tradegoldandsilver.online`
  - Created certificate symlinks in cert volume for nginx-proxy hostname mapping:
    - `tradegoldandsilver.online.crt/key/chain.pem/dhparam.pem`
    - `www.tradegoldandsilver.online.crt/key/chain.pem/dhparam.pem`
  - Verified final behavior:
    - `http://tradegoldandsilver.online` -> `301` to HTTPS
    - `http://www.tradegoldandsilver.online` -> `301` to HTTPS
    - `https://tradegoldandsilver.online` -> `200`
    - `https://www.tradegoldandsilver.online` -> `200`
- Step 5 complete:
  - Added final metadata polish to `index.html`:
    - canonical URL
    - Open Graph URL/image
    - Twitter card
    - favicon link
  - Added local favicon asset:
    - `favicon.svg`
  - Added crawler files:
    - `robots.txt`
    - `sitemap.xml`
  - Updated static image/runtime copy list in `Dockerfile`.
  - Tightened nginx route behavior:
    - `/` serves landing page
    - unknown paths return `404`
  - Redeployed and verified:
    - home page `200`
    - favicon `200`
    - robots `200`
    - sitemap `200`
    - random unknown path `404`
    - referral URL present in live page source
- Step 6 complete:
  - Ran final live QA checks for service health and HTTPS reachability.
  - Attempted browser screenshot QA for mobile/tablet/desktop; blocked by server disk space while pulling a larger Playwright image.
  - Added extra narrow-screen responsiveness safeguard in `assets/css/styles.css`:
    - `@media (max-width: 360px)` adjustments for header spacing, brand size, and CTA sizing
  - Redeployed and verified:
    - `https://tradegoldandsilver.online/` -> `200`
    - `https://www.tradegoldandsilver.online/` -> `200`
    - new CSS breakpoint is live
- Step 7 complete:
  - Upgraded landing page messaging and conversion flow:
    - stronger hero headline and subtext
    - added benefit list in hero
    - added bottom conversion section with final CTA
  - Updated branding copy in header:
    - `TradeGold&Silver.online`
  - Improved typography:
    - added `Cormorant Garamond` + `Manrope` web fonts
    - tuned heading/card typography and spacing
  - Kept referral links and disclosures intact.
  - Redeployed and verified live:
    - both HTTPS hosts return `200`
    - updated CTA text and styles are present in live HTML/CSS
- Step 8 complete (analytics only):
  - Added GA4 to landing page with Measurement ID:
    - `G-VRKRLX390T`
  - Injected global site tag in `index.html`:
    - `gtag/js?id=G-VRKRLX390T`
    - `gtag("config", "G-VRKRLX390T")`
  - Added CTA click tracking in `assets/js/main.js`:
    - event name: `open_account_click`
    - event label by CTA position (`open-account-header`, `open-account-hero`, `open-account-final`)
  - Redeployed and verified live HTML/JS contains GA setup and click tracking.
  - Explicitly skipped (per user request):
    - uptime monitoring setup
    - operational backup setup
- Step 9 complete:
  - Updated landing page visual direction to match provided hero-style reference:
    - full-screen gold-bars background image
    - top navigation branding style
    - bold multi-color hero headline
    - dual CTA row (`Open Account*` and `How it Works`)
    - social proof row
  - Saved background photo locally:
    - `assets/images/hero-bg.jpg`
  - Added hover tooltip behavior for Open Account buttons with exact text:
    - `*Referral Ad: Tared Ltd earns a commission.`
  - Kept GA4 tracking and referral CTA links intact.

## Next Planned Step
- Next optional step: micro-polish iteration
  - tune spacing, colors, and tooltip placement by device

## 2026-08-31 Rebuild Note
- Rebuilt project from static HTML deployment to a Next.js one-page application using the GitHub repo structure and component style.
- Deployment stack switched from nginx static container to Next.js standalone runtime container (`node:20-alpine`, `next build`, `node server.js`).
- `compose.yaml` now exposes/proxies internal port `3000`.
- Navbar updated to remove `Home`, `Guide`, `Blog`, `Charts`, `Contact`.
- Navbar links now scroll to sections: `#services`, `#about`, `#roadmap`, `#faq`.
- `Roadmap Of Platform` cards use framer-motion animation (`whileInView` + `whileHover`).
- Removed form/subscription functionality and excluded interactive API-based features.
- Functional outbound action kept for referral only:
  - `https://www.bullionvaultaffiliate.com/taredcouk/en`
- Referral hover tooltip retained with exact text:
  - `*Referral Ad: Tared Ltd earns a commission.`

## Cleanup Note
- Removed old static-era files/folders no longer used by Next.js runtime:
  - `assets/`
  - `nginx/`
  - `index.html`
  - `favicon.svg`
  - `robots.txt` (root duplicate)
  - `sitemap.xml` (root duplicate)
- Kept canonical static runtime files in `public/`:
  - `public/hero-bg.jpg`
  - `public/robots.txt`
  - `public/sitemap.xml`
- Rebuilt and redeployed successfully after cleanup.
