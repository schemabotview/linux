import type { Section } from '../types'

export const links: Section = {
  id: 'links',
  title: 'Hard links & symlinks',
  scene: 'two-kinds-of-link',
  slide: `## Hard links & symlinks

Two names, one file — that's a **link**. There are two kinds, and the inode model explains both exactly.

### Hard link — a second name for the same inode
- \`ln target newname\` — both names point at the **same inode**; they are **equal**, neither is "the original"
- The inode keeps a **link count**; the data is freed only when it hits **0** (the last name is removed)
- Limits: same filesystem only, and not for directories

### Symbolic link — a tiny file holding a path
- \`ln -s /path/to/target linkname\` — a small file whose *contents* are a **path**; following it re-resolves that path
- Can cross filesystems and point at directories; if the target is deleted, the link **dangles** (broken)
- This is what \`/usr/bin/python\` → \`python3.12\` is, and how config \`sites-enabled\` tricks work

Hard link = another name for the file; symlink = a signpost to a name. The inode model makes both obvious.`,
  narration:
    'The answer is yes — two names can absolutely point at the same file — and that\'s exactly what a link is. There are two kinds, and the beauty is that once you hold the inode picture in your head, both of them are completely obvious. The first is the hard link. You create one with the ln command — ln target newname — and what it does is add a second directory entry pointing at the very same inode as the first. And here\'s the thing that surprises people: the two names are utterly equal. There is no original and no copy; they are two names for one identical file, sharing one inode, one set of data blocks. Change the file through one name and you see the change through the other, because it is literally the same file. So how does the system know when to actually free the data? The inode keeps a link count — how many names point at it — and every time you delete one of the names, that count drops by one. The data blocks are only reclaimed when the count hits zero, when the very last name is gone. That\'s actually what deleting a file really is: not erasing data, just removing one directory entry and decrementing the count. Hard links have two limits, though: because they\'re just pointers to an inode number, and inode numbers are only unique within a single filesystem, a hard link can\'t cross from one disk to another, and by convention you can\'t hard-link directories. The second kind of link solves both of those, and works completely differently. It\'s the symbolic link, or symlink, created with ln dash-s. A symlink is not a second name for an inode — it\'s a whole separate tiny file of its own, and the contents of that little file are simply a path, a text string pointing at another location. When you access a symlink, the system reads the path inside it and re-resolves it, following the signpost to wherever it points. Because it\'s just storing a path as text, a symlink can happily point across different filesystems and can point at directories — but it has its own weakness: if you delete or move whatever it points at, the symlink is left dangling, pointing at nothing, broken. You see symlinks constantly in real systems: the command slash-usr-slash-bin-slash-python is usually a symlink pointing at the specific version, like python-three-point-twelve, so upgrading Python is just repointing one link. So keep the two straight with a simple mental image: a hard link is another true name for the same file, while a symlink is a signpost that names a path. The inode model makes the whole thing click. Now, one last question about the tree: we said everything hangs off a single root — but a real machine has several disks. How does one tree span many disks?',
}
