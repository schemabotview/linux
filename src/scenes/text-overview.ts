import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, RED } from 'reveal-engine'

// Course 5's overview board — the §1 opener + §9–§10 bookends. The classic line-oriented text
// toolkit as peer cards (NO edges — they're tools you PIPE together, so the composition is the
// story, not a fixed flow), 2×3 in rough "search → edit → columns · reshape → count → find" order.
// Each tool gets its own whole-canvas `code` scene next; this board is the map + the "which tool?"
// decision aid.
export const textOverview: SceneSpec = {
  id: 'text-overview',
  title: 'The text-processing toolkit',
  canvas: { width: 940, height: 600 },
  grid: { cols: [1, 1, 1], rows: [1, 1], gap: 0.16, padding: 0.18 },
  nodes: [
    { id: 'to-grep', label: 'grep', sub: 'find matching lines', kind: 'symbol', color: BLUE, icon: 'funnel', cell: [0, 0] },
    { id: 'to-sed', label: 'sed', sub: 'edit lines as they flow', kind: 'symbol', color: GREEN, icon: 'gears', cell: [1, 0] },
    { id: 'to-awk', label: 'awk', sub: 'work with columns', kind: 'symbol', color: PURPLE, icon: 'table', cell: [2, 0] },
    { id: 'to-cols', label: 'sort · uniq · cut', sub: 'reshape & dedupe', kind: 'symbol', color: TEAL, icon: 'layers', cell: [0, 1] },
    { id: 'to-count', label: 'wc · tr', sub: 'count & translate', kind: 'symbol', color: ORANGE, icon: 'scroll', cell: [1, 1] },
    { id: 'to-find', label: 'find · xargs', sub: 'locate files & act', kind: 'symbol', color: RED, icon: 'share', cell: [2, 1] },
  ],
  edges: [], // tools you pipe together — composition is the story
}
