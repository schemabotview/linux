import type { Section } from '../types'

export const statesScheduler: Section = {
  id: 'states-scheduler',
  title: 'States & the scheduler',
  scene: 'process-states',
  slide: `## States & the scheduler

A "running" process is rarely running *every* instant. It moves between a few **states** as the **scheduler** shares out the CPU (Course 1).

### The main states (the letter \`ps\` shows)
- **Running / Runnable (\`R\`)** — on a CPU now, or ready and waiting its turn
- **Sleeping (\`S\`)** — blocked on I/O, a timer, or input. **Most processes, most of the time**
- **Stopped (\`T\`)** — suspended (\`Ctrl-Z\` / \`SIGSTOP\`) · **Zombie (\`Z\`)** — finished, awaiting reaping

### The scheduler shares time
- Far more processes than cores, so each gets a tiny **time slice**, rotating fast
- A **sleeping** process costs no CPU — parked until its event arrives
- **Load average** ≈ how many want the CPU at once; **\`nice\`** biases the share (§8)

Running, sleeping, stopped — a process cycles these until it's done. Then it exits.`,
  narration:
    'We casually say a process is running, but if you could freeze the machine and look, most of your processes would not be running at that instant at all. A process actually moves among a handful of states throughout its life, and understanding them explains a lot of what you\'ll see in monitoring tools. The first state is running, or runnable, shown by the letter R: this means the process is either actually executing on a CPU right now, or it\'s ready to and just waiting its turn. The second, and this is the one that surprises people, is sleeping, shown as S — the process is blocked, waiting for something to happen: data to arrive from the disk, a network response, a timer to fire, or a key to be pressed. And here\'s the striking fact: at any given moment, the vast majority of processes on your system are sleeping, not running. Your machine might have three hundred processes and still be nearly idle, because almost all of them are parked, asleep, waiting for an event that hasn\'t come yet. The third state is stopped, shown as T — the process has been suspended and frozen, which is exactly what happens when you hit Control-Z in the shell; it\'s paused, not gone, and can be resumed. And there\'s a fourth, brief, slightly morbid state called zombie, which is important enough that it\'s the whole next section. Now, why do processes cycle through these states at all? Because of the scheduler, the CPU manager we met in Course one. You have far more processes than you have CPU cores — maybe hundreds of processes and only eight cores — so the scheduler can\'t run them all literally at once. Instead it gives each runnable process a tiny slice of time on a core, a few milliseconds, then pauses it and moves to the next, rotating through them so fast that they all appear to run simultaneously. That\'s the illusion of multitasking. And the sleeping state is what makes it all affordable: a sleeping process uses zero CPU — the scheduler simply skips over it until whatever it\'s waiting for arrives — which is exactly why you can have three hundred processes and a nearly idle machine. Two numbers you\'ll see come from this: the load average, which roughly measures how many processes want the CPU at the same time, and the nice value, which lets you bias how big a share of CPU time a process gets, something we\'ll actually do a little later. So a process spends its life shuttling between running, sleeping, and occasionally stopped — until, eventually, its work is done and it exits. And what happens at the very end is stranger than you\'d think.',
}
