import type { Scene } from '../../render-engine'

// §6 packages — three properties, then the commands, then the comparison the section actually cares
// about. The curl-pipe-bash card is a warn node rather than a bullet because it is the one place this
// course tells you not to do something.
export const packageManager: Scene = {
  id: 'package-manager',
  nodes: [
    {
      id: 'does',
      label: 'What it does that a download cannot',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'pm-deps', label: 'Resolves deps', sub: 'nginx, and its libraries', pattern: 'service', icon: 'workflow' },
        { id: 'pm-signed', label: 'Signed repos', sub: 'trusted by default', pattern: 'service', icon: 'shieldcheck' },
        { id: 'pm-tracks', label: 'Tracks files', sub: 'so it can remove them', pattern: 'storage', icon: 'table' },
      ],
    },
    {
      id: 'apt',
      kind: 'code',
      filename: 'apt — dnf on Fedora, pacman on Arch',
      label: [
        'sudo apt update            # refresh the lists FIRST',
        'sudo apt upgrade           # then update everything',
        '',
        'sudo apt install nginx',
        'sudo apt remove nginx',
        'apt search nginx / apt show nginx',
      ].join('\n'),
    },
    {
      id: 'curl',
      label: 'Not curl | bash',
      sub: 'a piped script is none of these',
      pattern: 'warn',
      icon: 'ban',
    },
  ],
  edges: [
    { source: 'does', target: 'apt', label: 'you do not download installers on Linux' },
    { source: 'apt', target: 'curl', label: 'prefer a package: it is signed, versioned and removable' },
  ],
}
