import { type SceneSpec, GRAY } from 'reveal-engine'

// Course 8 §10 — stage-9: install it where the system can find it, and what "shipped" means.
// Whole-canvas `code`; short lines keep the auto-fit font large at 4K.
export const capShip: SceneSpec = {
  id: 'cap-ship',
  title: 'Stage 9 — Ship',
  canvas: { width: 1560, height: 1240 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'cp-all', kind: 'code', filename: 'install.sh', color: GRAY, cell: [0, 0],
      label: [
        '#!/usr/bin/env bash',
        'set -euo pipefail',
        '',
        '# put each file where the system expects it',
        '# install: copy + set permissions in one step (Course 3)',
        'sudo install -m 755 sysreport.sh /usr/local/bin/sysreport',
        'sudo install -m 644 sysreport.service /etc/systemd/system/',
        'sudo install -m 644 sysreport.timer   /etc/systemd/system/',
        '',
        'sudo systemctl daemon-reload',
        'sudo systemctl enable --now sysreport.timer',
        'echo "installed — try:  sysreport -h"',
        '',
        '# "shipped" also means:',
        '#   • a README (what/why/usage)',
        '#   • shellcheck-clean, VERSION set',
        '#   • exit codes documented.   Done.',
      ].join('\n'),
    },
  ],
  edges: [],
}
