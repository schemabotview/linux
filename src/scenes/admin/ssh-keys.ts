import type { Scene } from '../../render-engine'

// §9 ssh — the key pair is the whole idea and it is asymmetric, so the halves are drawn as two cards
// that go to two different places. The card below is the session that puts each half where it belongs,
// with the path spelled out there rather than in a sub it would overflow.
export const sshKeys: Scene = {
  id: 'ssh-keys',
  nodes: [
    {
      id: 'pair',
      label: 'ssh-keygen makes a PAIR — the halves live apart',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'k-priv', label: 'The private half', sub: 'never leaves your laptop', pattern: 'warn', icon: 'lock' },
        { id: 'k-pub', label: 'The public half', sub: 'goes onto the server', pattern: 'service', icon: 'key' },
      ],
    },
    {
      id: 'ssh-code',
      kind: 'code',
      filename: 'ssh',
      label: [
        'ssh sam@server.com           # an encrypted bash prompt, over there',
        'ssh -p 2222 sam@server.com   # port 22 unless you say otherwise',
        '',
        'ssh-keygen                   # make the pair',
        'ssh-copy-id sam@server       # install the public half into',
        '                             #   ~/.ssh/authorized_keys',
        'chmod 600 ~/.ssh/id_ed25519  # guard the private one',
        '',
        'scp report.txt sam@server:/tmp/',
        'rsync -av site/ sam@server:/srv/site/   # efficient, resumable',
      ].join('\n'),
    },
  ],
  edges: [
    { source: 'pair', target: 'ssh-code', label: 'keys are safer AND scriptable — which is why they, not passwords, are the professional default' },
  ],
}
