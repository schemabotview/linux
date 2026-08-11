import { type SceneSpec, GREEN } from 'reveal-engine'

// Course 3 §5–§6 — permissions & ownership on a whole-canvas `code` card: decode `ls -l`, then the
// two ways to change it (octal + symbolic), ownership, and the directory-execute gotcha. One
// terminal session; short lines so the auto-fit font stays large at 4K.
export const permissions: SceneSpec = {
  id: 'permissions',
  title: 'Permissions & ownership',
  canvas: { width: 1520, height: 1300 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'pm-all', kind: 'code', filename: 'permissions.sh', color: GREEN, cell: [0, 0],
      label: [
        '$ ls -l report.txt',
        '-rw-r--r--  1 sam staff  2314  report.txt',
        '^^^^^^^^^^     ^^^ ^^^^^',
        '# type + 3 triads   owner  group',
        '#  -  rw-  r--  r--',
        '#  |   |    |    +- other : read',
        '#  |   |    +------ group : read',
        '#  |   +----------- owner : read + write',
        '#  +--------------- type  : - file  d dir  l link',
        '',
        '# rwx as numbers:   r=4   w=2   x=1',
        'chmod 644 report.txt   # rw- r-- r--',
        'chmod 755 script.sh    # rwx r-x r-x (runnable)',
        'chmod u+x script.sh    # symbolic: +x for owner',
        'chmod go-w file        # take write from group+other',
        '',
        '# ownership (needs sudo)',
        'sudo chown sam:staff file    # owner : group',
        '',
        '# on a DIRECTORY, x means "may enter/traverse"',
        'umask 022              # default mask for new files',
        'sudo command           # run one command as root',
      ].join('\n'),
    },
  ],
  edges: [],
}
