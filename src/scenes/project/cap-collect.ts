import type { Scene } from '../../render-engine'
import { stagesBoard } from './stages'

// §4 collect — one function per source, which is the stage's whole argument: each is named, testable
// and replaceable on its own, and gathering stays separate from interpreting. warn() goes to stderr for
// the reason established in Course 2 — status must never contaminate the report on stdout.
export const capCollect: Scene = {
  id: 'cap-collect',
  nodes: [
    stagesBoard(),
    {
      id: 'collect',
      kind: 'code',
      filename: 'sysreport.sh — collectors',
      label: [
        'collect_uptime()  { uptime; }',
        'collect_disk()    { df -h; }',
        'collect_memory()  { free -h; }',
        'collect_top_cpu() { ps -eo pcpu,comm --sort=-%cpu | head -6; }',
        'collect_errors()  { journalctl -p err -b --no-pager; }',
        '',
        'warn() { echo "$SCRIPT: $*" >&2; }   # status to STDERR only',
      ].join('\n'),
    },
  ],
  edges: [],
}
