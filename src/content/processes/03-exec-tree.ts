import type { Section } from '../types'

export const execTree: Section = {
  id: 'exec-tree',
  title: 'exec(): becoming a new program',
  scene: 'exec-in-place',
  slide: `## exec(): becoming a new program

The child is a copy of its parent. **\`exec()\`** is how it *transforms* into the program you actually wanted.

### \`exec()\` replaces the program in place
- The child calls **\`exec("/bin/ls")\`** — the kernel **replaces** its code and memory with \`ls\`, keeping the same **PID**
- Nothing new is created; the existing process just **becomes** a different program

### fork + exec = "run a command"
- Every command you ran in Course 2 was exactly this: the shell **forks** a child, the child **execs** the program, the shell **waits**
- Splitting creation (\`fork\`) from loading (\`exec\`) is *why* redirection & env work — the child can **tweak itself** in between (e.g. reroute stdout) before exec

That two-step is the engine behind every program launch on the system. Now let it run.`,
  narration:
    'The child process is a clone of its parent, but what we usually want is for it to run some completely different program. That transformation is the job of the second system call, exec. When a process calls exec with the path to a program — say exec of slash-bin-slash-ls — the kernel does something remarkable: it throws away that process\'s current code and memory and replaces them, in place, with the ls program, then starts ls running from the beginning. And critically, no new process is created by this — the process keeps its same PID, its same identity; it has simply become a different program, like a person changing completely into a new outfit without leaving the room. So now put the two calls together, because this is the pattern behind literally every command you\'ve ever run. Back in Course two we said the shell runs a command by forking and exec-ing, and now you can see exactly what that means: the shell forks, creating a child that\'s a copy of the shell; that child immediately execs into the program you asked for — ls, grep, whatever; and the parent shell waits for it to finish. Fork to create, exec to transform, wait to collect the result. That is how programs get launched, top to bottom, on a Linux system. And here\'s a subtle but beautiful reason why Linux splits process creation into these two separate steps instead of one combined launch call. Because there\'s a gap between fork and exec — a moment where the child exists but hasn\'t yet become the new program — the child gets a chance to adjust its own environment before the new program takes over. That\'s precisely when the shell sets up redirection: in that gap, the child quietly reroutes its own standard output to a file, or sets up a pipe, or changes environment variables — and only then does it exec, so the new program is born already wired up exactly as you asked. The whole elegance of shell redirection falls right out of separating fork from exec. So the process is now created and running the right program. Let\'s watch what happens while it runs.',
}
