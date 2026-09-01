import type { Section } from '../types'

export const collect: Section = {
  id: 'collect',
  title: 'Stage 3 — Collect',
  scene: 'cap-collect',
  focus: 'st-collect',
  slide: `## Stage 3 — Collect

Gather the raw facts — each source wrapped in its **own small function**. This is where the admin & process courses pay off.

### One function per source
- \`collect_uptime\` → **\`uptime\`** · \`collect_disk\` → **\`df -h\`** · \`collect_memory\` → **\`free -h\`**
- \`collect_top_cpu\` → **\`ps -eo … --sort=-%cpu\`** (Course 4) · \`collect_errors\` → **\`journalctl -p err -b\`** (Course 6)

### Why wrap each in a function
- **Named, testable, replaceable** — run \`collect_errors\` alone to check it; swap its command without touching the rest
- Keeps *gathering* cleanly separate from *interpreting* (next stage) and *formatting* (the one after)

### A \`warn\` helper
- \`warn() { echo "…" >&2; }\` — status goes to **stderr**, so it never contaminates the report on stdout

Raw facts in hand. But raw output isn't insight — next we **transform** it.`,
  narration:
    'Stage three is where sysreport starts doing its real job: collecting the facts about the machine. And notice the design choice — we wrap each source of information in its own small, named function. There\'s collect_uptime, which just runs the uptime command to get how long the system\'s been running and its load averages. There\'s collect_disk running df dash-h for human-readable disk usage, and collect_memory running free dash-h. There\'s collect_top_cpu, which uses the ps command from the processes course with a sort flag to list the top processes by CPU usage. And there\'s collect_errors, which pulls recent error-level messages from the journal using journalctl with the priority and boot flags we learned in the admin course, limited to the number of lines the user asked for. Now, why bother wrapping each single command in a function instead of just running them inline? Three good reasons, all of which come from thinking like a real developer. First, they\'re named, so the code reads like a description of what it does. Second, they\'re independently testable — while building, you can call just collect_errors on its own to check it produces what you expect, without running the whole tool. Third, they\'re replaceable — if you later want to get disk info a different way, you change one function and nothing else cares. And most importantly, wrapping them keeps a clean separation between the three phases of the tool: gathering the data here, interpreting it in the next stage, and formatting it in the stage after. Mixing those together is how scripts turn into unmaintainable spaghetti; keeping them apart is how you keep it sane. We also add a small warn helper that prints to standard error, so that any status or warning messages the tool emits go to stderr and never accidentally end up mixed into the report on stdout — that stream discipline from the shell course, applied. So now we have all the raw facts. But raw command output isn\'t the same as insight — a wall of df and ps output is data, not a summary. The next stage is where we turn it into something genuinely useful.',
}
