import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, RED } from 'reveal-engine'

// Course 7's overview — the §1 opener + §9 bookend. The building blocks of a bash script, drawn as
// the PROGRESSION the slide names: "in order, from a runnable file to a robust one." Not disconnected
// peers — a build-up. A serpentine (3×2) so cards stay large: row 1 left→right, curl down, row 2
// right→left, the animated edges reading "then add this." Each block gets its own `code` scene next.
//
//   Shebang & vars ▶ Conditionals ▶ Loops
//                                     ▼
//   Args & debug ◀ Robustness ◀ Functions
export const scriptingOverview: SceneSpec = {
  id: 'scripting-overview',
  title: 'Building a script: runnable → robust',
  canvas: { width: 840, height: 580 },
  grid: { cols: [1, 1, 1], rows: [1, 1], gap: 0.3, padding: 0.3 },
  nodes: [
    // row 1 left→right — a runnable file, then structure
    { id: 'sv-basics', label: 'Shebang & variables', sub: '#! · name=val · $1', kind: 'symbol', color: BLUE, icon: 'file', cell: [0, 0] },
    { id: 'sv-cond', label: 'Conditionals', sub: 'if · [[ ]] · case', kind: 'symbol', color: PURPLE, icon: 'branch', cell: [1, 0] },
    { id: 'sv-loop', label: 'Loops', sub: 'for · while · read', kind: 'symbol', color: GREEN, icon: 'workflow', cell: [2, 0] },
    // curl down, row 2 right→left — reusable, then hardened & shareable
    { id: 'sv-func', label: 'Functions', sub: 'reusable blocks', kind: 'symbol', color: ORANGE, icon: 'share', cell: [2, 1] },
    { id: 'sv-robust', label: 'Robustness', sub: 'set -euo pipefail · trap', kind: 'symbol', color: RED, icon: 'shield', cell: [1, 1] },
    { id: 'sv-args', label: 'Args & debug', sub: 'getopts · shellcheck', kind: 'symbol', color: TEAL, icon: 'gears', cell: [0, 1] },
  ],
  edges: [
    { from: 'sv-basics', to: 'sv-cond' },
    { from: 'sv-cond', to: 'sv-loop' },
    { from: 'sv-loop', to: 'sv-func' },
    { from: 'sv-func', to: 'sv-robust' },
    { from: 'sv-robust', to: 'sv-args' },
  ],
}
