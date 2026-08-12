import { type SceneSpec, BLUE, GREEN, PURPLE, TEAL, GRAY, RED } from 'reveal-engine'

// Course 5 §9 — "which tool when?" is a DECISION, so it's drawn as a control-flow fork, not a board.
// One question branches to the tool whose sweet spot fits the job; left→right runs simplest →
// more powerful (grep < sed < awk), the course's guiding rule. Replaces the peer board's §9 use.
//
//                       what are you doing to the text?
//        ┌────────┬──────────────┬────────────────┬──────────────┬──────────────┐
//      grep       sed            awk           sort·uniq·cut    find·xargs
export const toolDecision: SceneSpec = {
  id: 'tool-decision',
  title: 'Which tool when?',
  canvas: { width: 1060, height: 520 },
  grid: { cols: [1, 1, 1, 1, 1], rows: [0.8, 1], gap: 0.28, padding: 0.3 },
  nodes: [
    { id: 'td-q', label: 'What are you doing to the text?', sub: 'reach for the simplest that works', kind: 'symbol', color: GRAY, icon: 'branch', cell: [1, 0, 3, 1] },
    { id: 'td-grep', label: 'grep', sub: 'find lines', kind: 'symbol', color: BLUE, icon: 'funnel', cell: [0, 1] },
    { id: 'td-sed', label: 'sed', sub: 'replace / delete lines', kind: 'symbol', color: GREEN, icon: 'gears', cell: [1, 1] },
    { id: 'td-awk', label: 'awk', sub: 'columns · math · totals', kind: 'symbol', color: PURPLE, icon: 'table', cell: [2, 1] },
    { id: 'td-cols', label: 'sort · uniq · cut', sub: 'reshape between stages', kind: 'symbol', color: TEAL, icon: 'layers', cell: [3, 1] },
    { id: 'td-find', label: 'find · xargs', sub: 'whole files, in bulk', kind: 'symbol', color: RED, icon: 'box', cell: [4, 1] },
  ],
  edges: [
    { from: 'td-q', to: 'td-grep' },
    { from: 'td-q', to: 'td-sed' },
    { from: 'td-q', to: 'td-awk' },
    { from: 'td-q', to: 'td-cols' },
    { from: 'td-q', to: 'td-find' },
  ],
}
