# 09 Security

## Authentication
* Customers: magic link email login plus optional password. Sessions in secure, httpOnly, sameSite cookies.
* Admin: password plus two factor authentication (authenticator app), IP allow list optional, short sessions.
* Hash passwords with Argon2id.

## Application security
1. Validate every input with Zod.
2. Parameterized queries only.
3. CSRF protection on state changing routes.
4. Rate limit login, checkout, token issuing, and signup by IP and email.
5. Security headers: strict content security policy, HSTS, no sniff, frame ancestors none.
6. File upload rules: admin only, type and size checks, scan, never executed.
7. Secrets in environment variables or a secrets manager, never in the repo.
8. Dependency scanning and updates weekly.

## Fraud and abuse
* Block disposable email domains.
* Velocity checks: many failed cards from one IP.
* Flag accounts with chargebacks.
* Detect account sharing from access logs.
* Bot protection (Cloudflare Turnstile or similar) on signup and checkout.

## Infrastructure
* Firewall: only 80 and 443 open, SSH by key only.
* Automatic security updates.
* Separate database user per service with least privilege.
* Database not publicly reachable.
* Encrypted backups, offsite copy, restore drills.
* DDoS protection through a CDN proxy where the policy allows adult sites.

## Monitoring
Uptime checks, error tracking, alerts to Telegram for downtime, webhook failures, and spikes in refunds.

## Incident plan
1. Rotate keys.
2. Revoke sessions.
3. Notify affected users if data leaked (laws require this in many places).
4. Post mortem.

## Data retention
Keep orders for tax records (check local rule, often 5 to 7 years). Delete access logs after 90 days. Remove deleted account personal data within 30 days.
