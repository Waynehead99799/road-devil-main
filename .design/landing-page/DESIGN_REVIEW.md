# Design Review: Road Devil® Landing Page

Reviewed against: [DESIGN_BRIEF.md](./DESIGN_BRIEF.md), [INFORMATION_ARCHITECTURE.md](./INFORMATION_ARCHITECTURE.md)
Philosophy: **Engineering-grade editorial**
Date: 2026-05-20
Build state: after Phase 6 Tasks 1–6 (flagged-item resolutions complete; 16 polish-pass tasks remain)

## Screenshots Captured

| Screenshot | Breakpoint | Description |
| --- | --- | --- |
| [`screenshots/review-landing-desktop-1280.png`](./screenshots/review-landing-desktop-1280.png) | Desktop (1280×800), light | Full-page scroll, all nine sections |
| [`screenshots/review-landing-dark-mode-desktop-1280.png`](./screenshots/review-landing-dark-mode-desktop-1280.png) | Desktop (1280×800), dark | Full-page scroll, all nine sections |
| [`screenshots/review-landing-mobile-375.png`](./screenshots/review-landing-mobile-375.png) | Mobile (375×812), light | Full-page scroll, all sections stacked |

### Gaps in coverage (recommended for a follow-up capture)

- **Tablet (768×1024)** — light and dark. No tablet variants were captured, so the 6-card desktop → mobile transition cannot be verified at the in-between width.
- **Mobile dark (375×812)** — not captured. Dark mode on `.section-dark` was verified at desktop; mobile dark could still surface contrast or overflow issues.
- **Mobile drawer open** — needed to verify the new "Request a strategic discussion" CTA inside the hamburger drawer (Task 5).
- **Mobile sensor legend close-up** — the full-page mobile screenshot is compressed; the new mobile sensor legend (Task 2) is in the code at [Hero.tsx:255-279](../../components/Hero.tsx#L255-L279) but cannot be visually confirmed at the captured compression. Recommend a hero-only mobile capture.
- **Reduced-motion variant** — DevTools → Rendering → "Emulate prefers-reduced-motion: reduce" then re-capture desktop. Confirms the `useReducedMotion()` JS guards added to Hero, Technology, and Contact (Task 3) actually collapse the parallax.

## Summary

The implementation is strong. The *Engineering-grade editorial* philosophy is clearly recognisable in both themes — the warm cool-neutral paper, the variable-width Archivo display type, the italic-red phrase punctuation, the monospace eyebrows and codes, the layered shadow depth, and the disciplined use of red as accent (never as fill) all read at first glance. The page performs the "controlled disclosure to a partner" intent described in the brief. Most issues are craft refinements rather than fixes — typography consistency, a few responsive rough edges in the mobile capture, and one moderate accessibility item around the hero italic phrase wrapping.

## Must Fix

1. **Verify mobile sensor legend rendered**. Code is at [Hero.tsx:255-279](../../components/Hero.tsx#L255-L279) and the structure is correct (`md:hidden mt-7 grid grid-cols-2 gap-2.5`), but at the captured mobile screenshot's compression I can't visually confirm the four cards (`RD-1418 · Forward AI`, `Telemetry · GNSS · 4G`, `rdDMS · Driver DMS`, `On-Device · Edge Inference`) appeared between the truck and the Proof section. If the captured browser was a separate dev server instance that didn't pick up the edit, the legend may not have been live for the screenshot. _Fix: hard-refresh the browser, scroll to hero on a 375px viewport, capture a close-crop, and confirm the four cards render in a 2×2 grid below the truck image._

2. **Hero H1 line breaks may be doing display work at small viewports**. The H1 in [Hero.tsx:95-121](../../components/Hero.tsx#L95-L121) renders each segment in its own overflow-hidden `<span>` with a slide-up animation — "A vertically / integrated / *vehicle intelligence* / platform." This works beautifully at desktop where `clamp(2.4rem, 4.4vw, 4.2rem)` keeps lines tight, but on mobile the third line "vehicle intelligence" (italic, red, narrower width axis) may wrap awkwardly and the slide-up animation can mis-time when each fragment becomes two lines. See [`screenshots/review-landing-mobile-375.png`](./screenshots/review-landing-mobile-375.png) — the H1 is short enough at 375 that this likely holds, but the captured rendering looks slightly tall in the hero area. _Fix: verify at 320px (smallest realistic mobile) that no line wraps; if it does, switch the italic phrase to `whitespace-nowrap` or accept the wrap by removing `overflow-hidden` on that span only so the line-height controls the box height._

## Should Fix

1. **Tablet breakpoint is unverified**. The current build only has light/dark desktop and light mobile captures. The hero grid transitions from `col-span-12 lg:col-span-5` + `col-span-12 lg:col-span-7` at the `lg` (1024px) breakpoint — meaning at 768px the layout is the same as mobile (stacked). That's a deliberate choice (the truck stage needs width to read), but it should be confirmed visually that 768px doesn't introduce a transitional dead-zone. _Fix: capture tablet light + dark and confirm the stacked hero at 768 doesn't feel narrow inside a tablet-width container._

2. **Hero stat block ("3 / 4 / UK") visual weight**. Looking at [`screenshots/review-landing-desktop-1280.png`](./screenshots/review-landing-desktop-1280.png), the three stats (3 Stack layers / 4 Modules / UK Engineered) sit below the CTA group separated by `border-t border-rule pt-7`. At desktop they read confidently, but the numbers are styled `display-xl text-[1.7rem]` while the labels are `text-[10.5px] uppercase tracking-[0.2em]` — the contrast between number and label is correct, but on mobile they collapse into a 3-column row that may compete with the CTAs above. _Fix: confirm on a mobile capture; if cramped, consider stacking 2/3-wide on `sm` (single column for "UK Engineered", two stats side-by-side for "3" and "4") or reducing the number size on mobile to `text-[1.4rem]`._

3. **Trademark footnote density at mobile**. The hero trademark footnote ([Hero.tsx:283-296](../../components/Hero.tsx#L283-L296)) uses `flex flex-wrap items-center justify-between gap-x-6 gap-y-2`. On mobile the two strings ("Road Devil® · UK trade mark No. UK00004311142" and "Vehicle Camera Systems · Software Platforms · Licensing") stack with a 0.5rem gap. Visible in [`screenshots/review-landing-mobile-375.png`](./screenshots/review-landing-mobile-375.png) at the bottom of the hero zone — they read but the second line (mono, uppercase, wide tracking) is dense for a mobile context. _Fix: at mobile, reduce the second line's letter-spacing from `0.18em` to `0.12em` or its size from `10.5px` to `9px` to reduce horizontal pressure._

4. **Proof section card heights may differ at lg**. The four Proof cards have variable body copy length. At desktop ([`screenshots/review-landing-desktop-1280.png`](./screenshots/review-landing-desktop-1280.png)) they appear roughly equal-height because the grid is `lg:grid-cols-4`, but the third card ("Integration-Ready Data") has the shortest body, leaving more whitespace below its `<p>`. The visual rhythm is fine, but the hover-sweep gradient at [Proof.tsx:62-69](../../components/Proof.tsx#L62-L69) references `var(--x)` / `var(--y)` which are never set by any mouse handler in the component — meaning the gradient is currently anchored to the CSS-defined fallback `50% 0%` and doesn't actually track the cursor. _Fix: wire `onMouseMove` on the card to set `--x` and `--y` inline (`style={{ ['--x']: ..., ['--y']: ... } as React.CSSProperties}`), or remove the unused vars and let the gradient sit at the static `50% 0%` position as a subtle hover background sweep. This is already flagged in [TASKS.md](./TASKS.md) under the Proof polish pass — calling it out here for visibility._

5. **Section anchor jumps may be partially hidden by the fixed nav**. The nav is `fixed top-0` with `h-[68px]`. When users click `#stack`, `#hardware`, etc., the browser scrolls so the section's top edge sits at `y=0`, putting the eyebrow under the 68px-tall nav. CSS `scroll-behavior: smooth` is set on `<html>` but there's no `scroll-padding-top` to compensate. Not directly visible in screenshots but verifiable by clicking any nav link. _Fix: add `scroll-padding-top: 80px` to the `html` selector in [globals.css](../../app/globals.css), or pad each section's `<section>` element with `scroll-mt-20` (Tailwind) so its anchor target sits below the nav._

## Could Improve

1. **Italic-red phrase character-set parity**. Across the page, multiple H2s use the italic-red phrase pattern — "proprietary AI", "proprietary intelligence", "Three-layer", "commercial", "AI, regulation, insurance, and mobility", "vehicle intelligence" (hero), "strategic" (contact). They share `display-it` styling but the italic axis (`font-variation-settings: "wdth" 95`) renders subtly narrower than the surrounding roman — a fine effect, but check at the largest hero size whether the leading-edge of "v" in "vehicle" aligns with the left margin of "platform." on the next line, or whether it kerns slightly inset. If inset, a `-0.04em` margin-left on the italic span will pull it flush.

2. **Aurora glow in dark mode reads heavier than in light**. In [`screenshots/review-landing-dark-mode-desktop-1280.png`](./screenshots/review-landing-dark-mode-desktop-1280.png), the Contact section's dual red aurora orbs (`bg-rd/25` and `bg-rd/10`) are notably more saturated against the near-black `.section-dark` than the same opacities are against the warm-paper light mode. The brief calls out restrained motion + saturated red as punctuation; in dark mode this risks tipping into "marketing reel". _Suggestion: in dark mode, drop the orb opacity to `bg-rd/15` and `bg-rd/6` and increase blur from `140px` to `180px`._

3. **Footer ROAD DEVIL® word mark at extreme scale**. The footer ends with a very large "ROAD DEVIL" word mark (visible at the bottom of both desktop screenshots). It functions as an editorial sign-off, which is consistent with the philosophy, but the trademark `®` symbol at this scale becomes a typographic detail rather than legal punctuation — confirm it reads as intended (not as a stylistic flourish at the expense of register).

4. **Console section "Production console" label** (visible in [`screenshots/review-landing-desktop-1280.png`](./screenshots/review-landing-desktop-1280.png)). The label and the section's heading do double duty — the eyebrow is `— Live console` (lowercase per the IA naming glossary) while the section's title repeats some of the language. Audit for any unintentional repetition: per the IA, the canonical labels are "rdHub" and "Live Console" — make sure no surface drifts to "production console" or "operations dashboard".

5. **Stack section L2 tile dark gradient against light section background**. In light mode ([`screenshots/review-landing-desktop-1280.png`](./screenshots/review-landing-desktop-1280.png)), the Stack section sits on `.bg-section-alt` (warm paper-2 with a faint red radial). The middle L2 tile uses a dark gradient (`linear-gradient(135deg, #1f1f1c, #0a0a09)`), which creates an inversion island in the middle of an otherwise light section. Intentional and consistent with the brief's "data layer = inverted" semantic, but verify the surrounding L1 (white) and L3 (red) tiles don't feel like three different visual languages.

## What Works Well

- **The philosophy is recognisable.** A first-time visitor reading the page top-to-bottom in either theme registers the *Engineering-grade editorial* intent without prompting. The variable-width Archivo display, the JetBrains Mono eyebrows and codes, the italic-red phrase punctuation, and the warm cool-neutral paper all land. This is the hardest thing to get right and the implementation has it.
- **Stack section is the standout.** The synchronised hover-driven 3D tile rearrangement plus the descriptor card column is a high-craft moment that demonstrates exactly the "structural moat" framing from the brief. It would survive a Linear / Vercel review.
- **Dark mode is intentional, not inverted.** The `.section-dark` and `.card-dark` token pinning is mature engineering — child Tailwind text utilities don't invert because the variables are reassigned scope-locally. Dark Contact and Footer read as a deliberate canvas, not a default-flipped one.
- **Red discipline.** Across nine sections, red is never used as a fill — only as accent dots, code-chip backgrounds, italic phrase colour, button hover, hairline glows, and the active-state border. This is the single most important craft signal in the whole page and it holds.
- **Trademark saturation.** Per the project's memory and the brief, the defensive trademark-saturated voice is preserved verbatim. The Road Devil® mark, the UK00004311142 trade-mark number, the rdADAS / rdDMS / FNOR / FNOL identifiers — all present, all consistent.
- **Reduced-motion JS guards are correctly wired** ([Hero.tsx](../../components/Hero.tsx), [Technology.tsx](../../components/Technology.tsx), [Contact.tsx](../../components/Contact.tsx)). Code review confirms the `useReducedMotion()` hook returns a boolean that's used to swap output ranges to `[0, 0]` and to early-return from mouse handlers. This closes the gap between the existing CSS `prefers-reduced-motion` rule (which disabled decorative animation) and the JS-driven parallax (which wasn't previously guarded). Visual verification still pending a reduced-motion screenshot.
- **Vertical rhythm holds across nine sections**. Section padding (`py-24 lg:py-32` or `py-24 lg:py-36` for accented sections) and the `SectionHead` triple (eyebrow + display title + lede) create a metronome the reader can settle into. The page feels like one document.
- **Information density vs. whitespace ratio.** The page is content-rich without feeling cramped — every section has room to breathe, and the eyebrow + lede pattern means a sceptical buyer can skim the first three lines of each section and decide whether to read on. This matches the IA's golden-path flow exactly.

---

## Recommended next steps

1. Capture the four gap screenshots (tablet light/dark, mobile dark, mobile-drawer-open, mobile-hero-closeup, reduced-motion) so the visual checklist is fully covered.
2. Address the two **Must Fix** items (mobile legend verification, mobile H1 wrap check).
3. Begin the 11 per-section polish passes in [TASKS.md](./TASKS.md) — Hero polish first (it's the first impression and addresses Should-Fix items 2 and 3 here), then sequential scroll-order through Footer and Nav.
4. After per-section polish, re-run `/design-review` for a final pass before ship.
