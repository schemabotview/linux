import type { Scene } from '../../render-engine'

// §1 what-is-a-shell — the section's framing is "a REPL for the operating system", so the loop is the
// left column and drawn as an actual cycle of stages; the right column is the three reasons the
// section gives for typing at all. Two peers, no edge between them — the loop is the what, the list
// is the why.
export const shellRepl: Scene = {
  id: 'shell-repl',
  cols: 2,
  padding: 0.16,
  nodes: [
    {
      id: 'repl',
      label: 'bash — a read-eval loop',
      sub: 'for the whole operating system',
      pattern: 'service',
      icon: 'repeat',
      flow: 'TB',
      children: [
        { id: 'r-read', label: 'Read a line', variant: 'tile', pattern: 'service', icon: 'terminal' },
        { id: 'r-run', label: 'Run it', variant: 'tile', pattern: 'service', icon: 'zap' },
        { id: 'r-print', label: 'Print the result', variant: 'tile', pattern: 'service', icon: 'monitor' },
        { id: 'r-loop', label: 'Back to the prompt', variant: 'tile', pattern: 'service', icon: 'repeat' },
      ],
      edges: [
        { source: 'r-read', target: 'r-run' },
        { source: 'r-run', target: 'r-print' },
        { source: 'r-print', target: 'r-loop' },
      ],
    },
    {
      id: 'why',
      label: 'Why type at all',
      pattern: 'group',
      children: [
        { id: 'w-exact', label: 'Precise', sub: 'a typed line is exact, and can become a script', pattern: 'user', icon: 'circlecheck' },
        { id: 'w-compose', label: 'Composable', sub: 'small tools pipe into big ones', pattern: 'user', icon: 'workflow' },
        { id: 'w-every', label: 'Everywhere', sub: 'even a server with no screen', pattern: 'user', icon: 'server' },
      ],
    },
  ],
  edges: [],
}
