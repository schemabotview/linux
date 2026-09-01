import type { Section } from '../types'

export const userspaceDistros: Section = {
  id: 'userspace-distros',
  title: 'Userspace, the shell & the distro',
  scene: 'distro-anatomy',
  focus: 'ms-b6',
  slide: `## Userspace, the shell & the distro

Rung 6 — the **top of the ladder**. systemd fills user space with running programs and hands *you* the way in.

### The running system
- **System services** — long-running background **daemons**: \`sshd\`, \`cron\`, the network manager, log collectors
- **Login** — \`getty\` prompts for a user; on success it launches your **shell** — \`bash\` (or \`zsh\`), the **prompt** where Course 2 begins

### Kernel vs. distribution
- The **kernel** is *one* program — the same core Linux everywhere
- A **distribution** (Ubuntu, Debian, Fedora, Arch) = that kernel **+** the GNU userland **+** a **package manager** + defaults
- That's why it's sometimes **GNU/Linux**: the kernel is Linux; most commands you'll run are GNU tools *around* it (Course 6)

Boot is done — assembled from the metal **up**. Now turn around: how do you *use* it? Read the same stack **downward**.`,
  narration:
    'We\'ve reached the top rung, and user space fills up with running programs. There are broadly two kinds. First, the system services — long-running background programs, called daemons, that quietly keep the machine useful: the SSH server that lets you log in remotely, the cron scheduler that runs jobs on a timer, the network manager, the log collectors. These have no screen and no keyboard; they just run and wait to be needed. Second, systemd sets up the way for a human to actually get in. On each terminal it runs a small program, traditionally called getty, that shows the login prompt. You type your username and password, it checks them, and on success it launches a program for you — your shell, usually bash. And that shell, printing its prompt and waiting for your first command, sitting right here at the top of the stack, is exactly where the next course picks up. Now that the whole machine is running, let\'s clear up one thing that confuses almost everyone at the start: the difference between the kernel and a distribution. The kernel — the layer in the middle of this stack — is a single program, and it\'s essentially the same core everywhere. But nobody ships you just a kernel; a bare kernel can\'t even print hello. What you actually install is a distribution — Ubuntu, Debian, Fedora, Arch, and dozens more — and a distribution is that same Linux kernel, bundled with the GNU userland, which is all the everyday commands and libraries, plus a package manager to install more software, plus a set of sensible defaults. The kernel is the engine; the distribution is the whole car built around it. This is also why you\'ll sometimes see it written GNU slash Linux: the kernel is Linux, but a huge share of the commands you\'ll actually type are GNU tools sitting on top. So that is boot, top to bottom — or rather, bottom to top: the machine assembled itself from the bare metal up, one rung at a time, and handed you a shell at the very top of the ladder. Now flip the whole question around. The machine is built. How do you actually use it? For that, we read this exact same stack the other way — downward — starting from where you\'re now sitting, your program up here in user space, and following what happens the instant it asks the machine to do something. Let\'s descend.',
}
