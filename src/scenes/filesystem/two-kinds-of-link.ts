import type { Scene } from '../../render-engine'

// §8 links — both kinds are "two names, one file" in conversation, and completely different in the
// inode model. Side by side, the difference is the shape: on the left two names arrive at ONE inode
// (neither is the original); on the right a real little file sits in between, holding a path.
export const twoKindsOfLink: Scene = {
  id: 'two-kinds-of-link',
  cols: 2,
  padding: 0.14,
  nodes: [
    {
      id: 'hard',
      label: 'Hard link — a second name',
      sub: 'ln target newname · same filesystem only',
      pattern: 'service',
      flow: 'TB',
      children: [
        { id: 'h-a', label: 'notes.txt', variant: 'tile', pattern: 'user', icon: 'file' },
        { id: 'h-b', label: 'backup.txt', variant: 'tile', pattern: 'user', icon: 'file' },
        { id: 'h-inode', label: 'inode 12345', sub: 'link count 2 — freed only at 0', pattern: 'service', icon: 'database' },
      ],
      edges: [
        { source: 'h-a', target: 'h-inode' },
        { source: 'h-b', target: 'h-inode', label: 'equal — neither is “the original”' },
      ],
    },
    {
      id: 'sym',
      label: 'Symlink — a signpost',
      sub: 'ln -s /path/to/target linkname · crosses filesystems',
      pattern: 'network',
      flow: 'TB',
      children: [
        { id: 's-link', label: 'latest', sub: 'a real file, 11 bytes', variant: 'tile', pattern: 'network', icon: 'link' },
        { id: 's-path', label: 'holding a path', sub: 'its CONTENTS are "notes.txt"', pattern: 'network', icon: 'scroll' },
        { id: 's-target', label: 'notes.txt', sub: 'delete it and the link dangles', variant: 'tile', pattern: 'user', icon: 'file' },
      ],
      edges: [
        { source: 's-link', target: 's-path' },
        { source: 's-path', target: 's-target', label: 're-resolved every time it is followed' },
      ],
    },
  ],
  edges: [],
}
