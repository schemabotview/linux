import type { Section } from '../types'

export const theTree: Section = {
  id: 'the-tree',
  title: 'One tree, everything a file',
  scene: 'one-root',
  slide: `## One tree, everything a file

Windows has \`C:\`, \`D:\`, \`E:\`. Linux has **one** tree, rooted at **\`/\`** — every disk, device, and file hangs off that single root.

### Everything is a file
- Your documents, yes — but *also* your **disks** (\`/dev/sda\`), **processes** (\`/proc\`), and **kernel settings** (\`/sys\`)
- One uniform interface: the same \`ls\`, \`cat\`, \`cp\`, and permissions work on *all* of them (this is the **VFS** from Course 1)

### A place for everything
- The layout isn't random — the **Filesystem Hierarchy Standard (FHS)** means \`/etc\`, \`/var\`, \`/home\` mean the same thing on **every** distro
- Learn the map once and you can find your way around any Linux box

Let's tour the important directories, then learn to walk the tree, secure it, and see how it really stores a file.`,
  narration:
    'If you come from Windows, you\'re used to drives with letters — C drive, D drive, a USB stick showing up as E. Linux does something fundamentally different, and it\'s one of the first things to really internalize: there is exactly one tree. A single root, written as a lone forward slash, and absolutely everything hangs off of it. Your second hard drive isn\'t a separate D drive; it gets attached at some directory inside the one tree, and you reach it by walking down to that directory. This is the unified filesystem we first glimpsed in Course one as the VFS. And it goes further than just disks, because of that Unix promise: everything is a file. Your documents are files, obviously — but so are your physical disks, which appear as files under slash-dev; so are your running processes, which show up as files under slash-proc; and so are the kernel\'s own tuning knobs, exposed as files under slash-sys. The payoff is uniformity: the very same handful of commands — ls to list, cat to read, cp to copy — and the very same permission system work on all of them, whether it\'s a text file, a hard drive, or a running program. Now, the layout of this tree is not arbitrary. There\'s a standard called the Filesystem Hierarchy Standard, the FHS, and it means that slash-etc, slash-var, slash-home have the same meaning on Ubuntu, on Debian, on Fedora, on Arch — everywhere. That\'s a gift: learn this map once, and you can sit down at any Linux machine on earth and know where things live. So let\'s tour the important directories, then learn to walk the tree, lock it down with permissions, and finally crack open how it actually stores a single file on disk.',
}
