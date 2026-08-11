import { type SceneSpec, ORANGE } from 'reveal-engine'

// Course 6 §7 — scheduling on a whole-canvas `code` card: cron's five fields, common schedules, and
// the systemd-timer alternative. Short lines keep the auto-fit font large at 4K.
export const scheduling: SceneSpec = {
  id: 'scheduling',
  title: 'Scheduling: cron & timers',
  canvas: { width: 1560, height: 1220 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'sc-all', kind: 'code', filename: 'cron.sh', color: ORANGE, cell: [0, 0],
      label: [
        '# cron: run a command on a repeating schedule',
        'crontab -e            # edit YOUR crontab',
        'crontab -l            # list it',
        '',
        '# five time fields, then the command:',
        '#   min  hour  day-of-month  month  day-of-week',
        '#    *    *      *            *      *      = every',
        '0 2 * * *    /opt/backup.sh        # daily at 02:00',
        '*/15 * * * * /usr/bin/check.sh     # every 15 minutes',
        '0 9 * * 1    /opt/weekly-report.sh # 09:00 every Monday',
        '',
        '# gotcha: cron runs with a MINIMAL environment',
        '#   → use absolute paths; redirect output to a log',
        '',
        '# system-wide: /etc/crontab, /etc/cron.d/',
        '# one-off:   echo ./task.sh | at 15:00',
        '# modern:    systemd .timer units (journald logging)',
      ].join('\n'),
    },
  ],
  edges: [],
}
