# Token Location & Audit

> Phase 4 of design-flow. Captured 2026-05-20.
> Decision: **do not generate new tokens**. The system is mature and aligns with the brief's *Engineering-grade editorial* philosophy.

## Where tokens live

| Token family | File | Notes |
| --- | --- | --- |
| Color (light + dark + system fallback) | [app/globals.css](../../app/globals.css#L5-L155) | `:root`, `[data-theme="dark"]`, and `@media (prefers-color-scheme: dark)` blocks. Channel-format (`--paper-rgb: 246 245 241`) for Tailwind alpha support. |
| Tailwind color bindings | [tailwind.config.ts](../../tailwind.config.ts#L8-L23) | `paper`, `paper2`, `paper3`, `ink`, `ink2`, `mute`, `mute2`, `rule`, `rule2`, `rd`, `rd2`, `rdsoft`, `good`, `surface` — all wired to the channel tokens. |
| Typography | [app/layout.tsx](../../app/layout.tsx#L5-L17) (fonts), [app/globals.css](../../app/globals.css#L182-L210) (`.display`, `.display-xl`, `.display-it`, `.eyebrow`) | Archivo variable-width sans + JetBrains Mono, both loaded via `next/font/google`. |
| Layout (max-widths, letter-spacing, shadows, animations) | [tailwind.config.ts](../../tailwind.config.ts#L28-L46) | `max-w-page` (1320px), `max-w-prose` (62ch), `tracking-tightest` (-0.04em), `shadow-soft1/2/3/red`, `animate-slow`. |
| Shadows (raw) | [app/globals.css](../../app/globals.css#L48-L62) (light) + [app/globals.css](../../app/globals.css#L99-L114) (dark) | Layered `--shadow-1/2/3` + `--shadow-red`. |
| Motion easings | [app/globals.css](../../app/globals.css#L44-L45) | `--ease` (0.22, 1, 0.36, 1), `--ease-soft` (0.16, 1, 0.3, 1). |
| Component primitives | [app/globals.css](../../app/globals.css#L211-L351) | `.btn` / `.btn-primary` / `.btn-ghost`, `.card` / `.card-hover` / `.card-dark`, `.glass` / `.glass-dark`, `.num-chip` / `.num-chip-red`, `.hair`, `.tnum`. |
| Background utilities | [app/globals.css](../../app/globals.css#L364-L391) | `.bg-grid-hero`, `.bg-grid-fine`, `.bg-grid-perspective`, `.aurora`, `.bg-section-alt`. |
| Section-level token pinning | [app/globals.css](../../app/globals.css#L277-L311) | `.section-dark` and `.card-dark` pin paper tokens to light values so child Tailwind text utilities don't invert. |
| Reduced-motion | [app/globals.css](../../app/globals.css#L457-L461) | Disables decorative animation; clamps transition/animation duration to 0.01ms. |

## Philosophy alignment

The system already encodes *Engineering-grade editorial*:

- **Warm cool-neutral paper** (#f6f5f1) instead of pure white — editorial gravitas.
- **Near-black ink** (#0a0a09) with three text-tier mutes — controlled hierarchy.
- **Single brand accent** (#DC2233 red) used as punctuation, never as fill.
- **Two type families** (variable-width sans + monospace) — engineering register.
- **Layered shadows** — depth without skeuomorphism.
- **Custom easings** that bias toward decelerating settles — restraint over spring.

No deviations to record. The brief documents this system; Phase 6 builds on it directly.

## Non-blocking gaps (deferred)

These are noted for completeness, not flagged for action this flow:

1. **Status colour set is incomplete.** `--good` (success) exists; no `--warn` or `--err`. The landing page doesn't surface validation states or warning/info UI today, so this is not blocking. If a future surface (real Contact form validation, error banners) needs them, derive:
   - `--warn`: ochre/amber that reads as caution without competing with `--rd`.
   - `--err`: a near-`--rd` for inline form errors, but distinct enough from the brand red to avoid confusing accents with errors.

2. **Motion durations are inline, not tokenised.** Components use 200ms / 280ms / 320ms / 500ms / 700ms scattered through `globals.css` and component files. Easings are tokenised (`--ease`, `--ease-soft`); durations are not. Not blocking for the current build, but if motion is significantly reworked in Phase 6, consider a `--dur-1`..`--dur-5` ramp aligned to the existing inline values (150ms / 280ms / 320ms / 500ms / 700ms feels right).

3. **No custom spacing scale.** The project relies on Tailwind defaults via utility classes (`py-24`, `gap-x-6`, `px-10`). This is convention, not gap — flagged only so a future maintainer doesn't search for one.

Subsequent phases (tasks, build, review) should reference tokens by their existing names. If a component needs a value that doesn't have a token, **add a token first**, then use it.
