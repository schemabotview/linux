import type { Section } from '../types'

export const systemdServices: Section = {
  id: 'systemd-services',
  title: 'systemd: managing services',
  scene: 'start-vs-enable',
  slide: `## systemd: managing services

A **service** (daemon) is a long-running background program — \`sshd\`, \`nginx\`, a database. **\`systemd\`** (PID 1, from Course 1) starts and supervises them all.

### A service is declared by a unit file
- A **\`.service\`** unit (in \`/etc/systemd/system/\` or \`/lib/systemd/system/\`) declares **what to run**, its **dependencies**, and how to **restart** it
- Also \`.timer\`, \`.socket\`, \`.target\` units — but \`.service\` is the one you'll write

### \`systemctl\` — the one command you'll use daily
- **\`systemctl start\`/\`stop\`/\`restart\` nginx** — control it now
- **\`systemctl status nginx\`** — running? healthy? recent log lines?
- **\`systemctl enable\`/\`disable\` nginx** — **start at boot**, or not (≠ \`start\`, which is now-only)
- After editing a unit: **\`systemctl daemon-reload\`**

The two verbs to keep straight: **\`start\`** = now, **\`enable\`** = at every boot. Next: where a service's output *goes*.`,
  narration:
    'Now, what actually runs on a server? Services — also called daemons — the long-running background programs that never show a prompt and just quietly do their job: the SSH server that lets you log in, the web server serving pages, the database answering queries, the scheduler firing off jobs. On a modern Linux system, every one of these is started and watched over by systemd, which — recall from Course one — is PID one, the very first process, and it stays running for the machine\'s whole life as the master service manager. How does systemd know about a service? Each one is described by a unit file, a small configuration file — a dot-service file — that declares what program to run, what other services it depends on so they start in the right order, and what to do if it crashes, like automatically restart it. These unit files live in slash-etc-slash-systemd-slash-system for ones you or your packages add, or slash-lib-slash-systemd-slash-system for ones that ship with the software. There are other unit types too — timers, sockets, targets — but the dot-service is the one you\'ll actually read and write. The command you\'ll use every single day to manage services is systemctl, and its verbs are intuitive. systemctl start, stop, or restart, followed by a service name, controls it right now. systemctl status is the one you\'ll reach for constantly — it tells you whether a service is running, whether it\'s healthy, when it last started, and even shows you the most recent lines of its log, all in one screen; it\'s the first thing to run when something isn\'t working. And then there\'s a pair that beginners constantly confuse, so let\'s nail it down. systemctl start runs the service right now, this moment — but it does nothing about the future, so after a reboot it won\'t come back. systemctl enable is the one that registers a service to start automatically at every boot. They\'re independent: start is now, enable is forever after. Usually you want both — enable it so it survives reboots, and start it so you don\'t have to wait for one. One more: after you edit a unit file, run systemctl daemon-reload so systemd re-reads it. So systemctl gives you complete control over what runs on the box. But a running service produces output — status messages, errors, warnings — and where all of that goes is the other half of the systemd story.',
}
