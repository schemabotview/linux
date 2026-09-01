import type { Section } from '../types'

export const fork: Section = {
  id: 'fork',
  title: 'fork(): cloning a process',
  scene: 'fork-returns-twice',
  slide: `## fork(): cloning a process

Linux has a surprising way to make a new process: it doesn't build one from scratch — it **clones an existing one**.

### The \`fork()\` system call
- A running process calls **\`fork()\`**; the kernel makes a **near-identical copy** — same code, same open files, same memory (copy-on-write)
- Now there are **two** almost-identical processes: the **parent** and the new **child** (with a fresh PID)

### Telling them apart
- \`fork()\` returns **twice** — the child sees **\`0\`**, the parent sees the **child's PID** — so each knows which it is and can branch
- Copy-on-write makes it cheap: they **share** memory pages until one **writes**, then that page is copied

A copy of itself is rarely what you actually want to run, though. That's where the second half comes in.`,
  narration:
    'How do you create a brand-new process? You might guess the system loads a fresh program into empty memory and starts it. Linux does something far stranger and, it turns out, far more elegant: to make a new process, it clones an existing one. The mechanism is a system call named fork. When a running process calls fork, the kernel makes a near-perfect duplicate of it — same program code, same open files, the same contents of memory — and suddenly, where there was one process, there are two. The original is the parent; the fresh copy is the child, and the child gets its own new PID. They are, at this instant, almost identical twins running the same code. Now, this raises an obvious puzzle: if the two processes are copies of each other running the same instructions, how does either one know whether it\'s the parent or the child, so they can go do different things? The answer is a clever little trick in how fork returns. The single call to fork actually returns twice — once in each process — and it returns a different value in each. In the child, fork returns zero. In the parent, fork returns the child\'s PID, a positive number. So right after the fork, each process checks the return value: see a zero, you\'re the child, go do the child\'s job; see a positive number, you\'re the parent, carry on. That one difference is the seam that lets the two diverge. And you might worry that copying all of a process\'s memory every time sounds horribly expensive — but the kernel is smart about it with a technique called copy-on-write: the parent and child actually share the same physical memory pages at first, and a page is only genuinely duplicated at the moment one of them tries to change it. So forking is cheap. But think about what we have now: a child that\'s just a copy of its parent, running the parent\'s program. That\'s almost never the program you actually wanted to run. So how does the child turn into, say, ls, or a web server? That\'s the second half of the story.',
}
