import type { Scene } from '../../render-engine'

// §2 users — /etc/passwd IS a table, one row per account, and reading two real rows makes the section's
// two numeric facts self-evident: root is UID 0, and human accounts start at 1000. The band below is
// the other two files, plus the flag whose absence quietly deletes someone's group memberships.
export const accountFiles: Scene = {
  id: 'account-files',
  nodes: [
    {
      id: 'passwd',
      kind: 'table',
      label: '/etc/passwd',
      sub: 'every account, world-readable, in plain text',
      pattern: 'storage',
      headers: ['name', 'UID', 'GID', 'home', 'shell'],
      values: [
        ['root', '0', '0', '/root', '/bin/bash'],
        ['sam', '1000', '1000', '/home/sam', '/bin/bash'],
        ['www-data', '33', '33', '/var/www', '/usr/sbin/nologin'],
      ],
    },
    {
      id: 'beside',
      label: 'and the two beside it',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'af-group', label: '/etc/group', sub: 'groups and their members', pattern: 'user', icon: 'users' },
        { id: 'af-shadow', label: '/etc/shadow', sub: 'hashed passwords, root-only', pattern: 'warn', icon: 'lock' },
        { id: 'af-trap', label: 'usermod -aG', sub: 'without -a it REPLACES', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'passwd', target: 'beside', label: 'root is UID 0; human accounts start at 1000 — and every bit of it is text you can read with Course 5' },
  ],
}
