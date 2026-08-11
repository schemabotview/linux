import { type SceneSpec, BLUE } from 'reveal-engine'

// Course 7 §2–§3 — script anatomy on a whole-canvas `code` card: shebang, the exec bit, variables,
// arguments, substitution. Short lines keep the auto-fit font large at 4K.
export const scriptBasics: SceneSpec = {
  id: 'script-basics',
  title: 'Shebang, variables & arguments',
  canvas: { width: 1560, height: 1300 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'sb-all', kind: 'code', filename: 'backup.sh', color: BLUE, cell: [0, 0],
      label: [
        '#!/usr/bin/env bash        # shebang: which interpreter',
        '# save this, then make it runnable & run it:',
        '#   chmod +x backup.sh   →   ./backup.sh',
        '',
        'name="Sam"                 # assign: NO spaces around =',
        'echo "Hello, $name"        # expand with $  (quote it!)',
        'today=$(date +%F)          # command substitution',
        'count=$(( 2 + 3 ))         # arithmetic',
        '',
        '# the arguments the script was called with:',
        'echo "$1"    # first arg      ./backup.sh  A  B',
        'echo "$@"    # ALL args, each properly quoted',
        'echo "$#"    # how many args were given',
        'echo "$0"    # the script\'s own name',
        '',
        '# ask the user (-r raw, -p prompt)',
        'read -r -p "Continue? " answer',
      ].join('\n'),
    },
  ],
  edges: [],
}
