# 06 Admin Dashboard

The creator needs to see money and fans at a glance, and publish in a few clicks.

## Access
Separate route group, role admin only, two factor authentication required, session timeout 30 minutes idle, every action written to the audit log.

## Screens

### 1. Overview
* Today, 7 day, 30 day revenue
* Monthly recurring revenue and active subscribers
* New subscribers, cancellations, churn rate
* Top selling videos
* Revenue chart by day
* Failed payments needing attention
* Quick actions: upload video, create promo code

### 2. Videos
* List with status, price, sales count, revenue, views
* Create or edit: title, description, price, category, tags, subscription only toggle, schedule publish date
* Upload with progress and processing status
* Pick the thumbnail and teaser from generated options
* Duplicate, archive, delete (soft)
* Bulk price change

### 3. Orders
* Searchable by email, order id, date
* Status filters
* Order detail: items, payment id, IP hash, access history
* Refund button with reason
* Resend access email

### 4. Subscribers
* List with plan, status, next renewal, lifetime value
* Detail page: payment history, watch history, notes
* Actions: grant free access, extend, cancel, comp a month
* Filters: past due, expiring in 7 days, canceled

### 5. Customers
* All buyers, total spent, last seen
* Tag VIPs, block abusive accounts

### 6. Promotions
* Promo codes with limits and expiry
* Bundles builder
* Flash sale scheduler

### 7. Analytics
* Traffic sources (Telegram, X, Instagram, direct)
* Conversion funnel: visit, video view, checkout started, paid
* Cohort retention for subscribers
* Best performing categories
* Geography

### 8. Payouts and finance
* Payout history from the processor
* Fees paid, net revenue
* Export CSV for accountant

### 9. Compliance
* Per video performer records and consent files
* Age verification status of performers
* Takedown requests log

### 10. Settings
* Site name, logo, colors
* Plans and prices
* Email templates
* Processor keys (stored encrypted)
* Admin users and roles (owner, manager, support)
* Maintenance mode

### 11. Notifications
Telegram or email alert to the creator for: new sale, new subscriber, failed payment, chargeback, suspicious activity. A Telegram bot for alerts fits his existing habits.

## Roles
* Owner: everything
* Manager: content and customers, no payout or keys
* Support: orders and customers, refunds under a limit
