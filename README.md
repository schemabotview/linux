# linux

The **Linux** concept app for GraphL — a self-contained Vite/React app that renders the Linux
courses as progressive-reveal videos and serves its own narration audio. All rendering, the reveal
fold, and the `<RevealPlayer>` come from the shared engine
([`reveal-engine`](https://github.com/schemabotview/reveal-engine)); this repo supplies only what's
specific to Linux: its **scenes**, its **courses**, and (later) its **audio**.

## Layout

```
src/
  scenes/               this concept's SceneSpecs — the diagram STRUCTURE (authored with reveal-engine helpers)
    index.ts            the scene registry: getScene(id)
  content/courses/*.ts  the typed Courses: sections → slide (Markdown body) + focus + beats
    index.ts            the catalog: courses[] + BLURBS
  App.tsx               hash router (#/<course> plays · #scene/<id> previews a scene solid)
  main.tsx              mounts <RevealPlayer course getScene audioBase=… />; dev validateCourse gate
  index.css             page + course-index styling (the engine ships its own scene/slide/player CSS)
public/audio/           per-beat narration clips: <courseId>/<section-id>-<beatIndex>.wav (gitignored)
COURSE-PLAN.md          the proposed 8-course arc + per-course scene inventory + rationale
```

## How it uses reveal-engine

Consumed **straight from source** via a Vite alias (see `vite.config.ts`):
`reveal-engine` → `../reveal-engine/src`, `reveal-engine/pure` → `../reveal-engine/src/pure`. Live
HMR against the engine while both co-develop — no build/publish step. Importing `reveal-engine`
pulls in the engine's CSS + self-hosted Plex fonts automatically, so authoring is **one import**:

```ts
import { type SceneSpec, type Course, container, wgrid, BLUE, GREEN, RevealPlayer } from 'reveal-engine'
```

For deploy the alias is swapped for a published/git dependency (the engine repo is source-only).

## The 8-course arc

The real operator's workflow — **boot → drive → navigate → run → transform → administer → automate → ship**:

| # | id | Title | Stage |
|---|----|----|----|
| 1 | `kernel` | Boot & the kernel | Boot |
| 2 | `shell` | The shell & command line | Drive |
| 3 | `filesystem` | The filesystem & permissions | Navigate |
| 4 | `processes` | Processes & signals | Run |
| 5 | `text` | Text processing & pipelines | Transform |
| 6 | `admin` | Users, services & networking | Administer |
| 7 | `scripting` | Shell scripting | Automate |
| 8 | `project` | Capstone — ship a real CLI tool | Ship |

See `COURSE-PLAN.md` for the scene inventory and design rationale per course.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/ (Vite default; per-concept port TBD)
```

- `localhost:<port>/` — the course index
- `localhost:<port>/#/kernel` — play a course (`←/→` page beats, SPACE toggles narration)
- `localhost:<port>/#scene/boot-chain` — preview one scene fully solid (authoring aid)
- `localhost:<port>/?capture#/kernel` — the fixed 1920×1080 capture stage (recorded at 2× DPR → 4K)

## Status

Scaffold up, plan written. Course 1 (`kernel`) authoring in progress. See `CLAUDE.md` for the
content model, reveal model, and scene-design rules.
