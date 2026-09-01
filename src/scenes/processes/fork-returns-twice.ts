import type { Scene } from '../../render-engine'

// §2 fork — "fork() returns twice" is a claim about one line of code, so the line has to be on screen.
// The if/else is the whole mechanism: same source, two processes, and each one takes a different
// branch because the call handed them different numbers.
export const forkReturnsTwice: Scene = {
  id: 'fork-returns-twice',
  nodes: [
    {
      id: 'fork-code',
      kind: 'code',
      filename: 'fork.c',
      label: [
        'pid_t pid = fork();      /* ONE call... */',
        '',
        'if (pid == 0) {',
        '    /* ...and TWO returns. This is the child. */',
        '} else {',
        '    /* The parent — pid holds the child’s PID. */',
        '}',
      ].join('\n'),
    },
    {
      id: 'two',
      label: 'One call, two near-identical processes',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'tp-parent', label: 'The parent', sub: 'PID 2101 — sees 2102 come back', pattern: 'user', icon: 'gears' },
        { id: 'tp-child', label: 'The child', sub: 'PID 2102 — sees 0 come back', pattern: 'service', icon: 'copy' },
      ],
    },
  ],
  edges: [
    { source: 'fork-code', target: 'two', label: 'copy-on-write makes it cheap: they SHARE memory until one of them writes' },
  ],
}
