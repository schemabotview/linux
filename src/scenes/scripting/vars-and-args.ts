import type { Scene } from '../../render-engine'

// §3 variables-args — assignment is whitespace-sensitive in a way nothing else in bash is, and the
// failure is silent and bizarre (bash tries to RUN the name), so the trap gets a node of its own. The
// positional variables are commented inline against a real invocation rather than listed abstractly.
export const varsAndArgs: Scene = {
  id: 'vars-and-args',
  nodes: [
    {
      id: 'vars-code',
      kind: 'code',
      filename: 'deploy.sh',
      label: [
        'name="Sam"              # NO spaces around the =',
        'today=$(date +%F)       # command substitution, from Course 2',
        'count=$(( 2 + 3 ))      # arithmetic',
        '',
        '# invoked as:  ./deploy.sh prod v2',
        'echo "$1"    # prod',
        'echo "$2"    # v2',
        'echo "$#"    # 2          how many were given',
        'echo "$@"    # prod v2    all of them — always quote "$@"',
        '',
        'read -r -p "Continue? " answer   # prompt and capture',
      ].join('\n'),
    },
    {
      id: 'trap',
      label: 'name = "Sam"',
      sub: 'with spaces, bash tries to RUN name',
      pattern: 'warn',
      icon: 'ban',
    },
  ],
  edges: [
    { source: 'vars-code', target: 'trap', label: 'the same expansion and quoting rules as Course 2 — including "always quote your variables"' },
  ],
}
