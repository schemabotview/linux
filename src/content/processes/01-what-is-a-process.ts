import type { Section } from '../types'

export const whatIsAProcess: Section = {
  id: 'what-is-a-process',
  title: 'What a process is',
  scene: 'program-vs-process',
  slide: `## What a process is

A **program** is a file on disk (\`/usr/bin/python\`). A **process** is that program **running** — a live instance the kernel is managing.

### One program, many processes
- Open three terminals and you have **three** \`bash\` processes from **one** program file
- Each process gets its **own**: memory space, open files, and a unique **PID** (process ID)

### Every process has a parent
- A process is created **by another process** — its **parent** (tracked as the **PPID**)
- Follow every parent up and you reach **PID 1** (systemd) — the tree from Course 1
- \`ps\`, \`pstree\`, and \`/proc/<pid>/\` all show this live

This diagram is the whole life of one process — born, running, gone. Let's watch it get created.`,
  narration:
    'We\'ve mentioned processes in every course so far; now let\'s make the idea precise, because the distinction at its heart is simple but easy to blur. A program is a passive thing — a file sitting on disk, like slash-usr-slash-bin-slash-python, just bytes waiting. A process is what you get when that program is actually running: a live, active instance that the kernel has loaded into memory and is managing. The program is the recipe; the process is the meal being cooked. And the one-to-many relationship is the key insight: a single program file can be running as many separate processes at once. Open three terminal windows and you have three distinct bash processes, all born from the very same bash program on disk. Each of those processes is genuinely independent — it has its own private memory space that the others can\'t see, its own set of open files, and its own unique identifying number called the PID, the process ID. When you want to talk to a specific running program — to inspect it or stop it — the PID is how you name it. Now here\'s the second fundamental fact, and it connects straight back to Course one: every process is created by another process. The one that creates it is called its parent, and each process remembers its parent\'s ID as the PPID. And because every process has a parent, you can follow that chain upward — this process was started by that one, which was started by another — and no matter where you begin, you always arrive at the same place: PID one, systemd, the first process the kernel started at boot. That\'s the process tree we drew in Course one, and it\'s completely real and live — you can explore it right now with commands like ps and pstree, or by poking around in those per-process directories under slash-proc. So a process is a running program, with an identity and a parent. This whole diagram is the life story of a single one — created, running, and eventually gone. Let\'s start at the beginning and watch one come into existence, because the way Linux creates a process is genuinely surprising.',
}
