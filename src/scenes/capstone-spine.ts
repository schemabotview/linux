import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, RED, GRAY, YELLOW } from 'reveal-engine'

// Course 8's build-flow spine — the §1 opener + §11 bookend. The nine stages of building the
// `sysreport` CLI, drawn as the ordered pipeline they are: 1▸9 snaking through a 3×3 (row 1 L→R,
// curl down, row 2 R→L, curl down, row 3 L→R) so each build arrow is a clean neighbour step. This
// is the whole series converging — the numbers AND the animated edges carry "build it in this order,
// each stage leaning on a prior course." Each stage gets its own whole-canvas `code` scene next.
//
//   1 Structure ▶ 2 Arguments ▶ 3 Collect
//                                  ▼
//   6 Schedule  ◀ 5 Report    ◀ 4 Transform
//        ▼
//   7 Service   ▶ 8 Harden    ▶ 9 Ship
export const capstoneSpine: SceneSpec = {
  id: 'capstone-spine',
  title: 'Building sysreport, stage by stage',
  canvas: { width: 880, height: 680 },
  grid: { cols: [1, 1, 1], rows: [1, 1, 1], gap: 0.22, padding: 0.2 },
  nodes: [
    // row 1 — left→right
    { id: 'cs-structure', label: '1 · Structure', sub: 'shebang · safety', kind: 'symbol', color: BLUE, icon: 'layers', cell: [0, 0] },
    { id: 'cs-args', label: '2 · Arguments', sub: 'getopts · --help', kind: 'symbol', color: TEAL, icon: 'gears', cell: [1, 0] },
    { id: 'cs-collect', label: '3 · Collect', sub: 'gather system facts', kind: 'symbol', color: GREEN, icon: 'scroll', cell: [2, 0] },
    // row 2 — right→left
    { id: 'cs-transform', label: '4 · Transform', sub: 'grep · awk pipeline', kind: 'symbol', color: PURPLE, icon: 'funnel', cell: [2, 1] },
    { id: 'cs-report', label: '5 · Report', sub: 'format the summary', kind: 'symbol', color: ORANGE, icon: 'report', cell: [1, 1] },
    { id: 'cs-schedule', label: '6 · Schedule', sub: 'cron / timer', kind: 'symbol', color: YELLOW, icon: 'clock', cell: [0, 1] },
    // row 3 — left→right, ending at Ship
    { id: 'cs-service', label: '7 · Service', sub: 'systemd unit', kind: 'symbol', color: GREEN, icon: 'workflow', cell: [0, 2] },
    { id: 'cs-harden', label: '8 · Harden', sub: 'lock · validate · trap', kind: 'symbol', color: RED, icon: 'shield', cell: [1, 2] },
    { id: 'cs-ship', label: '9 · Ship', sub: 'install · docs', kind: 'symbol', color: GRAY, icon: 'box', cell: [2, 2] },
  ],
  edges: [
    { from: 'cs-structure', to: 'cs-args' },
    { from: 'cs-args', to: 'cs-collect' },
    { from: 'cs-collect', to: 'cs-transform' },
    { from: 'cs-transform', to: 'cs-report' },
    { from: 'cs-report', to: 'cs-schedule' },
    { from: 'cs-schedule', to: 'cs-service' },
    { from: 'cs-service', to: 'cs-harden' },
    { from: 'cs-harden', to: 'cs-ship' },
  ],
}
