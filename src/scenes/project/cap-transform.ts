import type { Scene } from '../../render-engine'
import { stagesBoard } from './stages'

// §5 transform — the payoff stage, and the one the narration calls the star. top_errors is literally
// the tally pipeline from Course 5, unchanged; showing it here rather than describing it is the point,
// because the claim is that the thing you already learned IS the tool's most valuable function.
export const capTransform: Scene = {
  id: 'cap-transform',
  nodes: [
    stagesBoard(),
    {
      id: 'transform',
      kind: 'code',
      filename: 'sysreport.sh — transformers',
      label: [
        'top_cpu() {          # keep just the %cpu and the name',
        "    collect_top_cpu | awk 'NR>1 {print $1\"%\", $2}'",
        '}',
        '',
        'top_errors() {       # the Course 5 tally, unchanged',
        "    collect_errors | awk '{print $5}' \\",
        '        | sort | uniq -c | sort -rn | head -5',
        '}',
        '',
        'disk_alerts() {      # $5+0 forces a NUMERIC compare on use%',
        "    collect_disk | awk '$5+0 > 90 {print $6, $5}'",
        '}',
      ].join('\n'),
    },
  ],
  edges: [],
}
