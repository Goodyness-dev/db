# 04 Payments and Subscriptions

## Processor reality check
Mainstream processors like Stripe and PayPal generally prohibit adult content. You need an adult friendly processor. Common categories: high risk card processors built for adult merchants, and crypto payment gateways. You said you already know a tool. Before building, confirm with that provider:
1. Is a one creator storefront with pay per view and subscriptions allowed?
2. Do they support recurring billing and webhooks?
3. What is the reserve or rolling hold, fee, and payout schedule?
4. What is the billing descriptor shown on statements (should be discreet)?
5. What are their chargeback thresholds and what happens if exceeded?
6. Do they require KYC on the creator and records for performers?

## Integration pattern
Use a hosted checkout page from the processor so you never touch card numbers. This keeps you out of heavy PCI scope.

Adapter interface (conceptual):
* createOneTimeCheckout(orderId, amount, email, returnUrl)
* createSubscriptionCheckout(userId, planId, email, returnUrl)
* verifyWebhook(headers, rawBody)
* cancelSubscription(processorSubscriptionId)
* refund(paymentId, amount)

## Webhook handling rules
1. Read the RAW body and verify the signature before parsing.
2. Insert the event id into webhook_events. If it exists, return 200 and stop (idempotency).
3. Process inside a database transaction.
4. Return 200 quickly, push slow work (emails) to the queue.
5. Log failures and alert yourself. Retry from the stored payload.

## Events to handle
* payment succeeded: mark order paid, create entitlements, email receipt
* payment failed: mark order failed
* subscription created: create subscription row, set period dates
* subscription renewed: extend current_period_end
* subscription payment failed: status past_due, start grace
* subscription canceled: set cancel_at_period_end or canceled
* refund issued: revoke entitlement if policy says so
* chargeback opened: flag user, revoke access, add to review list

## Subscription lifecycle
1. active: full access.
2. cancel_at_period_end true: still active until the end date, no renewal.
3. past_due: failed charge, 3 day grace, daily reminder emails.
4. expired: access removed, offer a win back discount after 7 days.
Daily worker job: find subscriptions where current_period_end is in the past and status is not active, expire them. Also send reminders 3 days before renewal.

## Pricing ideas
* Single video: set per item
* Monthly membership: one tier to start, add a premium tier later
* First month discount via promo code
* Bundles: three videos for the price of two
* Tips: custom amount at checkout

## Chargeback defense (very important in this niche)
1. Neutral descriptor, but add a support email on the receipt.
2. Clear terms at checkout with a checkbox: digital content, no refunds after viewing.
3. Store evidence: IP hash, access logs, timestamps of viewing, email confirmations.
4. Fast human support so customers email you instead of calling the bank.
5. Block repeat chargeback emails and cards.
6. Optional 3D Secure if the processor supports it.

## Crypto option
Offer a second checkout button for crypto (USDT, BTC). Benefits: no chargebacks, global reach. Use a gateway or self hosted BTCPay Server. Confirm payment by webhook after enough confirmations, then unlock.

## Taxes and payouts
The creator is responsible for income tax. Export monthly sales CSV from admin (06). Consider VAT or sales tax rules for digital goods in the regions you sell to and get an accountant.

## Test plan
Use processor sandbox. Test: success, decline, duplicate webhook, delayed webhook, refund, renewal, failed renewal, cancel.
