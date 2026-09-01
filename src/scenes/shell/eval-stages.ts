import type { Scene } from '../../render-engine'

// §4 the-loop — the section's punchline is that the shell TRANSFORMS your line before it runs
// anything, so the four stages are folded at exactly that boundary rather than drawn as a flat
// four-card chain. The fold is the teaching: everything above the arrow happens to text, everything
// below happens to a process. (A flat chain would also have run ~3× too tall for the pane.)
export const evalStages: Scene = {
  id: 'eval-stages',
  nodes: [
    {
      id: 'before',
      label: 'First the shell rewrites your line',
      sub: 'this all happens to TEXT — no program has started yet',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 's-read', label: 'Read & split', sub: 'into words, on whitespace', pattern: 'service', icon: 'scissors' },
        { id: 's-expand', label: 'Expand', sub: 'globs, $vars, $( )', pattern: 'service', icon: 'copy' },
      ],
    },
    {
      id: 'after',
      label: 'Then, and only then, it runs it',
      sub: 'now there is a process',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 's-find', label: 'Find', sub: 'builtin, else search PATH', pattern: 'network', icon: 'funnel' },
        { id: 's-run', label: 'Run & wait', sub: 'fork, exec, collect $?', pattern: 'network', icon: 'gears' },
      ],
    },
  ],
  edges: [
    { source: 'before', target: 'after', label: 'the order is the whole point — the program never sees what you typed' },
  ],
}
