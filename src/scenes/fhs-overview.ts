import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, RED, GRAY, YELLOW } from 'reveal-engine'

// Course 3's opening scene — the Filesystem Hierarchy Standard drawn as what it actually is: ONE
// rooted tree. A single `/` at the apex, the key top-level directories fanning out beneath it as
// real children (edges = containment, not a flow), and three go one level deeper — /usr/bin,
// /var/log, /home/sam — so the *nesting* is visible, not asserted. Replaces the old 3×3 peer board:
// the tree makes the slide's "everything hangs off one root" claim something you can SEE, and the
// solid-tour camera walks it branch by branch (§1 whole tree · §2 system dirs · §3 yours + virtual).
// The `fs-tree` scene (§4) then drills paths & the cd/ls commands on a whole-canvas code card.
//
//   / ─┬─ /etc  /bin·/sbin  /usr ── /usr/bin
//      │                    /var ── /var/log
//      └─ /home ── /home/sam   /tmp  /dev  /proc·/sys  /root
export const fhsOverview: SceneSpec = {
  id: 'fhs-overview',
  title: 'The filesystem tree',
  canvas: { width: 1400, height: 640 },
  grid: { cols: [1, 1, 1, 1, 1, 1, 1, 1, 1], rows: [0.9, 1.05, 0.92], gap: 0.24, padding: 0.22 },
  nodes: [
    // row 0 — the single root, centered as the apex; every directory below descends from it
    { id: 'fh-slash', label: '/', sub: 'the single root — everything descends', kind: 'symbol', color: BLUE, icon: 'branch', cell: [3, 0, 3, 1] },

    // row 1 — the key top-level FHS directories, left→right: the system's own space, then yours,
    // then the virtual trees. Kept in FHS reading order so the band lighting groups cleanly.
    { id: 'fh-etc', label: '/etc', sub: 'system config (text)', kind: 'symbol', color: BLUE, icon: 'gears', cell: [0, 1] },
    { id: 'fh-bin', label: '/bin · /sbin', sub: 'essential commands', kind: 'symbol', color: GREEN, icon: 'terminal', cell: [1, 1] },
    { id: 'fh-usr', label: '/usr', sub: 'installed programs & libs', kind: 'symbol', color: PURPLE, icon: 'layers', cell: [2, 1] },
    { id: 'fh-var', label: '/var', sub: 'logs, spools, caches', kind: 'symbol', color: ORANGE, icon: 'scroll', cell: [3, 1] },
    { id: 'fh-home', label: '/home', sub: 'user home dirs (~)', kind: 'symbol', color: TEAL, icon: 'users', cell: [4, 1] },
    { id: 'fh-tmp', label: '/tmp', sub: 'scratch (cleared)', kind: 'symbol', color: YELLOW, icon: 'clock', cell: [5, 1] },
    { id: 'fh-dev', label: '/dev', sub: 'devices as files', kind: 'symbol', color: RED, icon: 'disk', cell: [6, 1] },
    { id: 'fh-proc', label: '/proc · /sys', sub: 'kernel, live (virtual)', kind: 'symbol', color: BLUE, icon: 'engine', cell: [7, 1] },
    { id: 'fh-root', label: '/root', sub: "root user's home", kind: 'symbol', color: GRAY, icon: 'key', cell: [8, 1] },

    // row 2 — one level deeper under three branches, so the tree's DEPTH is visible. Each grandchild
    // takes its parent's color to read as "child of". Sit directly under /usr, /var, /home.
    { id: 'fh-usrbin', label: '/usr/bin', sub: 'the programs', kind: 'symbol', color: PURPLE, icon: 'app', cell: [2, 2] },
    { id: 'fh-varlog', label: '/var/log', sub: 'the logs you debug with', kind: 'symbol', color: ORANGE, icon: 'scroll', cell: [3, 2] },
    { id: 'fh-homesam', label: '/home/sam', sub: '~  ==  your home', kind: 'symbol', color: TEAL, icon: 'file', cell: [4, 2] },
  ],
  edges: [
    // containment: the root branches to each top-level directory…
    { from: 'fh-slash', to: 'fh-etc' },
    { from: 'fh-slash', to: 'fh-bin' },
    { from: 'fh-slash', to: 'fh-usr' },
    { from: 'fh-slash', to: 'fh-var' },
    { from: 'fh-slash', to: 'fh-home' },
    { from: 'fh-slash', to: 'fh-tmp' },
    { from: 'fh-slash', to: 'fh-dev' },
    { from: 'fh-slash', to: 'fh-proc' },
    { from: 'fh-slash', to: 'fh-root' },
    // …and three go one level deeper, so nesting reads at a glance
    { from: 'fh-usr', to: 'fh-usrbin' },
    { from: 'fh-var', to: 'fh-varlog' },
    { from: 'fh-home', to: 'fh-homesam' },
  ],
}
