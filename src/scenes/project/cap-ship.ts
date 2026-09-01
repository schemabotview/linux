import type { Scene } from '../../render-engine'
import { stagesBoard } from './stages'

// §10 ship — the installer automates by hand-work done in earlier stages, which is the neat closing
// move. The band is the section's own definition of "shipped": the difference between works-on-my-
// machine and someone-else-can-run-it, which is four concrete artefacts and not a feeling.
export const capShip: Scene = {
  id: 'cap-ship',
  nodes: [
    stagesBoard(),
    {
      id: 'install',
      kind: 'code',
      filename: 'install.sh',
      label: [
        '#!/usr/bin/env bash',
        'set -euo pipefail',
        '',
        '# copy AND set the mode in one step — Course 3',
        'install -m 755 sysreport.sh /usr/local/bin/sysreport',
        '',
        'install -m 644 sysreport.service /etc/systemd/system/',
        'install -m 644 sysreport.timer   /etc/systemd/system/',
        '',
        'systemctl daemon-reload',
        'systemctl enable --now sysreport.timer',
      ].join('\n'),
    },
    {
      id: 'shipped',
      label: 'What “shipped” actually means',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'sh-readme', label: 'A README', sub: 'what, why, how', variant: 'tile', pattern: 'user', icon: 'scroll' },
        { id: 'sh-lint', label: 'shellcheck clean', sub: 'no known footguns', variant: 'tile', pattern: 'service', icon: 'shieldcheck' },
        { id: 'sh-version', label: 'A VERSION', sub: 'set, and bumped', variant: 'tile', pattern: 'network', icon: 'tag' },
        { id: 'sh-exits', label: 'Exit codes', sub: 'documented, so it scripts', variant: 'tile', pattern: 'network', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [],
}
