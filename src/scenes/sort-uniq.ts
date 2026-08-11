import { type SceneSpec, TEAL } from 'reveal-engine'

// Course 5 §6 — the reshaping tools on a whole-canvas `code` card: cut (columns), sort (order),
// uniq (dedupe adjacent), wc (count), tr (translate). The classic "sort | uniq -c | sort -rn"
// tally idiom lives here. Short lines keep the auto-fit font large at 4K.
export const sortUniq: SceneSpec = {
  id: 'sort-uniq',
  title: 'cut · sort · uniq · wc · tr',
  canvas: { width: 1560, height: 1300 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'su-all', kind: 'code', filename: 'reshape.sh', color: TEAL, cell: [0, 0],
      label: [
        '# cut: pull out columns',
        'cut -d, -f1,3 data.csv    # fields 1 & 3 (comma-sep)',
        'cut -c1-8    file         # characters 1-8',
        '',
        '# sort: order the lines',
        'sort file                 # alphabetical',
        'sort -n nums              # -n numeric',
        'sort -rn -k2 data         # reverse, numeric, by col 2',
        '',
        '# uniq: collapse ADJACENT dups — so SORT first!',
        'sort file | uniq          # unique lines',
        'sort file | uniq -c       # -c prefix each with a count',
        '',
        '# the classic "top N" idiom:',
        'sort access.log | uniq -c | sort -rn | head',
        '',
        '# wc: count   ·   tr: translate / delete chars',
        'wc -l file                # -l count lines',
        "tr 'a-z' 'A-Z' < file     # upper-case",
        "tr -d ' '     < file      # delete all spaces",
      ].join('\n'),
    },
  ],
  edges: [],
}
