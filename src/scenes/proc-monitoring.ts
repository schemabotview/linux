import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, RED } from 'reveal-engine'

// Course 4's monitoring board — §7–§9 tour + the bookend. The tools for seeing and controlling
// running processes, as peer cards (NO edges — they're facets of "observe & steer", not a flow),
// 2×3 in rough "look → prioritize → control" reading order.
export const procMonitoring: SceneSpec = {
  id: 'proc-monitoring',
  title: 'Watching & steering processes',
  canvas: { width: 900, height: 600 },
  grid: { cols: [1, 1, 1], rows: [1, 1], gap: 0.16, padding: 0.18 },
  nodes: [
    // look
    { id: 'pm-proc', label: '/proc', sub: 'live kernel view, per PID', kind: 'symbol', color: BLUE, icon: 'engine', cell: [0, 0] },
    { id: 'pm-ps', label: 'ps', sub: 'a snapshot of processes', kind: 'symbol', color: TEAL, icon: 'scroll', cell: [1, 0] },
    { id: 'pm-top', label: 'top · htop', sub: 'a live dashboard', kind: 'symbol', color: GREEN, icon: 'report', cell: [2, 0] },
    // prioritize & control
    { id: 'pm-nice', label: 'nice · renice', sub: 'CPU priority', kind: 'symbol', color: ORANGE, icon: 'gears', cell: [0, 1] },
    { id: 'pm-jobs', label: 'jobs · fg · bg', sub: 'shell job control (&)', kind: 'symbol', color: PURPLE, icon: 'workflow', cell: [1, 1] },
    { id: 'pm-cgroups', label: 'cgroups', sub: 'hard resource limits', kind: 'symbol', color: RED, icon: 'layers', cell: [2, 1] },
  ],
  edges: [], // facets of observe & steer, not a flow
}
