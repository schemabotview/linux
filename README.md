# linux — GraphL concept repo

The **Linux** concept app for [GraphL](https://graphl.in). One section = a left **scene** (react-flow
diagram or code snippet) + a right **slide** (markdown) + a **narration** script, rendered
responsively (4K capture · laptop web app · mobile) and captured to video.

> **Status: built.** All 8 courses — **80 sections, 80 scenes, 80 narration wavs (146.6 min)**.
> `npm run build`, `tsc --noEmit` and `npm run check` are clean. Not yet recorded or published.

Workspace-wide model, pipeline, and conventions: see the workspace [`README.md`](../README.md).

## The course arc (8 courses)

| # | Course | What it covers |
|--:|--------|----------------|
| 1 | **kernel** | Boot & the kernel — firmware, GRUB, the kernel, PID 1, and the syscall boundary. |
| 2 | **shell** | Command anatomy, PATH, expansion & quoting, exit codes, streams, redirection & pipes. |
| 3 | **filesystem** | The FHS tree, paths & navigation, permissions & ownership, inodes & links, mounts. |
| 4 | **processes** | fork & exec, states & the scheduler, zombies & orphans, signals, ps/top/nice/cgroups. |
| 5 | **text** | grep & regex, sed, awk, sort/uniq/cut/wc/tr, find & xargs — the text toolkit as pipelines. |
| 6 | **admin** | Users & sudo, systemd & journalctl, packages, cron & timers, networking with ip/ss/curl/ssh. |
| 7 | **scripting** | Shebang & variables, conditionals, loops & functions, robust bash (`set -euo pipefail`). |
| 8 | **project** | The capstone — build & ship `sysreport`, a system-health & log-summary CLI, end to end. |

Section counts: 10 · 10 · 10 · 10 · 10 · 10 · **9** · 11. Narration for every section is already
generated (Colab + Chatterbox) and lives at `public/audio/<course>/<section-id>.wav`, so the
`narration` field of a `Section` is **frozen** — editing it would desynchronise the audio.

## Layout

```
src/
  render-engine/   layout + react-flow / code-snippet renderer (folder, not a package)
  scenes/          hand-authored scenes + registry
  content/         courses → sections (one file per section) + registry
  section/         composited scene-left / slide-right view (responsive)
  App.tsx          hash router — section (whole-scene) view · scene (individual) view
scripts/
  record-course.mjs / record-reels.mjs   capture → mp4 (landscape / portrait)
  thumb.mjs / gen-descriptions.mjs        thumbnails / video descriptions
  colab_generate_audio.ipynb              Colab + Chatterbox TTS → .wav
```

## Run

```bash
npm install
npm run dev                  # open the printed URL, try #/kernel
npm run build                # vite build (must stay clean)
npm run check                # content budgets — cards, slides, icons, focus, missing wavs
npm run record kernel        # 4K video → scripts/out/kernel.mp4
npm run record:reels kernel  # portrait reels
```
