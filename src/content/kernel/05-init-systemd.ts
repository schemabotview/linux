import type { Section } from '../types'

export const initSystemd: Section = {
  id: 'init-systemd',
  title: 'init: PID 1 & systemd',
  scene: 'pid-one-tree',
  focus: 'ms-b5',
  slide: `## init: PID 1 & systemd

Rung 5: the kernel's final act was starting **one** program — **\`init\`**, **PID 1** — the first resident of **user space**. Everything else up here descends from it.

### PID 1 is special
- The **first** and **last** process — the kernel starts it; if it ever exits, the system **panics**
- The **ancestor of every process**: each new process is *forked* from an existing one, so the whole tree traces back to PID 1 (Course 4)

### On modern Linux, init is systemd
- **systemd** brings the system up: it starts services **in parallel**, resolving *what depends on what*
- Manages **services** for the rest of uptime — \`systemctl start/stop/status\`, boot-time logs via \`journalctl\` (Course 6)
- Older systems used **SysV init** — sequential shell scripts; systemd replaced it for speed and dependency tracking

PID 1 is the seed of user space — from here, the top of the stack fills with running programs.`,
  narration:
    'The kernel\'s final boot act, remember, was to start a single user-space program and give it process ID one — and here it is, arriving at rung five, the first resident of the user-space layer at the top of the stack. That process, traditionally called init, is special in a way nothing else on the system is. It is the very first process to run in user space, and it must be the last to die — if PID one ever exits, the kernel considers the system unusable and panics, halting the machine. It\'s also the ancestor of absolutely everything else. In Linux, you don\'t create a process from nothing; every new process is forked, split off, from an existing one — a detail we\'ll dig into in the processes course. Which means every program running on the machine, right now, traces its family tree straight back to that one process, PID one, at the root. So what actually is init on a modern Linux system? These days it\'s almost always a program called systemd. When the kernel starts systemd, systemd takes over the entire job of bringing the machine to life. Rather than starting services one after another in a slow line, it looks at what depends on what — the network should come up before the web server, logging before the things that log — and starts everything it can in parallel, which is a big reason modern Linux boots so fast. And systemd doesn\'t stop once boot is done; it stays running for the entire uptime of the machine as the manager of all your services, the background daemons like the SSH server and the scheduler. You\'ll spend real time with it later — systemctl to start, stop, and check services, and journalctl to read their logs. Older systems used a simpler predecessor called SysV init, which ran a sequence of shell scripts one at a time; systemd replaced it precisely because parallel startup and real dependency tracking are so much faster and more reliable. So PID one is the seed, and from this one process the whole user-space layer now grows. Let\'s see what it grows into — the very top of the ladder.',
}
