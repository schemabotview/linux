import type { Scene } from '../../render-engine'

// §5 expansion — the section's one rule is "the command never sees the star". That is a claim about
// what the program RECEIVES versus what you typed, so both lines have to be on screen together; a
// card saying "the shell expands globs" would be the assertion without the evidence.
export const expansionRewrite: Scene = {
  id: 'expansion-rewrite',
  nodes: [
    {
      id: 'rewrite',
      kind: 'code',
      filename: 'what the program actually receives',
      label: [
        'you type:   ls *.txt',
        'ls receives: ls a.txt b.txt c.txt',
        '',
        'you type:   echo "home is $HOME"',
        'echo receives: echo "home is /home/sam"',
        '',
        'you type:   echo "today is $(date +%F)"',
        'echo receives: echo "today is 2026-09-01"',
      ].join('\n'),
    },
    {
      id: 'kinds',
      label: 'Three rewrites, all done before the program starts',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'e-glob', label: 'Globs', sub: '* ? [abc] become filenames', pattern: 'storage', icon: 'funnel' },
        { id: 'e-var', label: 'Variables', sub: '$name becomes its value', pattern: 'network', icon: 'tag' },
        { id: 'e-sub', label: 'Substitution', sub: '$( ) becomes its output', pattern: 'service', icon: 'copy' },
      ],
    },
  ],
  edges: [{ source: 'rewrite', target: 'kinds', label: 'expansion happens IN THE SHELL — this is the whole surprise' }],
}
