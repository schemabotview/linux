import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here',
  scene: 'text-recap',
  slide: `## You are here

You now command the **text-processing toolkit** — the skill that turns raw logs and data into answers, in one line.

### What you can now do
- **\`grep\`** + **regex** — find any *shape* of text in any stream or tree
- **\`sed\`** — substitute and delete across streams and files (safely, \`-i\` last)
- **\`awk\`** — columns, conditions, and cross-line **totals** — a spreadsheet in a pipe
- **\`sort\`/\`uniq\`/\`cut\`/\`wc\`/\`tr\`** and **\`find\`/\`xargs\`** — reshape, tally, and act on files in bulk
- **Compose** them into real one-line data pipelines (the \`sort | uniq -c | sort -rn\` tally)

### The road ahead
- **Admin** — operating a real box: users, \`systemd\` services, packages, cron, networking
- **Scripting → Project** — capturing these pipelines into robust, reusable tools

You can transform any text on the system. Next: **administering** the machine itself.`,
  narration:
    'Here\'s the whole toolkit, and you can now do something genuinely valuable: take raw, messy text — logs, config, data dumps, command output — and turn it into an answer, often in a single line. You\'ve got grep, with regular expressions, to find any shape of text you can describe, in any file, tree, or stream. You\'ve got sed to rewrite and delete text as it flows, safely previewing before ever committing with dash-i. You\'ve got awk, the little language that thinks in columns and can filter on conditions and accumulate running totals — a spreadsheet you drop into a pipe. You\'ve got the reshaping crew — sort, uniq, cut, wc, and tr — and the file-level duo, find and xargs, for locating and acting on files in bulk. And most importantly, you can compose them, snapping small tools together with pipes into custom one-liners, with that top-N-by-frequency idiom — sort, uniq dash-c, sort dash-r-n — ready in your back pocket for any counting question. This is the transform stage of the whole series, and it\'s a skill that compounds: the more you use it, the faster you reach for it. From here we shift from working with data to operating the machine itself. The next course is administration — managing users and their permissions, controlling services with systemd, installing software with package managers, scheduling jobs with cron, and the basics of networking. And you\'ll notice these text tools coming right back, because reading logs and parsing system output is the daily bread of administration. You can shape any text on the box now; next, let\'s learn to run the box.',
}
