import type { Scene } from '../../render-engine'
import { machineStack } from './machine-stack'

// §4 kernel-boot — rung 3 lit, and the narration says to watch the kernel layer in the middle of the
// stack switch on. The band is the early-boot sequence as a real chain, because its middle two steps
// are a chicken-and-egg: you need a driver to read the disk that holds the driver.
export const kernelWakes: Scene = {
  id: 'kernel-wakes',
  cols: 2,
  nodes: [
    machineStack(),
    {
      id: 'early-boot',
      label: 'Early boot, inside the kernel',
      sub: 'initramfs exists because the driver for the real disk lives ON the real disk',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'eb-decomp', label: 'Decompress', sub: 'vmlinuz, in RAM', variant: 'tile', pattern: 'service', icon: 'box' },
        { id: 'eb-initramfs', label: 'initramfs', sub: 'a root in RAM', variant: 'tile', pattern: 'warn', icon: 'memory' },
        { id: 'eb-drivers', label: 'Load drivers', sub: 'probe the hardware', variant: 'tile', pattern: 'network', icon: 'plug' },
        { id: 'eb-pivot', label: 'Mount the real /', sub: 'pivot onto the disk', variant: 'tile', pattern: 'storage', icon: 'harddrive' },
      ],
      edges: [
        { source: 'eb-decomp', target: 'eb-initramfs' },
        { source: 'eb-initramfs', target: 'eb-drivers' },
        { source: 'eb-drivers', target: 'eb-pivot' },
      ],
    },
  ],
  edges: [],
}
