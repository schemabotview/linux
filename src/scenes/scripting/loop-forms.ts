import type { Scene } from '../../render-engine'

// §5 loops — the section calls the read idiom the one to memorise, so it is the centre of the card
// rather than a footnote. The warn node carries the rule that actually breaks people's scripts: a
// filename with a space in it, which is why every iteration variable is quoted here.
export const loopForms: Scene = {
  id: 'loop-forms',
  nodes: [
    {
      id: 'loops-code',
      kind: 'code',
      filename: 'loops.sh',
      label: [
        'for f in *.log; do        # the SHELL expands the glob, not for',
        '    gzip "$f"             # quote it — filenames have spaces',
        'done',
        '',
        'for i in {1..5}; do echo "$i"; done',
        '',
        'while IFS= read -r line; do    # the file-reading idiom',
        '    echo "$line"               # memorise this one exactly',
        'done < input.txt',
        '',
        'until ping -c1 host &>/dev/null; do   # loop UNTIL success',
        '    sleep 2',
        'done',
      ].join('\n'),
    },
    {
      id: 'never-ls',
      label: 'Never parse ls',
      sub: 'use a glob, or read — and quote it',
      pattern: 'warn',
      icon: 'ban',
    },
  ],
  edges: [
    { source: 'loops-code', target: 'never-ls', label: 'break exits the loop, continue skips to the next item — the same two words as everywhere else' },
  ],
}
