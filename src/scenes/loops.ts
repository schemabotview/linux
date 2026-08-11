import { type SceneSpec, GREEN } from 'reveal-engine'

// Course 7 §5 — loops on a whole-canvas `code` card: for over lists/globs, while, the read-a-file
// idiom, until, break/continue. Short lines keep the auto-fit font large at 4K.
export const loops: SceneSpec = {
  id: 'loops',
  title: 'Loops',
  canvas: { width: 1560, height: 1300 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'lp-all', kind: 'code', filename: 'loops.sh', color: GREEN, cell: [0, 0],
      label: [
        '# for: iterate a list — words, a glob, or output',
        'for f in *.log; do',
        '  echo "processing $f"',
        '  gzip "$f"           # quote "$f" — spaces!',
        'done',
        '',
        'for i in {1..5}; do echo "$i"; done   # a range',
        '',
        '# while: repeat while a command SUCCEEDS',
        'n=0',
        'while (( n < 3 )); do',
        '  echo "$n"; n=$(( n + 1 ))',
        'done',
        '',
        '# THE idiom for reading a file line by line:',
        'while IFS= read -r line; do',
        '  echo ">> $line"',
        'done < input.txt',
        '',
        '# until: loop until success ; break / continue',
        'until ping -c1 host &>/dev/null; do sleep 1; done',
      ].join('\n'),
    },
  ],
  edges: [],
}
