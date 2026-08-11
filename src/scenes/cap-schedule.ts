import { type SceneSpec, YELLOW } from 'reveal-engine'

// Course 8 §7 — stage-6: schedule the tool, cron and the systemd-timer way (Course 6). Whole-canvas
// `code`; short lines keep the auto-fit font large at 4K.
export const capSchedule: SceneSpec = {
  id: 'cap-schedule',
  title: 'Stage 6 — Schedule',
  canvas: { width: 1560, height: 1200 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'ch-all', kind: 'code', filename: 'sysreport.timer', color: YELLOW, cell: [0, 0],
      label: [
        '# run it every morning at 07:00 — two ways (Course 6)',
        '',
        '# 1) cron — one line in  crontab -e :',
        '#   0 7 * * *  /usr/local/bin/sysreport \\',
        '#              -o /var/log/sysreport.txt',
        '',
        '# 2) a systemd timer — sysreport.timer:',
        '[Unit]',
        'Description=Daily system report',
        '',
        '[Timer]',
        'OnCalendar=*-*-* 07:00:00',
        'Persistent=true      # catch up if the box was off',
        '',
        '[Install]',
        'WantedBy=timers.target',
      ].join('\n'),
    },
  ],
  edges: [],
}
