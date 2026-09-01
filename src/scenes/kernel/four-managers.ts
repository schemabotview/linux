import type { Scene } from '../../render-engine'
import { machineStack } from './machine-stack'

// §8 subsystems — the ring 0 layer lit, and the band opens it up. Four peers, each rationing one
// scarce resource among every process at once, and each naming the later course that unpacks it.
export const fourManagers: Scene = {
  id: 'four-managers',
  cols: 2,
  nodes: [
    machineStack(),
    {
      id: 'managers',
      label: 'Inside ring 0 — four managers, one machine',
      sub: 'every command you will ever run is a conversation with these four',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'm-sched', label: 'Scheduler', sub: 'the CPU — Course 4', variant: 'tile', pattern: 'service', icon: 'clock' },
        { id: 'm-mem', label: 'Memory', sub: 'a private space each', variant: 'tile', pattern: 'service', icon: 'memory' },
        { id: 'm-vfs', label: 'VFS', sub: 'one tree — Course 3', variant: 'tile', pattern: 'storage', icon: 'folder' },
        { id: 'm-net', label: 'Network', sub: 'a socket is a file', variant: 'tile', pattern: 'network', icon: 'network' },
      ],
    },
  ],
  edges: [],
}
