import type { Scene } from '../../render-engine'

// §10 you-are-here — the recap is deliberately shaped like the pipeline the course built toward, not
// like a tool list: what you can find, change, compute, reshape and act on, and then the composition
// that turns all five into one line.
export const textRecap: Scene = {
  id: 'text-recap',
  nodes: [
    {
      id: 'able',
      label: 'Raw logs and data, turned into answers',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'ab-find', label: 'Find', sub: 'grep, and any shape via regex', pattern: 'service', icon: 'search' },
        { id: 'ab-change', label: 'Change', sub: 'sed — and -i last, always', pattern: 'service', icon: 'pencil' },
        { id: 'ab-compute', label: 'Compute', sub: 'awk — columns, conditions, totals', pattern: 'network', icon: 'sigma' },
        { id: 'ab-reshape', label: 'Reshape & act', sub: 'sort, uniq, cut, wc, tr, find, xargs', pattern: 'storage', icon: 'scissors' },
      ],
    },
    { id: 'next', label: 'Next — admin', sub: 'users, systemd, packages, cron, networking', pattern: 'user', icon: 'wrench' },
  ],
  edges: [
    { source: 'able', target: 'next', label: 'and composed: sort | uniq -c | sort -rn is a whole analysis in one line' },
  ],
}
