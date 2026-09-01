import type { Scene } from '../../render-engine'

// §8 networking — the section follows a path and then hands you a ladder, and the ladder's rungs map
// one-to-one onto the path's hops. Drawing both as chains, one above the other, makes that alignment
// visible: each tool asks about the hop directly above it.
export const networkPath: Scene = {
  id: 'network-path',
  nodes: [
    {
      id: 'path',
      label: 'The path out',
      sub: 'the network stack from Course 1, from the outside',
      pattern: 'network',
      flow: 'LR',
      children: [
        { id: 'np-host', label: 'Your host', sub: 'where you are', variant: 'tile', pattern: 'user', icon: 'monitor' },
        { id: 'np-if', label: 'eth0', sub: 'an interface, with an IP', variant: 'tile', pattern: 'network', icon: 'network' },
        { id: 'np-router', label: 'The router', sub: 'and DNS, name to IP', variant: 'tile', pattern: 'network', icon: 'router' },
        { id: 'np-remote', label: 'A port there', sub: '80 is HTTP, 22 is SSH', variant: 'tile', pattern: 'service', icon: 'server' },
      ],
      edges: [
        { source: 'np-host', target: 'np-if' },
        { source: 'np-if', target: 'np-router' },
        { source: 'np-router', target: 'np-remote' },
      ],
    },
    {
      id: 'ladder',
      label: 'The debugging ladder — climb it in order',
      pattern: 'service',
      flow: 'LR',
      children: [
        { id: 'ld-ip', label: 'ip a', sub: 'do I have an address?', variant: 'tile', pattern: 'service', icon: 'network' },
        { id: 'ld-ping', label: 'ping', sub: 'can I reach it?', variant: 'tile', pattern: 'service', icon: 'globe' },
        { id: 'ld-ss', label: 'ss -tulpn', sub: 'is anything listening?', variant: 'tile', pattern: 'service', icon: 'dooropen' },
        { id: 'ld-curl', label: 'curl -I', sub: 'does it actually answer?', variant: 'tile', pattern: 'service', icon: 'braces' },
      ],
      edges: [
        { source: 'ld-ip', target: 'ld-ping' },
        { source: 'ld-ping', target: 'ld-ss' },
        { source: 'ld-ss', target: 'ld-curl' },
      ],
    },
  ],
  edges: [
    { source: 'path', target: 'ladder', label: 'each rung asks about one hop above it — do not skip one, the answer tells you where to stop' },
  ],
}
