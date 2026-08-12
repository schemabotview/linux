import { type SceneSpec, ORANGE } from 'reveal-engine'

// Course 4 §8 — process priority on a whole-canvas `code` card. The niceness scale drawn as text,
// then nice/renice usage. Replaces the lone `nice · renice` tile, which zoomed to a near-empty box.
// Short lines so the auto-fit font stays large at 4K.
export const procPriority: SceneSpec = {
  id: 'proc-priority',
  title: 'Priority: nice & renice',
  canvas: { width: 1520, height: 1160 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'pp-all', kind: 'code', filename: 'priority.sh', color: ORANGE, cell: [0, 0],
      label: [
        '# NICE VALUE — bias the scheduler\'s CPU share',
        '#',
        '#   -20 ........... 0 ........... +19',
        '#   greedier      default      nicer (yields)',
        '#   higher priority           lower priority',
        '',
        '$ nice -n 10 ./big-batch.sh  # START a job low-priority',
        '$ renice -n 5 -p 1234        # change a RUNNING process',
        '$ sudo renice -n -5 -p 1234  # below 0 (greedier) → root',
        '$ ps -o pid,ni,cmd -p 1234   # check it: the NI column',
        '',
        '# nice only matters UNDER CONTENTION —',
        '# idle CPU ⇒ everyone runs freely, niceness is moot.',
      ].join('\n'),
    },
  ],
  edges: [],
}
