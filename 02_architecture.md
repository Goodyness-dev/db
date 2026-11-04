# 02 System Architecture

## Overview
Three surfaces share one backend and one database:
1. Public storefront
2. Member area
3. Admin dashboard

## Logical diagram
Visitor browser talks to Next.js frontend. Frontend calls API routes. API routes read and write PostgreSQL, use Redis for sessions, rate limits, and queues. The payment processor sends webhooks to the API. A worker process handles renewals, emails, thumbnails, and cleanup. Video files live in object storage and stream through a CDN with signed, expiring URLs.

## Components
1. Web app (Next.js): server rendered pages for SEO, client components for the player and cart.
2. API layer: route handlers with input validation (Zod).
3. Database: PostgreSQL. Single source of truth.
4. Redis: sessions, rate limiting, job queue (BullMQ).
5. Worker: runs scheduled and background jobs.
6. Object storage and video CDN: originals, encoded streams, thumbnails, teasers.
7. Payment processor: hosted checkout, webhooks.
8. Email service: receipts, magic links, renewal reminders (pick one that allows adult senders).
9. Analytics: privacy friendly, self hosted if possible (Plausible or Umami).
10. Error tracking: Sentry or self hosted GlitchTip.

## Folder structure
app/
  (public)/ home, catalog, video/[slug], pricing, legal pages
  (member)/ library, watch/[id], billing, account
  (admin)/ dashboard, videos, orders, subscribers, payouts, settings
  api/
    checkout/ create session
    webhooks/payments/ processor events
    media/ signed url issuing
    admin/ protected endpoints
lib/
  db/ schema, queries
  payments/ processor adapter
  media/ signing, upload helpers
  auth/ sessions, roles
  email/ templates
workers/
  renewals, emails, thumbnails, cleanup
components/ UI library (see 07)

## Key design decisions
1. Payment adapter pattern: wrap the processor behind an interface (createCheckout, verifyWebhook, cancelSubscription, refund). If the processor bans you, swap it in a day.
2. Guest checkout: buyers only need an email. Create a lightweight account automatically and send a magic link. This lifts conversion a lot.
3. Entitlements table: one place that answers "can this user watch this item right now". Purchases and subscriptions both write entitlements. The player only checks entitlements.
4. Webhooks are the source of truth for payment state. Never trust the browser redirect.
5. Idempotency: every webhook event id is stored, duplicates are ignored.
6. Soft deletes for content and users so history stays intact.

## Request flow: buying a video
1. User clicks Buy. Frontend calls POST /api/checkout with video id and email.
2. Server creates an order with status pending, asks the processor for a hosted checkout link, returns it.
3. User pays on the processor page.
4. Processor sends webhook payment succeeded.
5. Server verifies signature, marks order paid, creates entitlement, queues receipt email.
6. User returns to the site, entitlement exists, watch page works.

## Request flow: watching
1. Watch page loads and calls POST /api/media/token with video id.
2. Server checks entitlement, creates a short lived signed URL (for example 2 hours) bound to a session and optionally an IP range.
3. Player streams from the CDN using that URL.

## Request flow: subscription renewal
1. Processor charges the card each month and sends a renewal webhook.
2. Server extends current_period_end on the subscription.
3. If a renewal fails, the subscription moves to past_due, a grace window starts (3 days), reminder emails go out, then access is revoked.

## Scaling notes
Start with one VPS, Postgres, Redis. The CDN absorbs video traffic, so your server stays small. Add read replicas only when needed.

## Environments
Local, staging (test mode payments), production. Never test with real cards in production.
