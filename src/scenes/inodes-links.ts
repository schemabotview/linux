import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, GRAY } from 'reveal-engine'

// Course 3 §7–§8 — the `inodes-links` scene: a control/data-flow diagram of what a filename really
// is. A name is just a directory entry pointing at an inode (the real file — metadata + block
// pointers); the inode points at the data blocks. Two names → one inode is a hard link; a symlink
// is a tiny file that holds a path and points back at a NAME.
//
//   filename ─▶ directory entry ─▶ inode (metadata + pointers) ─▶ data blocks
//   hard link ─────────────────▶ (the SAME inode)
//   symlink  ·holds a path·  ─▶ filename
export const inodesLinks: SceneSpec = {
  id: 'inodes-links',
  title: 'Names, inodes & links',
  canvas: { width: 780, height: 720 },
  grid: { cols: [1, 1, 2, 1], rows: [0.9, 0.9, 0.9], gap: 0.34, padding: 0.4 },
  nodes: [
    // the resolution chain, left → right across the middle row
    { id: 'il-name', label: 'filename', sub: '"report.txt"', kind: 'symbol', color: BLUE, icon: 'file', cell: [0, 1] },
    { id: 'il-dirent', label: 'directory entry', sub: 'name → inode #', kind: 'symbol', color: TEAL, icon: 'table', cell: [1, 1] },
    {
      id: 'il-inode', label: 'inode', kind: 'container', color: PURPLE, icon: 'box', cell: [2, 1],
      layout: { cols: [1], rows: [1, 1], gap: 0.1, padding: 0.05 },
      children: [
        { id: 'il-meta', label: 'metadata', sub: 'perms · owner · size · times', kind: 'symbol', color: GRAY, icon: 'scroll', cell: [0, 0] },
        { id: 'il-ptrs', label: 'block pointers', sub: '→ the data', kind: 'symbol', color: ORANGE, icon: 'share', cell: [0, 1] },
      ],
    },
    { id: 'il-blocks', label: 'data blocks', sub: 'the actual bytes', kind: 'symbol', color: GREEN, icon: 'disk', cell: [3, 1] },
    // a hard link: a second name pointing at the very same inode (top row)
    { id: 'il-hard', label: 'hard link', sub: 'a 2nd name → SAME inode', kind: 'symbol', color: TEAL, icon: 'copy', cell: [1, 0] },
    // a symlink: a tiny file whose contents are a path (bottom row)
    { id: 'il-sym', label: 'symlink', sub: 'a tiny file holding a path', kind: 'symbol', color: ORANGE, icon: 'share', cell: [0, 2] },
  ],
  edges: [
    { from: 'il-name', to: 'il-dirent' },
    { from: 'il-dirent', to: 'il-inode' },
    { from: 'il-inode', to: 'il-blocks' },
    { from: 'il-hard', to: 'il-inode' }, // second name, same inode
    { from: 'il-sym', to: 'il-name' }, // points back at a path/name
  ],
}
