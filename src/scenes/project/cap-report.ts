import type { Scene } from '../../render-engine'
import { stagesBoard } from './stages'

// §6 report — a here-doc looks almost exactly like the output it produces, which is the reason the
// section gives for using one, and you can only judge that by seeing them adjacent. `report | emit` is
// the smallest possible pipeline: generate once, then route — the streams idea from Course 2.
export const capReport: Scene = {
  id: 'cap-report',
  nodes: [
    stagesBoard(),
    {
      id: 'report',
      kind: 'code',
      filename: 'sysreport.sh — report and emit',
      label: [
        'report() { cat <<EOF',
        'sysreport for $(hostname) at $(date +"%F %T")',
        '',
        '== uptime ==      $(collect_uptime)',
        '== disk alerts == $(disk_alerts)',
        '== top cpu ==     $(top_cpu)',
        '== top errors ==  $(top_errors)',
        'EOF',
        '}',
        '',
        'emit() {                          # honour -o from stage 2',
        '    if [[ "$OUTPUT" == "-" ]]; then cat; else cat > "$OUTPUT"; fi',
        '}',
        '',
        'report | emit                     # generated once, then routed',
      ].join('\n'),
    },
  ],
  edges: [],
}
