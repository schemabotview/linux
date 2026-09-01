import type { Scene } from '../../render-engine'
import { machineStack } from './machine-stack'

// §6 userspace-distros — rung 6 lit, the top of the ladder. The narration points straight at the cake
// ("the kernel — the layer in the middle of this stack — is a single program"), so the band answers
// the question that raises: if the kernel is one program, what is the thing you actually installed?
export const distroAnatomy: Scene = {
  id: 'distro-anatomy',
  cols: 2,
  nodes: [
    machineStack(),
    {
      id: 'distro',
      label: 'A distribution — Ubuntu, Debian, Fedora, Arch',
      sub: 'the kernel is the same core everywhere; a distro is that plus everything around it',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'd-kernel', label: 'The kernel', sub: 'one program', variant: 'tile', pattern: 'service', icon: 'cpu' },
        { id: 'd-gnu', label: 'GNU userland', sub: 'ls, cp, grep, bash', variant: 'tile', pattern: 'user', icon: 'terminal' },
        { id: 'd-pkg', label: 'A package manager', sub: 'apt, dnf, pacman', variant: 'tile', pattern: 'storage', icon: 'boxes' },
        { id: 'd-defaults', label: 'Defaults', sub: 'installer, desktop', variant: 'tile', pattern: 'external', icon: 'wrench' },
      ],
    },
  ],
  edges: [],
}
