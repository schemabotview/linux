import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, RED, GRAY, YELLOW } from 'reveal-engine'

// Course 8's build-flow board — the §1 opener + §11 bookend. The nine stages of building the
// `sysreport` CLI, as an ordered map (peers in build order; the arrows would just retrace reading
// order, so it stays a board). Each stage gets its own whole-canvas `code` scene; this board is the
// "you are building this, in this order" map. Colors nod to the course each stage calls back to.
export const capstoneSpine: SceneSpec = {
  id: 'capstone-spine',
  title: 'Building sysreport, stage by stage',
  canvas: { width: 980, height: 640 },
  grid: { cols: [1, 1, 1], rows: [1, 1, 1], gap: 0.16, padding: 0.16 },
  nodes: [
    { id: 'cs-structure', label: '1 · Structure', sub: 'shebang · safety', kind: 'symbol', color: BLUE, icon: 'layers', cell: [0, 0] },
    { id: 'cs-args', label: '2 · Arguments', sub: 'getopts · --help', kind: 'symbol', color: TEAL, icon: 'gears', cell: [1, 0] },
    { id: 'cs-collect', label: '3 · Collect', sub: 'gather system facts', kind: 'symbol', color: GREEN, icon: 'scroll', cell: [2, 0] },
    { id: 'cs-transform', label: '4 · Transform', sub: 'grep · awk pipeline', kind: 'symbol', color: PURPLE, icon: 'funnel', cell: [0, 1] },
    { id: 'cs-report', label: '5 · Report', sub: 'format the summary', kind: 'symbol', color: ORANGE, icon: 'report', cell: [1, 1] },
    { id: 'cs-schedule', label: '6 · Schedule', sub: 'cron / timer', kind: 'symbol', color: YELLOW, icon: 'clock', cell: [2, 1] },
    { id: 'cs-service', label: '7 · Service', sub: 'systemd unit', kind: 'symbol', color: GREEN, icon: 'workflow', cell: [0, 2] },
    { id: 'cs-harden', label: '8 · Harden', sub: 'lock · validate · trap', kind: 'symbol', color: RED, icon: 'shield', cell: [1, 2] },
    { id: 'cs-ship', label: '9 · Ship', sub: 'install · docs', kind: 'symbol', color: GRAY, icon: 'box', cell: [2, 2] },
  ],
  edges: [], // ordered stages — the numbers carry the sequence
}
