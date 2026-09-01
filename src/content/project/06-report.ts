import type { Section } from '../types'

export const report: Section = {
  id: 'report',
  title: 'Stage 5 — Report',
  scene: 'cap-report',
  focus: 'st-report',
  slide: `## Stage 5 — Report

Arrange the answers into one clean, sectioned report — and honor the \`-o\` flag from Stage 2.

### Assemble with a here-doc
- One **\`report()\`** function, a single here-doc with **\`$(…)\`** command substitution dropping each section in place
- Header (host + timestamp), then labelled sections: uptime · disk (+ alerts) · top CPU · top errors
- Reads top-to-bottom like the output itself — easy to reorder or extend

### Respect the output option
- **\`emit()\`** checks \`$OUTPUT\`: \`-\` → **stdout** (pipe/redirect it yourself), else write to the **file**
- \`report | emit\` — the report is generated **once**, then routed — a tiny, clean pipeline

The **core tool is done** — it runs, takes options, and prints a real report. Now make it run *itself*.`,
  narration:
    'Stage five assembles everything into the final report, and it\'s a lovely demonstration of how here-docs make output code readable. We write one report function, and inside it a single here-doc — the cat with double-less-than EOF — that lays out the entire report as a template. Throughout that template we use command substitution, dollar-parentheses, to drop each piece in place: a header line with the hostname and the current timestamp, then a series of clearly labelled sections — uptime and load, then disk usage followed by any disk alerts, then the top CPU consumers, then the top error sources. Because it\'s a here-doc, the code looks almost exactly like the output it produces, top to bottom, which makes it trivially easy to read, reorder, or add a new section to later. Then we honor the output option the user set back in stage two. A small emit function checks the OUTPUT variable: if it\'s the dash, our convention for standard output, it just passes the text through, so the user can redirect or pipe it themselves; otherwise it writes to the file they named with dash-o. And we tie it together with report piped into emit — the report is generated exactly once and then routed to the right place, a tiny, clean two-stage pipeline that reuses the stream concepts from the very first shell course. And with that, the core tool is genuinely complete: sysreport runs, accepts its options, gathers real data, transforms it into insight, and prints a clean report to your screen or a file. If we stopped here, it\'d already be useful. But a report you have to remember to run by hand isn\'t much of an automation. The next stages are about making the tool run itself, reliably, without you — starting with scheduling.',
}
