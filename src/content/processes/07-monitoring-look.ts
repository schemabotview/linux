import type { Section } from '../types'

export const monitoringLook: Section = {
  id: 'monitoring-look',
  title: 'Watching: ps, top & /proc',
  scene: 'three-lenses',
  slide: `## Watching: ps, top & /proc

To manage processes you have to **see** them. Three lenses, from raw to friendly.

### The tools
- **\`/proc\`** — the raw truth: a directory per PID (\`/proc/1234/\`) exposing its state, memory, open files — *everything else reads this*
- **\`ps\`** — a **snapshot**: \`ps aux\` lists every process with user, PID, %CPU, %MEM, state, command
- **\`top\`** / **\`htop\`** — a **live dashboard**, refreshing every second, sorted by CPU — your go-to for *"what's eating this box?"*

### The everyday move
- \`top\` (or \`htop\`) to spot the hog → note its **PID** → decide: reprioritize (§8) or signal it (\`kill\`)
- \`ps aux | grep <name>\` to find a specific process's PID for scripting

Look first, act second. But not every process deserves an equal share of the CPU — so let's set priorities.`,
  narration:
    'You can\'t manage what you can\'t see, so the foundation of working with processes is being able to observe them, and there are three tools for it, ranging from the raw underlying truth to a friendly live view. The rawest is something we\'ve already met: slash-proc. Remember, the kernel exposes a directory for every running process, named by its PID — slash-proc-slash-one-two-three-four — and inside it are files describing that process in complete detail: its state, its memory usage, the files it has open, the command that launched it. This is the ground truth, and here\'s the thing to appreciate — every other monitoring tool, including the two we\'re about to discuss, is really just reading slash-proc and formatting it nicely for you. The workhorse command is ps, which takes a snapshot of the processes running at the moment you run it. The incantation you\'ll use constantly is ps space a-u-x, which lists every process on the system along with who owns it, its PID, how much CPU and memory it\'s using, its state — those R, S, T, Z letters from earlier — and the command that started it. It\'s a still photograph, frozen at that instant. When you want a moving picture instead, you reach for top, or its nicer modern cousin htop. These give you a live dashboard that refreshes every second or two, and by default they sort processes by CPU usage, so the biggest resource hog floats right to the top of the screen. This is your first responder tool: when a server is slow or a fan is roaring and you\'re wondering what on earth is eating this machine, you run top or htop and the culprit is usually sitting right there at the top of the list. And that\'s the everyday rhythm of process management: you look first with top or htop, you spot the process that\'s misbehaving, you note its PID, and then you act — either by adjusting its priority, which is next, or by sending it a signal with kill. When you need to find one specific process for a script, ps piped into grep by name gives you its PID. Look first, act second. Now, about that acting — sometimes the problem isn\'t that a process is broken, it\'s just that it\'s taking more than its fair share. For that we adjust priority.',
}
