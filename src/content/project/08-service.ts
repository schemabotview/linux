import type { Section } from '../types'

export const service: Section = {
  id: 'service',
  title: 'Stage 7 — Service',
  scene: 'cap-service',
  focus: 'st-service',
  slide: `## Stage 7 — Service

The timer triggers a **service unit** — a \`.service\` file describing *what to run* (Course 6).

### The unit
- **\`Type=oneshot\`** — it runs once and exits (not a daemon that stays up) — exactly right for a report
- **\`ExecStart=\`** the full command; **\`User=root\`** (needs system-wide access); **\`Nice=10\`** — polite priority (Course 4!)
- \`After=network.target\` — ordering, so dependencies are up first

### Wire it up & observe
- \`sudo systemctl daemon-reload\` → \`enable --now sysreport.timer\` (enable = boot-persistent, Course 6)
- \`systemctl status\` and **\`journalctl -u sysreport.service\`** — its output is captured automatically (stdout → journald)

It now runs itself, on schedule, managed and logged by the system. Two stages left: make it **bulletproof**, then **ship** it.`,
  narration:
    'Stage seven writes the service unit that the timer triggers, and it pulls together the systemd knowledge from the admin course along with a nice callback to the processes course. The service is a dot-service file, and the first important choice is the type: we set Type equals oneshot, which tells systemd this isn\'t a long-running daemon that stays up — it runs once, does its job, and exits, which is precisely the shape of a report generator. The ExecStart line gives the full command to run, the installed sysreport with its output flag. We set User equals root, because gathering system-wide stats and reading the full journal needs privilege. And here\'s a satisfying callback: we add Nice equals ten, applying the process-priority concept from the fourth course, so that our report generator runs at a low priority and stays polite — it won\'t steal CPU from the machine\'s real work while it gathers its stats. We also add After equals network target, an ordering hint so the service waits for basic system readiness before running. Then we wire it all up with the systemctl commands from the admin course: daemon-reload so systemd picks up the new units, then enable dash-dash-now on the timer, which both enables it to start at every boot — remember, enable is the boot-persistent one — and starts it immediately. And because it\'s now a proper systemd service, we get observability for free: systemctl status shows its health, and journalctl dash-u sysreport-dot-service shows its output, since systemd automatically captured whatever the tool wrote to standard output and standard error into the journal. So the tool now runs itself, on schedule, fully managed and logged by the system, exactly like any professional service. There are two stages left, and they\'re what separate a personal script from something you\'d actually deploy: making it bulletproof against the things that go wrong when nobody\'s watching, and packaging it up to ship.',
}
