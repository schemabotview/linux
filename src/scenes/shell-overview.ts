import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, RED } from 'reveal-engine'

// Course 2's overview board — the §1 opener + §10 bookend, and the anatomy detour (§2–§3). The
// parts of a command line as peer cards (NO edges — they're facets of one line, not a flow), 2×3
// in reading order: what to run, how, on what · where it's found, which kind, and how it reports
// back. The pipeline scene (`shell-pipeline`) shows the FLOW; this board names the parts.
export const shellOverview: SceneSpec = {
  id: 'shell-overview',
  title: 'Anatomy of a command',
  canvas: { width: 820, height: 560 },
  grid: { cols: [1, 1], rows: [1, 1, 1], gap: 0.16, padding: 0.2 },
  nodes: [
    // row 0 — the line itself: what to run, and how
    { id: 'ov-cmd', label: 'The command', sub: 'ls · cd · grep', kind: 'symbol', color: BLUE, icon: 'terminal', cell: [0, 0] },
    { id: 'ov-opts', label: 'Options / flags', sub: '-l  -a  --help', kind: 'symbol', color: TEAL, icon: 'gears', cell: [1, 0] },
    // row 1 — what it acts on, and where it lives
    { id: 'ov-args', label: 'Arguments', sub: 'files, paths, text', kind: 'symbol', color: GREEN, icon: 'file', cell: [0, 1] },
    { id: 'ov-path', label: 'PATH', sub: 'where commands are found', kind: 'symbol', color: ORANGE, icon: 'share', cell: [1, 1] },
    // row 2 — what kind of command, and how it reports back
    { id: 'ov-builtin', label: 'Builtin vs binary', sub: 'cd  vs  /bin/ls', kind: 'symbol', color: PURPLE, icon: 'box', cell: [0, 2] },
    { id: 'ov-exit', label: 'Exit code', sub: '$?  —  0 = success', kind: 'symbol', color: RED, icon: 'shield', cell: [1, 2] },
  ],
  edges: [], // facets of one line, not a flow
}
