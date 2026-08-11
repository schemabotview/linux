import type { Course } from 'reveal-engine'

// Course 4 — "Processes & signals" (the RUN stage). Rides the `process-lifecycle` spine (§1–§5),
// detours to the `signals` whole-canvas scene (§6), tours the `proc-monitoring` board (§7–§9), and
// bookends back on the lifecycle (§10). Solid-tour reveal: 1 beat = 1 section.
//
// STATUS: §1–§10 authored — Course 4 of 8.

const PL_ALL = ['pl-parent', 'pl-fork', 'pl-exec', 'pl-states', 'pl-run', 'pl-sleep', 'pl-stop', 'pl-exit', 'pl-zombie', 'pl-wait']
const PL_BIRTH = ['pl-parent', 'pl-fork'] // §2
const PL_EXEC = ['pl-fork', 'pl-exec'] // §3
const PL_STATES = ['pl-states', 'pl-run', 'pl-sleep', 'pl-stop'] // §4
const PL_END = ['pl-exit', 'pl-zombie', 'pl-wait'] // §5

const SG = ['sg-all'] // §6

const PM_ALL = ['pm-proc', 'pm-ps', 'pm-top', 'pm-nice', 'pm-jobs', 'pm-cgroups']
const PM_LOOK = ['pm-proc', 'pm-ps', 'pm-top'] // §7
const PM_PRI = ['pm-nice'] // §8
const PM_CTL = ['pm-jobs', 'pm-cgroups'] // §9

export const processes: Course = {
  id: 'processes',
  title: 'Processes & signals',
  sections: [
    {
      id: 'what-is-a-process',
      heading: 'What a process is',
      scene: 'process-lifecycle',
      focus: [],
      slide: {
        title: 'What a process is',
        body: [
          'A **program** is a file on disk (`/usr/bin/python`). A **process** is that program **running** — a live instance the kernel is managing.',
          '',
          '### One program, many processes',
          '- Open three terminals and you have **three** `bash` processes from **one** program file',
          '- Each process gets its **own**: memory space, open files, and a unique **PID** (process ID)',
          '',
          '### Every process has a parent',
          '- A process is created **by another process** — its **parent** (tracked as the **PPID**)',
          '- Follow every parent up and you reach **PID 1** (systemd) — the tree from Course 1',
          '- `ps`, `pstree`, and `/proc/<pid>/` all show this live',
          '',
          'This diagram is the whole life of one process — born, running, gone. Let\'s watch it get created.',
        ].join('\n'),
      },
      beats: [
        {
          line: "We've mentioned processes in every course so far; now let's make the idea precise, because the distinction at its heart is simple but easy to blur. A program is a passive thing — a file sitting on disk, like slash-usr-slash-bin-slash-python, just bytes waiting. A process is what you get when that program is actually running: a live, active instance that the kernel has loaded into memory and is managing. The program is the recipe; the process is the meal being cooked. And the one-to-many relationship is the key insight: a single program file can be running as many separate processes at once. Open three terminal windows and you have three distinct bash processes, all born from the very same bash program on disk. Each of those processes is genuinely independent — it has its own private memory space that the others can't see, its own set of open files, and its own unique identifying number called the PID, the process ID. When you want to talk to a specific running program — to inspect it or stop it — the PID is how you name it. Now here's the second fundamental fact, and it connects straight back to Course one: every process is created by another process. The one that creates it is called its parent, and each process remembers its parent's ID as the PPID. And because every process has a parent, you can follow that chain upward — this process was started by that one, which was started by another — and no matter where you begin, you always arrive at the same place: PID one, systemd, the first process the kernel started at boot. That's the process tree we drew in Course one, and it's completely real and live — you can explore it right now with commands like ps and pstree, or by poking around in those per-process directories under slash-proc. So a process is a running program, with an identity and a parent. This whole diagram is the life story of a single one — created, running, and eventually gone. Let's start at the beginning and watch one come into existence, because the way Linux creates a process is genuinely surprising.",
          delta: [{ kind: 'solidify', ids: PL_ALL }],
        },
      ],
    },
    {
      id: 'fork',
      heading: 'fork(): cloning a process',
      scene: 'process-lifecycle',
      focus: PL_BIRTH,
      slide: {
        title: 'fork(): cloning a process',
        body: [
          'Linux has a surprising way to make a new process: it doesn\'t build one from scratch — it **clones an existing one**.',
          '',
          '### The `fork()` system call',
          '- A running process calls **`fork()`**; the kernel makes a **near-identical copy** — same code, same open files, same memory (copy-on-write)',
          '- Now there are **two** almost-identical processes: the **parent** and the new **child** (with a fresh PID)',
          '',
          '### Telling them apart',
          '- `fork()` returns **twice** — the child sees **`0`**, the parent sees the **child\'s PID** — so each knows which it is and can branch',
          '- Copy-on-write makes it cheap: they **share** memory pages until one **writes**, then that page is copied',
          '',
          'A copy of itself is rarely what you actually want to run, though. That\'s where the second half comes in.',
        ].join('\n'),
      },
      beats: [
        {
          line: "How do you create a brand-new process? You might guess the system loads a fresh program into empty memory and starts it. Linux does something far stranger and, it turns out, far more elegant: to make a new process, it clones an existing one. The mechanism is a system call named fork. When a running process calls fork, the kernel makes a near-perfect duplicate of it — same program code, same open files, the same contents of memory — and suddenly, where there was one process, there are two. The original is the parent; the fresh copy is the child, and the child gets its own new PID. They are, at this instant, almost identical twins running the same code. Now, this raises an obvious puzzle: if the two processes are copies of each other running the same instructions, how does either one know whether it's the parent or the child, so they can go do different things? The answer is a clever little trick in how fork returns. The single call to fork actually returns twice — once in each process — and it returns a different value in each. In the child, fork returns zero. In the parent, fork returns the child's PID, a positive number. So right after the fork, each process checks the return value: see a zero, you're the child, go do the child's job; see a positive number, you're the parent, carry on. That one difference is the seam that lets the two diverge. And you might worry that copying all of a process's memory every time sounds horribly expensive — but the kernel is smart about it with a technique called copy-on-write: the parent and child actually share the same physical memory pages at first, and a page is only genuinely duplicated at the moment one of them tries to change it. So forking is cheap. But think about what we have now: a child that's just a copy of its parent, running the parent's program. That's almost never the program you actually wanted to run. So how does the child turn into, say, ls, or a web server? That's the second half of the story.",
          delta: [{ kind: 'solidify', ids: PL_BIRTH }],
        },
      ],
    },
    {
      id: 'exec-tree',
      heading: 'exec(): becoming a new program',
      scene: 'process-lifecycle',
      focus: PL_EXEC,
      slide: {
        title: 'exec(): becoming a new program',
        body: [
          'The child is a copy of its parent. **`exec()`** is how it *transforms* into the program you actually wanted.',
          '',
          '### `exec()` replaces the program in place',
          '- The child calls **`exec("/bin/ls")`** — the kernel **replaces** its code and memory with `ls`, keeping the same **PID**',
          '- Nothing new is created; the existing process just **becomes** a different program',
          '',
          '### fork + exec = "run a command"',
          '- Every command you ran in Course 2 was exactly this: the shell **forks** a child, the child **execs** the program, the shell **waits**',
          '- Splitting creation (`fork`) from loading (`exec`) is *why* redirection & env work — the child can **tweak itself** in between (e.g. reroute stdout) before exec',
          '',
          'That two-step is the engine behind every program launch on the system. Now let it run.',
        ].join('\n'),
      },
      beats: [
        {
          line: "The child process is a clone of its parent, but what we usually want is for it to run some completely different program. That transformation is the job of the second system call, exec. When a process calls exec with the path to a program — say exec of slash-bin-slash-ls — the kernel does something remarkable: it throws away that process's current code and memory and replaces them, in place, with the ls program, then starts ls running from the beginning. And critically, no new process is created by this — the process keeps its same PID, its same identity; it has simply become a different program, like a person changing completely into a new outfit without leaving the room. So now put the two calls together, because this is the pattern behind literally every command you've ever run. Back in Course two we said the shell runs a command by forking and exec-ing, and now you can see exactly what that means: the shell forks, creating a child that's a copy of the shell; that child immediately execs into the program you asked for — ls, grep, whatever; and the parent shell waits for it to finish. Fork to create, exec to transform, wait to collect the result. That is how programs get launched, top to bottom, on a Linux system. And here's a subtle but beautiful reason why Linux splits process creation into these two separate steps instead of one combined launch call. Because there's a gap between fork and exec — a moment where the child exists but hasn't yet become the new program — the child gets a chance to adjust its own environment before the new program takes over. That's precisely when the shell sets up redirection: in that gap, the child quietly reroutes its own standard output to a file, or sets up a pipe, or changes environment variables — and only then does it exec, so the new program is born already wired up exactly as you asked. The whole elegance of shell redirection falls right out of separating fork from exec. So the process is now created and running the right program. Let's watch what happens while it runs.",
          delta: [{ kind: 'solidify', ids: PL_EXEC }],
        },
      ],
    },
    {
      id: 'states-scheduler',
      heading: 'States & the scheduler',
      scene: 'process-lifecycle',
      focus: PL_STATES,
      slide: {
        title: 'States & the scheduler',
        body: [
          'A "running" process is rarely running *every* instant. It moves between a few **states** as the **scheduler** shares out the CPU (Course 1).',
          '',
          '### The main states (the letter `ps` shows)',
          '- **Running / Runnable (`R`)** — on a CPU now, or ready and waiting its turn',
          '- **Sleeping (`S`)** — blocked, waiting for something (I/O, a timer, input). **Most processes, most of the time**',
          '- **Stopped (`T`)** — suspended (you sent it `Ctrl-Z` / `SIGSTOP`)',
          '- **Zombie (`Z`)** — finished, waiting to be reaped (next section)',
          '',
          '### The scheduler shares time',
          '- Far more processes than cores, so the scheduler gives each a tiny **time slice**, rotating fast → the illusion of *all at once*',
          '- A **sleeping** process costs no CPU — it\'s just parked until its event arrives (why 300 processes idle happily)',
          '- **Load average** ≈ how many want the CPU at once; **`nice`** biases a process\'s share (§8)',
          '',
          'Running, sleeping, stopped — a process cycles these until it\'s done. Then it exits.',
        ].join('\n'),
      },
      beats: [
        {
          line: "We casually say a process is running, but if you could freeze the machine and look, most of your processes would not be running at that instant at all. A process actually moves among a handful of states throughout its life, and understanding them explains a lot of what you'll see in monitoring tools. The first state is running, or runnable, shown by the letter R: this means the process is either actually executing on a CPU right now, or it's ready to and just waiting its turn. The second, and this is the one that surprises people, is sleeping, shown as S — the process is blocked, waiting for something to happen: data to arrive from the disk, a network response, a timer to fire, or a key to be pressed. And here's the striking fact: at any given moment, the vast majority of processes on your system are sleeping, not running. Your machine might have three hundred processes and still be nearly idle, because almost all of them are parked, asleep, waiting for an event that hasn't come yet. The third state is stopped, shown as T — the process has been suspended and frozen, which is exactly what happens when you hit Control-Z in the shell; it's paused, not gone, and can be resumed. And there's a fourth, brief, slightly morbid state called zombie, which is important enough that it's the whole next section. Now, why do processes cycle through these states at all? Because of the scheduler, the CPU manager we met in Course one. You have far more processes than you have CPU cores — maybe hundreds of processes and only eight cores — so the scheduler can't run them all literally at once. Instead it gives each runnable process a tiny slice of time on a core, a few milliseconds, then pauses it and moves to the next, rotating through them so fast that they all appear to run simultaneously. That's the illusion of multitasking. And the sleeping state is what makes it all affordable: a sleeping process uses zero CPU — the scheduler simply skips over it until whatever it's waiting for arrives — which is exactly why you can have three hundred processes and a nearly idle machine. Two numbers you'll see come from this: the load average, which roughly measures how many processes want the CPU at the same time, and the nice value, which lets you bias how big a share of CPU time a process gets, something we'll actually do a little later. So a process spends its life shuttling between running, sleeping, and occasionally stopped — until, eventually, its work is done and it exits. And what happens at the very end is stranger than you'd think.",
          delta: [{ kind: 'solidify', ids: PL_STATES }],
        },
      ],
    },
    {
      id: 'exit-zombie',
      heading: 'Exit, zombies & orphans',
      scene: 'process-lifecycle',
      focus: PL_END,
      slide: {
        title: 'Exit, zombies & orphans',
        body: [
          'A process ends by calling **`exit(code)`** — but it isn\'t fully gone until its **parent** acknowledges it.',
          '',
          '### exit → zombie → reaped',
          '- The process **exits** with a status code (the `$?` of Course 2) and releases its memory',
          '- But its **exit code** must survive until the parent reads it, so the kernel keeps a tiny husk — a **zombie** (state `Z`)',
          '- The parent calls **`wait()`**, receives the code, and the zombie is **reaped** — finally gone',
          '',
          '### Two failure modes you\'ll recognize',
          '- **Zombie leak** — a buggy parent never `wait()`s; harmless husks pile up in `ps` (fix: fix or kill the *parent*)',
          '- **Orphan** — the parent dies first; the child is **re-parented to PID 1**, which dutifully reaps it (no leak)',
          '',
          'Birth by fork, life in the scheduler, death reaped by a parent — the full circle. Now, how do we *talk* to a process?',
        ].join('\n'),
      },
      beats: [
        {
          line: "Every process eventually finishes, and it does so by calling exit, handing back a status code — and yes, that's the very same exit code we met in Course two, the number that lands in dollar-question-mark, zero for success and non-zero for trouble. When a process exits, the kernel reclaims its memory and its open files. But here's the twist: the process is not immediately, completely gone. Think about who wants that exit code. The parent process, very often, needs to know how its child fared — did it succeed or fail? So the exit code has to survive until the parent has a chance to read it. To make that possible, the kernel keeps a tiny husk of the finished process around — just its exit status and a scrap of bookkeeping, no memory, no code — and a process in this state is called, wonderfully, a zombie, shown with the letter Z: dead, but not yet laid to rest. The parent collects the code by calling wait — the same wait the shell does after launching a command — and the instant it does, it receives the exit status and the zombie is reaped, cleaned up completely and truly gone. That whole handshake, exit then wait, is why a parent can always find out how its children did. Now, this mechanism has two failure modes you'll eventually run into, and knowing them makes you look like you know what you're doing. The first is a zombie leak: if a parent process is buggy and never bothers to call wait, its finished children pile up as zombies that never get reaped. They're harmless — they use essentially no resources — but they clutter up your process list, and the fix is counterintuitive: you can't kill a zombie, it's already dead; you have to fix or kill the parent that's failing to reap it. The second is the mirror image: what if the parent dies before the child does? Then the child is an orphan, and Linux handles it gracefully — the orphan is immediately re-parented, adopted by PID one, systemd, which makes a point of dutifully waiting on its adopted children, so orphans always get reaped and never leak. And that closes the full circle of a process's life: born by fork, transformed by exec, cycling through states under the scheduler, exiting with a code, and finally reaped by a waiting parent. Now that we understand the whole life cycle, the practical question is: how do we reach in from outside and tell a running process to do something — to stop, to reload, to quit? For that, we use signals.",
          delta: [{ kind: 'solidify', ids: PL_END }],
        },
      ],
    },
    {
      id: 'signals',
      heading: 'Signals: talking to a process',
      scene: 'signals',
      focus: SG,
      slide: {
        title: 'Signals: talking to a process',
        body: [
          'A **signal** is a short, asynchronous message the kernel delivers to a process — a tap on the shoulder that says *something happened, react*.',
          '',
          '### Sending them — `kill` (badly named: it just *sends*)',
          '- **`SIGTERM` (15)** — *please stop* — the polite default of `kill <pid>`; lets the program clean up first',
          '- **`SIGINT` (2)** — what **`Ctrl-C`** sends: interrupt',
          '- **`SIGHUP` (1)** — hang-up; by convention many daemons **reload their config** on it',
          '- **`SIGSTOP` / `SIGCONT`** — pause / resume (`Ctrl-Z` is stop); **`killall <name>`** targets by name',
          '',
          '### Catching them — and the two you can\'t',
          '- A program can **trap** a catchable signal to run cleanup first (`trap \'…\' INT TERM` in a script)',
          '- **`SIGKILL` (9)** and **`SIGSTOP`** **cannot** be caught or ignored — the kernel acts directly',
          '- Etiquette: **try `TERM` first**; `-9` is the last resort (it gives *no* chance to clean up → temp files, corruption)',
          '',
          'Signals are how `Ctrl-C`, a graceful shutdown, and a config reload all actually work. Next: *watching* processes.',
        ].join('\n'),
      },
      beats: [
        {
          line: "So a process is running, and you want to communicate with it from the outside — tell it to stop, or to reload, or to quit right now. The mechanism for that is the signal, and it's one of the oldest and most useful ideas in Unix. A signal is a short, asynchronous message that the kernel delivers to a process — think of it as a tap on the shoulder carrying one specific meaning: something happened, react to it. The command to send a signal is, unfortunately, named kill, which is misleading, because kill doesn't necessarily kill anything — it just sends a signal, and most signals aren't fatal. Let's go through the ones you'll actually use. The default, the one you get from plain kill followed by a PID, is SIGTERM, signal number fifteen, and it means please terminate — a polite request to shut down. The key word is polite: because the program receives it as a message, it gets a chance to react — finish writing a file, close its network connections, clean up — before exiting gracefully. Then there's SIGINT, number two, which is exactly what Control-C sends from your keyboard: interrupt, stop what you're doing. There's SIGHUP, number one, originally meaning the terminal hung up, but which by a long-standing convention many background services interpret as reload your configuration — a way to re-read config without a full restart. And there's SIGSTOP and SIGCONT, the pause and resume pair, where SIGSTOP is what Control-Z sends. If you don't know a process's PID, killall lets you signal by program name instead. Now, the really important part: what a process can and cannot do about a signal. For most signals, a program can install a handler — it can trap the signal and run its own cleanup code first. In a shell script you do this with the trap command, saying, for instance, on receiving an interrupt or a terminate, delete my temporary files and then exit — which is how well-behaved programs avoid leaving a mess when interrupted. But there are two signals that are special, that cannot be caught, blocked, or ignored under any circumstances. One is SIGKILL, signal number nine, the forceful one: when you send dash-nine, the kernel doesn't ask the process anything — it just terminates it, immediately, no chance to react. The other is SIGSTOP, which always freezes the process no matter what. Because dash-nine gives a program zero opportunity to clean up, it can leave behind half-written files, locked resources, or corrupted state — so the etiquette, which good sysadmins follow religiously, is: always try SIGTERM first, give the process a moment to exit gracefully, and only reach for dash-nine as a genuine last resort when something is truly stuck. So signals are the invisible machinery behind Control-C, behind a clean shutdown, behind a live config reload. Now that we can send messages to processes, let's learn to watch them.",
          delta: [{ kind: 'solidify', ids: SG }],
        },
      ],
    },
    {
      id: 'monitoring-look',
      heading: 'Watching: ps, top & /proc',
      scene: 'proc-monitoring',
      focus: PM_LOOK,
      slide: {
        title: 'Watching: ps, top & /proc',
        body: [
          'To manage processes you have to **see** them. Three lenses, from raw to friendly.',
          '',
          '### The tools',
          '- **`/proc`** — the raw truth: a directory per PID (`/proc/1234/`) exposing its state, memory, open files — *everything else reads this*',
          '- **`ps`** — a **snapshot**: `ps aux` lists every process with user, PID, %CPU, %MEM, state, command',
          '- **`top`** / **`htop`** — a **live dashboard**, refreshing every second, sorted by CPU — your go-to for *"what\'s eating this box?"*',
          '',
          '### The everyday move',
          '- `top` (or `htop`) to spot the hog → note its **PID** → decide: reprioritize (§8) or signal it (`kill`)',
          '- `ps aux | grep <name>` to find a specific process\'s PID for scripting',
          '',
          'Look first, act second. But not every process deserves an equal share of the CPU — so let\'s set priorities.',
        ].join('\n'),
      },
      beats: [
        {
          line: "You can't manage what you can't see, so the foundation of working with processes is being able to observe them, and there are three tools for it, ranging from the raw underlying truth to a friendly live view. The rawest is something we've already met: slash-proc. Remember, the kernel exposes a directory for every running process, named by its PID — slash-proc-slash-one-two-three-four — and inside it are files describing that process in complete detail: its state, its memory usage, the files it has open, the command that launched it. This is the ground truth, and here's the thing to appreciate — every other monitoring tool, including the two we're about to discuss, is really just reading slash-proc and formatting it nicely for you. The workhorse command is ps, which takes a snapshot of the processes running at the moment you run it. The incantation you'll use constantly is ps space a-u-x, which lists every process on the system along with who owns it, its PID, how much CPU and memory it's using, its state — those R, S, T, Z letters from earlier — and the command that started it. It's a still photograph, frozen at that instant. When you want a moving picture instead, you reach for top, or its nicer modern cousin htop. These give you a live dashboard that refreshes every second or two, and by default they sort processes by CPU usage, so the biggest resource hog floats right to the top of the screen. This is your first responder tool: when a server is slow or a fan is roaring and you're wondering what on earth is eating this machine, you run top or htop and the culprit is usually sitting right there at the top of the list. And that's the everyday rhythm of process management: you look first with top or htop, you spot the process that's misbehaving, you note its PID, and then you act — either by adjusting its priority, which is next, or by sending it a signal with kill. When you need to find one specific process for a script, ps piped into grep by name gives you its PID. Look first, act second. Now, about that acting — sometimes the problem isn't that a process is broken, it's just that it's taking more than its fair share. For that we adjust priority.",
          delta: [{ kind: 'solidify', ids: PM_ALL }],
        },
      ],
    },
    {
      id: 'priority',
      heading: 'Priority: nice & renice',
      scene: 'proc-monitoring',
      focus: PM_PRI,
      slide: {
        title: 'Priority: nice & renice',
        body: [
          'All processes are equal, but some can be made **more equal**. The **nice value** biases how big a CPU slice the scheduler hands out.',
          '',
          '### The niceness scale',
          '- Range **−20 → +19**; **lower = higher priority** (greedier). Default is **0**',
          '- The name is literal: a **"nicer"** (higher) value means the process is *nicer to others* — it yields CPU',
          '',
          '### Setting it',
          '- **Start** low-priority: `nice -n 10 ./big-batch.sh` — run a heavy job without hurting the interactive system',
          '- **Change** a running one: `renice -n 5 -p 1234`',
          '- Going **below 0** (greedier) needs **`sudo`** — you can only make your *own* jobs *nicer* without it',
          '',
          '### It only matters under contention',
          '- With spare CPU, everyone runs freely; nice only decides who yields **when cores are scarce**',
          '',
          'Priority tunes the *share*. For hard *ceilings*, and for the shell\'s own control, there\'s more.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Sometimes a process isn't misbehaving at all — it's doing exactly what you asked, like compressing a huge backup or crunching a big data job — but it's so CPU-hungry that it's making the rest of the system sluggish and unresponsive. You don't want to kill it; you just want it to back off and let the more important, interactive work go first. That's what process priority is for, and on Linux it's controlled by a charming concept called the nice value. Every process has a niceness, a number on a scale from minus twenty at one end to positive nineteen at the other, and the rule to remember is that lower means higher priority — a lower, more negative number makes a process greedier, grabbing a bigger share of CPU time, while a higher, more positive number makes it back off. The name is a genuine mnemonic: a nicer process, with a higher nice value, is being nice to everyone else by yielding the processor. The default niceness for anything you start is zero, right in the middle. You set it in two ways. To launch something at a lower priority from the start, you prefix it with the nice command — nice dash-n ten, then your command — which is perfect for kicking off a heavy batch job that you're happy to have run slowly in the background without disturbing your interactive work. To change the priority of something that's already running, you use renice, giving it a new value and the target PID. There's one asymmetry worth knowing: making a process nicer, raising its number to yield more, you can always do to your own processes; but making a process greedier, pushing it below zero to demand more than its fair share, requires sudo, because that's a way to hog a shared machine. And the crucial caveat that ties this back to the scheduler: nice values only matter when there's contention. If the CPU has idle capacity, everybody runs freely and niceness is irrelevant; it only comes into play when more processes want the CPU than there are cores, and the scheduler has to decide who waits — that's when a low nice value wins and a high one gracefully steps aside. So niceness tunes a process's share of the CPU. But sometimes you don't want to just bias a share — you want a hard ceiling, an absolute limit no matter what. And you'll also want tighter control over the jobs you launch from your own shell. Let's cover both.",
          delta: [{ kind: 'solidify', ids: PM_PRI }],
        },
      ],
    },
    {
      id: 'jobs-cgroups',
      heading: 'Job control & cgroups',
      scene: 'proc-monitoring',
      focus: PM_CTL,
      slide: {
        title: 'Job control & cgroups',
        body: [
          'Two more levers: **job control** for the processes *your shell* launched, and **cgroups** for hard, system-wide **limits**.',
          '',
          '### Job control (the shell — recap from Course 2)',
          '- **`&`** starts a job in the **background**; **`Ctrl-Z`** suspends the foreground one (sends `SIGSTOP`)',
          '- **`jobs`** lists them; **`fg`** resumes in foreground, **`bg`** in background; `kill %1` targets job 1',
          '- Under the hood: job control is just the shell sending the **signals** from §6',
          '',
          '### cgroups — control groups',
          '- The kernel feature that puts a process (and its children) in a group with **hard caps**: max CPU, max memory, max I/O',
          '- Exceed the memory cap → the group\'s processes are **killed** (the *OOM* story), not just slowed',
          '- **This is what containers are built on** — Docker/Kubernetes are **cgroups + namespaces** wearing a nice UI',
          '',
          'From a keystroke to a container limit, it\'s all the same primitives: processes, signals, and the scheduler.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Two final levers of control, at opposite ends of the scale. The first is job control, which we actually previewed back in Course two — it's how you manage the processes you launch from your own interactive shell. Recall the pieces: ending a command with an ampersand starts it in the background so you get your prompt back immediately; Control-Z suspends whatever's running in the foreground; the jobs command lists everything your shell is managing; and fg and bg resume a job in the foreground or the background. And now, with this course behind you, you can see what job control really is under the hood — it's nothing more than the shell sending the signals we just learned. Control-Z is the shell delivering SIGSTOP; resuming a job is SIGCONT; and you can even kill a job by its job number with kill percent-one. It's signals all the way down. The second lever is at the opposite extreme — system-wide, enforced by the kernel, and far more powerful: cgroups, short for control groups. Where nice merely biases a process's share of the CPU, cgroups let you put a process and all its children into a named group and impose hard, absolute ceilings on it: this group may use at most two CPU cores, at most one gigabyte of memory, at most this much disk bandwidth — and these aren't suggestions, they're enforced. Cross the memory limit, for example, and the kernel doesn't just slow the group down, it starts killing processes in it — that's the out-of-memory killer in action. And here's the payoff that makes cgroups worth knowing about even if you never configure one by hand: this is the foundation that containers are built on. When you run a Docker container or a Kubernetes pod, what's actually happening underneath is cgroups enforcing the resource limits, combined with another kernel feature called namespaces that isolates what each process can see. All the container tooling — Docker, Kubernetes, the whole cloud-native world — is, at bottom, a friendly interface over cgroups and namespaces. There's no magic; it's these same process primitives. And that's the quiet theme of this whole course: from a single Control-C keystroke, to a graceful server shutdown, to a container capped at one gigabyte of RAM, it is all the same small set of ideas — processes, signals, and the scheduler. Let's bring it together.",
          delta: [{ kind: 'solidify', ids: PM_CTL }],
        },
      ],
    },
    {
      id: 'you-are-here',
      heading: 'You are here',
      scene: 'process-lifecycle',
      focus: [],
      slide: {
        title: 'You are here',
        body: [
          'You can now **see, understand, and control** every running program on a Linux box.',
          '',
          '### What you can now do',
          '- Distinguish a **program** from a **process** (PID/PPID), and trace the tree to **PID 1**',
          '- Explain how a process is born — **`fork`** then **`exec`** — and why that split powers redirection',
          '- Read process **states** and the **scheduler**\'s time-slicing; understand **zombies** & **orphans**',
          '- **Signal** processes (`SIGTERM` before `SIGKILL`), **watch** them (`ps`, `top`, `/proc`), and **steer** them (`nice`, job control, cgroups)',
          '',
          '### The road ahead',
          '- **Text** — the grep/sed/awk toolkit for transforming the streams these processes emit',
          '- **Admin → Scripting → Project** — operating, automating, and shipping',
          '',
          'You can run and control the machine\'s work. Next: the **text tools** to transform its output.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Here's the whole life of a process, and you can now reason about every program on a Linux system. You know a program is a file on disk while a process is that program running, each with a unique PID and a parent PPID that chains all the way up to PID one. You know how a process is born — a parent forks a copy of itself, and the child execs to become the program you actually wanted — and you understand the deep reason Linux splits those into two steps: the gap between them is exactly where the shell sets up redirection. You know that a running process is usually not running at all but sleeping, waiting on something, and that the scheduler slices CPU time so hundreds of them share a few cores; and you know how a process dies — exiting with a code, lingering briefly as a zombie until its parent reaps it, or being orphaned and adopted by PID one. And you've learned to act on all of this: to send signals, reaching for a polite SIGTERM before ever resorting to a forceful dash-nine; to watch processes with ps, top, and the raw truth in slash-proc; and to steer them with nice values, with your shell's job control, and with the hard limits of cgroups that quietly power every container in the cloud. That's genuine command over the running machine. From here, the series turns to the data these processes produce. Every one of them emits text — logs, output, streams — and the next course is a deep dive into the classic Unix toolkit for transforming that text: grep, sed, awk, and the pipelines that stitch them together, the tools you glimpsed piping commands in Course two. You can run the work now; next, let's learn to shape what it produces.",
          delta: [{ kind: 'solidify', ids: PL_ALL }],
        },
      ],
    },
  ],
}
