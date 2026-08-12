import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, GRAY, RED, YELLOW } from 'reveal-engine'

// The `process-lifecycle` scene — Course 4's SPINE: how a process is born, runs, and dies, as a
// control-flow diagram. A parent forks a copy of itself; the child execs into a new program; the
// scheduler runs it through its states; it exits with a code; briefly a zombie until the parent
// waits and reaps it (reading the code). This is the fork+exec from Courses 1 & 2, drawn out.
//
//   Parent ─fork()─▶ child (copy) ─exec()─▶ [running ⇄ sleeping ⇄ stopped]
//                                                     │ exit(code)
//                                                     ▼
//                                          zombie ─▶ parent wait() (reap, read $?)
export const processLifecycle: SceneSpec = {
  id: 'process-lifecycle',
  title: 'The life of a process',
  canvas: { width: 600, height: 800 },
  grid: { cols: [1, 1, 1], rows: [0.7, 0.72, 1.15, 0.7, 0.8], gap: 0.24, padding: 0.42 },
  nodes: [
    { id: 'pl-parent', label: 'Parent process', sub: 'e.g. your shell', kind: 'symbol', color: GRAY, icon: 'terminal', cell: [1, 0] },
    { id: 'pl-fork', label: 'fork()', sub: 'clone → 2 identical procs', kind: 'symbol', color: TEAL, icon: 'copy', cell: [0, 1] },
    { id: 'pl-exec', label: 'exec()', sub: 'child becomes a new program', kind: 'symbol', color: ORANGE, icon: 'workflow', cell: [2, 1] },
    {
      id: 'pl-states', label: 'The process runs · the scheduler slices time', kind: 'container', color: GREEN, icon: 'engine', cell: [0, 2, 3, 1],
      layout: { cols: [1, 1, 1], rows: 1, gap: 0.3, padding: 0.5 },
      children: [
        { id: 'pl-run', label: 'Running', sub: 'on a CPU (R)', kind: 'symbol', color: GREEN, icon: 'engine', cell: [0, 0] },
        { id: 'pl-sleep', label: 'Sleeping', sub: 'waiting on I/O (S)', kind: 'symbol', color: BLUE, icon: 'clock', cell: [1, 0] },
        { id: 'pl-stop', label: 'Stopped', sub: 'suspended (T)', kind: 'symbol', color: YELLOW, icon: 'shield', cell: [2, 0] },
      ],
    },
    { id: 'pl-exit', label: 'exit(code)', sub: 'done → returns a status', kind: 'symbol', color: PURPLE, icon: 'share', cell: [1, 3] },
    { id: 'pl-zombie', label: 'zombie', sub: 'dead, not yet reaped', kind: 'symbol', color: RED, icon: 'shield', cell: [0, 4] },
    { id: 'pl-wait', label: 'parent wait()', sub: 'reaps → reads $?', kind: 'symbol', color: BLUE, icon: 'clock', cell: [2, 4] },
  ],
  edges: [
    { from: 'pl-parent', to: 'pl-fork' },
    { from: 'pl-fork', to: 'pl-exec' },
    { from: 'pl-exec', to: 'pl-states' },
    { from: 'pl-states', to: 'pl-exit' },
    { from: 'pl-exit', to: 'pl-zombie' },
    { from: 'pl-zombie', to: 'pl-wait' },
  ],
}
