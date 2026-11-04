# 05 Content Delivery and Protection

## Goals
Fast playback worldwide, and make it hard to leak paid content.

## Pipeline
1. Admin uploads original (direct to storage with a presigned upload, not through your server).
2. Worker sends it to the video host for encoding into adaptive streams (HLS) at multiple qualities.
3. Worker generates: thumbnail, 5 to 10 second teaser loop (blurred or censored version for public pages), sprite sheet for scrubbing.
4. Video is marked ready, admin sets price and publishes.

## Hosting choices
Pick a video host or storage whose policy allows adult content. Examples people commonly use: Bunny Stream and Bunny Storage, or self hosting on a VPS with object storage and a CDN. Verify the acceptable use policy in writing. Avoid putting adult files on general platforms that may delete your account.

## Protection layers
1. Signed URLs: expire in hours, tied to a token.
2. Token authentication on the CDN path (hotlink protection).
3. Domain locking: the player only works on your domain.
4. Short lived session binding: token includes a hash of user session.
5. No direct download button. Streams are segmented, which blocks casual saving.
6. Dynamic watermark: overlay the viewer's email or user id at low opacity moving around the frame. This is the strongest deterrent because leaks become traceable.
7. Concurrent stream limit: max 2 devices per account.
8. Rate limiting on token issuing.
9. Access logs reviewed for abnormal sharing (one account from many countries).
10. Forensic watermarking (invisible, per user) as a later upgrade.

Be honest with the creator: no system fully stops screen recording. Watermarks and takedowns are the real defense.

## Public previews
Never expose full files on public pages. Serve only teaser loops and thumbnails, ideally censored or blurred. This also helps with app store, ad, and social platform rules when sharing links.

## Anti piracy workflow
1. Monitor: search for the creator's name and video titles on leak sites weekly (or use a takedown service).
2. Send DMCA notices using a template.
3. If a leak shows a watermark, identify and ban that account.
4. Keep a log in admin.

## Image sets
Resize and compress, apply a subtle watermark, serve through signed URLs, disable right click and drag on the page (minor deterrent only).

## Performance
* Lazy load thumbnails, preload the first segment.
* Use AVIF or WebP for images.
* Edge cache public pages.
* Target: page loads under 2 seconds, video starts under 1.5 seconds.
