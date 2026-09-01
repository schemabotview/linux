import type { Scene } from '../../render-engine'
import { machineStack } from './machine-stack'

// §10 you-are-here — the board unlit again, whole, exactly as §1 first showed it. The narration reads
// the climb back out rung by rung ("read it as the boot climb, up the left"), so nothing is focused:
// the point is that you can now read the entire thing in both directions. The band is what comes next.
export const kernelRecap: Scene = {
  id: 'kernel-recap',
  cols: 2,
  nodes: [
    machineStack(),
    {
      id: 'ahead',
      label: 'The road ahead',
      sub: 'the machine is booted, and you know it both ways',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'ra-shell', label: 'Shell', sub: 'the prompt on top', variant: 'tile', pattern: 'user', icon: 'terminal' },
        { id: 'ra-fs', label: 'Filesystem', sub: 'paths and permissions', variant: 'tile', pattern: 'storage', icon: 'folder' },
        { id: 'ra-proc', label: 'Processes, text', sub: 'running work, moving data', variant: 'tile', pattern: 'network', icon: 'gears' },
        { id: 'ra-ops', label: 'Admin, scripting', sub: 'operate it, automate it', variant: 'tile', pattern: 'service', icon: 'wrench' },
      ],
    },
  ],
  edges: [],
}
