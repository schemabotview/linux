import type { Scene } from '../../render-engine'

// §7 monitoring-look — the section says /proc is the raw truth and "everything else reads this", so
// the scene puts /proc underneath and has both tools point down at it. Flowing BT makes the dependency
// structural instead of a sentence in a sub.
export const threeLenses: Scene = {
  id: 'three-lenses',
  flow: 'BT',
  nodes: [
    {
      id: 'proc',
      label: '/proc — the raw truth',
      sub: 'a directory per PID, generated live by the kernel',
      pattern: 'storage',
      icon: 'folder',
    },
    { id: 'ps', label: 'ps aux', sub: 'a snapshot: user, PID, %CPU, %MEM, state, command', pattern: 'network', icon: 'table' },
    { id: 'top', label: 'top and htop', sub: 'a live dashboard, re-sorted by CPU every second', pattern: 'service', icon: 'gauge' },
  ],
  edges: [
    { source: 'proc', target: 'ps', label: 'for scripting: ps aux | grep <name>' },
    { source: 'proc', target: 'top', label: 'for “what is eating this box?” — then note the PID and act' },
  ],
}
