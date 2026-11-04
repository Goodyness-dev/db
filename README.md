# db

# VAULT: Creator Storefront for DB

A black-themed, luxury creator storefront for **DB**, featuring an automated public catalog, VIP Club memberships, instant checkout (card & crypto), entitlement-protected video player with dynamic anti-piracy watermarking, 18 U.S.C. § 2257 compliance, and an interactive creator admin control center.

## Features
- **Public Storefront**: Age gate modal (18+), ambient hero reel, catalog with instant hover video teasers, video details, sticky checkout bar, and pricing tiers.
- **Protected Streaming**: Custom HTML5 4K player with continuous drifting anti-piracy watermark displaying the viewer's authenticated email and session hash.
- **Checkout & Entitlements**: Guest checkout with cards and crypto (USDT), promo codes (`DBVIP`, `LAUNCH50`), hosted checkout sandbox simulator, and instant entitlement unlocking.
- **Creator Admin Control Center (`/admin`)**: Real-time sales metrics, MRR, churn rate, 7-day revenue trend chart, video catalog manager, order refunds with entitlement revocation, subscriber roster, 2257 compliance logs, and Telegram sales alert bot integration.
- **Statutory Compliance**: 18 U.S.C. § 2257 compliance statement, DMCA and depicted-person takedown request portal, terms, and chargeback defense policy.

## Getting Started
```bash
npm install
npm run dev
```
Visit `http://localhost:3000` to browse the storefront.
Admin dashboard is accessible at `/admin`.
