import { type SceneSpec, GREEN } from 'reveal-engine'

// Course 8 §8 — stage-7: the systemd service the timer triggers (Course 6). Whole-canvas `code`;
// short lines keep the auto-fit font large at 4K.
export const capService: SceneSpec = {
  id: 'cap-service',
  title: 'Stage 7 — Service',
  canvas: { width: 1560, height: 1240 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'cv-all', kind: 'code', filename: 'sysreport.service', color: GREEN, cell: [0, 0],
      label: [
        '# the service the timer triggers — sysreport.service',
        '[Unit]',
        'Description=System health report',
        'After=network.target',
        '',
        '[Service]',
        'Type=oneshot          # runs once, then exits',
        'ExecStart=/usr/local/bin/sysreport -o /var/log/sysreport.txt',
        'User=root',
        'Nice=10               # be polite to the box (Course 4)',
        '',
        '# wire it up and test:',
        '#   sudo systemctl daemon-reload',
        '#   sudo systemctl enable --now sysreport.timer',
        '#   systemctl status sysreport.service',
        '#   journalctl -u sysreport.service   # its output',
      ].join('\n'),
    },
  ],
  edges: [],
}
