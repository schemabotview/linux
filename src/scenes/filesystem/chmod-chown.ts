import type { Scene } from '../../render-engine'

// §6 permissions-change — octal only makes sense if you can see the sum land on the triad it produces,
// so every chmod line carries its result as a comment. root gets its own node rather than a bullet:
// it is the one thing on this slide that ignores everything above it.
export const chmodChown: Scene = {
  id: 'chmod-chown',
  nodes: [
    {
      id: 'chmod-code',
      kind: 'code',
      filename: 'setting access',
      label: [
        '# octal: r=4  w=2  x=1, summed per triad',
        'chmod 644 notes.txt    # rw- r-- r--   (4+2, 4, 4)',
        'chmod 755 script.sh    # rwx r-x r-x   a script needs x to run',
        '',
        '# symbolic: who + change + what',
        'chmod u+x script.sh    # the same thing, said differently',
        'chmod go-w notes.txt',
        '',
        'sudo chown sam:staff notes.txt   # owner : group',
        'umask 022                        # what new files do NOT get',
      ].join('\n'),
    },
    {
      id: 'root',
      label: 'root — UID 0',
      sub: 'bypasses every check above; sudo runs ONE command as it',
      pattern: 'warn',
      icon: 'key',
    },
  ],
  edges: [
    { source: 'chmod-code', target: 'root', label: 'work as a normal user; reach for sudo only when you truly need it' },
  ],
}
