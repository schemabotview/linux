import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here',
  scene: 'admin-recap',
  slide: `## You are here

You can now **operate** a real Linux machine — the skills a server actually demands, day to day.

### What you can now do
- Manage **users & groups**, and grant power safely with **\`sudo\`** (not root logins)
- Control and observe **services** with **\`systemctl\`** & **\`journalctl\`** (start vs enable; the status→journal→fix loop)
- Install & update software via the **package manager** (signed, tracked, removable)
- Automate on a clock with **\`cron\`** / timers, and reach any box with **\`ssh\`** + keys (\`ip\`, \`ss\`, \`curl\`)

### The road ahead
- **Scripting** — capturing these one-off commands into robust, reusable **bash scripts**
- **Project** — combining everything into a real tool you build & ship

You can run a server now. Next: **automating** the operator's work with real shell scripts.`,
  narration:
    'Here\'s the whole administrator\'s surface, and you can now genuinely operate a Linux machine. You can manage the accounts on it — creating users, organizing them into groups, and above all granting elevated power the right way, through sudo and group membership rather than dangerous root logins, with every action logged and attributable. You can command the services that do a server\'s real work, using systemctl to start, stop, enable, and inspect them, keeping straight that start is for now and enable is for every boot; and when something breaks, you know the loop — systemctl status, then journalctl for the full logs, then fix the config and restart. You can install and maintain software through the package manager, getting signed, dependency-resolved, cleanly removable software instead of risky manual installs. You can make the machine work on its own schedule with cron and systemd timers, remembering to use absolute paths and capture output. And you can reach any machine anywhere with ssh and key-based authentication, inspecting the network along the way with ip, ss, ping, and curl. That is the daily reality of running a server. But notice something: almost everything we did was typing individual commands by hand. The real power of operating Linux comes when you stop doing things by hand and start capturing them — turning that nightly backup, that health check, that deployment into a script that runs itself, reliably, every time. That\'s the next course: shell scripting, where we take everything you\'ve learned and weave it into robust, reusable programs. You can run the machine now; next, let\'s teach it to run itself.',
}
