import type { Scene } from '../../render-engine'

// §5 exit-zombie — the normal path and the two ways it goes wrong, side by side, because the failure
// modes only make sense against the sequence they break. The left column is a real chain: the husk
// exists solely to hold a number until somebody reads it.
export const zombieAndOrphan: Scene = {
  id: 'zombie-and-orphan',
  cols: 2,
  padding: 0.14,
  nodes: [
    {
      id: 'normal',
      label: 'The normal death',
      sub: 'a process is not gone until its parent acknowledges it',
      pattern: 'service',
      flow: 'TB',
      children: [
        { id: 'n-exit', label: 'exit(code)', sub: 'memory released', variant: 'tile', pattern: 'service', icon: 'circlecheck' },
        { id: 'n-zombie', label: 'A zombie', sub: 'a husk holding the code', variant: 'tile', pattern: 'warn', icon: 'skull' },
        { id: 'n-wait', label: 'The parent waits', sub: 'reads the code — the $? of Course 2', variant: 'tile', pattern: 'user', icon: 'clock' },
        { id: 'n-gone', label: 'Reaped', sub: 'finally gone', variant: 'tile', pattern: 'external', icon: 'ban' },
      ],
      edges: [
        { source: 'n-exit', target: 'n-zombie' },
        { source: 'n-zombie', target: 'n-wait' },
        { source: 'n-wait', target: 'n-gone' },
      ],
    },
    {
      id: 'wrong',
      label: 'The two ways it goes wrong',
      sub: 'and only one of them is a leak',
      pattern: 'group',
      children: [
        { id: 'w-leak', label: 'Zombie leak', sub: 'a buggy parent never waits — husks pile up in ps', pattern: 'warn', icon: 'skull' },
        { id: 'w-fix', label: 'Fix the PARENT', sub: 'you cannot kill something already dead', pattern: 'warn', icon: 'wrench' },
        { id: 'w-orphan', label: 'An orphan', sub: 'parent died first — PID 1 adopts and reaps it', pattern: 'service', icon: 'workflow' },
      ],
    },
  ],
  edges: [],
}
