# VAULT: Creator Storefront Master Plan

Codename: VAULT. A black themed, premium storefront where one creator sells individual videos and a monthly subscription, with automated payments, protected delivery, and a full admin dashboard.

## What replaces the Telegram workflow
Today: a public Telegram channel advertises, buyers DM the creator, payment is handled by hand, content is sent by hand, subscribers are tracked by memory.

VAULT automates all of it:
1. Public catalog with teasers and prices (the storefront).
2. Checkout that unlocks content instantly after payment.
3. Monthly subscription that unlocks a members area and renews automatically.
4. Admin dashboard to upload, price, track sales, manage subscribers, and see revenue.
5. Telegram stays as a traffic funnel, now pointing to the site.

## Do you need a database?
Yes. Without one you cannot track who bought what, who is subscribed, when renewals are due, or revenue. Use PostgreSQL. Details in 03_database_schema.md.

## Document index
1. 01_concept_and_brand.md : brand, vibe, page by page concept
2. 02_architecture.md : system design, stack, folders, request flows
3. 03_database_schema.md : tables, relations, SQL
4. 04_payments_and_subscriptions.md : checkout, webhooks, renewals, refunds
5. 05_content_delivery_and_protection.md : storage, signed streaming, watermarking
6. 06_admin_dashboard.md : every admin screen and metric
7. 07_ui_design_system.md : black theme tokens, components, motion
8. 08_compliance_and_legal.md : age gate, ID checks, record keeping, takedowns
9. 09_security.md : auth, abuse, fraud, backups
10. 10_growth_and_funnel.md : Telegram to site funnel, SEO, retention
11. 11_roadmap_and_build_steps.md : phased plan with a task checklist
12. 12_ai_build_prompts.md : prompts you can paste into an AI coding tool

## Recommended stack (short version)
* Frontend: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion
* Backend: Next.js route handlers plus a small worker process for jobs
* Database: PostgreSQL with Drizzle or Prisma
* Cache and queues: Redis
* Video: a streaming host that allows adult content (Bunny Stream is a common pick) with signed URLs
* Payments: an adult friendly processor (you already know one) plus optional crypto
* Hosting: a VPS or a host whose acceptable use policy allows adult content. Check this FIRST, it decides everything else.

## The single biggest risk
Not code. It is hosting and payment account approval. Many hosts and processors ban adult content or freeze accounts. Confirm the policies of your host, video CDN, domain registrar, email sender, and processor before writing a line of code.
