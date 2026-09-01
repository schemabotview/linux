import type { Section } from '../types'

export const fhsSystem: Section = {
  id: 'fhs-system',
  title: 'The system directories',
  scene: 'fhs-system-dirs',
  slide: `## The system directories

Four directories hold the **system itself** — its configuration, its changing data, and its programs.

### The big four
- **\`/etc\`** — *all* system configuration, as **plain-text files** you edit (\`/etc/ssh/sshd_config\`, \`/etc/hosts\`, \`/etc/fstab\`). No registry — just readable text
- **\`/var\`** — **variable** data that grows while running: **logs** (\`/var/log\`), mail spools, caches, databases
- **\`/usr\`** — the bulk of **installed software**: \`/usr/bin\` (programs), \`/usr/lib\` (libraries), \`/usr/share\` (data)
- **\`/bin\` · \`/sbin\`** — the **essential** commands needed even in a broken system (\`ls\`, \`cp\`, \`mount\`); \`sbin\` = admin tools

### Why it matters
- Config in \`/etc\` is text ⇒ you can **diff it, back it up, and version it in git**
- Something misbehaving? Its logs are almost always in **\`/var/log\`**

That's the system's own space. Next: the directories that are *yours* — and the ones that aren't real.`,
  narration:
    'Let\'s start with the four directories that hold the system itself. The first, and maybe the most important to know, is slash-etc. This is where all system configuration lives, and here\'s the beautiful part: it\'s all plain text files that you can open and read and edit with any editor. The SSH server\'s settings, the list of hostnames, the table of which disks to mount at boot — all of it, just text, in slash-etc. There is no opaque binary registry like on Windows; if you want to change how something on the system behaves, you find its text file in slash-etc and edit it. And because it\'s text, you can compare versions, back it up trivially, and even keep it in git. The second is slash-var, for variable data — this is the stuff that grows and changes while the system runs. Above all, that means logs, which live in slash-var-slash-log, and this is genuinely one of the most useful things to remember in all of Linux: when something is misbehaving, when a service won\'t start or a website is throwing errors, the answer is almost always waiting for you in a log file under slash-var-slash-log. Var also holds mail spools, caches, and the data for things like databases. The third is slash-usr, and despite the name it\'s not about users — it holds the bulk of your installed software: slash-usr-slash-bin has the programs, slash-usr-slash-lib the shared libraries they need, slash-usr-slash-share their data files. When you install an application, most of it lands under slash-usr. And the fourth is slash-bin, along with its sibling slash-sbin. These hold the essential commands — the absolute basics like ls, cp, and mount that must be available even if the system is half-broken and slash-usr hasn\'t been mounted yet. The s in sbin means system: these are the administrative commands, mostly for the root user. So that\'s the system\'s own territory — its config, its changing data, and its programs. Now let\'s look at the directories that belong to you, and a couple that aren\'t even really on the disk at all.',
}
