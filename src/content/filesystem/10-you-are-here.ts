import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here',
  scene: 'fs-recap',
  slide: `## You are here

You can now **navigate, secure, and reason about** the filesystem — from the top of the tree down to the bytes on disk.

### What you can now do
- Read the **FHS** map — find config in \`/etc\`, logs in \`/var/log\`, devices in \`/dev\`, live kernel state in \`/proc\`
- Move by **absolute & relative paths** (\`cd\`, \`ls -la\`, \`.\`/\`..\`/\`~\`) and reveal **dotfiles**
- Read *and* set **permissions & ownership** (\`chmod\` octal/symbolic, \`chown\`, \`sudo\`)
- Explain a file as **name → inode → data**, and use **hard links & symlinks**; assemble the tree with **mounts** & \`/etc/fstab\`

### The road ahead
- **Processes** — the running programs \`/proc\` hinted at: lifecycle, signals, monitoring
- **Text → Admin → Scripting → Project** — transforming data and operating the system

You know the world your commands act in. Next: the **processes** that do the acting.`,
  narration:
    'Here\'s the whole filesystem, and you can now navigate it with real understanding. You know it\'s a single tree rooted at slash, with a standard layout you can rely on anywhere: configuration as plain text in slash-etc, the logs you\'ll debug with in slash-var-slash-log, installed programs in slash-usr and slash-bin, your own files in slash-home under the tilde shorthand, throwaway space in slash-tmp, devices as files in slash-dev, and those magical live windows into the running kernel in slash-proc and slash-sys. You can move through it by absolute and relative paths, list it with ls, and reveal the hidden dotfiles where configuration hides. You can read the nine permission bits — read, write, execute across owner, group, and other — and change them with chmod and chown, reaching for sudo only when you truly need root\'s power. You understand that a filename is just a directory entry pointing at an inode, that the inode is the real file holding the metadata and the pointers to the data, and that this is why links work the way they do — hard links as equal second names, symlinks as signposts to a path. And you know the one tree is really many filesystems mounted together on many devices, assembled at boot from slash-etc-slash-fstab and presented as one by the VFS. That\'s the entire world your commands live and act in. And notice the thread we keep tugging: slash-proc kept pointing at running programs, each with its own directory, its own live state. Those are processes — the programs actually doing the work on the machine — and they\'re the whole subject of the next course. We\'ve mapped the world; now let\'s meet the things that move within it.',
}
