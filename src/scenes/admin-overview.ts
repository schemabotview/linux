import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, RED, GRAY } from 'reveal-engine'

// Course 6's overview — the §1 opener + §10 bookend. The sysadmin surface, anchored: the machine
// itself sits in the middle and the six domains you operate radiate out from it (3 above, 3 below).
// The edges are honest — each domain is a *facet of operating this one box* (config in /etc + sudo +
// logs, the loop you live in), not a data flow — so this reads as a control surface, not a flat grid.
//
//   users · systemd · packages
//          [ your server ]
//   cron · logs · networking
export const adminOverview: SceneSpec = {
  id: 'admin-overview',
  title: 'Operating a Linux box',
  canvas: { width: 720, height: 500 },
  grid: { cols: [1, 1, 1], rows: [1, 0.72, 1], gap: 0.24, padding: 0.24 },
  nodes: [
    // top surfaces — who · what runs · what's installed
    { id: 'ao-users', label: 'Users & groups', sub: 'accounts · sudo', kind: 'symbol', color: BLUE, icon: 'users', cell: [0, 0] },
    { id: 'ao-systemd', label: 'systemd', sub: 'services & the boot', kind: 'symbol', color: PURPLE, icon: 'workflow', cell: [1, 0] },
    { id: 'ao-pkg', label: 'Packages', sub: 'install software', kind: 'symbol', color: GREEN, icon: 'box', cell: [2, 0] },
    // the anchor — one machine, operated through /etc + sudo + logs
    { id: 'ao-box', label: 'your server', sub: 'config · sudo · logs', kind: 'symbol', color: GRAY, icon: 'server', cell: [0, 1, 3, 1] },
    // bottom surfaces — when · what happened · reach it
    { id: 'ao-cron', label: 'Scheduling', sub: 'cron & timers', kind: 'symbol', color: ORANGE, icon: 'clock', cell: [0, 2] },
    { id: 'ao-logs', label: 'Logs', sub: 'journalctl · /var/log', kind: 'symbol', color: TEAL, icon: 'scroll', cell: [1, 2] },
    { id: 'ao-net', label: 'Networking', sub: 'ip · ss · ssh', kind: 'symbol', color: RED, icon: 'stream', cell: [2, 2] },
  ],
  edges: [
    { from: 'ao-box', to: 'ao-users' },
    { from: 'ao-box', to: 'ao-systemd' },
    { from: 'ao-box', to: 'ao-pkg' },
    { from: 'ao-box', to: 'ao-cron' },
    { from: 'ao-box', to: 'ao-logs' },
    { from: 'ao-box', to: 'ao-net' },
  ],
}
