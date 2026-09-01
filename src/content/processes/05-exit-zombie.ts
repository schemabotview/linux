import type { Section } from '../types'

export const exitZombie: Section = {
  id: 'exit-zombie',
  title: 'Exit, zombies & orphans',
  scene: 'zombie-and-orphan',
  slide: `## Exit, zombies & orphans

A process ends by calling **\`exit(code)\`** — but it isn't fully gone until its **parent** acknowledges it.

### exit → zombie → reaped
- The process **exits** with a status code (the \`$?\` of Course 2) and releases its memory
- But its **exit code** must survive until the parent reads it, so the kernel keeps a tiny husk — a **zombie** (state \`Z\`)
- The parent calls **\`wait()\`**, receives the code, and the zombie is **reaped** — finally gone

### Two failure modes you'll recognize
- **Zombie leak** — a buggy parent never \`wait()\`s; harmless husks pile up in \`ps\` (fix: fix or kill the *parent*)
- **Orphan** — the parent dies first; the child is **re-parented to PID 1**, which dutifully reaps it (no leak)

Birth by fork, life in the scheduler, death reaped by a parent — the full circle. Now, how do we *talk* to a process?`,
  narration:
    'Every process eventually finishes, and it does so by calling exit, handing back a status code — and yes, that\'s the very same exit code we met in Course two, the number that lands in dollar-question-mark, zero for success and non-zero for trouble. When a process exits, the kernel reclaims its memory and its open files. But here\'s the twist: the process is not immediately, completely gone. Think about who wants that exit code. The parent process, very often, needs to know how its child fared — did it succeed or fail? So the exit code has to survive until the parent has a chance to read it. To make that possible, the kernel keeps a tiny husk of the finished process around — just its exit status and a scrap of bookkeeping, no memory, no code — and a process in this state is called, wonderfully, a zombie, shown with the letter Z: dead, but not yet laid to rest. The parent collects the code by calling wait — the same wait the shell does after launching a command — and the instant it does, it receives the exit status and the zombie is reaped, cleaned up completely and truly gone. That whole handshake, exit then wait, is why a parent can always find out how its children did. Now, this mechanism has two failure modes you\'ll eventually run into, and knowing them makes you look like you know what you\'re doing. The first is a zombie leak: if a parent process is buggy and never bothers to call wait, its finished children pile up as zombies that never get reaped. They\'re harmless — they use essentially no resources — but they clutter up your process list, and the fix is counterintuitive: you can\'t kill a zombie, it\'s already dead; you have to fix or kill the parent that\'s failing to reap it. The second is the mirror image: what if the parent dies before the child does? Then the child is an orphan, and Linux handles it gracefully — the orphan is immediately re-parented, adopted by PID one, systemd, which makes a point of dutifully waiting on its adopted children, so orphans always get reaped and never leak. And that closes the full circle of a process\'s life: born by fork, transformed by exec, cycling through states under the scheduler, exiting with a code, and finally reaped by a waiting parent. Now that we understand the whole life cycle, the practical question is: how do we reach in from outside and tell a running process to do something — to stop, to reload, to quit? For that, we use signals.',
}
