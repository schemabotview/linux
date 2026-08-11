import { type SceneSpec, RED } from 'reveal-engine'

// Course 5 §7 — find & xargs on a whole-canvas `code` card. find walks the tree by test and acts;
// xargs turns a list on stdin into command arguments. Short lines keep the auto-fit font large at 4K.
export const findXargs: SceneSpec = {
  id: 'find-xargs',
  title: 'find · xargs — locate & act',
  canvas: { width: 1580, height: 1260 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'fx-all', kind: 'code', filename: 'find.sh', color: RED, cell: [0, 0],
      label: [
        '# find: walk the tree, keep what matches a TEST',
        "find . -name '*.log'          # by name (glob)",
        'find /var -type f -size +100M # files over 100 MB',
        'find . -mtime -7              # modified in last 7 days',
        'find . -type d -empty         # empty directories',
        '',
        '# then ACT: -delete, or -exec a command per match',
        "find . -name '*.tmp' -delete",
        "find . -name '*.py' -exec grep -l TODO {} \\;",
        '#   {} = each match   \\; = end of the -exec command',
        '',
        '# xargs: turn a LIST on stdin into ARGUMENTS',
        "find . -name '*.log' | xargs gzip     # gzip each one",
        'grep -rl TODO . | xargs wc -l',
        '',
        '# filenames with spaces? pair -print0 with -0',
        "find . -name '*.log' -print0 | xargs -0 rm",
      ].join('\n'),
    },
  ],
  edges: [],
}
