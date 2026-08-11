import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, RED, GRAY, YELLOW } from 'reveal-engine'

// Course 3's overview board — the §1 opener + §10 bookend, and the FHS tour (§2–§3). The key
// top-level directories of the Filesystem Hierarchy Standard as peer cards (NO edges — they're
// siblings under one root, not a flow), 3×3 in rough "system → yours → special" reading order.
// The `fs-tree` scene shows the actual tree walked; this board names what each directory is FOR.
export const fhsOverview: SceneSpec = {
  id: 'fhs-overview',
  title: 'The filesystem hierarchy',
  canvas: { width: 940, height: 620 },
  grid: { cols: [1, 1, 1], rows: [1, 1, 1], gap: 0.16, padding: 0.18 },
  nodes: [
    // row 0 — system configuration & data
    { id: 'fh-etc', label: '/etc', sub: 'system config (text)', kind: 'symbol', color: BLUE, icon: 'gears', cell: [0, 0] },
    { id: 'fh-var', label: '/var', sub: 'logs, spools, caches', kind: 'symbol', color: ORANGE, icon: 'scroll', cell: [1, 0] },
    { id: 'fh-usr', label: '/usr', sub: 'installed programs & libs', kind: 'symbol', color: PURPLE, icon: 'layers', cell: [2, 0] },
    // row 1 — the essential commands & your files
    { id: 'fh-bin', label: '/bin · /sbin', sub: 'essential commands', kind: 'symbol', color: GREEN, icon: 'terminal', cell: [0, 1] },
    { id: 'fh-home', label: '/home', sub: 'user home dirs (~)', kind: 'symbol', color: TEAL, icon: 'users', cell: [1, 1] },
    { id: 'fh-tmp', label: '/tmp', sub: 'scratch (cleared)', kind: 'symbol', color: YELLOW, icon: 'clock', cell: [2, 1] },
    // row 2 — the virtual / special trees
    { id: 'fh-dev', label: '/dev', sub: 'devices as files', kind: 'symbol', color: RED, icon: 'disk', cell: [0, 2] },
    { id: 'fh-proc', label: '/proc · /sys', sub: 'kernel, live (virtual)', kind: 'symbol', color: BLUE, icon: 'engine', cell: [1, 2] },
    { id: 'fh-root', label: '/root', sub: "root user's home", kind: 'symbol', color: GRAY, icon: 'key', cell: [2, 2] },
  ],
  edges: [], // siblings under one root, not a flow
}
