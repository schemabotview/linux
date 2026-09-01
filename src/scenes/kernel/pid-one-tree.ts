import type { Scene } from '../../render-engine'
import { machineStack } from './machine-stack'

// §5 init-systemd — rung 5 lit. The claim underneath is ancestry ("follow every parent up and you
// reach PID 1"), so the band is a real tree rather than a list of daemons: one root, its services
// fanned beneath it, and the login branch carried on to the shell where Course 2 begins.
export const pidOneTree: Scene = {
  id: 'pid-one-tree',
  cols: 2,
  nodes: [
    machineStack(),
    {
      id: 'tree',
      label: 'systemd — PID 1, and everything descends from it',
      sub: 'the kernel starts exactly one program; if it ever exits, the system panics',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'pt-systemd', label: 'systemd', sub: 'PID 1', variant: 'tile', pattern: 'service', icon: 'workflow' },
        { id: 'pt-sshd', label: 'sshd', sub: 'remote logins', variant: 'tile', pattern: 'network', icon: 'globe' },
        { id: 'pt-cron', label: 'cron', sub: 'scheduled jobs', variant: 'tile', pattern: 'network', icon: 'clock' },
        { id: 'pt-getty', label: 'getty', sub: 'the login prompt', variant: 'tile', pattern: 'user', icon: 'users' },
        { id: 'pt-bash', label: 'bash', sub: 'Course 2 starts here', variant: 'tile', pattern: 'user', icon: 'terminal' },
      ],
      edges: [
        { source: 'pt-systemd', target: 'pt-sshd' },
        { source: 'pt-systemd', target: 'pt-cron' },
        { source: 'pt-systemd', target: 'pt-getty', label: 'started in parallel, by dependency' },
        { source: 'pt-getty', target: 'pt-bash' },
      ],
    },
  ],
  edges: [],
}
