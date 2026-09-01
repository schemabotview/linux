import type { Scene } from '../../render-engine'

// §3 finding — this is a SEARCH, so the scene is the search: the builtin check first (which is why
// `cd` must be a builtin at all), then PATH walked in order, first match wins, and the number the
// winner leaves behind. Drawn as a chain because the order genuinely decides the answer.
export const pathSearch: Scene = {
  id: 'path-search',
  nodes: [
    { id: 'typed', label: 'You type: ls', sub: 'not /usr/bin/ls', pattern: 'user', icon: 'terminal' },
    { id: 'builtin', label: 'A shell builtin?', sub: 'cd, echo, export are checked first', pattern: 'network', icon: 'braces' },
    {
      id: 'path',
      label: 'PATH',
      sub: 'a colon-separated list of directories, searched in order',
      pattern: 'storage',
      icon: 'folder',
      cols: 3,
      children: [
        { id: 'p-local', label: '/usr/local/bin', variant: 'tile', pattern: 'storage', icon: 'folder' },
        { id: 'p-usr', label: '/usr/bin', variant: 'tile', pattern: 'storage', icon: 'folder' },
        { id: 'p-bin', label: '/bin', variant: 'tile', pattern: 'storage', icon: 'folder' },
      ],
    },
    { id: 'code', label: 'Exit code, in $?', sub: '0 is success; anything else names a failure', pattern: 'service', icon: 'circlecheck' },
  ],
  edges: [
    { source: 'typed', target: 'builtin', label: 'cd MUST be a builtin — it changes the shell’s own directory' },
    { source: 'builtin', target: 'path', label: 'not a builtin? then go looking on disk' },
    { source: 'path', target: 'code', label: 'the FIRST match runs — type ls shows the winner' },
  ],
}
