import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, GRAY, RED } from 'reveal-engine'

// Course 5's SPINE — the Unix philosophy drawn as what it actually is: one text stream flowing
// through small, composable filters, joined by pipes. Replaces the old `text-overview` peer board,
// which hid the whole point (composition). stdin enters on the left, the toolkit transforms it
// stage by stage (filter → edit → fields → reshape → count), stdout leaves on the right; the pipe
// edges animate a dot = data moving. Left→right is canonical ROLE order, not a mandatory sequence.
// find·xargs feeds the front of the pipe (it produces the files/names to read). Laid out as a
// serpentine so cards stay large and labels legible, rather than one over-long row: find·xargs sits
// in its own top row feeding down into stdin, then the stream snakes across rows 2–3.
//
//   find·xargs
//        ▼
//   stdin ▶ grep ▶ sed ▶ awk
//                         ▼
//   stdout ◀ wc·tr ◀ sort·uniq·cut
export const textPipeline: SceneSpec = {
  id: 'text-pipeline',
  title: 'The text-processing pipeline',
  canvas: { width: 800, height: 640 },
  grid: { cols: [1, 1, 1, 1], rows: [1, 1, 1], gap: 0.3, padding: 0.3 },
  nodes: [
    // the feeder: find·xargs produces the input the pipe reads (own top row, above stdin)
    { id: 'tp-find', label: 'find · xargs', sub: 'locate files → feed the pipe', kind: 'symbol', color: RED, icon: 'box', cell: [0, 0] },
    // the stream snakes: row 1 left→right, curls down, row 2 right→left
    { id: 'tp-stdin', label: 'stdin', sub: 'a file or a pipe', kind: 'symbol', color: GRAY, icon: 'stream', cell: [0, 1] },
    { id: 'tp-grep', label: 'grep', sub: 'filter lines', kind: 'symbol', color: BLUE, icon: 'funnel', cell: [1, 1] },
    { id: 'tp-sed', label: 'sed', sub: 'edit lines', kind: 'symbol', color: GREEN, icon: 'gears', cell: [2, 1] },
    { id: 'tp-awk', label: 'awk', sub: 'fields & math', kind: 'symbol', color: PURPLE, icon: 'table', cell: [3, 1] },
    { id: 'tp-cols', label: 'sort · uniq · cut', sub: 'reshape & dedupe', kind: 'symbol', color: TEAL, icon: 'layers', cell: [3, 2] },
    { id: 'tp-count', label: 'wc · tr', sub: 'count & translate', kind: 'symbol', color: ORANGE, icon: 'scroll', cell: [2, 2] },
    { id: 'tp-stdout', label: 'stdout', sub: 'screen · file · next  |', kind: 'symbol', color: GRAY, icon: 'share', cell: [1, 2] },
  ],
  edges: [
    { from: 'tp-stdin', to: 'tp-grep' },
    { from: 'tp-grep', to: 'tp-sed' },
    { from: 'tp-sed', to: 'tp-awk' },
    { from: 'tp-awk', to: 'tp-cols' },
    { from: 'tp-cols', to: 'tp-count' },
    { from: 'tp-count', to: 'tp-stdout' },
    { from: 'tp-find', to: 'tp-stdin' }, // find feeds the front of the pipe
  ],
}
