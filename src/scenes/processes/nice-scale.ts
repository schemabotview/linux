import type { Scene } from '../../render-engine'

// §8 priority — the scale is counter-intuitive (lower means greedier), so it is drawn as a scale with
// both ends labelled rather than explained in prose. The caveat gets its own node because it is the
// thing people get wrong: nice changes nothing at all until the cores are actually contended.
export const niceScale: Scene = {
  id: 'nice-scale',
  nodes: [
    {
      id: 'nice-code',
      kind: 'code',
      filename: 'priority.sh',
      label: [
        'nice -n 10 ./big-batch.sh   # start it yielding to everyone else',
        'renice -n 5 -p 1234         # change one that is already running',
        'sudo renice -n -5 -p 1234   # going BELOW 0 needs root',
      ].join('\n'),
    },
    {
      id: 'scale',
      label: 'The niceness scale',
      sub: 'the name is literal — a nicer process is nicer to the others',
      pattern: 'network',
      cols: 3,
      children: [
        { id: 'ns-low', label: '-20', sub: 'greediest', variant: 'tile', pattern: 'warn', icon: 'zap' },
        { id: 'ns-zero', label: '0', sub: 'the default', variant: 'tile', pattern: 'network', icon: 'scale' },
        { id: 'ns-high', label: '+19', sub: 'yields the most', variant: 'tile', pattern: 'service', icon: 'clock' },
      ],
    },
    {
      id: 'contention',
      label: 'Only under contention',
      sub: 'with spare CPU, nobody yields',
      pattern: 'external',
      icon: 'gauge',
    },
  ],
  edges: [
    { source: 'nice-code', target: 'scale', label: 'lower is HIGHER priority' },
    { source: 'scale', target: 'contention', label: 'it biases the share, it does not reserve one — nice only decides who yields when cores are scarce' },
  ],
}
