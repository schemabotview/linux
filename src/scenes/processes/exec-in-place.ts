import type { Scene } from '../../render-engine'

// §3 exec-tree — the number is the argument. Both ends of this scene are PID 2102, because exec
// creates nothing: it replaces a program inside a process that already exists. The middle band is the
// section's best insight — the gap between fork and exec is where redirection actually happens.
export const execInPlace: Scene = {
  id: 'exec-in-place',
  nodes: [
    { id: 'before', label: 'PID 2102', sub: 'a copy of bash, fresh from fork()', pattern: 'user', icon: 'copy' },
    {
      id: 'gap',
      label: 'The gap between fork and exec',
      sub: 'the child gets to tweak itself first — and this is why Course 2 worked',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'g-redir', label: 'Point stdout at a file', sub: 'this is why > works', pattern: 'network', icon: 'waves' },
        { id: 'g-env', label: 'Set the environment', sub: 'this is why VAR=x cmd works', pattern: 'network', icon: 'tag' },
      ],
    },
    { id: 'after', label: 'PID 2102', sub: 'the SAME process — it just is /bin/ls now', pattern: 'service', icon: 'zap' },
  ],
  edges: [
    { source: 'before', target: 'gap', label: 'nothing new is created here' },
    { source: 'gap', target: 'after', label: 'exec replaces the code and memory in place, keeping the PID' },
  ],
}
