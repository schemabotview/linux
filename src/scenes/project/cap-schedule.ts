import type { Scene } from '../../render-engine'
import { stagesBoard } from './stages'

// §7 schedule — two ways to do the same thing, so both are on the card and the band names the one
// difference that decides between them. Persistent=true is not a detail: it is the entire reason to
// prefer a timer on a machine that is ever switched off.
export const capSchedule: Scene = {
  id: 'cap-schedule',
  nodes: [
    stagesBoard(),
    {
      id: 'sched',
      kind: 'code',
      filename: 'two ways to run it at 07:00',
      label: [
        '# the cron way — one line, absolute paths, output to a file',
        '0 7 * * * /usr/local/bin/sysreport -o /var/log/sysreport.txt',
        '',
        '# the systemd way — sysreport.timer',
        '[Timer]',
        'OnCalendar=*-*-* 07:00:00',
        'Persistent=true',
      ].join('\n'),
    },
    {
      id: 'diff',
      label: 'The difference that decides it',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'sc-cron', label: 'cron', sub: 'box was off at 07:00? skipped', pattern: 'warn', icon: 'ban' },
        { id: 'sc-timer', label: 'A .timer', sub: 'runs it at the next boot', pattern: 'service', icon: 'repeat' },
      ],
    },
  ],
  edges: [],
}
