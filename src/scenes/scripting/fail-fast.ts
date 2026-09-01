import type { Scene } from '../../render-engine'

// §7 robustness — `set -euo pipefail` is four tokens people copy without knowing what each buys, so the
// table names the specific bug each one catches. That is the section's real content: not "add this
// line", but three distinct failure modes that are otherwise silent.
export const failFast: Scene = {
  id: 'fail-fast',
  nodes: [
    {
      id: 'header-code',
      kind: 'code',
      filename: 'the safety header',
      label: [
        '#!/usr/bin/env bash',
        'set -euo pipefail',
        '',
        'tmp=$(mktemp)',
        "trap 'rm -f \"$tmp\"' EXIT   # on success, error, OR Ctrl-C",
      ].join('\n'),
    },
    {
      id: 'flags',
      kind: 'table',
      label: 'Three letters, three whole classes of bug',
      pattern: 'service',
      headers: ['flag', 'what it does', 'the bug it catches'],
      values: [
        ['-e', 'exit the instant anything fails', 'blundering on after an error'],
        ['-u', 'error on an unset variable', 'a typo like $flie wiping the wrong path'],
        ['-o pipefail', 'a failing stage fails the pipe', 'only the LAST command’s status counting'],
      ],
    },
  ],
  edges: [
    { source: 'header-code', target: 'flags', label: 'and trap fires on ANY exit — including the Ctrl-C signal from Course 4, so no temp files are left behind' },
  ],
}
