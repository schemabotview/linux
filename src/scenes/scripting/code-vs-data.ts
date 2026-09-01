import type { Scene } from '../../render-engine'

// §6 functions — a bash function has TWO ways out and they are used for different jobs, which is the
// thing people get wrong. Drawn as a fork below the card: the exit code is what an `if` reads, the
// echoed text is what `$( )` captures, and mixing them is why stray logging corrupts a return value.
export const codeVsData: Scene = {
  id: 'code-vs-data',
  nodes: [
    {
      id: 'fn-code',
      kind: 'code',
      filename: 'functions.sh',
      label: [
        'timestamp() {',
        '    local fmt="${1:-%F %T}"   # local — or it leaks globally',
        '    date +"$fmt"              # echo IS how you return data',
        '}',
        '',
        'is_root() {',
        '    [[ $EUID -eq 0 ]]         # the exit code IS the return',
        '}',
        '',
        'now=$(timestamp)              # capture the data',
        'if is_root; then ...; fi      # test the code',
        'echo "starting" >&2           # log to stderr, not into $( )',
      ].join('\n'),
    },
    {
      id: 'ways',
      label: 'Two ways out, for two different jobs',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'wo-code', label: 'An exit code', sub: '0–255, so if can test it', pattern: 'service', icon: 'circlecheck' },
        { id: 'wo-data', label: 'Data on stdout', sub: 'echo it, capture with $( )', pattern: 'network', icon: 'waves' },
      ],
    },
  ],
  edges: [
    { source: 'fn-code', target: 'ways', label: 'which is exactly why a stray echo of progress goes to stderr — otherwise it lands in the caller’s variable' },
  ],
}
