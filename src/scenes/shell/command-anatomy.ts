import type { Scene } from '../../render-engine'

// §2 anatomy — a claim about WHICH WORD does what needs the words on screen, so this is a code card:
// the same listing written four ways, with the bundling and long-option rules visible as real lines
// rather than asserted in a card. The band below names the three roles those words play.
export const commandAnatomy: Scene = {
  id: 'command-anatomy',
  nodes: [
    {
      id: 'cmd-code',
      kind: 'code',
      filename: 'a command line',
      label: [
        'ls -l -a /etc',
        'ls -la /etc                  # short options bundle',
        'ls --all --human-readable /etc   # long: clearer in scripts',
        'grep -n "root" /etc/passwd   # a command with an argument',
      ].join('\n'),
    },
    {
      id: 'roles',
      label: 'Just words separated by spaces',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'a-cmd', label: 'The command', sub: 'the first word — what to run', pattern: 'service', icon: 'terminal' },
        { id: 'a-opt', label: 'Options', sub: 'how — a dash, or two', pattern: 'network', icon: 'tag' },
        { id: 'a-arg', label: 'Arguments', sub: 'what to act on', pattern: 'storage', icon: 'file' },
      ],
    },
  ],
  edges: [{ source: 'cmd-code', target: 'roles', label: 'the first word is the program; everything after it modifies or feeds it' }],
}
