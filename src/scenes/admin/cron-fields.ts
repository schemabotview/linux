import type { Scene } from '../../render-engine'

// §7 scheduling — five time fields only make sense in column alignment, so this is a code card with the
// header comment lined up over real schedules. The two things that bite come after: cron's bare
// environment (the classic gotcha) and the modern alternative.
export const cronFields: Scene = {
  id: 'cron-fields',
  nodes: [
    {
      id: 'crontab',
      kind: 'code',
      filename: 'crontab -e',
      label: [
        '# min  hour  dom  mon  dow   command',
        '   0     2    *    *    *    /opt/backup.sh    # 02:00 daily',
        ' */15    *    *    *    *    /opt/check.sh     # every 15 min',
        '   0     9    *    *    1    /opt/report.sh    # 09:00 Mondays',
        '',
        '# * is every · */15 is every 15th · a number pins it',
      ].join('\n'),
    },
    {
      id: 'two',
      label: 'Two things to know before you trust it',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'cf-env', label: 'A bare environment', sub: 'no login PATH — use absolute paths', pattern: 'warn', icon: 'ban' },
        { id: 'cf-timer', label: 'systemd timers', sub: 'logged, and catch up missed runs', pattern: 'service', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'crontab', target: 'two', label: 'redirect the output to a log too, or you will never see the errors' },
  ],
}
