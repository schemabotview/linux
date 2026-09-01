import type { Scene } from '../../render-engine'

// §7 inodes — the section's surprise is that the inode has NO NAME in it. Drawn as a real table, that
// is visible rather than asserted: you can read every field the inode holds and see that a name is not
// among them, which is exactly why renaming a file never touches it.
export const nameInodeData: Scene = {
  id: 'name-inode-data',
  nodes: [
    { id: 'entry', label: 'A directory entry', sub: 'one line in a directory: "notes.txt" → 12345', pattern: 'user', icon: 'file' },
    {
      id: 'inode',
      kind: 'table',
      label: 'inode 12345',
      sub: 'the file itself — read the fields, and notice what is missing',
      pattern: 'service',
      columns: [
        { name: 'mode', type: 'rw-r--r--' },
        { name: 'owner', type: 'sam:staff' },
        { name: 'size', type: '1240' },
        { name: 'mtime', type: 'Sep 1 09:14' },
        { name: 'links', type: '1' },
        { name: 'blocks', type: '→ the data' },
      ],
    },
    { id: 'blocks', label: 'The data blocks', sub: 'the actual bytes on the disk', pattern: 'storage', icon: 'harddrive' },
  ],
  edges: [
    { source: 'entry', target: 'inode', label: 'the NAME lives in the directory — so renaming on one disk just rewrites this line' },
    { source: 'inode', target: 'blocks', label: 'ls -i shows the number; df -i shows you can run out of them' },
  ],
}
