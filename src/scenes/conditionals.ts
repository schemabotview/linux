import { type SceneSpec, PURPLE } from 'reveal-engine'

// Course 7 §4 — conditionals on a whole-canvas `code` card: if/elif/else driven by exit codes, the
// [[ ]] test, &&/||, and case. Short lines keep the auto-fit font large at 4K.
export const conditionals: SceneSpec = {
  id: 'conditionals',
  title: 'Conditionals',
  canvas: { width: 1560, height: 1320 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'cd-all', kind: 'code', filename: 'conditionals.sh', color: PURPLE, cell: [0, 0],
      label: [
        '# an "if" tests a command\'s EXIT CODE (0 = true)',
        'if grep -q error app.log; then',
        '  echo "found errors"',
        'elif [[ -f app.log ]]; then     # [[ ]] IS a test',
        '  echo "log exists, no errors"',
        'else',
        '  echo "no log at all"',
        'fi',
        '',
        '# common [[ ]] tests',
        '[[ -f path ]]    # file exists?   -d dir?   -z empty?',
        '[[ $a == foo ]]  # strings: ==  !=  =~ (regex)',
        '[[ $n -gt 5 ]]   # numbers: -gt -lt -ge -eq -ne',
        '',
        '# && (and-then) / || (or-else) chain on success',
        'mkdir -p out && cd out',
        'ping -c1 host || echo "unreachable"',
        '',
        '# case: match a value against patterns',
        'case "$1" in',
        '  start) echo up ;;',
        '  stop)  echo down ;;',
        '  *)     echo "usage: $0 {start|stop}" ;;',
        'esac',
      ].join('\n'),
    },
  ],
  edges: [],
}
