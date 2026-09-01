import type { Section } from '../types'

export const sudo: Section = {
  id: 'sudo',
  title: 'sudo & root',
  scene: 'borrowing-root',
  slide: `## sudo & root

**\`root\`** can do anything — which is exactly why you don't *log in* as root. **\`sudo\`** lets a trusted user borrow that power, one command at a time.

### Why \`sudo\`, not root
- Running as root **all the time** means one typo (\`rm -rf /\`) is catastrophic, and every action is unattributable
- \`sudo <cmd>\` runs a **single** command as root, after your password — least privilege by default
- It also **logs** who ran what (\`/var/log/auth.log\`) — accountability on shared systems

### Who may sudo
- Membership in the **\`sudo\`** group (Debian/Ubuntu) or **\`wheel\`** (Fedora) grants it
- Fine-grained rules live in **\`/etc/sudoers\`** — always edit with **\`sudo visudo\`** (it syntax-checks; a broken sudoers can lock everyone out)
- \`sudo -l\` lists what you're permitted; \`sudo -i\` opens a root shell (use sparingly)

That's *who* and *how much*. Now, *what runs* on the box — the services \`systemd\` supervises.`,
  narration:
    'Root is the superuser — it bypasses every permission check and can do absolutely anything on the machine. And precisely because it\'s that powerful, the modern rule is that you do not log in as root and work as root day to day. There are two solid reasons. The first is safety: when you\'re operating as root all the time, there\'s nothing between you and disaster — a single mistyped command, the infamous rm dash-r-f pointed at the wrong place, and there\'s no permission system to stop you from destroying the system. Working as a normal user means your everyday typos are contained. The second is accountability: on a server that several administrators share, if everyone logs in as root, you can never tell who did what. The tool that solves both problems is sudo. Instead of becoming root, you stay yourself, a normal limited user, and when you need root\'s power for one specific command, you prefix it with sudo, prove your identity with your own password, and that single command runs with root privileges — then you\'re back to being an ordinary user. This is the principle of least privilege in action: you hold elevated power only for the instant you actually need it. And sudo logs every use — who ran which command, when — to the authentication log, so on a shared box there\'s a clear record. Who is allowed to use sudo? Membership in a special group grants it — on Debian and Ubuntu that group is called sudo, on Fedora and Red Hat it\'s called wheel — which is why adding a new admin is often just usermod dash-a-capital-G sudo. For finer control — letting a user run only certain commands as root, say — there\'s a configuration file, slash-etc-slash-sudoers, but you must never edit it with a normal text editor. You edit it with the command visudo, run under sudo, and the reason is critical: visudo checks your syntax before saving, because a single typo in the sudoers file can lock every administrator out of root access on the entire machine, an extremely bad afternoon. Handy commands: sudo dash-l shows you exactly what you\'re permitted to run as root, and sudo dash-i drops you into a full root shell for when you have a lot of administrative work to do at once, though you should use that sparingly. So between users, groups, and sudo, you now control who is on the machine and how much they can do. The next question is what actually runs on the machine — the services doing the real work — and that brings us to systemd.',
}
