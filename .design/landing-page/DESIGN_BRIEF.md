# Design Brief: Road Devil® Landing Page

> Status: captured from existing implementation + project memory on 2026-05-20.
> Purpose: codify the established direction so subsequent design-flow phases (IA, tokens, tasks, review) refine — not replace — the in-flight one-pager.

## Problem

A small group of high-conviction commercial decision-makers — OEM engineering directors, fleet-technology platform owners, and insurance/claims executives — are evaluating whether Road Devil® can become a trusted part of their stack. They arrive sceptical. They have seen many "AI safety camera" companies that turn out to be a re-badged Chinese device with a cloud dashboard bolted on. They need to verify, inside thirty to ninety seconds of scrolling, that this is something fundamentally different: a UK-engineered, IP-owned, vertically integrated platform that is real, defensible, and worth a one-hour conversation.

The human friction is **trust under suspicion**. They are not browsing. They are vetting.

## Solution

A single, unhurried one-pager that performs the company's seriousness. Every section is a piece of evidence — proof points, the three-layer stack, the four platform modules, the live console, the controlled hardware IP, the three deployment pathways, the strategic-value summary — assembled in the order a sophisticated buyer would ask for it. The whole page funnels to a single CTA: **"Request a strategic discussion."** No demo signup, no free trial, no newsletter. The page is not selling software. It is opening a door.

The experience must read as engineering-led: precise typography, monospace metadata, restrained motion that signals control (parallax, magnetic buttons, scroll-driven 3D tilt), and a defensive, trademark-saturated voice that is itself part of the moat. Polish lives in micro-interactions and information density, not in marketing flourish.

## Experience Principles

1. **Evidence over enthusiasm** — every claim is paired with structure (a code chip, a stat, a layer label, a module ID). The page reads like a controlled disclosure to a partner, not a pitch to a stranger. Resolves: marketing-warmth vs. technical-credibility — credibility wins.

2. **One door, many corridors** — multiple deployment models, three partner pathways, four commercial structures, but exactly one CTA. The page demonstrates flexibility; the conversation negotiates fit. Resolves: optionality vs. conversion clarity — clarity wins.

3. **Restraint as signal** — motion, colour, and density are dialled to "engineering review", not "agency reel". Aurora glows are soft, the red is used as a punctuation mark, the grid hairlines and monospace eyebrows do the work. Resolves: visual expression vs. seriousness — seriousness wins, but it earns its expression through craft.

## Aesthetic Direction

- **Philosophy**: *Engineering-grade editorial* — Swiss/Helvetica Now lineage crossed with control-system instrumentation. Think Linear's information density, Stripe's restraint, the IA of an aerospace data sheet, the visual register of a Defence-tech reference design. Variable-width display type (Archivo) for confidence and modulation; JetBrains Mono for codes, IDs, and metadata.
- **Tone**: Quiet authority. Trademark-saturated, slightly defensive, never apologetic. Sentences are short. Eyebrows are technical. Numbers are tabular.
- **Reference points**: Linear (information architecture, restraint), Stripe (typographic hierarchy, light surface treatment), Anduril/Palantir defence pages (instrumentation language, controlled gravitas), Vercel (Geist-era precision), Apple silicon product pages (3D stage with floating callouts).
- **Anti-references**: Generic SaaS landing pages (no soft pastel illustrations, no rounded mascot art, no "Try free for 14 days" CTAs, no testimonial carousels with stock headshots, no chatbot bubble, no "trusted by 500+ companies" logo wall as filler, no purple gradients, no glassmorphism for its own sake).

## Existing Patterns

The codebase already encodes the system. The brief documents it so subsequent phases extend rather than drift.

- **Typography**:
  - Sans: **Archivo** variable-width (`--font-sans`) — display via `.display`, `.display-xl`, `.display-it` (italic, narrower width axis, used to highlight key phrases in red).
  - Mono: **JetBrains Mono** (`--font-mono`) — for `.eyebrow`, num chips, F./P./C./L. codes, metadata, microcopy.
  - Scale: hero `clamp(2.4rem, 4.4vw, 4.2rem)`, section H2 `clamp(1.9rem, 3.6–3.8vw, 3rem)`, card H3 ~`1.25rem`, body `0.93–1.0625rem` with `1.6–1.75` line-height.
  - Letter-spacing: aggressive negative on display (`-0.025em` to `-0.038em`), wide positive on eyebrows (`0.18–0.24em uppercase`).

- **Colors** (CSS custom properties, RGB-channel format for Tailwind alpha):
  - Paper scale: `--paper` `#f6f5f1`, `--paper-2` `#ecebe5`, `--paper-3` `#e0ddd3` (warm cool-neutral, never pure white).
  - Ink scale: `--ink` `#0a0a09`, `--ink-2` `#1f1f1c`, `--ink-3` `#3a3a35`.
  - Mute: `--mute` `#6e6d65`, `--mute-2` `#a5a39a`.
  - Rule (borders): `--rule` `#d9d6cc`, `--rule-2` `#c1bdb1`.
  - Brand red: `--rd` `#DC2233`, `--rd-2` `#A8141F` (hover), `--rd-soft` `#FCE6E9` (chip backgrounds).
  - Good (status): `--good` `#1E7A45`.
  - Surface (cards/glass): `--surface` `#ffffff` over paper.
  - Full dark-mode parity exists (data-theme="dark"); `.section-dark` and `.card-dark` pin light tokens internally so child text stays readable.

- **Spacing**: Section vertical rhythm `py-24 lg:py-32` (or `py-24 lg:py-36` for accented sections). Page container `max-w-page` (`1320px`) with `px-6 lg:px-10`. Grid `gap-x-6 lg:gap-x-12`, card grid `gap-5`.

- **Shadows**: layered `--shadow-1/2/3` for elevation; `--shadow-red` for primary-CTA-hover and active-card glow.

- **Components / primitives** (in `components/`):
  - Sections: `Nav`, `Hero`, `Proof`, `Stack`, `Technology`, `Console`, `Hardware`, `Deployment`, `Strategic`, `Contact`, `Footer`.
  - Helpers: `SectionHead` (eyebrow / title / lede triple), `ui/Magnetic` (cursor-magnetised buttons), `ui/Tilt` (subtle 3D card tilt on hover), `ui/ThemeToggle`, `ui/ScrollProgress` (top-of-viewport progress bar).
  - Reusable visual conventions: `.eyebrow`, `.num-chip` / `.num-chip-red`, `.card` / `.card-hover` / `.card-dark`, `.glass` / `.glass-dark`, `.btn` / `.btn-primary` / `.btn-ghost`, `.hair`, `.bg-grid-hero` / `.bg-grid-fine`, `.aurora`.

- **Motion**: `motion/react` 11.11. Easings `[0.22, 1, 0.36, 1]` and `[0.16, 1, 0.3, 1]`. Patterns in use: scroll-driven `rotateX`/`y`, mouse-tracked `useSpring`+`useTransform` parallax, magnetic buttons, in-view fade-up, radar pings, blink dots, marquee. Reduced-motion media query disables non-essential animation.

## Component Inventory

| Component | Status | Notes |
| --- | --- | --- |
| Nav | Exists | Fixed; scroll-state background; six anchor links; theme toggle; primary CTA. |
| Hero | Exists | 3D truck stage, mouse parallax, four floating sensor callouts, two CTAs, trademark footnote. |
| Proof | Exists | Four proof-point cards with icon glyphs, num-chips, hover sweep. |
| Stack | Exists | Three stacked 3D tiles (L1/L2/L3) with synced descriptor cards; outcomes row beneath. |
| PlatformCapabilities | Restored 2026-05-21 | Four module cards (rdADAS, rdDMS, FNOR/FNOL, Integration Language) on a 2×2 grid. Lives at `#capabilities` between Stack and Console. The dashboard-image showcase that previously preceded these cards is **not** restored — that role is carried by the new Console showcase. Component renamed `Technology.tsx → PlatformCapabilities.tsx` for clarity. |
| Console | Exists | Live console showcase with feature list, stats row, multi-channel video framing. |
| Hardware | Exists | Reference device hero with four partner-mode statements; halo grows on scroll. |
| Deployment | Exists | Three pathways (staircase entrance) + four commercial models. |
| Strategic | Exists | Five-strength grid; closing strategic-value paragraph. |
| Contact | Exists | Dark section, dual aurora orbs, single form, magnetic submit. Sole conversion surface. |
| Footer | Exists | Dark; mark + trademark statement; address/contact columns. |
| ScrollProgress | Exists | Hairline top-of-viewport progress bar. |
| Magnetic / Tilt | Exists | Reusable motion primitives. |
| ThemeToggle | Exists | Light/dark switch with `data-theme` attribute and localStorage persistence. |
| SectionHead | Exists | Eyebrow + display title (with italic-red phrase) + lede. Used everywhere. |
| **`Stack` outcomes row** | Modify (review) | Outcome cards feel slightly redundant with Proof — confirm in design-review before changing copy. |
| **Mobile sensor callouts** | Modify (review) | Currently `hidden md:block`; consider a compact, anchored mobile variant rather than hiding. |
| **Brochure download** | Modify (review) | Hero's ghost CTA points to `#hardware` not an actual PDF — either wire a real asset or remove. |

## Key Interactions

1. **Nav scroll-state.** At `scrollY > 12`, the nav background fades from transparent to `bg-paper/70` with blur+saturate and a 1px rule underline. 500ms transition.
2. **Hero parallax.** Mouse position drives `rotateY ±5deg`, `rotateX ±5deg` on the truck stage, and counter-translates the aurora glow. Spring-damped (stiffness 80, damping 18). Scroll-driven `y: 0 → −80` and `opacity: 1 → 0` on the entire hero content.
3. **Sensor callouts.** Stagger in from `delay 1.4–2.15s`, each a dot + ping rings + hairline connector + glass label with code + name.
4. **Stack tile selection.** Hover/focus on a descriptor card sets `active` index; the 3D tiles re-spring into a new arrangement (active tile forward, others fan behind). Sync is two-way.
5. **Technology dashboard.** Scroll progress drives `rotateX: 18 → 0 → −10` and `y: 40 → −40` on the dashboard image; floating glass labels sit on `translateZ(40px)` for parallax depth.
6. **Magnetic buttons.** Cursor within proximity pulls the button toward the pointer (strengths 0.2–0.3). Hover lifts `translateY(-2px)` and swaps base to a brand-red gradient with `--shadow-red`.
7. **Contact submission.** Local-state `sent` flag flips the form to a confirmation panel. (Backend wiring is out of scope for this brief — see Out of Scope.)
8. **Theme toggle.** Sets `data-theme` on `<html>`, persists to localStorage, animates 280ms via `html.theme-ready` class (added after first paint to avoid load-time flash).

## Responsive Behavior

- **Breakpoints**: Tailwind defaults — `sm 640`, `md 768`, `lg 1024`, `xl 1280`.
- **Container**: `max-w-page 1320px`, side padding `px-6` mobile → `px-10` desktop.
- **Hero**: Stacks vertically below `lg`; copy first, truck stage second. Sensor callouts hidden below `md` (flag for re-design — see Component Inventory).
- **Nav**: Link rail hidden below `lg`; hamburger reveals a paper-blur drawer with staggered link entrance. Primary CTA hidden below `md` (still reachable via footer / drawer).
- **Cards**: 1-col mobile → 2-col `sm`/`md` → 3- or 4-col `lg` per section.
- **3D effects**: Tilt and mouse-parallax remain active on desktop; they degrade gracefully on touch (no `mousemove`). Scroll-driven transforms work on all sizes.
- **Section padding**: `py-24` mobile → `py-32–36` desktop. Vertical rhythm is the same on all sizes; what changes is internal grid.

## Accessibility Requirements

- **Contrast**: Body text (`--ink2` on `--paper`) ≥ 7:1; mute text (`--mute` on `--paper`) ≥ 4.5:1; brand red (`--rd`) used for ≥ 18pt text or as accent only — never body. Verify in design-review for both light and dark themes.
- **Focus**: Global `:focus-visible` uses a 2px `--rd` outline with 3px offset. Form fields use a border-bottom shift to red instead. Maintained across all interactive elements.
- **Keyboard**: All nav links, both CTAs in the hero, both buttons in nav, the theme toggle, the mobile hamburger drawer, the stack-tile descriptor cards, the contact form, and every magnetic/tilt element must be reachable and operable by Tab/Shift-Tab/Enter/Space.
- **Screen reader**: Decorative animation elements use `aria-hidden`. Eyebrow strings are content (not aria-hidden). Hero `h1` is the single page heading; section headings descend through `h2 → h3` hierarchy. Trademark `®` is read as part of the brand name, not announced separately.
- **Motion**: `@media (prefers-reduced-motion: reduce)` already disables marquee, blink, float, scan, radar pings, and shortens all transitions/animations to ~0.01ms. Verify any new motion respects this.
- **Forms**: Contact form fields have associated labels (verify in review). Submit error/success states are announced via aria-live where the form swaps.

## Out of Scope

- **Backend / form wiring.** Contact submission is local state only; no email/CRM handoff is specified or built. Spec lives elsewhere.
- **CMS / content management.** All copy is hardcoded in components. No headless CMS, no MDX, no editorial workflow.
- **Internationalisation.** UK English only; no `next-intl`, no language switcher.
- **Auth / customer portal / rdHub product UI.** The dashboard appears only as a static image inside the marketing landing page. Building the actual platform UI is a separate project.
- **Blog / news / case studies / press.** No secondary pages. This is and remains a single-pager.
- **Analytics, cookie banner, GDPR consent surface.** Tracking strategy and consent UX are out of scope here.
- **SEO beyond `<meta>` already in `layout.tsx`.** No sitemap.xml, no robots.txt strategy decisions, no schema.org markup beyond what is currently present.
- **Copywriting changes.** Per project guidance, the defensive/IP-heavy copy is intentional and load-bearing. Subsequent phases polish **around** the words — typography, spacing, hierarchy, motion — they do not rewrite them. Any proposed copy change must surface as an explicit ask, not a silent edit.
- **Brochure PDF asset.** The hero's "Download brochure" button references `#hardware`; producing or sourcing an actual PDF is out of scope unless explicitly added.
