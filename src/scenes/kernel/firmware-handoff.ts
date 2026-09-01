import type { Scene } from '../../render-engine'
import { machineStack } from './machine-stack'

// §2 firmware — rung 1 lit. The narration says "we start at the very bottom of the ladder", so the
// ladder has to be there and the bottom rung has to be the thing glowing. The band is what the
// firmware actually does before it hands off, and it hands off UPWARD, which the ribbon already shows.
export const firmwareHandoff: Scene = {
  id: 'firmware-handoff',
  cols: 2,
  nodes: [
    machineStack(),
    {
      id: 'firmware-does',
      label: 'UEFI firmware — baked into a chip on the motherboard',
      sub: 'it knows nothing about Linux: it finds the next rung and gets out of the way',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'fw-post', label: 'POST', sub: 'is the CPU alive?', variant: 'tile', pattern: 'network', icon: 'gauge' },
        { id: 'fw-find', label: 'Find a disk', sub: 'walk the boot order', variant: 'tile', pattern: 'network', icon: 'harddrive' },
        { id: 'fw-esp', label: 'Read the ESP', sub: 'MBR on old BIOS', variant: 'tile', pattern: 'network', icon: 'file' },
      ],
    },
  ],
  edges: [],
}
