# CLAUDE.md — linux (concept app · lean authoring pointers)

The **Linux** concept app for GraphL. All rendering / reveal / player machinery comes from the
shared engine ([`reveal-engine`](https://github.com/schemabotview/reveal-engine)); this repo
supplies only Linux's scenes, courses, and audio. Human onboarding is in `README.md`; the full
proposed arc + scene inventory is in `COURSE-PLAN.md`.

## Engine dependency

Consumed **from source** via a Vite alias (`reveal-engine` → `../reveal-engine/src`,
`reveal-engine/pure` → `../reveal-engine/src/pure`). One import from `reveal-engine` gives the whole
authoring API — the `SceneSpec`/`Course` types, `container`/`group`/`wgrid` helpers, the role
colors, `getIcon`, `RevealPlayer`, and `validateCourse` — plus the engine's CSS + Plex fonts. Don't
relitigate the engine's locked reveal decisions here (see the engine's `CLAUDE.md`).

## The content model (this is what gets authored)

- **Scenes** (`src/scenes/*.ts`, registered in `scenes/index.ts`) = the diagram STRUCTURE — a typed
  `SceneSpec` (nodes on a grid: `symbol`/`term`/`code`/`table`/`container`/`group`; edges; icons).
- **Courses** (`src/content/courses/*.ts`, registered in `courses/index.ts` + a one-line `BLURBS`
  entry) = the script — a list of **sections**; each has a `slide` (`{title, body}`, curated
  Markdown), an optional `focus` (node ids the camera frames; default = the nodes the section
  solidifies; `focus: []` frames the whole scene), and ordered `beats` (`{line, delta}`).
- **Audio** = one wav per beat: `public/audio/<courseId>/<section-id>-<beatIndex>.wav`.
- **Safety net**: `tsc` type-checks scenes + courses; `validateCourse` (dev-load, `main.tsx`) fails
  loud if a beat names a node id that isn't in its scene.

## Reveal model — the "solid tour" (locked)

**No ghost build.** Every section is **one beat = one slide**; the diagram is **solidified on scene
entry** (the first section on a scene, and any mid-course scene switch, solidifies that whole
scene). Later sections on the same scene never re-ghost — each just sets `focus` to its band, so
that band is **lit** and the rest **dimmed**. Camera + focus do the storytelling on an always-solid
diagram. In play the camera zooms one band at a time, so within-band label sizing reads even.

## Scene design (decide per course — read before authoring)

Each course brings its **own** scenes; there is **no shared all-of-Linux map**.

1. **Flow diagram** (wired nodes + edges) **only where there's genuine control/data flow** — e.g.
   `boot-chain` (firmware → bootloader → kernel → init → userspace), `shell-pipeline` (read → expand
   → exec), `process-lifecycle` (fork → exec → wait). If you'd have to invent arrows, it isn't a flow.
2. **Reference board** (labelled bands, **no edges**) where topics are **peers** with no honest flow.
   Two shapes:
   - **One board, bands** — a thin **vertical-tab** label (`vertical: true` on a `symbol`) beside one
     or two **`code`** cards; per-band section `focus: ['<tab>', '<card(s)>']` (camera zooms a band).
   - **Overview board + a scene per topic** — when peers each carry a *whole terminal's worth* of
     commands, give each its own whole-canvas `code`-card scene (framed `focus: []`) and a small
     symbol **overview board** for the §1/§N bookends. A code card auto-fits its font, so a full
     canvas per topic reads far larger than a shared band. This is Course 5 (`text`) and Course 7
     (`scripting`).
3. **A detour scene must earn its place** by showing what the main scene can't (`kernel-internals`).
4. **`code` legibility** — `code` nodes auto-fit to the longest line; keep snippets short. `code`
   labels are multi-line (`\n`-separated). Terminal sessions read best with a `$ ` prompt prefix and
   `# comment` annotation lines (a `sub` on a code node becomes a leading comment line).
5. Nodes carry lucide **icons** (real names only, from the engine's icon registry: `terminal server
   disk file layers key users shield gears engine workflow branch clock cloud plug database table
   scroll box memory share app api stream funnel …`). The course roadmap lives in slide text, never
   as diagram nodes.

## Authoring workflow

Owner drives, **one reviewed slice at a time**. **Before any course, deliver an ASCII sketch** of
the scene + reveal progression for approval first. Then build in reviewed slices (scene → scene →
course sections in batches). Verify each scene at `#scene/<id>` and each course at `#/<id>`.

## Course plan

The proposed 8-course arc (see `COURSE-PLAN.md` for scene inventory + rationale):
`kernel` · `shell` · `filesystem` · `processes` · `text` · `admin` · `scripting` · `project`.
Add each authored `Course` to `courses` (syllabus order) + a `BLURBS` line.

## Status

**All 8 courses authored — 41 scenes, 80 sections — `tsc` clean, `vite build` clean.** (Built
autonomously overnight, ahead of the usual per-slice review; owner to review scenes at `#scene/<id>`
and courses at `#/<id>`.)

- **Course 1 (`kernel`) done** — `boot-chain` spine + `kernel-internals` detour, 10 sections.
- **Course 2 (`shell`) done** — `shell-overview` board + `shell-pipeline` spine + `redirection`, 10.
- **Course 3 (`filesystem`) done** — `fhs-overview` + `fs-tree`/`permissions` + `inodes-links`/`mounts-vfs`, 10.
- **Course 4 (`processes`) done** — `process-lifecycle` spine + `signals` + `proc-monitoring`, 10.
- **Course 5 (`text`) done** — `text-overview` + `grep`/`sed`/`awk`/`sort-uniq`/`find-xargs`, 10.
- **Course 6 (`admin`) done** — `admin-overview` + `users-groups`/`packages`/`scheduling` + `systemd`/`networking`, 10.
- **Course 7 (`scripting`) done** — `scripting-overview` + `script-basics`/`conditionals`/`loops`/`functions`/`robust`, 9.
- **Course 8 (`project`) done** — `capstone-spine` + 9 stage scenes, building the `sysreport` CLI, 11.

No audio yet (TTS is a later pipeline). Next: owner review pass, then AWS (see sibling `aws/`).
