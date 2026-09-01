import type { Scene } from '../../render-engine'

// §4 paths — a path is literal text, and the difference between the two kinds only shows when you can
// see where you were standing when you typed them. Hence a session rather than a diagram: the same
// file reached both ways, from a pwd that is on screen.
export const absVsRel: Scene = {
  id: 'abs-vs-rel',
  nodes: [
    {
      id: 'nav',
      kind: 'code',
      filename: 'a session',
      label: [
        '$ pwd',
        '/home/sam/projects',
        '',
        '$ cat /var/log/syslog   # absolute: means this from anywhere',
        '$ cat app.py            # relative: /home/sam/projects/app.py',
        '$ cd ..                 # now /home/sam',
        '$ cd -                  # back to where you just were',
        '$ ls -la                # -a reveals dotfiles: .bashrc, .ssh',
      ].join('\n'),
    },
    {
      id: 'short',
      label: 'Four shorthands you will type all day',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'sh-dot', label: '.', sub: 'here', variant: 'tile', pattern: 'storage', icon: 'folder' },
        { id: 'sh-dotdot', label: '..', sub: 'the parent', variant: 'tile', pattern: 'storage', icon: 'folder' },
        { id: 'sh-tilde', label: '~', sub: 'your home', variant: 'tile', pattern: 'user', icon: 'users' },
        { id: 'sh-dash', label: '-', sub: 'the previous one', variant: 'tile', pattern: 'network', icon: 'repeat' },
      ],
    },
  ],
  edges: [{ source: 'nav', target: 'short', label: 'absolute for scripts, because it is unambiguous; relative for moving around' }],
}
