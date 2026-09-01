import type { Scene } from '../../render-engine'
import { stagesBoard } from './stages'

// §2 structure — a runnable stub on day one, then grown. The card is deliberately short: the point of
// this stage is that a working skeleton beats 200 unrun lines, and a long card would contradict it.
export const capStructure: Scene = {
  id: 'cap-structure',
  nodes: [
    stagesBoard(),
    {
      id: 'skeleton',
      kind: 'code',
      filename: 'sysreport.sh',
      label: [
        '#!/usr/bin/env bash',
        'set -euo pipefail',
        '',
        'readonly VERSION="1.0.0"',
        'readonly SCRIPT="${0##*/}"      # strips the path off $0',
        '',
        'main() {',
        '    echo "$SCRIPT $VERSION"     # it RUNS today, and grows',
        '}',
        '',
        'main "$@"',
      ].join('\n'),
    },
  ],
  edges: [],
}
