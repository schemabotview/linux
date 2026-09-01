import type { Scene } from '../../render-engine'
import { stagesBoard } from './stages'

// §8 service — a timer needs something to trigger, and every line of this unit is a callback: oneshot
// because a report is not a daemon, Nice=10 from Course 4, and enable rather than start from Course 6.
// Its output needs no log wiring at all, for the reason journald gave us in that same course.
export const capService: Scene = {
  id: 'cap-service',
  nodes: [
    stagesBoard(),
    {
      id: 'unit',
      kind: 'code',
      filename: 'sysreport.service',
      label: [
        '[Unit]',
        'Description=System health report',
        'After=network.target',
        '',
        '[Service]',
        'Type=oneshot          # runs once and exits — not a daemon',
        'ExecStart=/usr/local/bin/sysreport -o /var/log/sysreport.txt',
        'User=root',
        'Nice=10               # polite priority — Course 4',
        '',
        '# sudo systemctl daemon-reload',
        '# sudo systemctl enable --now sysreport.timer',
        '# journalctl -u sysreport.service   <- stdout, captured free',
      ].join('\n'),
    },
  ],
  edges: [],
}
