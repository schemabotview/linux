import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here',
  scene: 'processes-recap',
  slide: `## You are here

You can now **see, understand, and control** every running program on a Linux box.

### What you can now do
- Distinguish a **program** from a **process** (PID/PPID), and trace the tree to **PID 1**
- Explain how a process is born — **\`fork\`** then **\`exec\`** — and why that split powers redirection
- Read process **states** and the **scheduler**'s time-slicing; understand **zombies** & **orphans**
- **Signal** processes (\`SIGTERM\` before \`SIGKILL\`), **watch** them (\`ps\`, \`top\`, \`/proc\`), and **steer** them (\`nice\`, job control, cgroups)

### The road ahead
- **Text** — the grep/sed/awk toolkit for transforming the streams these processes emit
- **Admin → Scripting → Project** — operating, automating, and shipping

You can run and control the machine's work. Next: the **text tools** to transform its output.`,
  narration:
    'Here\'s the whole life of a process, and you can now reason about every program on a Linux system. You know a program is a file on disk while a process is that program running, each with a unique PID and a parent PPID that chains all the way up to PID one. You know how a process is born — a parent forks a copy of itself, and the child execs to become the program you actually wanted — and you understand the deep reason Linux splits those into two steps: the gap between them is exactly where the shell sets up redirection. You know that a running process is usually not running at all but sleeping, waiting on something, and that the scheduler slices CPU time so hundreds of them share a few cores; and you know how a process dies — exiting with a code, lingering briefly as a zombie until its parent reaps it, or being orphaned and adopted by PID one. And you\'ve learned to act on all of this: to send signals, reaching for a polite SIGTERM before ever resorting to a forceful dash-nine; to watch processes with ps, top, and the raw truth in slash-proc; and to steer them with nice values, with your shell\'s job control, and with the hard limits of cgroups that quietly power every container in the cloud. That\'s genuine command over the running machine. From here, the series turns to the data these processes produce. Every one of them emits text — logs, output, streams — and the next course is a deep dive into the classic Unix toolkit for transforming that text: grep, sed, awk, and the pipelines that stitch them together, the tools you glimpsed piping commands in Course two. You can run the work now; next, let\'s learn to shape what it produces.',
}
