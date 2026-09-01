import type { Section } from '../types'

export const signals: Section = {
  id: 'signals',
  title: 'Signals: talking to a process',
  scene: 'signal-table',
  slide: `## Signals: talking to a process

A **signal** is a short, asynchronous message the kernel delivers to a process — a tap on the shoulder that says *something happened, react*.

### Sending them — \`kill\` (badly named: it just *sends*)
- **\`SIGTERM\` (15)** — *please stop* — the polite default of \`kill <pid>\`; lets the program clean up first
- **\`SIGINT\` (2)** — what **\`Ctrl-C\`** sends: interrupt
- **\`SIGHUP\` (1)** — hang-up; by convention many daemons **reload their config** on it
- **\`SIGSTOP\` / \`SIGCONT\`** — pause / resume (\`Ctrl-Z\` is stop); **\`killall <name>\`** targets by name

### Catching them — and the two you can't
- A program can **trap** a catchable signal to run cleanup first (\`trap '…' INT TERM\` in a script)
- **\`SIGKILL\` (9)** and **\`SIGSTOP\`** **cannot** be caught or ignored — the kernel acts directly
- Etiquette: **try \`TERM\` first**; \`-9\` is the last resort (it gives *no* chance to clean up → temp files, corruption)

Signals are how \`Ctrl-C\`, a graceful shutdown, and a config reload all actually work. Next: *watching* processes.`,
  narration:
    'So a process is running, and you want to communicate with it from the outside — tell it to stop, or to reload, or to quit right now. The mechanism for that is the signal, and it\'s one of the oldest and most useful ideas in Unix. A signal is a short, asynchronous message that the kernel delivers to a process — think of it as a tap on the shoulder carrying one specific meaning: something happened, react to it. The command to send a signal is, unfortunately, named kill, which is misleading, because kill doesn\'t necessarily kill anything — it just sends a signal, and most signals aren\'t fatal. Let\'s go through the ones you\'ll actually use. The default, the one you get from plain kill followed by a PID, is SIGTERM, signal number fifteen, and it means please terminate — a polite request to shut down. The key word is polite: because the program receives it as a message, it gets a chance to react — finish writing a file, close its network connections, clean up — before exiting gracefully. Then there\'s SIGINT, number two, which is exactly what Control-C sends from your keyboard: interrupt, stop what you\'re doing. There\'s SIGHUP, number one, originally meaning the terminal hung up, but which by a long-standing convention many background services interpret as reload your configuration — a way to re-read config without a full restart. And there\'s SIGSTOP and SIGCONT, the pause and resume pair, where SIGSTOP is what Control-Z sends. If you don\'t know a process\'s PID, killall lets you signal by program name instead. Now, the really important part: what a process can and cannot do about a signal. For most signals, a program can install a handler — it can trap the signal and run its own cleanup code first. In a shell script you do this with the trap command, saying, for instance, on receiving an interrupt or a terminate, delete my temporary files and then exit — which is how well-behaved programs avoid leaving a mess when interrupted. But there are two signals that are special, that cannot be caught, blocked, or ignored under any circumstances. One is SIGKILL, signal number nine, the forceful one: when you send dash-nine, the kernel doesn\'t ask the process anything — it just terminates it, immediately, no chance to react. The other is SIGSTOP, which always freezes the process no matter what. Because dash-nine gives a program zero opportunity to clean up, it can leave behind half-written files, locked resources, or corrupted state — so the etiquette, which good sysadmins follow religiously, is: always try SIGTERM first, give the process a moment to exit gracefully, and only reach for dash-nine as a genuine last resort when something is truly stuck. So signals are the invisible machinery behind Control-C, behind a clean shutdown, behind a live config reload. Now that we can send messages to processes, let\'s learn to watch them.',
}
