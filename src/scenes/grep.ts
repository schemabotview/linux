import { type SceneSpec, BLUE } from 'reveal-engine'

// Course 5 §2–§3 — grep (and regex) on a whole-canvas `code` card. The search tool plus the pattern
// language it (optionally) speaks. Short lines keep the auto-fit font large at 4K.
export const grep: SceneSpec = {
  id: 'grep',
  title: 'grep — search lines',
  canvas: { width: 1560, height: 1300 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'gp-all', kind: 'code', filename: 'grep.sh', color: BLUE, cell: [0, 0],
      label: [
        '# grep: print the lines that MATCH a pattern',
        'grep error app.log       # lines containing "error"',
        'grep -i error app.log    # -i  case-insensitive',
        'grep -rn TODO src/       # -r recurse  -n line numbers',
        'grep -v debug app.log    # -v INVERT: non-matching lines',
        'grep -c error app.log    # -c count matches, not print',
        'grep -w cat words.txt    # -w whole word only',
        'grep -A2 -B2 err app.log # 2 lines of context around',
        '',
        '# its usual home is the middle of a pipe:',
        'ps aux | grep ssh',
        'journalctl | grep -i fail',
        '',
        '# ── regex: patterns, not literals  (grep -E) ──',
        '#   .  any char   ^ start   $ end   \\. literal dot',
        '#   *  0+ of prev   +  1+    ?  0 or 1   [0-9] class',
        "grep -E '^ERROR' app.log        # line STARTS with ERROR",
        "grep -E 'HTTP/1\\.[01]' access.log",
        "grep -E '[0-9]{3}-[0-9]{4}' book  # a phone number",
      ].join('\n'),
    },
  ],
  edges: [],
}
