import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, RED } from 'reveal-engine'

// Course 6's overview board — the §1 opener + §10 bookend. The sysadmin surface as peer cards (NO
// edges — the facets of operating a box, not a flow), 2×3 in rough "who → what runs → what's
// installed → when → what happened → reach it" order.
export const adminOverview: SceneSpec = {
  id: 'admin-overview',
  title: 'Operating a Linux box',
  canvas: { width: 940, height: 600 },
  grid: { cols: [1, 1, 1], rows: [1, 1], gap: 0.16, padding: 0.18 },
  nodes: [
    { id: 'ao-users', label: 'Users & groups', sub: 'accounts · sudo', kind: 'symbol', color: BLUE, icon: 'users', cell: [0, 0] },
    { id: 'ao-systemd', label: 'systemd', sub: 'services & the boot', kind: 'symbol', color: PURPLE, icon: 'workflow', cell: [1, 0] },
    { id: 'ao-pkg', label: 'Packages', sub: 'install software', kind: 'symbol', color: GREEN, icon: 'box', cell: [2, 0] },
    { id: 'ao-cron', label: 'Scheduling', sub: 'cron & timers', kind: 'symbol', color: ORANGE, icon: 'clock', cell: [0, 1] },
    { id: 'ao-logs', label: 'Logs', sub: 'journalctl · /var/log', kind: 'symbol', color: TEAL, icon: 'scroll', cell: [1, 1] },
    { id: 'ao-net', label: 'Networking', sub: 'ip · ss · ssh', kind: 'symbol', color: RED, icon: 'stream', cell: [2, 1] },
  ],
  edges: [],
}
