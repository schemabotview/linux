import type { Section } from '../types'

export const permissionsRead: Section = {
  id: 'permissions-read',
  title: 'Reading permissions',
  scene: 'permission-bits',
  slide: `## Reading permissions

Linux is **multi-user** — so every file records *who* may do *what*. Learn to read the string \`ls -l\` prints.

### Three actions, three audiences
- Actions: **\`r\`** read · **\`w\`** write · **\`x\`** execute (run, or for a dir, *enter*)
- Audiences: the file's **owner** (user) · its **group** · **other** (everyone else)

### Decoding \`-rw-r--r--\`
- First char = **type**: \`-\` file · \`d\` directory · \`l\` symlink
- Then **three triads** — owner / group / other:
  - \`rw-\` owner may read + write · \`r--\` group may read · \`r--\` other may read
- \`ls -l\` also shows the **owner** and **group** names beside them

Nine bits — three actions × three audiences. Once you can read them, changing them is easy.`,
  narration:
    'Linux was built from the start to be a multi-user system — many people sharing one machine — and that shapes everything about how it handles files. Every single file and directory carries a record of who is allowed to do what to it, and learning to read that record is an essential skill. When you run ls dash-l, the very first thing on each line is a cryptic-looking string like dash-r-w-dash-r-dash-dash-r-dash-dash, and it\'s completely logical once you break it down. There are two ideas multiplied together. The first idea is that there are three things you might do to a file: read it, write to it, or execute it — abbreviated r, w, and x. Read and write are obvious; execute means run it as a program, and for a directory, execute means something slightly different that we\'ll come back to — permission to enter it. The second idea is that there are three different audiences these permissions apply to: the owner of the file, usually the person who created it; the group, a named set of users who can be granted shared access; and other, meaning everyone else on the system. So now decode that string. The very first character isn\'t a permission at all — it\'s the type: a dash means a regular file, a d means a directory, an l means a symbolic link. After that come nine characters, and here\'s the key: read them as three groups of three. The first triad is the owner\'s permissions, the second is the group\'s, the third is everyone else\'s. So dash-r-w-dash r-dash-dash r-dash-dash reads as: it\'s a regular file; the owner can read and write it but not execute it; the group can only read it; and everyone else can also only read it. Alongside that string, ls dash-l helpfully prints the actual owner\'s name and the group\'s name, so you can see not just what the permissions are but who they apply to. That\'s the whole system — nine bits, three actions across three audiences. Once you can read them fluently, changing them is the easy part.',
}
