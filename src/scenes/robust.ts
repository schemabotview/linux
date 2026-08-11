import { type SceneSpec, RED } from 'reveal-engine'

// Course 7 §7–§8 — robustness on a whole-canvas `code` card: the safety header, traps for cleanup,
// getopts for options, and debugging (bash -x, shellcheck). Short lines keep the auto-fit font
// large at 4K.
export const robust: SceneSpec = {
  id: 'robust',
  title: 'Robust scripts',
  canvas: { width: 1580, height: 1320 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'rb-all', kind: 'code', filename: 'robust.sh', color: RED, cell: [0, 0],
      label: [
        '#!/usr/bin/env bash',
        'set -euo pipefail    # the essential safety header:',
        '#   -e  exit the moment any command fails',
        '#   -u  error on an UNSET variable (catches typos)',
        '#   -o pipefail  a failing stage fails the whole pipe',
        '',
        '# clean up on ANY exit — success, error, or Ctrl-C',
        'tmp=$(mktemp)',
        "trap 'rm -f \"$tmp\"' EXIT",
        '',
        '# parse options the proper way, with getopts',
        'verbose=0; file=""',
        'while getopts "vf:" opt; do',
        '  case $opt in',
        '    v) verbose=1 ;;',
        '    f) file="$OPTARG" ;;',
        '    *) echo "usage: $0 [-v] [-f FILE]" >&2; exit 1 ;;',
        '  esac',
        'done',
        '',
        '# debug:  bash -x script.sh   (trace each line)',
        '# lint EVERY script:  shellcheck script.sh',
      ].join('\n'),
    },
  ],
  edges: [],
}
