import type { Section } from '../types'

export const transform: Section = {
  id: 'transform',
  title: 'Stage 4 — Transform',
  scene: 'cap-transform',
  focus: 'st-transform',
  slide: `## Stage 4 — Transform

The heart of the tool: turn raw output into **insight** with the text toolkit — the whole point of Course 5.

### From data to answers
- **\`top_cpu\`** — \`awk\` keeps just the \`%cpu\` + process name from the raw \`ps\` block
- **\`top_errors\`** — the **tally idiom**: \`awk '{print $5}' | sort | uniq -c | sort -rn | head -5\` → the *most frequent* error sources
- **\`disk_alerts\`** — \`awk '$5+0 > 90'\` flags any mount **over 90% full** (numeric compare on the use%)

### Why this is the payoff
- Anyone can run \`df\`; the *value* is "which disk is about to fill" and "what's failing most" — that's **transformation**, not collection
- Small functions compose the Course 5 pipelines you already know

Now we have the *answers*. Stage 5 arranges them into a report a human wants to read.`,
  narration:
    'Stage four is the heart of the tool, and it\'s where the text-processing course pays off completely — because this is the stage that turns raw data into actual insight. Anybody can run df and stare at disk numbers; the value of a good tool is that it does the thinking for you. So we build three small transforming functions on top of the collectors. top_cpu takes the raw ps output and pipes it through awk to keep only what matters — the CPU percentage and the process name — dropping the header and the noise. top_errors is the star, and it\'s the exact tally pipeline we built in the text course: it takes the collected error lines, uses awk to pull out the field identifying each error\'s source, then sort, then uniq dash-c to count each one, then sort dash-r-n to rank them, then head to take the top five. In one pipeline, it answers the question that actually matters — not here are your errors, but here are the five things going wrong most often. And disk_alerts uses awk with a numeric comparison to scan the df output and flag any filesystem that\'s over ninety percent full — the dollar-five-plus-zero trick coerces the percentage field to a number so we can compare it. This is the difference between a data dump and a report: instead of showing you every disk, it tells you which disk is about to cause an outage. That\'s transformation, not collection, and it\'s exactly the skill the text course was building toward — small functions each wrapping a pipeline of grep, awk, sort, and uniq that you already know how to write. So now the tool doesn\'t just have data, it has answers: the CPU hogs, the top error sources, the disks in danger. The final piece of the core tool is arranging those answers into a report that a human actually wants to read.',
}
