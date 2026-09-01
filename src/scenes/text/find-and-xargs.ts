import type { Scene } from '../../render-engine'

// §7 find-xargs — the pair only makes sense once you know WHY xargs exists, and that reason is a
// mismatch between two interfaces, so it gets its own node. The -print0 line is on the card because
// the section calls it the pro habit and it is one flag away from the version that breaks on spaces.
export const findAndXargs: Scene = {
  id: 'find-and-xargs',
  nodes: [
    {
      id: 'find-code',
      kind: 'code',
      filename: 'find and xargs',
      label: [
        "find . -name '*.log'            # by name",
        'find . -type f -size +100M      # regular files over 100 MB',
        'find . -mtime -7                # changed in the last 7 days',
        '',
        "find . -name '*.tmp' -delete    # ...then act on them",
        "find . -name '*.log' -exec gzip {} \;   # {} is each match",
        '',
        'grep -rl TODO . | xargs wc -l   # a LIST becomes ARGUMENTS',
        "find . -name '*.log' -print0 | xargs -0 gzip   # spaces-safe",
      ].join('\n'),
    },
    {
      id: 'why',
      label: 'Why xargs exists',
      sub: 'most commands take arguments, not stdin',
      pattern: 'network',
      icon: 'link',
    },
  ],
  edges: [
    { source: 'find-code', target: 'why', label: 'these two act on FILES, not on their contents — find locates them, xargs runs something on the list' },
  ],
}
