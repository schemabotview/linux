import type { Scene } from '../../render-engine'

// §7 exec — the section's hook is that this is the SAME fork+exec the kernel used to start PID 1, so
// the scene names that link on the first edge. The last band is a pair rather than a single card
// because "the shell waits" and "unless you end the line with &" are one choice with two outcomes.
export const forkExecWait: Scene = {
  id: 'fork-exec-wait',
  nodes: [
    { id: 'bash', label: 'bash', sub: 'your shell, holding a final list of words', pattern: 'user', icon: 'terminal' },
    {
      id: 'child',
      label: 'A child process',
      sub: 'cloned from the shell, then replaced',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 'f-fork', label: 'fork()', sub: 'clone the shell itself', pattern: 'service', icon: 'copy' },
        { id: 'f-exec', label: 'exec()', sub: 'the copy becomes /usr/bin/ls', pattern: 'service', icon: 'zap' },
      ],
    },
    {
      id: 'waiting',
      label: 'Then the shell waits — unless you tell it not to',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 'w-wait', label: 'wait()', sub: 'pause until the child exits, then read $?', pattern: 'network', icon: 'clock' },
        { id: 'w-bg', label: 'Or end with &', sub: 'background it: jobs, bg, fg, Ctrl-Z', pattern: 'user', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'bash', target: 'child', label: 'the same fork + exec the kernel used to start PID 1 in Course 1' },
    { source: 'child', target: 'waiting', label: 'the child exits with a number' },
  ],
}
