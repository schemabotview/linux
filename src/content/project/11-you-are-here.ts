import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here — the whole series',
  scene: 'series-converges',
  slide: `## You are here — the whole series

You built **\`sysreport\`** end to end — and in doing so, used **every course** in this series. That convergence is the point.

### Every course, in one tool
- **Kernel** — the syscalls & processes underneath it all · **Shell** — streams, pipes, exit codes
- **Filesystem** — paths, permissions, \`install\` · **Processes** — \`ps\`, \`nice\`, signals & traps
- **Text** — the \`grep\`/\`awk\`/\`sort | uniq -c\` insight pipeline · **Admin** — \`systemd\`, \`journalctl\`, scheduling
- **Scripting** — the whole robust-bash foundation the tool is written in

### Where to go next
- Extend \`sysreport\` (email alerts, JSON output, more checks) — the best way to learn is to keep building
- Containers, cloud, config management (Ansible) — all stand on exactly these fundamentals

From a cold power button to a shipped tool. **You know Linux now** — not as commands, but as a system. Go build.`,
  narration:
    'Here\'s the whole capstone, and stepping back, look at what it really represents: a single tool that used every single course in this series. That was the entire point of building it. Think about everything that went into sysreport. The kernel course gave you the mental model of the processes and system calls happening underneath every command it runs. The shell course gave you the streams, the pipes, and the exit codes that the tool is built out of. The filesystem course gave you paths, permissions, and the install command that ships it. The processes course gave you ps and nice for gathering and prioritizing, and the signals and traps that make it clean up after itself. The text course gave you the beating heart of the tool — the grep, awk, and sort-uniq-count pipeline that turns raw data into real insight. The admin course gave you systemd, journalctl, and scheduling, so the tool runs itself and is managed like a real service. And the scripting course gave you the entire robust foundation — the safety header, the functions, the getopts, the validation — that the whole thing is written on. Every course, converging into one artifact. That convergence is what it means to actually know Linux: not memorizing a list of commands, but understanding the system deeply enough that all the pieces click together into something you can build with. So where do you go from here? The best next step is to keep building — extend sysreport itself: add email alerts when a disk is critical, output JSON so another program can consume it, add more health checks. Tools grow by use. And beyond that, everything in the modern infrastructure world — containers, the cloud, configuration management tools like Ansible — stands directly on the fundamentals you now hold. There\'s no magic above this layer; it\'s all just these ideas, composed. You started this series at a cold power button, not knowing what happened when a machine turned on. You\'re ending it having built and shipped a real tool. You know Linux now — not as a set of commands, but as a system you understand from the boot chain up. Go build something.',
}
