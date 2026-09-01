import type { Scene } from '../../render-engine'

// §1 the-tree — two claims in one: there is only ONE root (not C:, D:, E:), and things that are not
// documents still appear on it as files. So the root is a single node and the band below is
// deliberately mixed — a document beside a disk beside live kernel state — because the whole point is
// that they are reached the same way.
export const oneRoot: Scene = {
  id: 'one-root',
  nodes: [
    { id: 'root', label: 'One root: /', sub: 'no C:, D:, E: — every disk and device hangs off this', pattern: 'storage', icon: 'folder' },
    {
      id: 'everything',
      label: 'and everything on it is a file',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'e-doc', label: 'Your documents', sub: 'the obvious ones', pattern: 'storage', icon: 'file' },
        { id: 'e-dev', label: 'Your disks', sub: '/dev/sda is a file too', pattern: 'network', icon: 'harddrive' },
        { id: 'e-proc', label: 'Running processes', sub: '/proc, generated live', pattern: 'service', icon: 'gears' },
        { id: 'e-sys', label: 'Kernel settings', sub: '/sys, read and written as text', pattern: 'service', icon: 'wrench' },
      ],
    },
  ],
  edges: [
    { source: 'root', target: 'everything', label: 'the same ls, cat, cp and permissions work on all of them — the VFS from Course 1' },
  ],
}
