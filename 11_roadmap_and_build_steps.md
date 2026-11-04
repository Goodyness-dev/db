# 11 Roadmap and Build Steps

## Phase 0: Foundations (days 1 to 3)
[ ] Confirm hosting, CDN, email, and processor policies allow this business
[ ] Register domain with a registrar that allows adult content
[ ] Collect brand assets: logo, photos, color preference
[ ] Decide pricing and plan structure
[ ] Set up repo, environments, CI

## Phase 1: Core MVP (weeks 1 to 2)
[ ] Next.js app with Tailwind and the black theme tokens
[ ] Age gate
[ ] PostgreSQL schema and migrations (users, videos, assets, orders, entitlements)
[ ] Admin login with two factor
[ ] Admin: upload video, set price, publish
[ ] Public catalog and video detail page with teaser
[ ] Processor checkout for single videos
[ ] Webhook handler with idempotency
[ ] Entitlements and protected watch page with signed URLs
[ ] Receipt email and magic link login

## Phase 2: Subscriptions (week 3)
[ ] Plans table and subscription checkout
[ ] Renewal, failure, cancel webhooks
[ ] Grace period logic and daily worker
[ ] Members library and billing page
[ ] Subscription only content
[ ] Reminder emails

## Phase 3: Admin power and analytics (week 4)
[ ] Overview dashboard with revenue and MRR
[ ] Orders and subscribers screens
[ ] Refunds, comps, promo codes
[ ] CSV exports
[ ] Telegram alert bot

## Phase 4: Protection and polish (week 5)
[ ] Dynamic watermark in the player
[ ] Concurrent stream limit and sharing detection
[ ] Motion, skeletons, performance tuning
[ ] Legal pages and compliance records
[ ] Security review and load test

## Phase 5: Launch (week 6)
[ ] Staging test with test payments, full checklist from file 04
[ ] Backups and monitoring live
[ ] Soft launch to a small group from Telegram
[ ] Fix issues, then announce to the full channel
[ ] Pin the site link in the channel

## Phase 6: Growth features
* Bundles, crypto checkout, Telegram bot access control
* Photo sets, custom requests, livestream replays
* Referral program
* Multi language

## Rough team and cost
Solo developer can finish the MVP in about 4 to 6 weeks with AI assistance. Monthly running cost estimate: VPS 10 to 40 dollars, video CDN usage based (a few dollars to hundreds with growth), email 10 to 20 dollars, domain a few dollars. Processor fees are a percentage of sales, often higher for adult.

## Definition of done for MVP
A stranger can land on the site, confirm age, buy a video with a card in under a minute, watch it immediately, subscribe monthly, and the creator sees every sale in the dashboard.
