import type { Scene } from '../../render-engine'

// §10 you-are-here — the course went down through four layers, so the recap is those four layers in
// order rather than a topic list: the map you read, the address you type, the gate that stops you, and
// the bytes underneath all of it.
export const fsRecap: Scene = {
  id: 'fs-recap',
  nodes: [
    {
      id: 'layers',
      label: 'From the top of the tree down to the bytes',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-map', label: 'The map', sub: 'FHS: /etc, /var/log, /dev, /proc', pattern: 'service', icon: 'folder' },
        { id: 'l-addr', label: 'The address', sub: 'absolute and relative, . .. ~ -', pattern: 'network', icon: 'terminal' },
        { id: 'l-gate', label: 'The gate', sub: 'chmod, chown, umask, sudo', pattern: 'warn', icon: 'lock' },
        { id: 'l-bytes', label: 'The bytes', sub: 'name → inode → blocks, links, mounts', pattern: 'storage', icon: 'harddrive' },
      ],
    },
    { id: 'next', label: 'Next — processes', sub: 'the running programs /proc was showing you all along', pattern: 'user', icon: 'gears' },
  ],
  edges: [{ source: 'layers', target: 'next', label: 'you know the world your commands act in' }],
}
