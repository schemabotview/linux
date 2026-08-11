import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, GRAY, RED } from 'reveal-engine'

// The `shell-pipeline` scene — Course 2's SPINE: the shell's own read-eval loop, drawn as a
// top-to-bottom control-flow diagram. Every line you type walks this exact path, then the loop
// returns to the prompt for the next one.
//
//   You type a line   ($ ls -l *.txt)
//        │  split into words (command + arguments)
//        ▼
//   ┌─ Expand:  globs · variables · command-subst · (quoting turns it off) ─┐
//        │
//        ▼
//   Find the command  (a builtin? else search PATH)
//        │
//        ▼
//   ┌─ Run & wait:  fork+exec ▸ wait ▸ exit code $? ─┐   ── then back to the prompt
//
// Solid-tour reveal: the whole loop solidifies on entry; the per-section camera zooms one band.
export const shellPipeline: SceneSpec = {
  id: 'shell-pipeline',
  title: 'What the shell does with a line',
  canvas: { width: 840, height: 900 },
  grid: { cols: [1, 1, 1], rows: [0.62, 0.62, 1.2, 0.62, 0.95], gap: 0.34, padding: 0.44 },
  nodes: [
    { id: 'sp-line', label: 'You type a line', sub: '$ ls -l *.txt', kind: 'symbol', color: GRAY, icon: 'terminal', cell: [1, 0] },
    { id: 'sp-split', label: 'Split into words', sub: 'command + arguments', kind: 'symbol', color: TEAL, icon: 'gears', cell: [1, 1] },
    {
      id: 'sp-expand', label: 'Expand the words', kind: 'container', color: PURPLE, icon: 'gears', cell: [0, 2, 3, 1],
      layout: { cols: [1, 1, 1, 1], rows: 1, gap: 0.3, padding: 0.5 },
      children: [
        { id: 'se-glob', label: 'Globs', sub: '*.txt → filenames', kind: 'symbol', color: BLUE, icon: 'funnel', cell: [0, 0] },
        { id: 'se-var', label: 'Variables', sub: '$HOME  $USER', kind: 'symbol', color: GREEN, icon: 'key', cell: [1, 0] },
        { id: 'se-cmd', label: 'Command subst', sub: '$(date)', kind: 'symbol', color: ORANGE, icon: 'workflow', cell: [2, 0] },
        { id: 'se-quote', label: 'Quoting', sub: 'turns expansion off', kind: 'symbol', color: RED, icon: 'shield', cell: [3, 0] },
      ],
    },
    { id: 'sp-find', label: 'Find the command', sub: 'a builtin? else search PATH', kind: 'symbol', color: GREEN, icon: 'share', cell: [1, 3] },
    {
      id: 'sp-run', label: 'Run & wait', kind: 'container', color: GRAY, icon: 'workflow', cell: [0, 4, 3, 1],
      layout: { cols: [1, 1, 1], rows: 1, gap: 0.3, padding: 0.5 },
      children: [
        { id: 'sr-fork', label: 'fork + exec', sub: 'become the program', kind: 'symbol', color: ORANGE, icon: 'workflow', cell: [0, 0] },
        { id: 'sr-wait', label: 'wait', sub: 'until it finishes', kind: 'symbol', color: BLUE, icon: 'clock', cell: [1, 0] },
        { id: 'sr-exit', label: 'exit code $?', sub: '0 = success', kind: 'symbol', color: TEAL, icon: 'shield', cell: [2, 0] },
      ],
    },
  ],
  edges: [
    { from: 'sp-line', to: 'sp-split' },
    { from: 'sp-split', to: 'sp-expand' },
    { from: 'sp-expand', to: 'sp-find' },
    { from: 'sp-find', to: 'sp-run' },
    { from: 'sr-fork', to: 'sr-wait' },
    { from: 'sr-wait', to: 'sr-exit' },
  ],
}
