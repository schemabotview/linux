import type { Section } from '../types'

export const priority: Section = {
  id: 'priority',
  title: 'Priority: nice & renice',
  scene: 'nice-scale',
  slide: `## Priority: nice & renice

All processes are equal, but some can be made **more equal**. The **nice value** biases how big a CPU slice the scheduler hands out.

### The niceness scale
- Range **−20 → +19**; **lower = higher priority** (greedier). Default is **0**
- The name is literal: a **"nicer"** (higher) value means the process is *nicer to others* — it yields CPU

### Setting it
- **Start** low-priority: \`nice -n 10 ./big-batch.sh\` — run a heavy job without hurting the interactive system
- **Change** a running one: \`renice -n 5 -p 1234\`
- Going **below 0** (greedier) needs **\`sudo\`** — you can only make your *own* jobs *nicer* without it

### It only matters under contention
- With spare CPU, everyone runs freely; nice only decides who yields **when cores are scarce**

Priority tunes the *share*. For hard *ceilings*, and for the shell's own control, there's more.`,
  narration:
    'Sometimes a process isn\'t misbehaving at all — it\'s doing exactly what you asked, like compressing a huge backup or crunching a big data job — but it\'s so CPU-hungry that it\'s making the rest of the system sluggish and unresponsive. You don\'t want to kill it; you just want it to back off and let the more important, interactive work go first. That\'s what process priority is for, and on Linux it\'s controlled by a charming concept called the nice value. Every process has a niceness, a number on a scale from minus twenty at one end to positive nineteen at the other, and the rule to remember is that lower means higher priority — a lower, more negative number makes a process greedier, grabbing a bigger share of CPU time, while a higher, more positive number makes it back off. The name is a genuine mnemonic: a nicer process, with a higher nice value, is being nice to everyone else by yielding the processor. The default niceness for anything you start is zero, right in the middle. You set it in two ways. To launch something at a lower priority from the start, you prefix it with the nice command — nice dash-n ten, then your command — which is perfect for kicking off a heavy batch job that you\'re happy to have run slowly in the background without disturbing your interactive work. To change the priority of something that\'s already running, you use renice, giving it a new value and the target PID. There\'s one asymmetry worth knowing: making a process nicer, raising its number to yield more, you can always do to your own processes; but making a process greedier, pushing it below zero to demand more than its fair share, requires sudo, because that\'s a way to hog a shared machine. And the crucial caveat that ties this back to the scheduler: nice values only matter when there\'s contention. If the CPU has idle capacity, everybody runs freely and niceness is irrelevant; it only comes into play when more processes want the CPU than there are cores, and the scheduler has to decide who waits — that\'s when a low nice value wins and a high one gracefully steps aside. So niceness tunes a process\'s share of the CPU. But sometimes you don\'t want to just bias a share — you want a hard ceiling, an absolute limit no matter what. And you\'ll also want tighter control over the jobs you launch from your own shell. Let\'s cover both.',
}
