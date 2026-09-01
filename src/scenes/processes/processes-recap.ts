import type { Scene } from '../../render-engine'

// §10 you-are-here — the course followed one process from birth to death, so the recap is that same
// arc in four beats rather than a list of commands: born, alive, spoken to, dead. Each card names the
// mechanism the course actually gave you for that beat.
export const processesRecap: Scene = {
  id: 'processes-recap',
  nodes: [
    {
      id: 'arc',
      label: 'One process, end to end',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'a-born', label: 'Born', sub: 'fork, then exec — and the gap between them', pattern: 'service', icon: 'copy' },
        { id: 'a-alive', label: 'Alive', sub: 'R, S, T — time slices, and nice', pattern: 'network', icon: 'clock' },
        { id: 'a-talk', label: 'Spoken to', sub: 'signals — TERM before KILL', pattern: 'user', icon: 'bell' },
        { id: 'a-dead', label: 'Dead', sub: 'exit, zombie, reaped — or adopted by PID 1', pattern: 'warn', icon: 'skull' },
      ],
    },
    { id: 'next', label: 'Next — the text tools', sub: 'grep, sed and awk, for the streams these processes emit', pattern: 'storage', icon: 'funnel' },
  ],
  edges: [{ source: 'arc', target: 'next', label: 'you can see, understand and control every running program on the box' }],
}
