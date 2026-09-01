import type { Section } from '../types'

export const scheduling: Section = {
  id: 'scheduling',
  title: 'Scheduling with cron & timers',
  scene: 'cron-fields',
  slide: `## Scheduling with cron & timers

Servers do work while you sleep — nightly backups, hourly cleanups, weekly reports. **\`cron\`** is the classic scheduler.

### Your crontab
- **\`crontab -e\`** edits *your* schedule; **\`crontab -l\`** lists it
- Each line is **five time fields** then a command: \`min hour day-of-month month day-of-week\`
- **\`*\`** = every · **\`*/15\`** = every 15th · a number pins that value

### The classic gotcha
- cron runs with a **bare environment** and no login \`PATH\` → **use absolute paths**
- **Redirect output to a log**, or you will never see the errors

### Modern alternative: \`systemd\` timers
- \`.timer\` units — logged via journald, support dependencies & missed-run catch-up
- **\`at\`** handles genuine **one-off** jobs

Automation on a clock. The last operator skill: reaching **other machines**.`,
  narration:
    'A defining feature of a server is that it works while nobody\'s watching — it backs itself up at two in the morning, clears out old temporary files every hour, emails a report every Monday. The classic tool that makes this happen is cron, a daemon that runs commands on a repeating schedule. Each user has their own schedule, called a crontab, which you edit with crontab dash-e and list with crontab dash-l. The format looks cryptic at first but it\'s just six columns: five time fields followed by the command to run. Those five fields, in order, are minute, hour, day of the month, month, and day of the week. The key to reading them is the asterisk, which means every. So a line that reads zero, two, asterisk, asterisk, asterisk, then a command, means: at minute zero of hour two, every day of the month, every month, every day of the week — in other words, run this every day at two a.m. You can do more than fixed times: asterisk-slash-fifteen in the minute field means every fifteen minutes, and putting a specific number in the day-of-week field, like one for Monday, pins it to that day. With those rules you can express almost any schedule. Now, there\'s one gotcha with cron that trips up absolutely everyone the first time, and knowing it will save you hours of confusion: cron runs your commands in a very minimal, bare environment — it does not load your normal shell setup, which means your PATH is nearly empty. So a script that runs perfectly when you type it by hand mysteriously does nothing under cron, because cron can\'t find the commands. The fix is a discipline: in anything you schedule, use full absolute paths to programs and files, and redirect the command\'s output to a log file — because otherwise, when a scheduled job fails at three in the morning, its error messages go nowhere and you\'ll never know it broke. Always give a cron job somewhere to write its output. Now, cron is old and universal, but modern Linux offers an alternative worth knowing: systemd timers, which are timer units that trigger services on a schedule. They\'re more to set up, but they log through journald like every other service, they can express dependencies, and they can catch up on a run that was missed while the machine was off — things plain cron can\'t do. And for a job you want to run just once at a future time, rather than repeatedly, there\'s a separate little command called at. So now the box can act on its own, on a clock. There\'s one last essential operator skill, and it\'s the one that makes remote servers possible at all: reaching other machines over the network.',
}
