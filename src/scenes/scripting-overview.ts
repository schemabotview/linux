import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, RED } from 'reveal-engine'

// Course 7's overview board — the §1 opener + §9 bookend. The building blocks of a bash script as
// peer cards (NO edges — the constructs of the language, not a flow), 2×3 in the order you meet
// them. Each gets its own whole-canvas `code` scene next; the board is the map.
export const scriptingOverview: SceneSpec = {
  id: 'scripting-overview',
  title: 'Anatomy of a shell script',
  canvas: { width: 940, height: 600 },
  grid: { cols: [1, 1, 1], rows: [1, 1], gap: 0.16, padding: 0.18 },
  nodes: [
    { id: 'sv-basics', label: 'Shebang & variables', sub: '#! · name=val · $1', kind: 'symbol', color: BLUE, icon: 'file', cell: [0, 0] },
    { id: 'sv-cond', label: 'Conditionals', sub: 'if · [[ ]] · case', kind: 'symbol', color: PURPLE, icon: 'branch', cell: [1, 0] },
    { id: 'sv-loop', label: 'Loops', sub: 'for · while · read', kind: 'symbol', color: GREEN, icon: 'workflow', cell: [2, 0] },
    { id: 'sv-func', label: 'Functions', sub: 'reusable blocks', kind: 'symbol', color: ORANGE, icon: 'share', cell: [0, 1] },
    { id: 'sv-robust', label: 'Robustness', sub: 'set -euo pipefail · trap', kind: 'symbol', color: RED, icon: 'shield', cell: [1, 1] },
    { id: 'sv-args', label: 'Args & debug', sub: 'getopts · shellcheck', kind: 'symbol', color: TEAL, icon: 'gears', cell: [2, 1] },
  ],
  edges: [],
}
