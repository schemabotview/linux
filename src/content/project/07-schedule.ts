import type { Section } from '../types'

export const schedule: Section = {
  id: 'schedule',
  title: 'Stage 6 — Schedule',
  scene: 'cap-schedule',
  focus: 'st-schedule',
  slide: `## Stage 6 — Schedule

A report is most useful **automatically**. Schedule it to run every morning — two ways, from Course 6.

### The cron way (simple)
- One crontab line: \`0 7 * * * /usr/local/bin/sysreport -o /var/log/sysreport.txt\`
- (Remember the cron gotchas: **absolute paths**, and it writes to a **file** so output isn't lost)

### The systemd-timer way (modern)
- A **\`.timer\`** unit with **\`OnCalendar=*-*-* 07:00:00\`** — declarative, and **logged via journald**
- **\`Persistent=true\`** — if the machine was **off** at 07:00, it runs at next boot (cron would just skip it)
- The timer triggers a **service** — which we write next

Scheduled to run itself. But a timer needs a *service* to trigger — Stage 7.`,
  narration:
    'Stage six schedules the tool, because a health report is far more valuable if it just appears every morning than if you have to remember to run it. And we cover both ways from the admin course, because you\'ll meet both in the wild. The simple, classic way is cron: a single line in the crontab that says, at minute zero of hour seven every day, run sysreport and write its output to a log file. And here we deliberately apply the cron lessons we learned: we use the absolute path to the installed sysreport, because cron runs with a minimal PATH and wouldn\'t find it otherwise, and we direct its output to a file with dash-o, because a scheduled job\'s output would otherwise vanish. The modern way is a systemd timer, and it\'s worth preferring on a systemd machine. We write a dot-timer unit with an OnCalendar line specifying seven a.m. daily — a clean, declarative schedule — and it comes with two real advantages over cron. First, because it\'s a systemd unit, its runs are logged through journald, so you can see exactly when it fired and what happened with journalctl, whereas cron is famously silent. Second, we set Persistent equals true, which means if the machine happened to be powered off at seven a.m. — a laptop, say — the job runs at the next boot instead of simply being skipped forever, which is what plain cron would do. That catch-up behavior matters for anything you truly don\'t want to miss. Now, a systemd timer doesn\'t actually do the work itself — it\'s just a trigger, a clock. What it triggers is a companion service unit that defines what to run. So the natural next stage is writing that service.',
}
