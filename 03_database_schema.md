# 03 Database Schema (PostgreSQL)

Yes, you need a database. This is what it tracks.

## Tables

### users
id (uuid, primary key), email (unique), password_hash (nullable for magic link users), role (customer or admin), display_name, age_confirmed_at, last_login_at, created_at, deleted_at

### videos
id, slug (unique), title, description, price_cents, currency, is_subscription_only (bool), status (draft, scheduled, published, archived), publish_at, duration_seconds, category_id, teaser_asset_id, thumbnail_asset_id, stream_asset_id, view_count, created_at, updated_at

### assets
id, kind (original, stream, teaser, thumbnail, photo), storage_key, provider_video_id, size_bytes, width, height, checksum, created_at

### categories and tags
categories(id, name, slug). video_tags(video_id, tag).

### orders
id, user_id, email, status (pending, paid, failed, refunded, chargeback), total_cents, currency, processor, processor_session_id, promo_code_id, ip_hash, created_at, paid_at

### order_items
id, order_id, video_id, bundle_id, unit_price_cents

### bundles
id, title, price_cents, status. bundle_items(bundle_id, video_id).

### plans
id, name, price_cents, interval (month), processor_plan_id, active

### subscriptions
id, user_id, plan_id, status (active, past_due, canceled, expired), processor_subscription_id, current_period_start, current_period_end, cancel_at_period_end (bool), canceled_at, created_at

### entitlements
id, user_id, video_id (nullable), source (purchase, subscription, gift, admin), source_id, starts_at, ends_at (null means forever), revoked_at
Rule: subscription access is computed from an active subscription plus subscription only videos. Purchases create permanent rows.

### payments
id, order_id, subscription_id, processor_event_id (unique), amount_cents, status, raw_payload (jsonb), created_at

### webhook_events
id, processor, event_id (unique), type, payload (jsonb), processed_at, error

### promo_codes
id, code (unique), percent_off, amount_off_cents, max_uses, used_count, expires_at

### refunds
id, order_id, amount_cents, reason, created_by, created_at

### access_logs
id, user_id, video_id, ip_hash, user_agent_hash, created_at. Used for abuse detection and sharing detection.

### audit_log
id, admin_id, action, entity, entity_id, meta (jsonb), created_at

### compliance_records
id, video_id, performer_name, performer_dob_verified (bool), id_document_ref (encrypted storage key), consent_form_ref, recorded_date, notes
Keep these private and encrypted. See 08.

## Example SQL
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text,
  role text NOT NULL DEFAULT 'customer',
  age_confirmed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  plan_id uuid NOT NULL,
  status text NOT NULL,
  processor_subscription_id text UNIQUE,
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean NOT NULL DEFAULT false
);

## Indexes
* users(email)
* videos(status, publish_at)
* orders(user_id, status)
* entitlements(user_id, video_id)
* subscriptions(status, current_period_end)
* webhook_events(event_id) unique

## How to track subscribers
Query: active subscribers are rows where status is active or (status is past_due and now is before the grace deadline). Monthly recurring revenue is the sum of plan prices for active rows. Churn is canceled rows this month divided by active at month start.

## Backups
Daily automated dumps, kept 30 days, copied to a second provider. Test a restore monthly.
