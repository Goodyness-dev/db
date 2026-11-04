# 12 AI Build Prompts

Paste these one at a time into your AI coding tool (Claude Code, Cursor, and so on). Always attach the relevant md file as context.

## Prompt 1: Project setup
Create a Next.js App Router project with TypeScript, Tailwind CSS, Framer Motion, Drizzle ORM and PostgreSQL. Follow the folder structure in 02_architecture.md. Configure Tailwind with the color tokens from 07_ui_design_system.md. Add ESLint, Prettier, and environment variable validation with Zod.

## Prompt 2: Database
Using 03_database_schema.md, write Drizzle schema files and migrations for all tables with the indexes listed. Add a seed script that creates an admin user and five sample videos.

## Prompt 3: Age gate and layout
Build the age gate modal, navbar, footer and base layout using the black theme. The gate sets a cookie after confirmation. Make it fully responsive and accessible.

## Prompt 4: Catalog and video page
Build the catalog grid with filters, search and pagination, and the video detail page. Cards play a teaser on hover. Include a sticky buy panel. Use skeleton loaders.

## Prompt 5: Payments adapter
Implement a payments adapter interface as described in 04_payments_and_subscriptions.md with a mock provider for local testing. Build POST /api/checkout and the webhook route with raw body signature verification and idempotency using webhook_events.

## Prompt 6: Entitlements and player
Implement entitlement creation after payment and the POST /api/media/token endpoint that checks entitlements and returns a short lived signed URL. Build a custom HLS player with a moving watermark that shows the viewer email at low opacity.

## Prompt 7: Subscriptions
Implement plans, subscription checkout, renewal and failure webhooks, grace period logic, and a BullMQ worker that expires subscriptions and sends reminders. Build the member billing page.

## Prompt 8: Admin
Build the admin area with all screens in 06_admin_dashboard.md. Start with Overview, Videos and Orders. Use server side pagination, role checks, two factor login, and write audit log entries for every mutation.

## Prompt 9: Emails and alerts
Create email templates for receipt, magic link, renewal reminder, payment failed, and welcome. Add a Telegram bot alert for new sales and failed payments.

## Prompt 10: Hardening
Add rate limiting, security headers, bot protection, input validation review, and write tests for the webhook handler, entitlement logic and subscription state machine.

## Prompt 11: Polish
Audit performance with Lighthouse, aim for 90 plus on mobile. Add motion, empty states, error pages, a PWA manifest, and SEO metadata.
