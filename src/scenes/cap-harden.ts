import { type SceneSpec, RED } from 'reveal-engine'

// Course 8 §9 — stage-8: make it safe to run unattended — prereqs, a lockfile, cleanup trap, input
// validation. Whole-canvas `code`; short lines keep the auto-fit font large at 4K.
export const capHarden: SceneSpec = {
  id: 'cap-harden',
  title: 'Stage 8 — Harden',
  canvas: { width: 1580, height: 1300 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'ck-all', kind: 'code', filename: 'sysreport.sh', color: RED, cell: [0, 0],
      label: [
        '# make it safe to run unattended at 07:00',
        '',
        '# 1) require its tools; fail early with a clear message',
        'for cmd in journalctl awk df; do',
        '  command -v "$cmd" >/dev/null \\',
        '    || { warn "missing: $cmd"; exit 1; }',
        'done',
        '',
        '# 2) a lockfile so two runs never overlap',
        'readonly LOCK="/tmp/$SCRIPT.lock"',
        'exec 9>"$LOCK"',
        'flock -n 9 || { warn "already running"; exit 1; }',
        '',
        '# 3) clean up on ANY exit — even Ctrl-C (Course 4)',
        "trap 'rm -f \"$LOCK\"' EXIT",
        '',
        '# 4) validate input before trusting it',
        '[[ "$LINES" =~ ^[0-9]+$ ]] \\',
        '  || { warn "-n must be a number"; exit 1; }',
      ].join('\n'),
    },
  ],
  edges: [],
}
