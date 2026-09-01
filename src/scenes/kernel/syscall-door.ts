import type { Scene } from '../../render-engine'
import { machineStack } from './machine-stack'

// §7 user-vs-kernel — the turn: the course stops climbing and starts descending. The narration calls
// the syscall row "the red bar in the middle of the stack", which is why that node is the only `warn`
// on the board. The band is what actually goes through the door.
export const syscallDoor: Scene = {
  id: 'syscall-door',
  cols: 2,
  nodes: [
    machineStack(),
    {
      id: 'through',
      label: 'What goes through the one door',
      sub: 'the CPU itself enforces the wall — user code literally cannot touch hardware',
      pattern: 'group',
      cols: 5,
      children: [
        { id: 'sc-read', label: 'read', variant: 'tile', pattern: 'warn', icon: 'file' },
        { id: 'sc-write', label: 'write', variant: 'tile', pattern: 'warn', icon: 'pencil' },
        { id: 'sc-open', label: 'open', variant: 'tile', pattern: 'warn', icon: 'folder' },
        { id: 'sc-fork', label: 'fork', variant: 'tile', pattern: 'warn', icon: 'copy' },
        { id: 'sc-mmap', label: 'mmap', variant: 'tile', pattern: 'warn', icon: 'memory' },
      ],
    },
  ],
  edges: [],
}
