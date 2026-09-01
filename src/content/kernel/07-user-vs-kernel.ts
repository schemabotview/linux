import type { Section } from '../types'

export const userVsKernel: Section = {
  id: 'user-vs-kernel',
  title: 'User space vs. the kernel',
  scene: 'syscall-door',
  focus: 'ms-syscall',
  slide: `## User space vs. the kernel

Now read the stack **downward**. You're at the top, in **user space** — so what happens when your program needs the machine? It hits a wall, and a single door.

### Two rings, one door
- **User space (ring 3)** — where *your* programs run (\`ls\`, a browser, nginx): **unprivileged**, no direct hardware access
- **Kernel space (ring 0)** — where the kernel runs: **full** control of CPU, memory, devices
- The CPU itself enforces the wall — user code literally *can't* touch hardware

### System calls — the only way down
- A program that needs the hardware makes a **system call**: \`read\`, \`write\`, \`open\`, \`fork\`, \`mmap\`…
- That **traps** down into ring 0: the kernel checks it's allowed, does the work, returns
- **\`glibc\`** wraps these raw calls so C (and everything above) just calls a function

This wall is why one crashing program can't take down the machine — only the kernel touches the metal.`,
  narration:
    'So we turn around and read the very same stack downward, and it tells a completely different story — not how the machine was built, but how it runs. You\'re sitting up here at the top, in user space, and let\'s define exactly what that means, because it\'s the concept the whole rest of Linux hangs on. The machine runs in two different modes, and the CPU hardware itself enforces the split. Your programs — the shell, a web browser, nginx, anything you launch — run up here in user space, sometimes called ring three. In user space a program is unprivileged: it cannot touch the hardware directly, it can\'t read another program\'s memory, it can\'t reach out to the disk or the network card on its own. Below that line is kernel space, ring zero, where the kernel runs with complete, unrestricted control over the CPU, the memory, and every device. That wall between the two is not a suggestion enforced by politeness — it\'s built into the processor, which will physically refuse to let user-space code execute privileged instructions. So here\'s the obvious question: if your program up top can\'t touch the hardware down at the bottom, how does it ever read a file or send a network packet? The answer is the single most important mechanism in the operating system, and it\'s the red bar in the middle of the stack: the system call. When your program needs something only the kernel can do, it makes a system call — read, write, open, fork, mmap, and a few hundred others — and this traps downward: control jumps across the wall, down into ring zero, the kernel checks that you\'re actually allowed to do what you asked, carries it out on your behalf, and hands the result back up. It is the one and only door from your world down into the kernel\'s. In practice you rarely call these by hand — a library called glibc, which you can see sitting right at the bottom of user space, wraps each raw system call in a normal function, so your C code, and every language built on top of it, just calls open or read like an ordinary function and the plumbing happens underneath. And this single door is exactly why Linux is stable: because only the kernel ever touches the metal, one buggy program crashing can bring itself down without taking the whole machine with it. Let\'s keep descending — through the door, into the kernel, and see what\'s actually behind it.',
}
