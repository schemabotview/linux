import { type SceneSpec, BLUE } from 'reveal-engine'

// Course 8 §2 — the capstone's stage-1 scene: project structure, shebang, safety header, a growable
// main(). Whole-canvas `code`; short lines keep the auto-fit font large at 4K.
export const capStructure: SceneSpec = {
  id: 'cap-structure',
  title: 'Stage 1 — Structure',
  canvas: { width: 1560, height: 1280 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'cx-all', kind: 'code', filename: 'sysreport.sh', color: BLUE, cell: [0, 0],
      label: [
        '#!/usr/bin/env bash',
        '# sysreport — a system health + log summary tool',
        'set -euo pipefail          # safety header (Course 7)',
        '',
        '# the project, laid out:',
        '#   sysreport.sh        the script itself',
        '#   sysreport.service   systemd unit   (Course 6)',
        '#   sysreport.timer     the schedule',
        '#   install.sh          the installer',
        '',
        'readonly VERSION="1.0.0"',
        'readonly SCRIPT="${0##*/}"   # our own name, no path',
        '',
        '# a stub we will grow, stage by stage:',
        'main() {',
        '  echo "sysreport $VERSION"',
        '}',
        'main "$@"                    # run, passing all args',
      ].join('\n'),
    },
  ],
  edges: [],
}
