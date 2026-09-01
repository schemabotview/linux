import type { Scene } from '../../render-engine'

// §1 operating-a-box — five areas that do not flow into each other, so they are a board. The loop
// below is the section's actual mindset claim, and it IS a cycle: read the config, take the privilege,
// read the logs when it breaks, go back to the config.
export const operatorSurface: Scene = {
  id: 'operator-surface',
  nodes: [
    {
      id: 'surface',
      label: 'The administrator’s surface',
      sub: 'the jobs a real server demands, day to day',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'os-users', label: 'Users & groups', sub: 'who may do what', variant: 'tile', pattern: 'user', icon: 'users' },
        { id: 'os-svc', label: 'Services', sub: 'the daemons systemd runs', variant: 'tile', pattern: 'service', icon: 'server' },
        { id: 'os-pkg', label: 'Packages', sub: 'installing safely', variant: 'tile', pattern: 'storage', icon: 'boxes' },
        { id: 'os-cron', label: 'Scheduling', sub: 'work while you sleep', variant: 'tile', pattern: 'network', icon: 'clock' },
        { id: 'os-logs', label: 'Logs & network', sub: 'what happened, and reaching out', variant: 'tile', pattern: 'network', icon: 'scroll' },
      ],
    },
    {
      id: 'loop',
      label: 'The loop you will live in',
      pattern: 'service',
      flow: 'LR',
      children: [
        { id: 'lp-conf', label: 'Config in /etc', sub: 'plain text', variant: 'tile', pattern: 'service', icon: 'wrench' },
        { id: 'lp-sudo', label: 'sudo', sub: 'for the privilege', variant: 'tile', pattern: 'warn', icon: 'key' },
        { id: 'lp-logs', label: 'Logs', sub: 'when it breaks', variant: 'tile', pattern: 'network', icon: 'scroll' },
      ],
      edges: [
        { source: 'lp-conf', target: 'lp-sudo' },
        { source: 'lp-sudo', target: 'lp-logs', label: 'and back to the config' },
      ],
    },
  ],
  edges: [
    { source: 'surface', target: 'loop', label: 'the shift from using a machine to operating one' },
  ],
}
