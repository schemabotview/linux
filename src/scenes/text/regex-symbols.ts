import type { Scene } from '../../render-engine'

// §3 regex — a metacharacter is a symbol, a meaning and an example, which is a row; the table lets you
// read down the symbol column the way you would a reference card. The card below is the payoff: three
// real patterns decoded, including the escaped dot that catches everyone.
export const regexSymbols: Scene = {
  id: 'regex-symbols',
  nodes: [
    {
      id: 'symbols',
      kind: 'table',
      label: 'A regex describes a SHAPE, not a fixed string',
      pattern: 'service',
      headers: ['symbol', 'matches', 'example'],
      values: [
        ['.', 'any one character', 'a.c'],
        ['\\.', 'a literal dot — backslash escapes', 'file\\.txt'],
        ['^  $', 'start of line, end of line', '^ERROR'],
        ['*  +  ?', '0 or more, 1 or more, 0 or 1', 'colou?r'],
        ['[abc]', 'any one of a set; [^…] not these', '[0-9]'],
        ['{3}', 'exactly three of the previous', '[0-9]{3}'],
        ['a|b', 'either one', 'cat|dog'],
      ],
    },
    {
      id: 'reading',
      kind: 'code',
      filename: 'reading real patterns',
      label: [
        '^ERROR              a line that STARTS WITH ERROR',
        '[0-9]{3}-[0-9]{4}   three digits, a dash, four digits',
        'HTTP/1\\.[01]        HTTP/1.0 or HTTP/1.1 — note the escaped dot',
      ].join('\n'),
    },
  ],
  edges: [
    { source: 'symbols', target: 'reading', label: 'one language, and it powers grep -E, sed, awk and half your editor' },
  ],
}
