import type { Scene } from '../../render-engine'

// §9 mounts — the devices are the foundation and the tree is what stands on them, so the flow runs
// BT: a mount points UP at the directory it appears under. The edge is drawn band-to-band because the
// claim is about the two layers, not about any one device.
export const mountPoints: Scene = {
  id: 'mount-points',
  flow: 'BT',
  nodes: [
    {
      id: 'devices',
      label: 'The devices, each with its own filesystem',
      sub: 'different branches can be different types entirely',
      pattern: 'storage',
      cols: 3,
      children: [
        { id: 'dv-sda', label: '/dev/sda1', sub: 'ext4', variant: 'tile', pattern: 'storage', icon: 'harddrive' },
        { id: 'dv-sdb', label: '/dev/sdb1', sub: 'xfs', variant: 'tile', pattern: 'storage', icon: 'harddrive' },
        { id: 'dv-tmpfs', label: 'tmpfs', sub: 'lives in RAM', variant: 'tile', pattern: 'network', icon: 'memory' },
      ],
    },
    {
      id: 'tree',
      label: 'The one tree you actually see',
      sub: 'you never think about which device — the VFS hides it',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'mp-root', label: '/', sub: 'the root filesystem', variant: 'tile', pattern: 'service', icon: 'folder' },
        { id: 'mp-home', label: '/home', sub: 'a second disk', variant: 'tile', pattern: 'service', icon: 'folder' },
        { id: 'mp-tmp', label: '/tmp', sub: 'never touches a disk', variant: 'tile', pattern: 'service', icon: 'folder' },
      ],
    },
  ],
  edges: [
    { source: 'devices', target: 'tree', label: 'mount attaches a whole filesystem at a DIRECTORY — /etc/fstab does it for you at boot' },
  ],
}
