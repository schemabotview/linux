import { type SceneSpec, ORANGE } from 'reveal-engine'

// Course 7 §6 — functions on a whole-canvas `code` card: define, local scope, args, exit-code vs
// echoed data return, logging to stderr. Short lines keep the auto-fit font large at 4K.
export const functions: SceneSpec = {
  id: 'functions',
  title: 'Functions',
  canvas: { width: 1560, height: 1280 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'fn-all', kind: 'code', filename: 'functions.sh', color: ORANGE, cell: [0, 0],
      label: [
        '# define a function — a reusable named block',
        'greet() {',
        '  local name="$1"      # local: scope to this function',
        '  echo "Hello, $name"',
        '}',
        'greet "Sam"            # call it — args just like a script',
        '',
        '# functions RETURN AN EXIT CODE (0-255), not a value',
        'is_root() { [[ $EUID -eq 0 ]]; }',
        'if is_root; then echo "running as root"; fi',
        '',
        '# to return DATA: echo it, capture with $( )',
        'timestamp() { date +%F_%T; }',
        'now=$(timestamp)',
        '',
        '# inside a function: $1 $@ $# work like a script',
        '# log to stderr so it never pollutes captured output',
        'log() { echo "[$(date +%T)] $*" >&2; }',
      ].join('\n'),
    },
  ],
  edges: [],
}
