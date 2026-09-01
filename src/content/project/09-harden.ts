import type { Section } from '../types'

export const harden: Section = {
  id: 'harden',
  title: 'Stage 8 — Harden',
  scene: 'cap-harden',
  focus: 'st-harden',
  slide: `## Stage 8 — Harden

It runs unattended at 07:00 — so it must survive the messy real world. Four safeguards (Courses 4 & 7).

### The safeguards
- **Preflight checks** — \`command -v journalctl awk df\` up front; a missing tool fails **early with a clear message**, not cryptically mid-run
- **A lockfile** — \`flock -n\` on an fd, so two runs can never **overlap** and corrupt the output file
- **Cleanup \`trap\`** — remove the lock on **any** exit, including \`Ctrl-C\` / \`SIGTERM\` (Course 4 signals)
- **Input validation** — \`[[ "$LINES" =~ ^[0-9]+$ ]]\` — reject a bad \`-n\` before it reaches \`tail\`

### The mindset
- Unattended code must **fail loudly and safely**, never silently or halfway — assume everything that *can* go wrong *will*, at 3 a.m.

Bulletproof. The last step: package it so anyone can install and run it — ship it.`,
  narration:
    'Stage eight is hardening, and it embodies a mindset that separates amateur scripts from professional ones: code that runs unattended, at seven in the morning with nobody watching, must be built to survive the messy real world, where tools go missing, runs overlap, and inputs are wrong. We add four safeguards, drawing on the scripting and processes courses. First, preflight checks: before doing anything, we loop over the commands the tool depends on — journalctl, awk, df — and use command dash-v to verify each one exists, exiting early with a clear message like missing journalctl if one doesn\'t. That way, on a system where a tool isn\'t installed, sysreport fails immediately and understandably, rather than getting halfway through and producing a broken, confusing report. Second, a lockfile, using flock on a file descriptor: this guarantees that two copies of the tool can never run at the same time and stomp on each other\'s output file — if a run is already in progress, the second one exits gracefully rather than causing corruption. Third, a cleanup trap: we trap the EXIT so that the lockfile is always removed no matter how the script ends — normal completion, an error, or an interrupt like Control-C or a SIGTERM from systemd — which is the signals-and-traps combination from the processes and scripting courses working together, so we never leave a stale lock behind that would block all future runs. And fourth, input validation: we check that the dash-n value the user gave is actually a number, using a regex match, and reject it clearly if it\'s not, rather than passing garbage down to tail and failing cryptically. The through-line in all four is a single principle: unattended code must fail loudly and safely, never silently and never halfway. You assume that anything that can go wrong will go wrong, at the worst possible time, and you make the tool handle it gracefully. Now sysreport is genuinely bulletproof. The one thing left is to package it so that anyone can install and run it — to ship it.',
}
