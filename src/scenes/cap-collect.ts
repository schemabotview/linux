import { type SceneSpec, GREEN } from 'reveal-engine'

// Course 8 §4 — stage-3: gather raw system facts, each in a small function. Whole-canvas `code`;
// short lines keep the auto-fit font large at 4K.
export const capCollect: SceneSpec = {
  id: 'cap-collect',
  title: 'Stage 3 — Collect',
  canvas: { width: 1560, height: 1260 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'cc-all', kind: 'code', filename: 'sysreport.sh', color: GREEN, cell: [0, 0],
      label: [
        '# gather raw facts — one small function each',
        '# (each just runs a command from earlier courses)',
        'collect_uptime()  { uptime; }',
        'collect_disk()    { df -h; }',
        'collect_memory()  { free -h; }',
        '',
        '# top processes by CPU (Course 4)',
        'collect_top_cpu() {',
        '  ps -eo pid,comm,%cpu --sort=-%cpu | head -6',
        '}',
        '',
        '# recent errors from the journal (Course 6)',
        'collect_errors() {',
        '  journalctl -p err -b --no-pager 2>/dev/null \\',
        '    | tail -n "$LINES"',
        '}',
        '',
        '# helper: warn to STDERR, never into the report',
        'warn() { echo "[$SCRIPT] $*" >&2; }',
      ].join('\n'),
    },
  ],
  edges: [],
}
