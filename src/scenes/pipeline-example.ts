import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, GRAY, RED } from 'reveal-engine'

// Course 5 §8 — the payoff, drawn as flow: the slide's worked example (the top-5 IPs hitting a
// server) becomes the diagram. A raw access log streams through six small stages and narrows from ∞
// lines to 5. The subs read as the sentence "filter → extract → tally → rank → top". Laid out as a
// serpentine (4×2) so cards stay large and labels legible, rather than one over-long 8-wide row.
//
//   access.log ▶ grep " 500 " ▶ awk '{$1}' ▶ sort
//                                             ▼
//   top-5 IPs ◀ head -5 ◀ sort -rn ◀ uniq -c
export const pipelineExample: SceneSpec = {
  id: 'pipeline-example',
  title: 'A real pipeline: top-5 IPs',
  canvas: { width: 800, height: 480 },
  grid: { cols: [1, 1, 1, 1], rows: [1, 1], gap: 0.3, padding: 0.3 },
  nodes: [
    // row 0 left→right
    { id: 'pe-log', label: 'access.log', sub: 'raw log · ∞ lines', kind: 'symbol', color: GRAY, icon: 'scroll', cell: [0, 0] },
    { id: 'pe-grep', label: 'grep " 500 "', sub: 'filter to errors', kind: 'symbol', color: BLUE, icon: 'funnel', cell: [1, 0] },
    { id: 'pe-awk', label: "awk '{print $1}'", sub: 'extract the IP', kind: 'symbol', color: PURPLE, icon: 'table', cell: [2, 0] },
    { id: 'pe-sort1', label: 'sort', sub: 'group identical IPs', kind: 'symbol', color: TEAL, icon: 'layers', cell: [3, 0] },
    // curl down, row 1 right→left
    { id: 'pe-uniq', label: 'uniq -c', sub: 'tally each', kind: 'symbol', color: GREEN, icon: 'gears', cell: [3, 1] },
    { id: 'pe-sort2', label: 'sort -rn', sub: 'rank, most first', kind: 'symbol', color: ORANGE, icon: 'layers', cell: [2, 1] },
    { id: 'pe-head', label: 'head -5', sub: 'keep the top', kind: 'symbol', color: RED, icon: 'funnel', cell: [1, 1] },
    { id: 'pe-out', label: 'top-5 IPs', sub: '5 lines', kind: 'symbol', color: GRAY, icon: 'share', cell: [0, 1] },
  ],
  edges: [
    { from: 'pe-log', to: 'pe-grep' },
    { from: 'pe-grep', to: 'pe-awk' },
    { from: 'pe-awk', to: 'pe-sort1' },
    { from: 'pe-sort1', to: 'pe-uniq' },
    { from: 'pe-uniq', to: 'pe-sort2' },
    { from: 'pe-sort2', to: 'pe-head' },
    { from: 'pe-head', to: 'pe-out' },
  ],
}
