import type { Scene } from '../../render-engine'
import { machineStack } from './machine-stack'

// §3 bootloader — rung 2 lit. The narration names the pattern the ribbon is drawing: each rung is
// just capable enough to load the bigger thing above it. The band is the one capability that makes
// GRUB different from the rung below — it can read a filesystem, and the firmware could not.
export const grubLoads: Scene = {
  id: 'grub-loads',
  cols: 2,
  nodes: [
    machineStack(),
    {
      id: 'grub-does',
      label: 'GRUB — the first thing that understands a filesystem',
      sub: 'then it jumps into the kernel and never runs again this boot',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'g-reads', label: 'Reads /boot', sub: 'it understands ext4', variant: 'tile', pattern: 'storage', icon: 'folder' },
        { id: 'g-loads', label: 'Loads two files', sub: 'vmlinuz + initramfs', variant: 'tile', pattern: 'storage', icon: 'file' },
        { id: 'g-menu', label: 'The boot menu', sub: 'and kernel parameters', variant: 'tile', pattern: 'network', icon: 'scroll' },
      ],
    },
  ],
  edges: [],
}
