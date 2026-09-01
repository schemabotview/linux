import type { Scene } from '../../render-engine'

// §8 args-debug — the polish that turns a personal script into one you can hand over. getopts is the
// card; the two debugging tools are a pair below it because the section's own framing is that you need
// a PLAN for when it breaks, not just a habit while writing it.
export const optionsAndDebug: Scene = {
  id: 'options-and-debug',
  nodes: [
    {
      id: 'getopts-code',
      kind: 'code',
      filename: 'getopts',
      label: [
        'usage() { echo "usage: $0 [-v] [-f FILE]" >&2; exit 1; }',
        '',
        'verbose=0',
        'while getopts "vf:h" opt; do      # the : means -f TAKES a value',
        '    case $opt in',
        '        v) verbose=1 ;;',
        '        f) file="$OPTARG" ;;',
        '        h|*) usage ;;',
        '    esac',
        'done',
      ].join('\n'),
    },
    {
      id: 'debug',
      label: 'And a plan for when it breaks',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'db-x', label: 'bash -x', sub: 'trace each line, expanded', pattern: 'network', icon: 'bug' },
        { id: 'db-shellcheck', label: 'shellcheck', sub: 'run it on everything', pattern: 'service', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [
    { source: 'getopts-code', target: 'debug', label: 'shellcheck catches quoting bugs and unset variables before they bite — bash -x is for when one already has' },
  ],
}
