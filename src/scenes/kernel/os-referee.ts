import type { Scene } from '../../render-engine'
import { machineStack } from './machine-stack'

// §1 why-linux — the board with nothing lit, because the narration introduces it whole here ("we'll
// spend the whole course inside it"). The band is the section's own claim: an OS is the referee
// between programs and hardware, which is also how to read the cake beside it.
export const osReferee: Scene = {
  id: 'os-referee',
  cols: 2,
  nodes: [
    machineStack(),
    {
      id: 'what-an-os-is',
      label: 'What an operating system is for',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'os-referee-card', label: 'One referee', sub: 'shares CPU, memory, disk, network', variant: 'tile', pattern: 'user', icon: 'scale' },
        { id: 'os-services', label: 'Stable services', sub: 'never a raw disk', variant: 'tile', pattern: 'user', icon: 'server' },
        { id: 'os-line', label: 'The line', sub: 'your code, or the machine', variant: 'tile', pattern: 'user', icon: 'dooropen' },
      ],
    },
  ],
  edges: [],
}
