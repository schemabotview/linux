import type { Scene } from '../../render-engine'

// §9 which-tool — a decision guide is a lookup, so it is a table: the want you have on the left, the
// tool on the right. The rule below is the one that stops the table being read as a rigid mapping —
// these tools overlap, and the tie-break is readability.
export const whichTool: Scene = {
  id: 'which-tool',
  nodes: [
    {
      id: 'guide',
      kind: 'table',
      label: 'They overlap — each has a sweet spot',
      pattern: 'service',
      headers: ['what you want', 'reach for', 'because'],
      values: [
        ['just find the lines', 'grep', 'unbeatable at “show me X”'],
        ['replace or delete lines', 'sed', 's/// across a stream or file'],
        ['columns, conditions, totals', 'awk', 'it splits the fields for you'],
        ['files, not their contents', 'find + xargs', 'it walks the tree by test'],
        ['reshape between stages', 'sort, uniq, cut, tr', 'small, sharp, composable'],
      ],
    },
    {
      id: 'rule',
      label: 'Simplest wins',
      sub: 'grep beats sed beats awk',
      pattern: 'network',
      icon: 'scale',
    },
  ],
  edges: [
    { source: 'guide', target: 'rule', label: 'reach for the simplest one that does the job — but when grep plus cut plus sort turns into column math, that is awk asking to be used' },
  ],
}
