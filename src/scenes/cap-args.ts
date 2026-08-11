import { type SceneSpec, TEAL } from 'reveal-engine'

// Course 8 §3 — stage-2: defaults + getopts + usage. Whole-canvas `code`; short lines keep the
// auto-fit font large at 4K.
export const capArgs: SceneSpec = {
  id: 'cap-args',
  title: 'Stage 2 — Arguments',
  canvas: { width: 1560, height: 1300 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'ca-all', kind: 'code', filename: 'sysreport.sh', color: TEAL, cell: [0, 0],
      label: [
        '# sensible defaults — overridable by flags',
        'LINES=20          # how many log lines to summarize',
        'OUTPUT="-"        # "-" = stdout, else a file path',
        'VERBOSE=0',
        '',
        'usage() {',
        '  cat <<EOF',
        'Usage: $SCRIPT [-n LINES] [-o FILE] [-v] [-h]',
        '  -n  log lines to show   (default $LINES)',
        '  -o  write to FILE       (default: stdout)',
        '  -v  verbose      -h  help',
        'EOF',
        '}',
        '',
        'while getopts "n:o:vh" opt; do   # : = takes a value',
        '  case $opt in',
        '    n) LINES="$OPTARG" ;;',
        '    o) OUTPUT="$OPTARG" ;;',
        '    v) VERBOSE=1 ;;',
        '    h) usage; exit 0 ;;',
        '    *) usage >&2; exit 1 ;;',
        '  esac',
        'done',
      ].join('\n'),
    },
  ],
  edges: [],
}
