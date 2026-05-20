# Information Architecture: Road Devil® Landing Page

> Reads: [.design/landing-page/DESIGN_BRIEF.md](./DESIGN_BRIEF.md)
> Captured: 2026-05-20

This is a single-page site. "Information architecture" here means **scroll architecture** — the order, anchor model, and content priority of the sections that compose the one-pager — plus the navigation, naming, and (small) URL surface that wrap it.

## Site Map

Only one URL serves content. The "depth" is sectional, not routed.

- `/` — Road Devil® landing (one-pager)
  - `#hero` — implicit; top of page (no nav link)
  - `#stack` — Three-layer architecture
  - `#console` — Live console showcase (rdHub)
  - `#hardware` — Hardware IP & controlled device architecture
  - `#deployment` — Pathways & commercial models
  - `#contact` — Strategic-discussion form (sole conversion surface)
- `/favicon.png` — icon asset only

> **Change log:** The `#technology` section ("Core value resides in proprietary intelligence and stack architecture") was removed on 2026-05-20. Its narrative function — showing the rdHub dashboard surface — is now carried by `#console`, which already presents the dashboard, multi-channel video review, and live-tracking surfaces with richer composition. The `Technology.tsx` component remains in the codebase but is no longer rendered.
- (out of scope, see brief) — no `/about`, `/blog`, `/news`, `/press`, `/careers`, `/legal`, `/privacy`, `/login`. If they ever appear, they live as separate routes off `/`, never as siblings of the landing.

Sections that exist on the page but are **not** anchored in the nav:

- `#proof` — Four proof points (sits between Hero and Stack; supports the Stack section, not a destination)
- `#strategic` — Strategic value summary (sits between Deployment and Contact; reframes the case before the CTA)
- Footer (bottom; not anchored)

The deliberate omission of Proof and Strategic from the nav rail is a content-priority decision (see Content Hierarchy). They are scaffolding, not destinations.

## Navigation Model

- **Primary navigation**: Fixed top nav, scroll-state aware. Five anchor links, in scroll order:
  1. Stack
  2. Console
  3. Hardware
  4. Deployment
  5. Contact

  Maximum items: 6. Anything beyond this dilutes the page's "controlled disclosure" rhythm. Technology was removed on 2026-05-20 (see Change log).

- **Secondary navigation**: None. The page does not subdivide its sections. Within the Stack section, hover/focus on a descriptor card swaps the active 3D tile — this is interaction, not navigation.

- **Utility navigation**:
  - Brand mark (top-left) — links to `#` (page top).
  - **Theme toggle** — light/dark switch persisted to `localStorage`. Treated as utility, not branding.
  - **Primary CTA** ("Request discussion") — pinned in the nav from any scroll position on `md+`. The same destination as `#contact`; reachable from every viewport state.

- **Mobile navigation**: Hamburger button below `lg`. Tapping reveals a `bg-paper/95` blur drawer with the six links stacked, right-aligned `→` arrow on hover/focus. Theme toggle stays in the nav bar (not in the drawer). Primary CTA is hidden in the nav below `md` but remains reachable inside the drawer (currently it isn't — flagged in Open Questions).

- **Scroll feedback**: A hairline `ScrollProgress` bar pinned to the top of the viewport shows page-read progress. It is not interactive — it is a wayfinding signal that the scroll has an end.

## Content Hierarchy

The page is one canvas. Order is meaning. Sections were sequenced to walk a sceptical buyer through the case in the order they would raise objections.

### `/` (the only page)

1. **Hero** — *Establish the claim, name the trademark, anchor the primary CTA above the fold.* The 3D truck + sensor callouts demonstrate that the product is real and instrumented; the trademark footnote pre-empts the "is this just a brand?" objection. Both CTAs visible without scroll.
2. **Proof** — *Four flat statements of difference (full-stack IP, edge AI, integration-ready data, commercial risk alignment).* This is the page's "thirty-second pitch" for the impatient reader. Without proof first, the Stack section reads as decoration.
3. **Stack** — *The three-layer architecture, made tangible through synchronised 3D tiles and descriptor cards.* This is the structural moat. Outcomes row beneath converts architecture into business-language wins.
4. **Console** — *Multi-screen rdHub composition: main overview, multi-channel video review, live tracking. Plus feature pill row and stats strip.* This is "what your operations team actually sees" — the dashboard surface a buyer can imagine using. (Absorbed the dashboard-showcase role from the now-removed Technology section.)
5. **Hardware** — *Reference device + four partner deployment modes (license, manufacture, blueprint, deploy on OEM devices).* Translates IP ownership into commercial flexibility. Comes after the software story so hardware reads as substrate, not the centre of gravity.
6. **Deployment** — *Three partner pathways (Telematics & Fleet, OEM, Insurance) and four commercial models (Licence, SaaS, API, White-label).* "Here is exactly how we can engage" — the structural answer to a buyer's silent "but how would this even work for us?".
7. **Strategic** — *Five strategic strengths + a closing paragraph on platform readiness.* The "why this, why now" summary before the ask. The last persuasion surface.
8. **Contact** — *Single dark section, one form, one CTA: book a strategic discussion.* The exit. All gravity in the page tilts toward this.
9. **Footer** — *Mark, trademark statement, contact columns.* Closes the document. Not a discovery surface.

Below-the-fold content gets visual continuity (consistent section padding, eyebrow + display title + lede rhythm) so scroll feels like one document, not nine.

## User Flows

### Flow A — Sceptical-buyer first visit (the golden path)

1. Lands on `/`, sees Hero with name, claim, and primary CTA above the fold.
2. Reads trademark footnote → registers "this is a UK-registered IP-led company".
3. Scrolls; encounters Proof — four-card "why this is different" pitch.
4. Continues into Stack → Technology → Console, building a mental model of the product surface.
5. Hits Hardware and Deployment → confirms there is a real commercial path for *their* role (OEM / fleet platform / insurer).
6. Reads Strategic → has the case framed in business terms.
7. Reaches Contact → fills the form → state flips to confirmation.
8. **Outcome**: form submitted; expectation is a follow-up email to schedule a strategic discussion (backend wiring out of scope per brief).
9. *(Decision point)* If they re-engage the nav CTA mid-scroll, they jump directly to Contact without losing position on return.

### Flow B — Mid-funnel returning visitor

1. Lands on `/` from a saved link or email.
2. Uses Nav anchor (most commonly **Stack** or **Hardware**) to skip directly to the relevant section.
3. Scrolls outward to read adjacent context.
4. Engages CTA from the nav (visible at all scroll positions on `md+`).
5. **Outcome**: form submitted with fewer scroll touches.

### Flow C — Mobile evaluator

1. Lands on `/`; sees mobile-collapsed Hero (truck stage stacks below copy).
2. Sensor callouts are hidden (`hidden md:block`) → flagged in brief for redesign.
3. Opens hamburger drawer; picks a section.
4. Reads through Deployment / Strategic to assess fit.
5. Reaches Contact section directly via drawer.
6. **Outcome**: form submitted on mobile, or page bookmarked for desktop follow-up.

### Flow D — Theme-preferring visitor

1. Lands on `/`; theme-init script reads `localStorage.getItem('theme')` or `prefers-color-scheme`.
2. Sets `data-theme` on `<html>` before first paint (no flash).
3. After first paint, `html.theme-ready` class enables 280ms transitions.
4. User toggles via the nav theme button → preference persists.
5. **Outcome**: dark/light parity is invisible work; the visitor never notices a flash or wrong-mode flash-of-content.

### Flow E — Reduced-motion / accessibility visitor

1. Lands on `/`; system pref `prefers-reduced-motion: reduce` is detected.
2. Marquee, blink, float, scan, radar pings disabled; transitions clamped to `0.01ms`.
3. Scroll-driven 3D tilt and mouse-parallax remain (they are content-correlated, not decoration) — verify in design-review whether these should also collapse.
4. Focus ring (2px `--rd`) is visible on every interactive element via keyboard.
5. **Outcome**: page is operable end-to-end via keyboard with no animation-induced disruption.

## Naming Conventions

Consistency of vocabulary is part of the brand voice. The same concept gets the same word every time.

| Concept | Label in UI | Notes |
| --- | --- | --- |
| The company / product | **Road Devil®** | Always with the registered-trademark symbol on first mention per section. Bold weight on display, regular elsewhere. Never "RD" in body copy, never "Road-Devil" hyphenated. |
| The platform | **vehicle intelligence platform** | Not "fleet management", not "AI camera", not "ADAS solution". The italic-red phrase "vehicle intelligence" appears in the Hero H1. |
| The three architectural layers | **Stack** | Capitalised when used as the section noun. Layers are **L1 Hardware Layer**, **L2 Data Layer**, **L3 Edge Processing Layer**. |
| Software product modules | **rdADAS**, **rdDMS**, **FNOR**, **FNOL**, **Integration Language** | The `rd` prefix is intentional and lowercase. FNOR/FNOL stay uppercase. |
| Live operator dashboard | **rdHub** / **Live Console** | "rdHub" is the product mark; "Live Console" is the user-facing label inside the Console section. Both are correct; "dashboard" alone is too generic. |
| Hardware reference design | **reference device** | Not "the device", not "our hardware". |
| Partner modes | **deploy / manufacture under licence / blueprint / deploy on OEM devices** | These four are the only sanctioned ways to describe the partner relationship. |
| Three partner pathways | **Telematics & Fleet Platforms**, **OEM Collaboration**, **Insurance & Risk Platforms** | Capitalisation preserved. |
| Four commercial models | **IP licensing**, **Per-vehicle SaaS**, **Data / API access**, **White-label stack** | Sentence case. |
| The CTA | **"Request a strategic discussion"** (full) / **"Request discussion"** (nav, space-constrained) | Never "Contact us", never "Get started", never "Book a demo". |
| Identifiers / codes | `F.01`, `L1`, `P.01`, `C.01`, `RD-1418` | Monospace, all caps, dotted or hyphenated. They are signals of seriousness; treat them as content. |
| Eyebrows | `— Section Name` em-dash prefix, mono, uppercase, wide tracking | Always lead a section with one. The em-dash is not a hyphen. |

## Component Reuse Map

| Component | Used on | Behavior differences |
| --- | --- | --- |
| `Nav` (root layout) | All sections (fixed) | Scroll-state background; hamburger below `lg`. |
| `Footer` | Page bottom | Always dark (`.section-dark`), regardless of theme. |
| `ScrollProgress` | Top of viewport, always | No variants. |
| `SectionHead` (eyebrow + title + lede) | Stack, Technology, Console, Hardware, Deployment, Strategic | Same composition; the italic-red phrase placement varies inside each title. |
| `Magnetic` | Hero CTAs, Nav CTA, Hardware CTA, Contact submit | Strength varies `0.2–0.3`. |
| `Tilt` | Proof cards, Stack descriptor cards, Stack outcome cards, Technology module cards, Deployment pathway/commercial cards, Strategic strength cards | Max angle varies `4–6deg`. |
| `card` / `card-hover` | All card grids | `card-dark` variant used in Stack L2 tile and Console multi-channel framing. |
| `glass` / `glass-dark` | Sensor callouts (Hero), floating labels (Technology), aurora overlays | `glass-dark` only inside `.section-dark`. |
| `num-chip` / `num-chip-red` | Proof, Stack, Technology, Console, Deployment, Strategic, Hardware | Red variant signals "active" or "primary". |
| `bg-grid-hero` / `bg-grid-fine` / `bg-grid-perspective` | Hero, Contact, hardware reference plane | Different grid sizes; perspective variant only in 3D contexts. |
| `section-dark` | Contact, Footer | Pins paper tokens to light values so child Tailwind text utilities don't invert. |
| `ThemeToggle` | Nav only | Single instance per page. |

## Content Growth Plan

The page is intentionally **fixed-content**. There is no CMS, no MDX, no archive pattern.

Areas that could grow without breaking the IA:

- **Proof points**: currently 4. Could expand to 6 in a 3×2 grid on `lg`, but anything beyond 6 starts to look like a feature comparison chart — anti-pattern per the brief.
- **Stack layers**: fixed at 3. The visual treatment (stacked 3D tiles) does not extend gracefully to a 4th layer. If a fourth layer is ever introduced architecturally, this section needs redesign.
- **Modules**: currently 4 (rdADAS, rdDMS, FNOR/FNOL, Integration Language). A 2×3 grid would absorb a 5th or 6th, but the page narrative is "four modules running on a unified console" — adding modules requires rewriting that narrative.
- **Pathways**: 3 (capped — staircase 3D entrance pattern depends on it).
- **Commercial models**: 4 (capped at 4 — paired with the "three pathways, four commercial models" copy in the section title).
- **Strategic strengths**: currently 5. The 3-up `lg` grid absorbs up to 6 without breaking; beyond 6 the section gets long.

Areas explicitly **not** designed to grow:

- Hero (fixed; one truck, one headline, one set of stats).
- Nav (fixed 6 links — see Naming).
- Footer (fixed columns; address may update but structure is stable).

The right answer for new content is almost always: condense into existing buckets, or build a separate route. Do not append.

## URL Strategy

- **Single route**: `/`. No subpaths, no dynamic segments, no query parameters.
- **Anchor pattern**: `#<section-name>` in kebab-case, lowercase, single-word where possible (`#hero`, `#stack`, `#technology`, `#console`, `#hardware`, `#deployment`, `#contact`). Multi-word would be `#section-name` but none exist today.
- **Anchor scrolling**: `html { scroll-behavior: smooth }` in `globals.css`. Reduced-motion CSS clamps this to `auto`.
- **No query params**: form state is local; nothing is shared via URL today. If a future "share this section" affordance is added, append the anchor (`/#stack`) — never invent `?section=` or `?utm=` schemas here.
- **No trailing slash variant**: the root is `/`.
- **`metadataBase`**: `https://road-devil.com` (set in `app/layout.tsx`). Open Graph reads this when constructing absolute URLs.

## Open Questions (for design-review or follow-up)

1. **Mobile sensor callouts** — currently `hidden md:block`. Decision needed: keep hidden, redesign as compact list, or anchor to the truck silhouette differently. (Flagged in brief.)
2. **Brochure CTA destination** — Hero ghost button points to `#hardware`. Either wire a real PDF asset or remove the CTA. (Flagged in brief.)
3. **Mobile drawer CTA** — primary CTA is hidden below `md` in the nav and is not currently inside the mobile drawer. Consider adding the "Request a strategic discussion" pill to the bottom of the drawer.
4. **Stack outcomes row** — the four-outcome row inside the Stack section overlaps thematically with the four Proof points above it. Confirm intent in design-review.
5. **Scroll-driven 3D tilt under reduced motion** — verify whether the Technology section's scroll-tilted dashboard should be flattened to a static image when `prefers-reduced-motion: reduce`.
