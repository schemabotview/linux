import type { Scene } from '../../render-engine'

// §5 systemd-logs — the connection worth drawing is that journald captures the SAME two streams from
// Course 2, with no log wiring anywhere. The last band is the section's own claim that the loop is the
// job, so it is drawn as a loop rather than listed as steps.
export const journalLoop: Scene = {
  id: 'journal-loop',
  nodes: [
    { id: 'streams', label: 'stdout and stderr', sub: 'the same two from Course 2', pattern: 'user', icon: 'waves' },
    {
      id: 'journalctl',
      label: 'journald captures both, centrally',
      sub: 'read it back with journalctl — /var/log still has the text logs too',
      pattern: 'service',
      cols: 4,
      children: [
        { id: 'jc-u', label: '-u nginx', sub: 'one service', variant: 'tile', pattern: 'service', icon: 'funnel' },
        { id: 'jc-f', label: '-f', sub: 'follow live', variant: 'tile', pattern: 'service', icon: 'waves' },
        { id: 'jc-b', label: '-b', sub: 'since last boot', variant: 'tile', pattern: 'service', icon: 'power' },
        { id: 'jc-p', label: '-p err', sub: 'by priority', variant: 'tile', pattern: 'warn', icon: 'bell' },
      ],
    },
    {
      id: 'loop',
      label: 'The debugging loop — this is the job',
      pattern: 'network',
      flow: 'LR',
      children: [
        { id: 'dl-status', label: 'status', sub: 'is it up?', variant: 'tile', pattern: 'network', icon: 'gauge' },
        { id: 'dl-journal', label: 'journalctl -e', sub: 'why not?', variant: 'tile', pattern: 'network', icon: 'scroll' },
        { id: 'dl-fix', label: 'Fix the config', sub: 'in /etc', variant: 'tile', pattern: 'service', icon: 'wrench' },
        { id: 'dl-restart', label: 'restart', sub: 'and look again', variant: 'tile', pattern: 'service', icon: 'repeat' },
      ],
      edges: [
        { source: 'dl-status', target: 'dl-journal' },
        { source: 'dl-journal', target: 'dl-fix' },
        { source: 'dl-fix', target: 'dl-restart' },
      ],
    },
  ],
  edges: [
    { source: 'streams', target: 'journalctl', label: 'a service writes to them exactly as any program does — nobody wires up a log file' },
    { source: 'journalctl', target: 'loop', label: 'and a target is just a boot goal: multi-user for a server, graphical for a desktop' },
  ],
}
