import type { Section } from '../types'

export const grep: Section = {
  id: 'grep',
  title: 'grep: search',
  scene: 'grep-flags',
  slide: `## grep: search

**\`grep\`** prints the lines that **match a pattern** — the single most-used text tool. *Global Regular Expression Print.*

### The essential flags
- \`grep error app.log\` — every line containing \`error\`
- **\`-i\`** ignore case · **\`-w\`** whole word · **\`-c\`** count instead of print
- **\`-r\`** recurse a directory · **\`-n\`** show line numbers · **\`-l\`** list only *filenames*
- **\`-v\`** — **invert**: the lines that *don't* match (great for excluding noise)
- **\`-A2 -B2\`** — 2 lines of context After / Before a hit

### Its natural home: a pipe
- \`ps aux | grep ssh\` · \`journalctl | grep -i fail\` — filter *any* stream down to what you care about

grep answers *"where does X appear?"*. To match *shapes* of text, not fixed words, it speaks **regex**.`,
  narration:
    'grep is the tool you\'ll reach for more than any other, so let\'s make you fluent. Its job is beautifully narrow: it reads text, line by line, and prints only the lines that match a pattern you give it. The name is an acronym from its origins — global regular expression print — which also tells you it has a hidden depth we\'ll get to. At its simplest, grep space error space app-dot-log prints every line in that log that contains the word error, instantly filtering a huge file down to the parts you care about. A handful of flags cover almost everything you\'ll do. Dash-i makes the match case-insensitive, so error also catches Error and ERROR. Dash-w matches only whole words, so cat won\'t also match category. Dash-c gives you a count of matching lines instead of the lines themselves. Dash-r recurses through an entire directory tree, searching every file — how you find which source file mentions a function. Dash-n prefixes each hit with its line number, and dash-l does the opposite of normal output, printing just the filenames that contain a match, not the matching lines. And one of the most useful, dash-v, inverts the whole thing: it prints the lines that do not match, which is how you strip out noise — show me the log, but not the debug lines. When you need to see a hit in context, dash-A-two and dash-B-two show you two lines after and before each match. But grep truly comes alive in a pipe, which is its natural home. Because it reads standard input, you can filter the output of any command through it: ps aux piped into grep ssh shows only the ssh-related processes; journalctl piped into grep dash-i fail shows only the failures in your system logs. grep is the universal filter — drop it into any stream to narrow it down. So grep answers the question where does this text appear. But so far we\'ve only matched fixed words. The real power comes when you want to match a shape of text — any phone number, any line starting with ERROR, any date — and for that, grep speaks a pattern language called regular expressions.',
}
