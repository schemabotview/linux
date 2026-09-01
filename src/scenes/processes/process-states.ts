import type { Scene } from '../../render-engine'

// §4 states-scheduler — these states are exactly what the STATE column of ps prints, so the scene is
// that column: a real table, one row per letter. Read down the CPU column and the section's headline
// fact falls out — almost everything on the box is asleep and costing nothing.
export const processStates: Scene = {
  id: 'process-states',
  nodes: [
    {
      id: 'sched',
      label: 'The scheduler',
      sub: 'more processes than cores',
      pattern: 'service',
      icon: 'clock',
    },
    {
      id: 'states',
      kind: 'table',
      label: 'The STATE column of ps',
      sub: 'a process cycles these until it is done',
      pattern: 'network',
      headers: ['state', 'ps', 'what it means', 'CPU cost'],
      values: [
        ['Running', 'R', 'on a CPU now, or next in line', 'a full slice'],
        ['Sleeping', 'S', 'blocked on I/O, a timer, input', 'none'],
        ['Stopped', 'T', 'suspended — you sent Ctrl-Z', 'none'],
        ['Zombie', 'Z', 'finished, not yet reaped', 'none'],
      ],
    },
  ],
  edges: [
    { source: 'sched', target: 'states', label: 'so each gets a tiny slice, rotating fast — and sleeping costs nothing, which is why 300 processes idle happily' },
  ],
}
