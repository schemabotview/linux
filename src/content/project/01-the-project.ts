import type { Section } from '../types'

export const theProject: Section = {
  id: 'the-project',
  title: 'The capstone: sysreport',
  scene: 'cap-brief',
  slide: `## The capstone: sysreport

Time to put **all seven courses** together and build a real, shippable tool: **\`sysreport\`** — a system-health & log-summary CLI.

### What it does
- Gathers **uptime, disk, memory, top processes**, and **recent errors** from a live machine
- **Summarizes** them into a clean report — flagging full disks and the most frequent error sources
- Takes **options** (\`-n\`, \`-o\`), runs on a **schedule**, installs as a **systemd service**, and is **robust** enough to run unattended

### The nine stages (and their callbacks)
- Structure & args → collect → **transform** (Course 5) → report → **schedule/service** (Course 6) → **harden** (Course 7) → ship
- Every stage leans on something you already learned — this is the whole series, converging

We'll build it one stage at a time. Let's lay the foundation.`,
  narration:
    'This is the capstone, where everything comes together. Across seven courses you\'ve learned how Linux boots and runs, how to drive the shell, navigate the filesystem, command processes, transform text, administer a machine, and write robust scripts — and now we\'re going to weave all of it into a single, real, genuinely useful tool that you could deploy to an actual server. The tool is called sysreport, and it\'s a system health and log summary utility — the kind of thing a real sysadmin writes and relies on. Here\'s what it\'ll do. It gathers the vital signs of a running machine: how long it\'s been up and how loaded it is, how full the disks are, how much memory is free, which processes are eating the CPU, and what errors have shown up recently in the system journal. Then it summarizes all of that into one clean, readable report — and not just a dump, but actual insight: it flags any disk that\'s dangerously full, and it tells you which error sources are the most frequent, using the exact tally pipeline we built in the text course. And it won\'t be a toy. It\'ll take proper command-line options, it\'ll run automatically every morning on a schedule, it\'ll install itself as a managed systemd service, and it\'ll be hardened enough to run unattended without making a mess. We\'ll build it in the nine stages on this board, and the beautiful thing is that nearly every stage is a callback to something you already know: structuring and arguments and hardening come from the scripting course, transforming the data comes from the text course, scheduling and the service come from the admin course, and setting permissions and installing come from the filesystem course. This is the whole series converging into one artifact. Let\'s start at stage one, laying the foundation.',
}
