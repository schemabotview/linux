import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, GRAY } from 'reveal-engine'

// Course 6 §8–§9 — the `networking` scene: the path a packet takes host → interface → network →
// remote host, and the tools that inspect and use each part. A left-to-right flow with a tools band
// underneath.
//
//   your host ─▶ interface (eth0) ─▶ network / router ─▶ remote host
//   tools:  ip (addresses) · ss (ports) · ping/curl (reach) · ssh (log in)
export const networking: SceneSpec = {
  id: 'networking',
  title: 'Networking basics',
  canvas: { width: 1120, height: 620 },
  grid: { cols: [1, 1, 1, 1], rows: [1, 0.85], gap: 0.34, padding: 0.4 },
  nodes: [
    { id: 'nw-host', label: 'your host', sub: 'this machine', kind: 'symbol', color: GRAY, icon: 'server', cell: [0, 0] },
    { id: 'nw-iface', label: 'interface', sub: 'eth0 · an IP address', kind: 'symbol', color: BLUE, icon: 'plug', cell: [1, 0] },
    { id: 'nw-net', label: 'network · router', sub: 'the internet', kind: 'symbol', color: PURPLE, icon: 'cloud', cell: [2, 0] },
    { id: 'nw-remote', label: 'remote host', sub: 'a server, by IP/DNS', kind: 'symbol', color: GREEN, icon: 'server', cell: [3, 0] },
    {
      id: 'nw-tools', label: 'the tools', kind: 'container', color: GRAY, icon: 'terminal', cell: [0, 1, 4, 1],
      layout: { cols: [1, 1, 1, 1], rows: 1, gap: 0.3, padding: 0.5 },
      children: [
        { id: 'nw-ip', label: 'ip a', sub: 'addresses & links', kind: 'symbol', color: BLUE, icon: 'plug', cell: [0, 0] },
        { id: 'nw-ss', label: 'ss -tulpn', sub: 'listening ports', kind: 'symbol', color: TEAL, icon: 'stream', cell: [1, 0] },
        { id: 'nw-curl', label: 'ping · curl', sub: 'reach & fetch', kind: 'symbol', color: ORANGE, icon: 'share', cell: [2, 0] },
        { id: 'nw-ssh', label: 'ssh', sub: 'secure remote shell', kind: 'symbol', color: GREEN, icon: 'key', cell: [3, 0] },
      ],
    },
  ],
  edges: [
    { from: 'nw-host', to: 'nw-iface' },
    { from: 'nw-iface', to: 'nw-net' },
    { from: 'nw-net', to: 'nw-remote' },
  ],
}
