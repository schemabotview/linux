import { type SceneSpec, PURPLE } from 'reveal-engine'

// Course 5 §5 — awk on a whole-canvas `code` card. A small language for columns: fields, conditions,
// and cross-line accumulation (its killer feature). Short lines keep the auto-fit font large at 4K.
export const awk: SceneSpec = {
  id: 'awk',
  title: 'awk — work in columns',
  canvas: { width: 1580, height: 1300 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'ak-all', kind: 'code', filename: 'awk.sh', color: PURPLE, cell: [0, 0],
      label: [
        '# awk splits each line into FIELDS automatically:',
        '#   $1 $2 ... $NF (last)   $0 = whole line   NR = row #',
        "awk '{print $1}'      access.log   # first column",
        "awk '{print $1, $NF}' file         # first + last",
        "awk -F: '{print $1}'  /etc/passwd  # -F: set separator",
        '',
        '# a pattern/condition, then an action in { }',
        "awk '$3 > 500'            data     # rows where col3 > 500",
        "awk '/ERROR/ {print $5}'  app.log  # matched rows → col5",
        "awk 'NR==1 || $2==\"OK\"'   report",
        '',
        '# the killer feature: ACCUMULATE across all lines',
        "awk '{sum += $2} END {print sum}' sales   # total a column",
        "awk '{c[$1]++} END {for (k in c) print c[k], k}' access.log",
        '#      ^ count requests per IP, then print the tallies',
      ].join('\n'),
    },
  ],
  edges: [],
}
