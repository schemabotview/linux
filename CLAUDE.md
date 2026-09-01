# CLAUDE.md — linux (lean operational pointers)

The **Linux** concept app of GraphL. Workspace-wide invariants, content model, and working agreement
live in the workspace [`CLAUDE.md`](../CLAUDE.md) — read that first; this file is Linux-specific.

## Status

**BUILT + PUBLISHED — all 8 courses.** 80 sections · 80 scenes · 80 wavs (146.6 min). `npm run build`,
`tsc --noEmit` and `npm run check` are clean.

Live at **https://graphl.in/linux/** since 2026-09-01 (Pages build source = the `deploy.yml`
workflow; the apex domain is inherited from `schemabotview.github.io`'s CNAME, so no CNAME here).
Listed in the catalog's `concepts.json`. This repo previously held the beat-based *graphl-studio*
Linux app — it was replaced by this one; the old app is in git history.

| # | id | Title | Sections | Audio |
|--:|----|-------|---------:|------:|
| 1 | `kernel` | Boot & the kernel | 10 | 17.1 min |
| 2 | `shell` | The shell & the command line | 10 | 17.7 |
| 3 | `filesystem` | The filesystem & permissions | 10 | 18.8 |
| 4 | `processes` | Processes & signals | 10 | 19.2 |
| 5 | `text` | Text processing & pipelines | 10 | 19.1 |
| 6 | `admin` | Users, services & networking | 10 | 20.0 |
| 7 | `scripting` | Shell scripting | **9** | 17.3 |
| 8 | `project` | The capstone — ship a real tool | 11 | 17.4 |

`scripting` really is 9 sections, not 10 — the audio was generated against that count.

## Where the content came from (and what that fixes in place)

Spine, slides and **all 80 narration wavs** were ported from `~/graphl-studio/linux`, where they were
already generated via Colab. **The narration is therefore FROZEN.** Two consequences that bind any
future edit:

1. **Never edit a `Section.narration`** — the wav will no longer match it. Slides may be edited freely
   (they are a separate field); enrichment may only ADD to what the narration says, never contradict it.
2. **Two courses have narration that NAMES ITS PICTURE**, so the scene is a requirement, not a choice:
   - `kernel` — every section's narration points at the `machine-stack` board ("read the numbered
     ladder up the left side, one to six", "the red bar in the middle of the stack"). All ten scenes
     spread `scenes/kernel/machine-stack.ts` and light their own rung via `Section.focus`.
   - `project` — §1 promises "the nine stages on this board". Ten of eleven scenes spread
     `scenes/project/stages.ts` the same way.

   The studio engine lit these with a camera. This engine has none, so the lighting-up happens
   **across** scenes instead of within one. If you re-cut either course, check the narration first.

## Layout

```
src/render-engine/   layout + renderer (import from the barrel index, never deep paths)
src/scenes/<course>/ scenes + registry — one scene per section, no sharing except the two boards above
src/content/<course>/ sections (NN-<id>.ts) + registry
src/section/         scene-left / slide-right composited view (responsive)
src/App.tsx          hash router: section (whole-scene) view · scene (individual) view
scripts/             record-course · record-reels · thumb · gen-descriptions · colab · audio-manifest
public/audio/<course>/<section-id>.wav    narration, one clip per section (no beat index)
```

## Build & verify

- `npm install` → `npm run dev`. Routes: `#/<course>-<section>` for a section, `#/<scene-id>` for a
  scene on its own.
- **The bar for any change: `npm run build` + `npx tsc --noEmit` + `npm run check` clean, AND visually
  correct in the browser.** There is no test runner, and the failures that matter here are visual.
- **`npm run check` gates five silent failures** — a leaf card overflowing its fixed 210×96, a slide
  too tall for the pane, an `icon:` key in no `*Icons.ts` registry, a `focus:` naming no node in its
  scene, and **a section with no narration wav**. The fifth is this repo's addition; the other four
  came with the engine. All five fail visually and none of them fail the build.
- Adding a scene: define in `src/scenes/<course>/`, register in that folder's `index.ts`.

## Recording

- One course: `node scripts/record-course.mjs <course>` → `scripts/out/<course>.mp4` (3840×2160).
  It spawns its own dev server unless `APP_URL` points at a running one.
- All eight: `caffeinate -dimsu bash scripts/record-all.sh`. One dedicated Vite server on
  `RECORD_PORT` (default **5183**, `--strictPort` so it can't drift onto a neighbour's port) is
  shared by all eight runs; a failing course doesn't stop the batch, and the summary lists each.
- **Budget ≈ 3× realtime** at the default `libx264 crf18 preset slow` — 146.6 min of narration is
  roughly **7–8 h** of wall clock, i.e. an overnight job. `caffeinate -dimsu` is not optional: a
  display sleep mid-run stalls the headless screencast.
- Runs are **resumable** — each segment is fingerprinted on (audio bytes, geometry, fps, encode
  settings, sting), so re-running after a failure re-records only what changed.
- Adding content: add a `Section` under `src/content/<course>/`, list it in that folder's `index.ts`.

## Authoring notes specific to this concept

- **Linux content is hostile to the leaf-card budget.** Paths and flags are unbreakable tokens
  (`/etc/systemd/system` is 19 characters and cannot wrap). Budget: label token ≤14, sub token ≤20.
  **The card carries the concept; the slide and the code card carry the exact path.**
- **The card carries the claim, the EDGE LABEL carries the explanation.** Every card-overflow
  violation in this port was a long `sub` on a standalone card, and moving the sentence to the edge
  fixed the budget and read better — the explanation is usually about the relationship anyway.
- 25 of the 80 scenes are **code cards**, which is honest: a claim about which *word* or which *line*
  something happens on needs the words on screen. Tables carry genuine reference material — the
  permission bits, the inode's fields, `ps` states, the signal list, regex symbols, awk's variables.
- `lucideIcons.ts` carries a **Linux block** (`harddrive`, `folder`, `file`, `users`, `power`, `plug`,
  `scissors`, `link`, `skull`, `search`, `pencil`, `sigma`, `hash`, `sortarrows`, `regex`, `bug`).
  Extend it per concept; `npm run check` will catch an unregistered key.

## Working agreement

Owner drives, **one reviewed slice at a time**: propose → approve → build → verify in-app → stop.
Before authoring a course/scene, deliver an **ASCII sketch** of the scene for approval first.
