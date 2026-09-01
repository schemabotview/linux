import type { Scene } from '../../render-engine'

// §3 sudo — the section is an argument against a habit, so the scene is the two habits side by side.
// The left column is not "root is bad", it is the two specific things that go wrong; the right column
// answers each of them.
export const borrowingRoot: Scene = {
  id: 'borrowing-root',
  cols: 2,
  padding: 0.14,
  nodes: [
    {
      id: 'as-root',
      label: 'Logged in as root',
      sub: 'all the power, all the time',
      pattern: 'warn',
      children: [
        { id: 'br-typo', label: 'One typo, no undo', sub: 'rm -rf / has no guard', pattern: 'warn', icon: 'ban' },
        { id: 'br-blame', label: 'Unattributable', sub: 'the log says root, not who', pattern: 'warn', icon: 'scanface' },
      ],
    },
    {
      id: 'with-sudo',
      label: 'sudo — borrowed, one command',
      sub: 'least privilege, by default',
      pattern: 'service',
      children: [
        { id: 'sd-one', label: 'One command', sub: 'as root, then back', pattern: 'service', icon: 'key' },
        { id: 'sd-log', label: 'Logged', sub: '/var/log/auth.log', pattern: 'service', icon: 'scroll' },
        { id: 'sd-who', label: 'Who may', sub: 'the sudo or wheel group', pattern: 'network', icon: 'usercheck' },
        { id: 'sd-visudo', label: 'Edit with visudo', sub: 'it syntax-checks first', pattern: 'network', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [],
}
