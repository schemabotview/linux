import type { Scene } from '../../render-engine'

// §6 signals — a signal is a name, a number and a default action, which is a row. The catchable column
// is the one that matters: read it and you can see why -9 is a last resort rather than a shortcut, and
// why a program can clean up after Ctrl-C but never after SIGKILL.
export const signalTable: Scene = {
  id: 'signal-table',
  nodes: [
    {
      id: 'signals',
      kind: 'table',
      label: 'kill sends; it does not necessarily kill',
      sub: 'a short asynchronous message the kernel delivers to a process',
      pattern: 'network',
      headers: ['signal', 'no.', 'what it asks for', 'catchable?'],
      values: [
        ['SIGTERM', '15', 'please stop — the default of kill', 'yes'],
        ['SIGINT', '2', 'interrupt — this is Ctrl-C', 'yes'],
        ['SIGHUP', '1', 'hang-up — daemons reload config', 'yes'],
        ['SIGSTOP', '19', 'pause — this is Ctrl-Z', 'NO'],
        ['SIGKILL', '9', 'die now, no cleanup', 'NO'],
      ],
    },
    {
      id: 'etiquette',
      label: 'Try TERM first',
      sub: 'no chance to clean up',
      pattern: 'warn',
      icon: 'ban',
    },
  ],
  edges: [
    { source: 'signals', target: 'etiquette', label: 'a catchable signal can be trapped to clean up first; -9 leaves temp files and half-written data behind' },
  ],
}
