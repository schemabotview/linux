import type { Section } from '../types'

export const users: Section = {
  id: 'users',
  title: 'Users & groups',
  scene: 'account-files',
  slide: `## Users & groups

Linux is **multi-user** to the core. Every account is a **user** with a numeric **UID**; **groups** bundle users to share access.

### Who's who, and where it lives
- **\`whoami\`** / **\`id\`** — your name, your UID, your groups
- **\`/etc/passwd\`** — every account: \`name:UID:GID:home:shell\` (world-readable, plain text)
- **\`/etc/group\`** — groups and their members · passwords are **hashed** in **\`/etc/shadow\`** (root-only)
- **\`root\` = UID 0** (all-powerful); normal users start at **1000**

### Managing accounts (needs \`sudo\`)
- **\`useradd -m -s /bin/bash sam\`** (\`-m\` home dir, \`-s\` shell) → **\`passwd sam\`** to set a password
- **\`usermod -aG sudo sam\`** — add to a group; the **\`-a\`** is vital (**\`-G\`** alone *replaces* all groups!)

Accounts and groups are the *who*. Next: the command that lets a normal user borrow **root's** power.`,
  narration:
    'We touched on users back in the filesystem course, when we learned permissions; now let\'s manage them properly, because a real system has many accounts — human users, and also service accounts that daemons run under. Linux is multi-user right down to its bones. Every account is a user, and internally the system doesn\'t actually care about the username — it identifies users by a number, the UID. You can see your own identity with two commands: whoami just prints your username, and id prints the fuller picture — your UID and every group you belong to. Where do accounts actually live? In a text file, of course, following the pattern we\'ve seen everywhere: slash-etc-slash-passwd. Despite the name, it holds no passwords; it\'s one line per account, with colon-separated fields — the username, the numeric UID, the primary group ID, the path to the home directory, and the login shell. It\'s world-readable, just a list of accounts. The actual passwords, hashed and salted for security, live in a separate file, slash-etc-slash-shadow, which only root can read — that separation is deliberate, so that the readable account list doesn\'t expose password hashes. Two special UID facts to anchor: root, the superuser, is always UID zero, and that number is what actually grants the power; normal human users conventionally start numbering at one thousand. Groups, listed in slash-etc-slash-group, are the mechanism for sharing: you put several users in a group, then grant the group access to a file or directory, and all of them get it at once — how a team shares a project directory. Now the management commands, all of which need sudo since they change the system. useradd creates an account — you\'ll want dash-m to also create their home directory and dash-s to set their shell — and then passwd sets their password. To add an existing user to a group, you use usermod dash-a-capital-G, and here is one of the most important gotchas in all of Linux administration: that little dash-a matters enormously. Dash-capital-G by itself replaces every group the user is in with just the one you named, silently kicking them out of all their others; dash-a-capital-G appends to their existing groups, which is almost always what you want. Forgetting the a has locked many an admin out of sudo. So users and groups define who exists on the machine and how they\'re bundled. But the real question in administration isn\'t just who exists — it\'s who\'s allowed to do powerful things. That\'s the sudo command, and it deserves a closer look.',
}
