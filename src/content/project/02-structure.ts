import type { Section } from '../types'

export const structure: Section = {
  id: 'structure',
  title: 'Stage 1 — Structure',
  scene: 'cap-structure',
  focus: 'st-structure',
  slide: `## Stage 1 — Structure

Every good script starts the same way: a **shebang**, the **safety header**, and a skeleton you'll grow.

### The foundation (Course 7)
- **\`#!/usr/bin/env bash\`** + **\`set -euo pipefail\`** — fail fast from line one
- **\`readonly VERSION=…\`** and **\`SCRIPT="\${0##*/}"\`** — constants (the \`\${0##*/}\` strips the path from \`$0\`)

### The project layout
- \`sysreport.sh\` (the tool) · \`sysreport.service\` + \`.timer\` (Course 6) · \`install.sh\` — a small, tidy repo

### Start with a runnable stub
- A **\`main()\`** that just prints the version, called as **\`main "$@"\`** — it *runs* today, and grows every stage
- Building a working skeleton first (then filling it) beats writing 200 lines before the first test

A running program, a clean shape. Next: let the user *tell it what to do*.`,
  narration:
    'Stage one is the foundation, and it looks the way the start of every good script should, drawing straight from the scripting course. The very first line is the shebang, hash-bang slash-usr-slash-bin-slash-env bash, so the kernel runs it with bash. The very next line is the safety header, set dash-e-u-o pipefail, so that from the very first command, any failure stops the script, any unset variable is caught, and any broken pipe is noticed. Getting that in place before you write a single line of logic means the whole tool is built on solid ground. Then we define a couple of constants with readonly, which marks them unchangeable: a VERSION string, and SCRIPT, the tool\'s own name. That SCRIPT line uses a neat parameter-expansion trick, dollar-brace-zero-hash-hash-slash-star, which takes dollar-zero — the path the script was invoked as — and strips off everything up to the last slash, leaving just the bare filename, which is what we want in usage and log messages. Around the script we plan a tidy little project: the script itself, the systemd service and timer files we\'ll write in stages six and seven, and an install script for stage nine — a small, clean repository rather than one loose file. And here\'s a working-style point worth absorbing: rather than write two hundred lines and then try to run it, we start with a runnable stub — a main function that, for now, just prints the version, invoked at the bottom with main quote-dollar-at to pass along all the arguments. This means the tool actually runs, today, from the very first stage, and we grow it incrementally, testing as we go. A working skeleton you flesh out beats a big blob you debug all at once. So we have a running program with a clean shape. The first real capability it needs is to let the user tell it what to do — command-line options.',
}
