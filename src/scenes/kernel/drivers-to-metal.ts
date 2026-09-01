import type { Scene } from '../../render-engine'
import { machineStack } from './machine-stack'

// §9 drivers — the bottom of the descent, drivers lit. The split is WHAT vs HOW: the four managers
// decide what to do, a driver knows how to say it to one specific device. /dev is in the band because
// "everything is a file" is a claim about the interface, not about the driver.
export const driversToMetal: Scene = {
  id: 'drivers-to-metal',
  cols: 2,
  nodes: [
    machineStack(),
    {
      id: 'how',
      label: 'A driver knows HOW to say it to one specific device',
      sub: 'mostly loadable modules — lsmod, modprobe — which is what “monolithic with modules” means',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'dv-disk', label: 'Disk driver', sub: 'this disk model', variant: 'tile', pattern: 'network', icon: 'harddrive' },
        { id: 'dv-nic', label: 'NIC driver', sub: 'this network card', variant: 'tile', pattern: 'network', icon: 'router' },
        { id: 'dv-sda', label: '/dev/sda', sub: 'the disk, as a file', variant: 'tile', pattern: 'storage', icon: 'file' },
        { id: 'dv-null', label: '/dev/null', sub: 'the void, as a file', variant: 'tile', pattern: 'storage', icon: 'file' },
      ],
    },
  ],
  edges: [],
}
