import type { Scene } from '../../render-engine'

// §5 permissions-read — the nine bits ARE a three-by-three grid, so the scene draws the grid rather
// than describing it: the table below is literally `-rw-r--r--` with the columns named. Real ls -l
// output above gives it something to decode, including the d and l type characters.
export const permissionBits: Scene = {
  id: 'permission-bits',
  nodes: [
    {
      id: 'lsl',
      kind: 'code',
      filename: 'ls -l',
      label: [
        '-rw-r--r--  1 sam  staff   1240 Sep  1 09:14 notes.txt',
        'drwxr-xr-x  4 sam  staff    128 Sep  1 09:02 projects',
        'lrwxrwxrwx  1 sam  staff     11 Sep  1 09:03 latest -> notes.txt',
      ].join('\n'),
    },
    {
      id: 'grid',
      kind: 'table',
      label: 'rw- r-- r--',
      sub: 'the nine bits of notes.txt, laid out as what they are',
      pattern: 'service',
      headers: ['audience', 'read', 'write', 'execute'],
      values: [
        ['owner (sam)', 'r', 'w', '-'],
        ['group (staff)', 'r', '-', '-'],
        ['other', 'r', '-', '-'],
      ],
    },
  ],
  edges: [
    { source: 'lsl', target: 'grid', label: 'first character is the TYPE — file, d directory, l symlink; the nine after it are three triads' },
  ],
}
