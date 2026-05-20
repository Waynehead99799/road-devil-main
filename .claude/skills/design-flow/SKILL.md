---
name: design-flow
description: Run the full design-to-build workflow as a guided sequence. Orchestrates all designer skills in order, from grilling through review. Use when user wants to go through the complete design process, start a project from scratch, run the full flow, or mentions "design flow" or "full workflow".
---

You are the conductor of the designer workflow. You run each phase in sequence, verify its output, and hand off cleanly to the next. You do not write the brief, design the tokens, or build the code yourself — the sub-skills do that. Your job is to keep the designer oriented, the artifacts coordinated, and the cadence right.

## Example prompts

- "Run the full design flow"
- "Walk me through the complete process for a new project"
- "Start from scratch and take me through everything"
- "Design flow for a dashboard app"
- "Resume the design flow"

## The Sequence

```
┌── Discovery ──────┐   ┌── Definition ────────────────────┐   ┌── Construction ─────┐
│  1. Grill Me      │ → │  2. Design Brief                 │ → │  5. Brief to Tasks  │
│     (clarify)     │   │  3. Information Architecture     │   │  6. Frontend Design │
│                   │   │  4. Design Tokens                │   │     (build loop)    │
└───────────────────┘   └──────────────────────────────────┘   └─────────────────────┘
                                                                          │
                                                              ────────────┴────────────
                                                              7. Design Review (on request)
```

## Step 0 — Open the Flow

Before announcing any phase, do these three things in order:

1. **Determine the active feature slug.** Every subsequent phase needs it.
   - If the designer named the feature in their prompt ("design flow for a dashboard app"), derive a short kebab-case slug (`dashboard-app`, `project-dashboard`).
   - If `.design/` already has feature folders, list them and ask which to resume — or whether this is a new feature.
   - If unclear, ask once: "What's a short name for this feature? (e.g., `onboarding-flow`, `settings-page`.)"
   - Once chosen, treat it as the **active slug** for the rest of the flow. Every artifact lands under `.design/<active-slug>/`. Tell the designer that path so they know where things will live.

2. **Show the route.** Display the sequence (phases 1–6, with review available separately) and ask if the designer wants to skip phases or run in **batch mode** (no per-phase confirmation; stop only at the end of phase 6).

   Common skip patterns:
   - Already have a clear idea → skip grill-me
   - Single component, not a full page → skip information-architecture
   - Existing project with mature tokens → skip design-tokens
   - Just want to see something built → minimal brief, skip IA, run phases 5–6

3. **Inventory existing artifacts.** Scan `.design/<active-slug>/` for `DESIGN_BRIEF.md`, `INFORMATION_ARCHITECTURE.md`, tokens, `TASKS.md`, `DESIGN_REVIEW.md`. If anything is present, list what's there and ask whether to **resume** (skip phases whose artifacts already exist) or **restart** (overwrite). Default to resume.

## Per-Phase Loop

For every phase you enter:

1. **Announce.** State the phase number, name, input (which earlier artifact it reads), and output (the file it will write). Example:
   > Phase 3 — Information Architecture. Reads `.design/dashboard-app/DESIGN_BRIEF.md`. Writes `.design/dashboard-app/INFORMATION_ARCHITECTURE.md`. Continue?

2. **Invoke the sub-skill.** Read its `SKILL.md` and follow it in full. Do not paraphrase or abbreviate. The sub-skill is authoritative on how its phase runs.

3. **Pass the active slug down.** When a sub-skill asks "which feature?", you already know — answer with the active slug. The designer should not be re-asked.

4. **Verify the artifact.** After the sub-skill reports done, confirm the expected file actually exists at the expected path before announcing the next phase. If it does not, stay in the phase and close the gap.

5. **Hand off.** Summarize in 1–3 lines: what was produced, the key decision, any open question. State the next phase and ask "Ready to move on?" — unless batch mode, in which case proceed automatically.

6. **Forward context.** If this phase's output changes the next phase, mention it. Example: "The brief names *Japanese Minimalism*, so phase 4 will generate tokens with extreme whitespace and a near-monochrome palette."

## Phase Details

### Phase 1 — Grill Me
- **Sub-skill:** [grill-me/SKILL.md](../grill-me/SKILL.md)
- **Reads:** nothing (this is discovery).
- **Produces:** shared understanding in the conversation. No file.
- **Exit criterion:** every major branch of the decision tree has a resolved answer.
- **Skip if:** the designer can already describe the project clearly and confidently.
- **Transition:** "We've resolved the key decisions. Ready to capture this as a design brief?"

### Phase 2 — Design Brief
- **Sub-skill:** [design-brief/SKILL.md](../design-brief/SKILL.md)
- **Reads:** the conversation from phase 1 (if run), existing codebase.
- **Produces:** `.design/<active-slug>/DESIGN_BRIEF.md`.
- **Exit criterion:** file exists and includes a named philosophy or clearly described vibe.
- **Transition:** "Brief saved at `.design/<active-slug>/DESIGN_BRIEF.md`. Next: information architecture. Skip if you're building a single component. Continue?"

### Phase 3 — Information Architecture
- **Sub-skill:** [information-architecture/SKILL.md](../information-architecture/SKILL.md)
- **Reads:** `.design/<active-slug>/DESIGN_BRIEF.md`.
- **Produces:** `.design/<active-slug>/INFORMATION_ARCHITECTURE.md`.
- **Exit criterion:** file exists with a site map and at least one named user flow.
- **Skip if:** scope is a single component, or the project already has a mature IA.
- **Transition:** "IA defined. Next: design tokens, derived from the brief's philosophy. Continue?"

### Phase 4 — Design Tokens
- **Sub-skill:** [design-tokens/SKILL.md](../design-tokens/SKILL.md)
- **Reads:** `.design/<active-slug>/DESIGN_BRIEF.md` (especially the Aesthetic Direction section), existing token files in the codebase.
- **Produces:** token file in the project's preferred format (CSS variables, Tailwind config, theme file). Tokens often live at the repo's normal location (`tailwind.config.ts`, `src/styles/tokens.css`) rather than under `.design/<active-slug>/`. **Record the actual write path** in a one-line note inside the brief or a `TOKENS_LOCATION.md` stub so later phases find them.
- **Exit criterion:** tokens written for both light and dark mode.
- **Skip if:** project already has complete token coverage. Run a quick gap scan instead and confirm.
- **Transition:** "Tokens written to `<recorded path>`. Next: break the brief into a task list. Continue?"

### Phase 5 — Brief to Tasks
- **Sub-skill:** [brief-to-tasks/SKILL.md](../brief-to-tasks/SKILL.md)
- **Reads:** brief, IA (if present), tokens.
- **Produces:** `.design/<active-slug>/TASKS.md`.
- **Exit criterion:** file exists, every task is a vertical slice, tasks are ordered by dependency / visual priority / risk.
- **Transition:** "Task list ready at `.design/<active-slug>/TASKS.md`. Phase 6 will work through it. Continue?"

### Phase 6 — Frontend Design (Build Loop)
- **Sub-skill:** [frontend-design/SKILL.md](../frontend-design/SKILL.md)
- **Reads:** `TASKS.md`, brief, tokens.
- **Produces:** built components and pages in the project's source tree.
- **Process:**
  1. Read `TASKS.md`. Work tasks top to bottom.
  2. For each task: state its name, build it using the frontend-design skill, then **check it off in `TASKS.md`** (turn `- [ ]` into `- [x]`).
  3. After each task, give a one-line summary and ask "Next task or stop here?" — unless in batch mode.
  4. Continue until `TASKS.md` is fully checked off or the designer stops.
- **Exit criterion:** every task is either checked off (`[x]`) or explicitly deferred with `[~]` plus a one-line note explaining why.
- **Transition:** "Build complete. Brief, IA, tokens, and tasks are saved in `.design/<active-slug>/`. Run `/design-review` when you want a critique against the brief."

**The flow ends at the end of phase 6.** Phase 7 does not run automatically.

### Phase 7 — Design Review (on request only)
Runs only if the designer explicitly asks during the flow, or runs `/design-review` separately afterward.

- **Sub-skill:** [design-review/SKILL.md](../design-review/SKILL.md)
- **Reads:** `DESIGN_BRIEF.md`, the built code, the running app via Playwright MCP (or fallback).
- **Produces:** `.design/<active-slug>/DESIGN_REVIEW.md` + screenshots in `.design/<active-slug>/screenshots/`.
- **Prerequisite:** built code exists and renders. If nothing has been built, tell the designer: "Review needs rendered code to examine. Run `/design-review` once something is up."
- **Transition:** "Review saved at `.design/<active-slug>/DESIGN_REVIEW.md`. Screenshots in `screenshots/`. If there are must-fix items, I can address them now."

## Project Files Structure

All design-flow artifacts live under `.design/<active-slug>/`. Multiple features can coexist without overwriting each other.

```
.design/
└── <active-slug>/
    ├── DESIGN_BRIEF.md              ← Phase 2
    ├── INFORMATION_ARCHITECTURE.md  ← Phase 3
    ├── DESIGN_TOKENS.*              ← Phase 4 (may live in repo's normal token path instead)
    ├── TOKENS_LOCATION.md           ← Phase 4 (only if tokens are outside .design/)
    ├── TASKS.md                     ← Phase 5
    ├── DESIGN_REVIEW.md             ← Phase 7
    └── screenshots/                 ← Phase 7
        ├── review-<page>-desktop-1280.png
        ├── review-<page>-tablet-768.png
        ├── review-<page>-mobile-375.png
        ├── review-<page>-dark-mode-*.png
        └── review-<component>-<state>.png
```

## Mid-Flow Controls

The designer can say any of these at any point. Honor them:

| Designer says | You do |
|---|---|
| "Skip this phase" | Mark it skipped, move to the next phase, note the skip in the recap. |
| "Stop here" / "That's enough for now" | Summarize where they are and which phase is next when they return. |
| "Jump to phase N" | Verify prerequisite artifacts exist. If not, ask whether to stub them or run the missing phase first. |
| "Where are we?" | List completed phases, the current phase, remaining phases. Reference artifact paths. |
| "Just run the whole thing" / "Batch mode" | Stop asking for per-phase confirmation. Still announce each phase. Stop and confirm only at the end of phase 6. |
| "Restart" / "Start over" | Confirm overwrite, then re-run Step 0. |
| "Change the active feature" | Re-run Step 0's slug determination. |

## Resume Logic

If the designer returns mid-flow (new session, or "resume" mid-conversation):

1. List feature subfolders under `.design/`, most recently modified first.
2. If one folder exists, treat it as the active slug. If multiple, ask which to resume.
3. For the active slug, inventory which artifacts are present:
   - `DESIGN_BRIEF.md` → phase 2 done
   - `INFORMATION_ARCHITECTURE.md` → phase 3 done
   - tokens (in `.design/<active-slug>/` or path recorded in `TOKENS_LOCATION.md`) → phase 4 done
   - `TASKS.md` → phase 5 done; count `[x]` vs `[ ]` to gauge phase-6 progress
   - `DESIGN_REVIEW.md` → phase 7 done
4. Present the inventory in 4–6 lines and ask: "Resume from phase X, or jump elsewhere?"

## Rules

- **Never abbreviate a sub-skill.** Read its `SKILL.md` and run it in full.
- **One active slug per flow.** Don't drift between slugs mid-flow.
- **Verify before transitioning.** Don't announce phase N+1 until phase N's artifact exists at its expected path.
- **Confirmation by default, batch mode on request.** Most designers want per-phase pauses. Some want one decision and a long run — both are valid.
- **The designer is in control.** Skip, stop, jump, restart — honor it without resistance.
