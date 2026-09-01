import type { Section } from '../types'

export const inodes: Section = {
  id: 'inodes',
  title: 'Names, inodes & data',
  scene: 'name-inode-data',
  slide: `## Names, inodes & data

Here's a surprise: a filename and the file are **two different things**. The name just *points* at the real file — the **inode**.

### Three layers
- A **filename** is a **directory entry** — a line in a directory that maps a **name → an inode number**
- The **inode** *is* the file: it holds the **metadata** (permissions, owner, size, timestamps) and **pointers to the data blocks** — but **no name**
- The **data blocks** are the actual bytes on disk

### Why this matters
- The name lives in the *directory*, the file lives in the *inode* — so renaming or moving a file within a disk just **rewrites a directory entry**; the inode and data never move
- \`ls -i\` shows inode numbers; \`df -i\` shows you can even **run out of inodes** while disk space remains

One inode, reached by a name. Which raises a great question: can *two* names point at *one* inode?`,
  narration:
    'Here\'s something that sounds like a technicality but is actually one of the most clarifying ideas in the whole filesystem: a filename and the file itself are two completely separate things. We casually say the file report-dot-txt, but really report-dot-txt is just a name that points at the file — and the actual file is something called an inode. Let\'s follow the chain. When you have a file in a directory, what the directory literally stores is a tiny entry, called a directory entry, that maps a name to a number — the inode number. That\'s all a filename is: a line in a directory saying this name refers to inode number so-and-so. Follow that number and you arrive at the inode, and the inode is the real file. It holds everything about the file except its name: the permissions and ownership we just discussed, the size, the timestamps for when it was created and last modified, and — crucially — the pointers to where the actual data lives on the disk. Notice what\'s not in the inode: the name. The name lives up in the directory, not in the file. And then those pointers lead to the third layer, the data blocks, which are the actual raw bytes of your file\'s contents scattered across the disk. So: name, to inode, to data. Why does separating these matter so much in practice? Because it explains behavior that\'s otherwise baffling. Since the name lives in the directory and the file lives in the inode, renaming a file, or moving it to another folder on the same disk, doesn\'t touch the file\'s data or even its inode at all — it just rewrites a directory entry, which is why moving a huge file across the same disk is instant. You can see the inode numbers yourself with ls dash-i, and here\'s a fun one: since inodes are a finite resource created when the disk is formatted, you can actually run out of inodes — be unable to create a new file even though there\'s plenty of free space left — which df dash-i will reveal. So one file is one inode, reached through a name. And that framing sets up a wonderful question: if a name is just a pointer to an inode, what happens if two different names point at the very same inode?',
}
