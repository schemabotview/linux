import type { Scene } from '../../render-engine'

// §6 quoting — the section calls the unquoted variable "the #1 shell bug", and a bug is only
// convincing when you can see it misfire. So the card runs the same variable four ways and shows what
// each one actually produces; the band below is the rule each line demonstrates.
export const quotingOff: Scene = {
  id: 'quoting-off',
  nodes: [
    {
      id: 'quote-code',
      kind: 'code',
      filename: 'quoting.sh',
      label: [
        'name="Sam Ray"',
        '',
        'echo $name      # two arguments: Sam and Ray   <- the #1 bug',
        'echo "$name"    # one argument:  Sam Ray',
        "echo '$name'    # literally:     $name",
        '',
        'rm "my file.txt"   # one file',
        'rm my file.txt     # two files, and neither exists',
      ].join('\n'),
    },
    {
      id: 'ways',
      label: 'Three ways to say “treat this literally”',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'q-double', label: 'Double quotes', sub: 'stop globbing and splitting; $ still expands', pattern: 'service', icon: 'lock' },
        { id: 'q-single', label: 'Single quotes', sub: 'everything literal, no expansion at all', pattern: 'network', icon: 'lock' },
        { id: 'q-slash', label: 'A backslash', sub: 'escape exactly one character', pattern: 'storage', icon: 'ban' },
      ],
    },
  ],
  edges: [{ source: 'quote-code', target: 'ways', label: 'quoting is expansion’s off switch — always quote "$vars"' }],
}
