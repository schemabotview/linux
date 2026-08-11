import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, GRAY, YELLOW } from 'reveal-engine'

// Course 3 §9 — the `mounts-vfs` scene: how ONE tree spans MANY disks. The VFS presents a single
// unified tree; each branch can be a different filesystem "mounted" at a directory; each mounted
// filesystem lives on a block device (or in RAM). Top-down: unified view → mounts → devices.
//
//   VFS  (one tree: / )
//     │  mounted at directories
//     ▼
//   ext4 at /   ·   xfs at /home   ·   tmpfs at /tmp
//     │
//     ▼
//   /dev/sda2   ·   /dev/sdb1   ·   RAM
export const mountsVfs: SceneSpec = {
  id: 'mounts-vfs',
  title: 'Mounts & the VFS',
  canvas: { width: 1020, height: 760 },
  grid: { cols: [1, 1, 1], rows: [0.7, 1.0, 1.0], gap: 0.34, padding: 0.42 },
  nodes: [
    { id: 'mv-vfs', label: 'VFS · one unified tree', sub: 'you always just see  /', kind: 'symbol', color: PURPLE, icon: 'layers', cell: [0, 0, 3, 1] },
    {
      id: 'mv-mounts', label: 'Mounted filesystems', kind: 'container', color: BLUE, icon: 'disk', cell: [0, 1, 3, 1],
      layout: { cols: [1, 1, 1], rows: 1, gap: 0.3, padding: 0.5 },
      children: [
        { id: 'mv-root', label: 'ext4', sub: 'mounted at  /', kind: 'symbol', color: TEAL, icon: 'disk', cell: [0, 0] },
        { id: 'mv-home', label: 'xfs', sub: 'mounted at  /home', kind: 'symbol', color: GREEN, icon: 'disk', cell: [1, 0] },
        { id: 'mv-tmp', label: 'tmpfs', sub: 'mounted at  /tmp (RAM)', kind: 'symbol', color: YELLOW, icon: 'memory', cell: [2, 0] },
      ],
    },
    {
      id: 'mv-dev', label: 'Block devices', kind: 'container', color: GRAY, icon: 'server', cell: [0, 2, 3, 1],
      layout: { cols: [1, 1, 1], rows: 1, gap: 0.3, padding: 0.5 },
      children: [
        { id: 'mv-sda', label: '/dev/sda2', sub: 'main disk', kind: 'symbol', color: TEAL, icon: 'disk', cell: [0, 0] },
        { id: 'mv-sdb', label: '/dev/sdb1', sub: '2nd disk', kind: 'symbol', color: GREEN, icon: 'disk', cell: [1, 0] },
        { id: 'mv-ram', label: 'RAM', sub: 'no disk at all', kind: 'symbol', color: ORANGE, icon: 'memory', cell: [2, 0] },
      ],
    },
  ],
  edges: [
    { from: 'mv-vfs', to: 'mv-mounts' },
    { from: 'mv-root', to: 'mv-sda' },
    { from: 'mv-home', to: 'mv-sdb' },
    { from: 'mv-tmp', to: 'mv-ram' },
  ],
}
