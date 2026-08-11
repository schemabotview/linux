import { type SceneSpec, PURPLE } from 'reveal-engine'

// Course 8 §5 — stage-4: turn raw data into insight with the text toolkit (Course 5). Whole-canvas
// `code`; short lines keep the auto-fit font large at 4K.
export const capTransform: SceneSpec = {
  id: 'cap-transform',
  title: 'Stage 4 — Transform',
  canvas: { width: 1580, height: 1240 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'ct-all', kind: 'code', filename: 'sysreport.sh', color: PURPLE, cell: [0, 0],
      label: [
        '# raw data → insight, using the text toolkit (Course 5)',
        '',
        '# top 5 CPU users: keep %cpu and name',
        'top_cpu() {',
        "  collect_top_cpu | awk 'NR>1 {print $3, $2}'",
        '}',
        '',
        '# most frequent error SOURCES — the tally idiom',
        'top_errors() {',
        '  collect_errors \\',
        "    | awk '{print $5}' \\",
        '    | sort | uniq -c | sort -rn | head -5',
        '}',
        '',
        '# any mount over 90% full? flag it',
        'disk_alerts() {',
        "  df -h | awk 'NR>1 && $5+0 > 90 {print \"FULL:\", $6, $5}'",
        '}',
      ].join('\n'),
    },
  ],
  edges: [],
}
