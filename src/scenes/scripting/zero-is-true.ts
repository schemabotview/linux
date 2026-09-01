import type { Scene } from '../../render-engine'

// §4 conditionals — the whole section rests on one idea carried over from Course 2: `if` does not test
// an expression, it runs a command and looks at the exit code. Stating that as the top band first makes
// every line of the card below read correctly, including the ones that look like expressions.
export const zeroIsTrue: Scene = {
  id: 'zero-is-true',
  nodes: [
    {
      id: 'truth',
      label: 'if runs a COMMAND and reads its exit code',
      sub: 'this is the $? from Course 2, wearing a keyword',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'zt-zero', label: 'Exit code 0', sub: 'success — so the branch runs', pattern: 'service', icon: 'circlecheck' },
        { id: 'zt-nonzero', label: 'Anything else', sub: 'a failure — so it does not', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'cond-code',
      kind: 'code',
      filename: 'conditionals.sh',
      label: [
        'if grep -q error app.log; then    # a REAL command as the test',
        '    echo "found problems"',
        'fi',
        '',
        '[[ -f /etc/passwd ]]   # files:   -f file  -d dir  -z empty',
        '[[ $name == sam ]]     # strings: ==  !=  =~ (regex)',
        '[[ $n -gt 5 ]]         # numbers: -gt -lt -ge -le -eq -ne',
        '',
        'mkdir -p out && cd out         # and-then',
        'ping -c1 host || echo "down"   # or-else',
        '',
        'case "$1" in',
        '    start) start_it ;;',
        '    stop)  stop_it  ;;',
        '    *)     usage    ;;',
        'esac',
      ].join('\n'),
    },
  ],
  edges: [
    { source: 'truth', target: 'cond-code', label: '[[ … ]] is not syntax — it is a command too, which returns 0 when the test holds' },
  ],
}
