import type { Scene } from '../../render-engine'

// §2 grep — flags are literal text and the whole section is a list of them, so the card is the
// section. Written as a real session with a comment per line, because "-v inverts" means nothing until
// you see it sitting next to the plain form it inverts.
export const grepFlags: Scene = {
  id: 'grep-flags',
  nodes: [
    {
      id: 'grep-code',
      kind: 'code',
      filename: 'grep',
      label: [
        'grep error app.log         # every line containing "error"',
        'grep -i -w error app.log   # ignore case; whole word only',
        'grep -c error app.log      # count them instead of printing',
        'grep -rn TODO src/         # recurse a tree, with line numbers',
        'grep -l TODO src/          # just the filenames that match',
        'grep -v debug app.log      # INVERT: the lines that do NOT match',
        'grep -A2 -B2 panic app.log # two lines of context either side',
        '',
        'ps aux | grep ssh          # its natural home is a pipe',
      ].join('\n'),
    },
    {
      id: 'question',
      label: 'grep answers one question',
      sub: 'where does X appear?',
      pattern: 'service',
      icon: 'search',
    },
  ],
  edges: [
    { source: 'grep-code', target: 'question', label: 'global regular expression print — and that middle word is the next section' },
  ],
}
