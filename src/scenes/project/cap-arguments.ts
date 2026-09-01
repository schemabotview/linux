import type { Scene } from '../../render-engine'
import { stagesBoard } from './stages'

// §3 arguments — defaults first, flags second, and that order is the claim: the tool has to work with
// no arguments at all before any flag exists to override anything.
export const capArguments: Scene = {
  id: 'cap-arguments',
  nodes: [
    stagesBoard(),
    {
      id: 'args',
      kind: 'code',
      filename: 'sysreport.sh — arguments',
      label: [
        'LINES=20        # defaults FIRST: it works with no flags at all',
        'OUTPUT="-"      # our convention for "print to stdout"',
        'VERBOSE=0',
        '',
        'usage() { cat >&2 <<EOF',
        'usage: $SCRIPT [-n LINES] [-o FILE] [-v] [-h]',
        'EOF',
        '}',
        '',
        'while getopts "n:o:vh" opt; do   # : means it TAKES a value',
        '    case $opt in',
        '        n) LINES="$OPTARG" ;;',
        '        o) OUTPUT="$OPTARG" ;;',
        '        v) VERBOSE=1 ;;',
        '        h) usage; exit 0 ;;      # asked for: stdout, exit 0',
        '        *) usage; exit 1 ;;      # got it wrong: stderr, exit 1',
        '    esac',
        'done',
      ].join('\n'),
    },
  ],
  edges: [],
}
