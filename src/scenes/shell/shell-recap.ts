import type { Scene } from '../../render-engine'

// §10 you-are-here — the bookend hangs the course's whole vocabulary back on the eval loop from §4,
// so the recap is that loop annotated: one stage per card, and what you can now do at it. That is
// truer than a flat list of topics, because it says WHERE in the line each thing happens.
export const shellRecap: Scene = {
  id: 'shell-recap',
  nodes: [
    {
      id: 'known',
      label: 'Every line you type — and what you now know at each stage',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'k-read', label: 'Read & split', sub: 'command · options · arguments', pattern: 'service', icon: 'scissors' },
        { id: 'k-expand', label: 'Expand', sub: 'globs, $vars, $( ) — and quoting to stop it', pattern: 'service', icon: 'copy' },
        { id: 'k-find', label: 'Find', sub: 'PATH order, builtins, type', pattern: 'network', icon: 'funnel' },
        { id: 'k-run', label: 'Run & wait', sub: 'fork, exec, $?, & and jobs', pattern: 'network', icon: 'gears' },
        { id: 'k-streams', label: 'Streams', sub: 'fd 0, 1, 2 — and where you point them', pattern: 'storage', icon: 'waves' },
        { id: 'k-pipes', label: 'Compose', sub: '> >> 2> < | tee', pattern: 'storage', icon: 'workflow' },
      ],
    },
    { id: 'next', label: 'Next — the filesystem', sub: 'the tree these commands live in and act on', pattern: 'user', icon: 'folder' },
  ],
  edges: [{ source: 'known', target: 'next', label: 'you can type to the machine now' }],
}
