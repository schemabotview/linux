import type { Section } from '../types'

export const systemdLogs: Section = {
  id: 'systemd-logs',
  title: 'journald, logs & targets',
  scene: 'journal-loop',
  slide: `## journald, logs & targets

A service's output has to go *somewhere*. \`systemd\` captures it centrally with **\`journald\`**, read via **\`journalctl\`**.

### The journal
- Anything a service writes to **stdout/stderr** (Course 2!) is captured by **journald** — no manual log wiring
- **\`journalctl -u nginx\`** — that service's logs · **\`-f\`** follow live (like \`tail -f\`) · **\`-b\`** since last boot · \`-p err\` by priority
- Traditional text logs still live in **\`/var/log\`** (e.g. \`/var/log/auth.log\`) — both worlds coexist

### Targets — the boot goal
- A **target** groups services into a **state to reach**: \`multi-user.target\` (server), \`graphical.target\` (desktop)
- The successor to old "runlevels"; \`systemctl get-default\` shows yours

### The debugging loop
- \`systemctl status\` → \`journalctl -u <svc> -e\` → fix the **unit or config** → \`restart\`. **This is the job.**

Config, privilege, logs — the loop again. Next: getting the software onto the box in the first place.`,
  narration:
    'When a service is running in the background with no terminal attached, where does its output go — the status messages, the warnings, the errors it prints? This is where systemd\'s logging piece comes in, and it connects beautifully back to Course two. Remember the three streams: standard output and standard error. When systemd starts a service, it automatically captures whatever that service writes to stdout and stderr, and routes it into a central log system called journald, the journal daemon. This is a genuine convenience — the program\'s author doesn\'t have to set up log files at all; they just print, and systemd catches it. You read that journal with journalctl. The most useful form is journalctl dash-u followed by a service name, which shows you just that one service\'s logs — journalctl dash-u nginx to see everything nginx has said. Add dash-f to follow the log live, watching new lines appear in real time as they happen, exactly like tail dash-f on a file, which is invaluable while you\'re reproducing a problem. Dash-b limits it to the current boot, and dash-p lets you filter by priority, like showing only errors. Now, journald is the modern system, but the older tradition of plain text log files in slash-var-slash-log hasn\'t gone away — the authentication log, for instance, is often still there as slash-var-slash-log-slash-auth-dot-log — so in practice both worlds coexist and you\'ll read from both. There\'s one more systemd concept to name: targets. A target is a named group of services that together represent a state the system should reach. The most important is multi-user-dot-target, which is a fully working multi-user server with networking but no graphical desktop — the normal state for a server — versus graphical-dot-target, which additionally brings up the desktop environment. Targets are the modern replacement for the old idea of runlevels, and systemctl get-default shows which one your machine boots into. Now let\'s put the pieces together into the single most important loop in a system administrator\'s day, the debugging loop. Something\'s wrong with a service. You run systemctl status to see its state and last few log lines. You dig deeper with journalctl dash-u for the full logs. You spot the problem, fix the unit file or the service\'s config in slash-etc, and restart it. Status, journal, fix, restart — that cycle, which is really just our config-privilege-logs loop again, is the actual daily work of running services. So we can control and observe what runs. But how did that software get onto the machine to begin with? For that, package management.',
}
