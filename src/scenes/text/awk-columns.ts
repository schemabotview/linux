import type { Scene } from '../../render-engine'

// §5 awk — the variables come first because everything below is unreadable without them, and they are
// a two-column reference, so: a table. The section's own claim is that awk is the one that thinks
// across lines, so the accumulating examples are the last two lines of the card, where they land.
export const awkColumns: Scene = {
  id: 'awk-columns',
  nodes: [
    {
      id: 'vars',
      kind: 'table',
      label: 'awk splits every line for you, free',
      sub: 'on whitespace by default; -F sets your own separator',
      pattern: 'service',
      headers: ['variable', 'what it holds'],
      values: [
        ['$0', 'the whole line'],
        ['$1  $2  $3', 'the fields, left to right'],
        ['$NF', 'the LAST field, whatever its number'],
        ['NR', 'the row number so far'],
      ],
    },
    {
      id: 'awk-code',
      kind: 'code',
      filename: 'awk',
      label: [
        "awk '{print $1, $NF}'              # first column and last",
        "awk -F: '{print $1}' /etc/passwd   # a custom separator",
        '',
        "awk '$3 > 500'                     # condition alone: matching rows",
        "awk '/ERROR/ {print $5}'           # condition { action }",
        '',
        "awk '{sum += $2} END {print sum}'  # total a column",
        "awk '{c[$1]++} END {for (k in c) print c[k], k}'  # count per key",
      ].join('\n'),
    },
  ],
  edges: [
    { source: 'vars', target: 'awk-code', label: 'grep and sed think in LINES; awk thinks in columns and running totals — a spreadsheet in a pipe' },
  ],
}
