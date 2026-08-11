import { type SceneSpec, ORANGE } from 'reveal-engine'

// Course 8 §6 — stage-5: assemble a clean sectioned report, honoring -o. Whole-canvas `code`; short
// lines keep the auto-fit font large at 4K.
export const capReport: SceneSpec = {
  id: 'cap-report',
  title: 'Stage 5 — Report',
  canvas: { width: 1560, height: 1300 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'cr-all', kind: 'code', filename: 'sysreport.sh', color: ORANGE, cell: [0, 0],
      label: [
        '# assemble one clean, sectioned report',
        'report() {',
        '  local host; host=$(hostname)',
        '  cat <<EOF',
        '=== sysreport: $host — $(date "+%F %T") ===',
        '',
        '-- uptime & load --',
        '$(collect_uptime)',
        '',
        '-- disk --',
        '$(collect_disk)',
        '$(disk_alerts)',
        '',
        '-- top CPU --',
        '$(top_cpu)',
        '',
        '-- top error sources --',
        '$(top_errors)',
        'EOF',
        '}',
        '',
        '# honor -o: print to stdout, or write to the file',
        'emit() {',
        '  if [[ "$OUTPUT" == "-" ]]; then cat',
        '  else cat > "$OUTPUT"; fi',
        '}',
        'report | emit',
      ].join('\n'),
    },
  ],
  edges: [],
}
