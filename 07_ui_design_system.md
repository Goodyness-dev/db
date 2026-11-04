# 07 UI Design System: World Class Black Theme

## Principles
Deep black, high contrast, one accent color, generous spacing, cinematic imagery, buttery motion.

## Color tokens
* Background base: #050505
* Surface 1 (cards): #0D0D0F
* Surface 2 (raised): #151519
* Border: #222228
* Text primary: #F5F5F7
* Text secondary: #9A9AA5
* Accent (pick one): crimson #E11D48, or electric violet #8B5CF6, or gold #D4AF37
* Success: #22C55E, Warning: #F59E0B, Danger: #EF4444
Tip: gold on black reads luxury. Crimson reads bold and adult. Choose one and use it only for buttons, prices, and highlights.

## Typography
* Headings: a sharp display font such as Clash Display, Sora, or Space Grotesk
* Body: Inter
* Prices and numbers: tabular figures
* Scale: 12, 14, 16, 20, 28, 40, 64

## Layout
* Max content width 1280px, 12 column grid
* Card grid: 4 columns desktop, 2 tablet, 1 on small phones (phones are most of your traffic, design mobile first)
* Spacing scale: 4, 8, 12, 16, 24, 32, 48, 80

## Key components
1. Age gate: full screen black, logo, two buttons (Enter, Leave), soft blur background.
2. Navbar: transparent over hero, solid blur on scroll, logo left, Catalog, Pricing, Login, a bright Subscribe button.
3. Hero: looping blurred reel, big headline, two calls to action.
4. Video card: 16 by 9 thumbnail, on hover plays teaser, price badge corner, lock icon if not owned, subtle glow on hover.
5. Price badge: pill with accent border.
6. Buy panel: sticky on the video page, shows price, buy button, "or get everything with membership" link.
7. Player: custom controls, black, accent progress bar, quality picker, moving watermark.
8. Pricing cards: membership card highlighted with accent border glow.
9. Toasts, modals, skeleton loaders (never blank screens).
10. Admin: dense data tables, dark charts, sidebar nav, command palette (press K to search anything).

## Motion
* Framer Motion for page transitions and card entrances (stagger 40ms)
* Hover scale 1.02, glow fade 200ms
* Respect reduced motion settings
* Smooth scroll reveals, no heavy parallax that hurts performance

## Details that make it feel expensive
* Film grain overlay at 3 percent
* Gradient borders that follow the cursor
* Custom cursor on desktop (optional)
* Blur glass panels over imagery
* Micro copy: "Unlocking..." with a subtle shimmer on purchase success
* Fast: skeletons, optimistic UI, prefetch links

## Accessibility
Contrast ratio at least 4.5 to 1, focus rings visible in accent color, keyboard navigable player, alt text on thumbnails.

## Mobile
Bottom sticky buy bar, thumb friendly buttons (48px), swipeable carousels, installable PWA with an icon so fans can add it to the home screen.
