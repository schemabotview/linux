import type { Course } from 'reveal-engine'

// Course 1 — "Boot & the kernel" (the BOOT stage). It rides the single `machine-stack` scene, which
// fuses the old `boot-chain` timeline and `kernel-internals` layer cake on one insight: the machine
// is BUILT bottom-up at boot and USED top-down at runtime. So the course is a TWO-PASS tour of one
// diagram:
//   • Pass 1 — Boot (§1–§6): climb the left ribbon, firmware(1) → shell(6). The camera ascends.
//   • Pass 2 — Runtime (§7–§9): descend the layer cake, ring 3 → syscall → kernel → drivers → metal.
//   • §10 bookend: the whole stack, both directions.
// Solid-tour reveal: §1 solidifies the WHOLE scene; every later section just re-focuses a band (no
// scene switches — it's one scene).
//
// STATUS: §1–§10 authored on `machine-stack` — Course 1 of 8. (Replaces the two-scene version.)

// The whole scene — solidified wholesale on entry (§1) so the full diagram redraws.
const MS_ALL = [
  'bs-boot', 'bs-b1', 'bs-b2', 'bs-b3', 'bs-b3a', 'bs-b3b', 'bs-b3c', 'bs-b4', 'bs-b5', 'bs-b6',
  'bs-b6a', 'bs-b6b', 'bs-b6c',
  'bs-user', 'bs-app', 'bs-shell', 'bs-libc',
  'bs-syscall',
  'bs-kernel', 'bs-sched', 'bs-mem', 'bs-vfs', 'bs-net',
  'bs-drivers',
  'bs-hw', 'bs-cpu', 'bs-ram', 'bs-disk', 'bs-nic',
]

// ── Pass 1: the boot ribbon, climbing bottom → top (each rung + the layer it brings alive) ──
const FIRMWARE = ['bs-b1', 'bs-hw', 'bs-cpu', 'bs-ram', 'bs-disk', 'bs-nic'] // §2 — rung 1, on the metal
const BOOTLOADER = ['bs-b1', 'bs-b2', 'bs-b3'] // §3 — rung 2, GRUB
const KERNEL_BOOT = ['bs-b3', 'bs-b3a', 'bs-b3b', 'bs-b3c', 'bs-b4', 'bs-kernel', 'bs-sched', 'bs-mem', 'bs-vfs', 'bs-net', 'bs-drivers'] // §4 — rungs 3–4 (kernel sub-steps) + the kernel layer lights up
const INIT = ['bs-b5', 'bs-user', 'bs-app', 'bs-shell', 'bs-libc'] // §5 — rung 5, init populates userspace
const USERSPACE = ['bs-b6', 'bs-b6a', 'bs-b6b', 'bs-b6c', 'bs-user', 'bs-app', 'bs-shell', 'bs-libc'] // §6 — rung 6 (services/login/shell) + the userspace layer

// ── Pass 2: the layer cake, descending top → bottom (a running program's request path) ──
const BOUNDARY = ['bs-user', 'bs-app', 'bs-shell', 'bs-libc', 'bs-syscall', 'bs-kernel'] // §7 — ring 3 / the door / ring 0
const SUBSYS = ['bs-syscall', 'bs-kernel', 'bs-sched', 'bs-mem', 'bs-vfs', 'bs-net'] // §8 — the four managers
const METAL = ['bs-kernel', 'bs-drivers', 'bs-hw', 'bs-cpu', 'bs-ram', 'bs-disk', 'bs-nic'] // §9 — drivers → hardware

export const kernel: Course = {
  id: 'kernel',
  title: 'Boot & the kernel',
  sections: [
    {
      // ── §1 problem statement (SOLID-TOUR entry): WHAT an OS is, why Linux, and the diagram's TWO
      //    readings (boot climbs up · runtime reads down). Solidifies the whole scene, framed whole. ──
      id: 'why-linux',
      heading: 'Why Linux exists',
      scene: 'machine-stack',
      focus: [],
      slide: {
        title: 'Why Linux exists',
        body: [
          'A computer is just circuits until something teaches it to be useful. That something is the **operating system** — and on servers, phones, cars, and the cloud, that OS is almost always **Linux**.',
          '',
          '### What an OS is for',
          '- One **referee** between your programs and the hardware — sharing the CPU, memory, disk, and network so many programs coexist',
          '- A stable **set of services** (files, processes, networking) so a program never talks to a raw disk or network card itself',
          '- The line between **your code** and **the machine** — everything in this course lives on one side of it or the other',
          '',
          '### Where Linux came from',
          '- **1991** — Linus Torvalds released a free Unix-like **kernel**; the **GNU** project supplied the userland around it',
          '- **Open source** — anyone can read, change, and ship it; that is why it runs **most of the internet**, Android, and the cloud',
          '',
          '### Two ways to read this one diagram',
          '- **Boot climbs UP** — the numbered ribbon on the left (`1 firmware → 6 userspace`): the machine comes alive from the bare metal up, ending at your shell',
          '- **Runtime reads DOWN** — the stacked layers: your program on top calls *down* through the kernel to the hardware',
          '',
          'Same stack, two directions. Let\'s **climb it** as it boots, then **come back down** as it runs.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Before we touch a single command, it's worth knowing what an operating system actually is and why, on almost every server you'll ever use, that operating system is Linux. A bare computer is just circuits — a processor, some memory, a disk, a network card — and none of it does anything useful on its own. The operating system is the program that turns that pile of hardware into something you can run other programs on. Think of it as a referee: your web server, your database, your text editor all want the CPU and the memory and the disk at the same time, and the OS decides who gets what, when, and keeps them from trampling each other. It also hides the ugly details — no program you write ever pokes a raw disk or talks directly to a network card; it asks the operating system, which offers a clean, stable set of services for files, processes, and networking. That line — between the code you write and the machine underneath — is the single most important idea in this whole course; every topic we cover sits on one side of it or the other. Now, where did Linux come from. In 1991 a student named Linus Torvalds released a free, Unix-like kernel — the core of an operating system — and the GNU project supplied all the tools and utilities around it, which is why you'll sometimes hear it called GNU slash Linux. Because it's open source — anyone can read it, change it, and ship it — it spread everywhere: it runs most of the internet, it's the heart of Android, and it is the cloud. And it inherited a philosophy from Unix that we'll lean on again and again — small sharp tools, plain text everywhere, and the idea that everything is a file. Now look at this diagram, because we'll spend the whole course inside it, and it cleverly tells two stories at once. Read the numbered ladder up the left side, one to six, and that's how the machine boots — it comes alive from the bottom up, from the bare metal, through the kernel, all the way up to the shell prompt you type at. Read the stacked layers in the middle instead, from the top down, and that's how the running machine is built — your programs sitting on top, the hardware at the very bottom, and the kernel in between. Boot climbs this stack; a running program descends it. Same picture, two directions. Right now the whole thing is small and far away, exactly like the machine feels when you don't understand it. Let's start at the very bottom rung and watch it boot.",
          delta: [{ kind: 'solidify', ids: MS_ALL }],
        },
      ],
    },
    {
      // ── §2 firmware (rung 1, on the metal): the camera drops to the bottom of the ladder. ──
      id: 'firmware',
      heading: 'Firmware: the first code that runs',
      scene: 'machine-stack',
      focus: FIRMWARE,
      slide: {
        title: 'Firmware: the first code that runs',
        body: [
          'Boot begins at the **bottom of the ladder**, on the bare metal. Pressing power runs a tiny program baked into a chip on the motherboard: the **firmware**.',
          '',
          '### UEFI (and the old BIOS)',
          '- **POST** — *power-on self-test*: check the CPU, RAM, and devices are alive',
          '- **Find a boot disk** — walk a configured order of drives looking for something bootable',
          '- **UEFI** is the modern firmware (a small boot partition, the **ESP**); **BIOS** was the older style (a 512-byte **MBR** boot sector)',
          '',
          '### Its one real job',
          '- Locate a **bootloader** and hand control to it — then get out of the way',
          '- Firmware knows *nothing* about Linux; it just loads the next stage **up**',
          '',
          'The firmware is a relay runner: it starts the race and hands off **up the ladder** to GRUB.',
        ].join('\n'),
      },
      beats: [
        {
          line: "So you press the power button — what runs first? We start at the very bottom of the ladder, down on the bare metal, because at that instant the CPU can't even read your hard drive. It has no idea what a disk is, or a filesystem, or Linux. So it does the only thing it can: it runs a tiny program that's permanently baked into a chip on the motherboard, called the firmware. On modern machines this firmware is called UEFI; on older ones it was the BIOS, and you'll still hear both names. The firmware does two things. First, the POST — the power-on self-test — a quick check that the essential hardware is actually there and working: the processor responds, the memory is present, the basic devices are alive. That's the beep or the logo you sometimes see. Second, it goes looking for something to boot. It walks a configured list of drives — this disk, then that one, then a USB stick — searching each for a special bootable piece. On UEFI that's a small dedicated boot partition called the EFI System Partition; on the old BIOS it was a single 512-byte chunk at the very start of the disk called the master boot record. And that is genuinely all the firmware does for us. It doesn't know anything about Linux — it can't load a whole operating system. Its entire job is to find a small program called a bootloader and hand control over to it, then step aside. It's the first runner in a relay: it starts the race and passes the baton up to the next rung of the ladder. Let's follow the baton up — to GRUB.",
          delta: [{ kind: 'solidify', ids: FIRMWARE }],
        },
      ],
    },
    {
      // ── §3 bootloader (rung 2): the firmware→GRUB handoff, one rung up. ──
      id: 'bootloader',
      heading: 'The bootloader: GRUB',
      scene: 'machine-stack',
      focus: BOOTLOADER,
      slide: {
        title: 'The bootloader: GRUB',
        body: [
          'The firmware found a small program and jumped to it — one rung up. That program is the **bootloader**, on most Linux systems **GRUB**.',
          '',
          '### What GRUB is for',
          '- The firmware can\'t load an OS; GRUB can — it understands filesystems enough to **find and load the kernel**',
          '- Shows the **boot menu** — pick a kernel version, an older one, or another OS (dual-boot)',
          '- Loads two things into memory: the **kernel** (`vmlinuz`) and a small **initramfs** (next)',
          '',
          '### Then it hands off, up',
          '- GRUB **jumps into the kernel** and is done — it never runs again this boot',
          '- It can pass **kernel parameters** (e.g. `quiet`, or which partition is root)',
          '',
          'Firmware → bootloader → **kernel**: each rung exists only to load the bigger one **above** it.',
        ].join('\n'),
      },
      beats: [
        {
          line: "The firmware found a small bootable program and jumped straight up into it, and that program is the bootloader. On the great majority of Linux systems it's called GRUB. Why do we even need a separate rung here? Because of that limitation we just saw — the firmware is too simple to load a whole operating system; it can barely read a disk. GRUB is the bridge. It's sophisticated enough to understand filesystems well enough to go find the actual kernel file sitting on your disk — usually a file named vmlinuz — and load it into memory. If you've ever rebooted and seen a menu offering a few kernel versions, or a choice between Linux and Windows, that menu is GRUB; it lets you pick which kernel to boot, fall back to an older one if a new one is broken, or choose another operating system entirely. When you make a choice — or after a couple of seconds, the default — GRUB loads two things into memory: the kernel itself, and a second, small bundle called the initramfs, which we'll unpack in a moment. It can also pass along parameters to the kernel, little instructions like run quietly, or here's which disk partition holds the real system. And then GRUB does the same thing the firmware did to it: it jumps up into the kernel and hands over completely. GRUB will not run again for the rest of this boot. Notice the pattern climbing the ladder — firmware loads the bootloader, the bootloader loads the kernel — each rung is just barely capable enough to load the bigger, smarter thing on the rung above it. Now the baton is in the hands of the star of the show. Let's watch the kernel wake up.",
          delta: [{ kind: 'solidify', ids: BOOTLOADER }],
        },
      ],
    },
    {
      // ── §4 the kernel's early boot (rungs 3–4): the kernel LAYER (ring 0) lights up as the kernel
      //    boots — decompress → initramfs → drivers → mount root → hand to init. ──
      id: 'kernel-boot',
      heading: 'The kernel wakes up',
      scene: 'machine-stack',
      focus: KERNEL_BOOT,
      slide: {
        title: 'The kernel wakes up',
        body: [
          'GRUB jumped into the kernel — rungs 3 and 4. As it boots, the whole **kernel layer** (ring 0) switches on beneath your future programs.',
          '',
          '### The early-boot sequence',
          '- **Decompress** — the kernel ships compressed (`vmlinuz`); it unpacks itself in memory',
          '- **initramfs** — GRUB also loaded a *tiny temporary root filesystem in RAM*, carrying the **drivers** needed to reach the real disk',
          '- **Load drivers & detect hardware** — probe CPUs, memory, disks, controllers',
          '- **Mount the real root `/`** — pivot from the RAM filesystem onto your actual disk',
          '',
          '### The kernel layer comes alive',
          '- Its four managers — **scheduler, memory, VFS, network** — and the **drivers** below now exist (we tour them top-down in Pass 2)',
          '- Its last boot act: start **exactly one** user-space program — **`init`**, **PID 1** (rung 5)',
          '',
          'A chicken-and-egg fix: you need a driver to read the disk that holds the driver — so `initramfs` carries it in **RAM** first.',
        ].join('\n'),
      },
      beats: [
        {
          line: "GRUB jumps up into the kernel, and now the real operating system is running for the first time — and as it boots, watch the whole kernel layer in the middle of the stack switch on. But the kernel wakes up with a very specific mission: it needs to get just enough hardware working to reach your actual disk and launch the very first program. Watch the sequence. First it decompresses itself — the kernel ships as a compressed file, that vmlinuz, to save space, so the first thing it does is unpack itself in memory. Then comes a clever trick that solves a genuine chicken-and-egg problem. To read your real hard drive, the kernel needs the right driver for your particular disk controller — but that driver is a file that lives on the very disk it can't read yet. So GRUB helpfully loaded a second bundle alongside the kernel: the initramfs, a tiny, temporary root filesystem that lives entirely in RAM and carries exactly the drivers needed to reach the real hardware. Using that RAM filesystem, the kernel loads its drivers and probes the machine — how many CPU cores, how much memory, which disks and controllers are present — building up a working picture of the hardware. Once it can finally talk to your real storage, it does the pivot: it mounts the real root filesystem, the disk with slash on it that holds your actual system, and leaves the temporary RAM one behind. And in doing all this, the kernel layer we see here comes fully alive — its four managers for the CPU, memory, filesystems, and network, and the drivers beneath them, are all now running; we'll come back down and meet them one by one in the second half of this course. For now, the kernel does the final act of the boot process — the thing everything so far was climbing toward. It starts one single user-space program, the first process, called init, and hands it the special process ID number one. From this moment the kernel stops being a program that runs start to finish; it settles into the background as the permanent referee underneath everything else. Let's follow that first process up the last rungs of the ladder.",
          delta: [{ kind: 'solidify', ids: KERNEL_BOOT }],
        },
      ],
    },
    {
      // ── §5 init (rung 5): the kernel starts PID 1, which populates userspace. ──
      id: 'init-systemd',
      heading: 'init: PID 1 & systemd',
      scene: 'machine-stack',
      focus: INIT,
      slide: {
        title: 'init: PID 1 & systemd',
        body: [
          'Rung 5: the kernel\'s final act was starting **one** program — **`init`**, **PID 1** — the first resident of **user space**. Everything else up here descends from it.',
          '',
          '### PID 1 is special',
          '- The **first** and **last** process — the kernel starts it; if it ever exits, the system **panics**',
          '- The **ancestor of every process**: each new process is *forked* from an existing one, so the whole tree traces back to PID 1 (Course 4)',
          '',
          '### On modern Linux, init is systemd',
          '- **systemd** brings the system up: it starts services **in parallel**, resolving *what depends on what*',
          '- Manages **services** for the rest of uptime — `systemctl start/stop/status`, boot-time logs via `journalctl` (Course 6)',
          '- Older systems used **SysV init** — sequential shell scripts; systemd replaced it for speed and dependency tracking',
          '',
          'PID 1 is the seed of user space — from here, the top of the stack fills with running programs.',
        ].join('\n'),
      },
      beats: [
        {
          line: "The kernel's final boot act, remember, was to start a single user-space program and give it process ID one — and here it is, arriving at rung five, the first resident of the user-space layer at the top of the stack. That process, traditionally called init, is special in a way nothing else on the system is. It is the very first process to run in user space, and it must be the last to die — if PID one ever exits, the kernel considers the system unusable and panics, halting the machine. It's also the ancestor of absolutely everything else. In Linux, you don't create a process from nothing; every new process is forked, split off, from an existing one — a detail we'll dig into in the processes course. Which means every program running on the machine, right now, traces its family tree straight back to that one process, PID one, at the root. So what actually is init on a modern Linux system? These days it's almost always a program called systemd. When the kernel starts systemd, systemd takes over the entire job of bringing the machine to life. Rather than starting services one after another in a slow line, it looks at what depends on what — the network should come up before the web server, logging before the things that log — and starts everything it can in parallel, which is a big reason modern Linux boots so fast. And systemd doesn't stop once boot is done; it stays running for the entire uptime of the machine as the manager of all your services, the background daemons like the SSH server and the scheduler. You'll spend real time with it later — systemctl to start, stop, and check services, and journalctl to read their logs. Older systems used a simpler predecessor called SysV init, which ran a sequence of shell scripts one at a time; systemd replaced it precisely because parallel startup and real dependency tracking are so much faster and more reliable. So PID one is the seed, and from this one process the whole user-space layer now grows. Let's see what it grows into — the very top of the ladder.",
          delta: [{ kind: 'solidify', ids: INIT }],
        },
      ],
    },
    {
      // ── §6 userspace & distros (rung 6, TOP of the ladder): services, login, the shell — then
      //    kernel-vs-distro. Ends Pass 1 and pivots to Pass 2 (turn around, read the stack downward). ──
      id: 'userspace-distros',
      heading: 'Userspace, the shell & the distro',
      scene: 'machine-stack',
      focus: USERSPACE,
      slide: {
        title: 'Userspace, the shell & the distro',
        body: [
          'Rung 6 — the **top of the ladder**. systemd fills user space with running programs and hands *you* the way in.',
          '',
          '### The running system',
          '- **System services** — long-running background **daemons**: `sshd`, `cron`, the network manager, log collectors',
          '- **Login** — `getty` prompts for a user; on success it launches your **shell** — `bash` (or `zsh`), the **prompt** where Course 2 begins',
          '',
          '### Kernel vs. distribution',
          '- The **kernel** is *one* program — the same core Linux everywhere',
          '- A **distribution** (Ubuntu, Debian, Fedora, Arch) = that kernel **+** the GNU userland **+** a **package manager** + defaults',
          '- That\'s why it\'s sometimes **GNU/Linux**: the kernel is Linux; most commands you\'ll run are GNU tools *around* it (Course 6)',
          '',
          'Boot is done — assembled from the metal **up**. Now turn around: how do you *use* it? Read the same stack **downward**.',
        ].join('\n'),
      },
      beats: [
        {
          line: "We've reached the top rung, and user space fills up with running programs. There are broadly two kinds. First, the system services — long-running background programs, called daemons, that quietly keep the machine useful: the SSH server that lets you log in remotely, the cron scheduler that runs jobs on a timer, the network manager, the log collectors. These have no screen and no keyboard; they just run and wait to be needed. Second, systemd sets up the way for a human to actually get in. On each terminal it runs a small program, traditionally called getty, that shows the login prompt. You type your username and password, it checks them, and on success it launches a program for you — your shell, usually bash. And that shell, printing its prompt and waiting for your first command, sitting right here at the top of the stack, is exactly where the next course picks up. Now that the whole machine is running, let's clear up one thing that confuses almost everyone at the start: the difference between the kernel and a distribution. The kernel — the layer in the middle of this stack — is a single program, and it's essentially the same core everywhere. But nobody ships you just a kernel; a bare kernel can't even print hello. What you actually install is a distribution — Ubuntu, Debian, Fedora, Arch, and dozens more — and a distribution is that same Linux kernel, bundled with the GNU userland, which is all the everyday commands and libraries, plus a package manager to install more software, plus a set of sensible defaults. The kernel is the engine; the distribution is the whole car built around it. This is also why you'll sometimes see it written GNU slash Linux: the kernel is Linux, but a huge share of the commands you'll actually type are GNU tools sitting on top. So that is boot, top to bottom — or rather, bottom to top: the machine assembled itself from the bare metal up, one rung at a time, and handed you a shell at the very top of the ladder. Now flip the whole question around. The machine is built. How do you actually use it? For that, we read this exact same stack the other way — downward — starting from where you're now sitting, your program up here in user space, and following what happens the instant it asks the machine to do something. Let's descend.",
          delta: [{ kind: 'solidify', ids: USERSPACE }],
        },
      ],
    },
    {
      // ── §7 user vs kernel (PASS 2 begins — descend): ring 3 / the syscall door / ring 0. The camera
      //    now moves DOWN the layer cake, tracing a running program's request. ──
      id: 'user-vs-kernel',
      heading: 'User space vs. the kernel',
      scene: 'machine-stack',
      focus: BOUNDARY,
      slide: {
        title: 'User space vs. the kernel',
        body: [
          'Now read the stack **downward**. You\'re at the top, in **user space** — so what happens when your program needs the machine? It hits a wall, and a single door.',
          '',
          '### Two rings, one door',
          '- **User space (ring 3)** — where *your* programs run (`ls`, a browser, nginx): **unprivileged**, no direct hardware access',
          '- **Kernel space (ring 0)** — where the kernel runs: **full** control of CPU, memory, devices',
          '- The CPU itself enforces the wall — user code literally *can\'t* touch hardware',
          '',
          '### System calls — the only way down',
          '- A program that needs the hardware makes a **system call**: `read`, `write`, `open`, `fork`, `mmap`…',
          '- That **traps** down into ring 0: the kernel checks it\'s allowed, does the work, returns',
          '- **`glibc`** wraps these raw calls so C (and everything above) just calls a function',
          '',
          'This wall is why one crashing program can\'t take down the machine — only the kernel touches the metal.',
        ].join('\n'),
      },
      beats: [
        {
          line: "So we turn around and read the very same stack downward, and it tells a completely different story — not how the machine was built, but how it runs. You're sitting up here at the top, in user space, and let's define exactly what that means, because it's the concept the whole rest of Linux hangs on. The machine runs in two different modes, and the CPU hardware itself enforces the split. Your programs — the shell, a web browser, nginx, anything you launch — run up here in user space, sometimes called ring three. In user space a program is unprivileged: it cannot touch the hardware directly, it can't read another program's memory, it can't reach out to the disk or the network card on its own. Below that line is kernel space, ring zero, where the kernel runs with complete, unrestricted control over the CPU, the memory, and every device. That wall between the two is not a suggestion enforced by politeness — it's built into the processor, which will physically refuse to let user-space code execute privileged instructions. So here's the obvious question: if your program up top can't touch the hardware down at the bottom, how does it ever read a file or send a network packet? The answer is the single most important mechanism in the operating system, and it's the red bar in the middle of the stack: the system call. When your program needs something only the kernel can do, it makes a system call — read, write, open, fork, mmap, and a few hundred others — and this traps downward: control jumps across the wall, down into ring zero, the kernel checks that you're actually allowed to do what you asked, carries it out on your behalf, and hands the result back up. It is the one and only door from your world down into the kernel's. In practice you rarely call these by hand — a library called glibc, which you can see sitting right at the bottom of user space, wraps each raw system call in a normal function, so your C code, and every language built on top of it, just calls open or read like an ordinary function and the plumbing happens underneath. And this single door is exactly why Linux is stable: because only the kernel ever touches the metal, one buggy program crashing can bring itself down without taking the whole machine with it. Let's keep descending — through the door, into the kernel, and see what's actually behind it.",
          delta: [{ kind: 'solidify', ids: BOUNDARY }],
        },
      ],
    },
    {
      // ── §8 the four subsystems (descending): the kernel layer — four managers behind the door. ──
      id: 'subsystems',
      heading: 'What the kernel manages',
      scene: 'machine-stack',
      focus: SUBSYS,
      slide: {
        title: 'What the kernel manages',
        body: [
          'Through the door, into ring 0. The kernel is really **four managers**, each sharing out one scarce resource among every program at once.',
          '',
          '### The four subsystems',
          '- **Scheduler** — shares the **CPU**: hundreds of processes, a few cores; it slices time so all appear to run *at once* (the topic of Course 4)',
          '- **Memory manager** — gives each process its own **virtual** address space, paged to and from **RAM**; nobody sees anyone else\'s memory',
          '- **VFS** (virtual filesystem) — one uniform tree over *many* filesystems (ext4, xfs, tmpfs) and devices — the root of *everything is a file* (Course 3)',
          '- **Network stack** — the whole **TCP/IP** implementation lives here; a socket is just another file (Course 6)',
          '',
          'Every command you\'ll ever run is really a conversation with these four — through the one door.',
        ].join('\n'),
      },
      beats: [
        {
          line: "We've dropped through the system-call door into ring zero — so what is the kernel actually doing down here? It comes down to four big jobs, four managers, and each one takes a single scarce resource and shares it fairly among every program running on the machine at the same time. The first is the scheduler, and its job is the CPU. You might have hundreds of processes that all want to run, but only a handful of CPU cores to run them on. The scheduler slices time into tiny pieces and rotates through the processes so fast that they all appear to run simultaneously — that illusion of everything happening at once is the scheduler's doing, and it's so central we give it a whole course later on. The second is the memory manager. It hands every process its own private view of memory, called a virtual address space, and quietly maps those virtual addresses onto the real physical RAM behind the scenes, paging data in and out as needed. The payoff is isolation: your program thinks it has the machine's memory to itself and literally cannot see or corrupt another program's memory. The third is the VFS, the virtual filesystem. Your disk might be formatted ext4, a USB stick something else, and some filesystems live purely in RAM — the VFS presents all of them, plus your devices, as one single uniform tree of files and folders. That's the machinery that makes the famous Unix promise, everything is a file, actually true, and it's the subject of Course three. And the fourth is the network stack: the entire implementation of TCP/IP, the protocols of the internet, lives right here inside the kernel, which is why a network connection — a socket — is handled just like a file you read and write, the topic of Course six. So keep this picture: scheduler, memory, filesystems, network. Every single command you will ever type is, underneath, a conversation with these four managers, carried through that one door. But these managers still have to talk to real, physical hardware — so let's descend the last layer down.",
          delta: [{ kind: 'solidify', ids: SUBSYS }],
        },
      ],
    },
    {
      // ── §9 drivers & the metal (bottom of the descent): drivers translate to devices; everything-
      //    is-a-file; the hardware at the base. Completes the top-down request path. ──
      id: 'drivers',
      heading: 'Drivers & the hardware',
      scene: 'machine-stack',
      focus: METAL,
      slide: {
        title: 'Drivers & the hardware',
        body: [
          'The bottom of the descent. The four subsystems decide *what* to do; **device drivers** know *how* to say it to one specific piece of hardware.',
          '',
          '### Drivers translate to the metal',
          '- Every disk model, GPU, and network card speaks its own dialect; a **driver** is the kernel\'s translator for that device',
          '- Most drivers are **loadable kernel modules** (`.ko`) — added and removed on a running kernel (`lsmod`, `modprobe`)',
          '- This is why Linux is called a **monolithic** kernel *with modules*: one big privileged program, extended by parts you load on demand',
          '',
          '### Everything is a file — even devices',
          '- Devices appear under **`/dev`** — `/dev/sda` (a disk), `/dev/null` — so the same `read`/`write` calls work on hardware too',
          '- At the very bottom: the physical **CPU, RAM, disk, and NIC**',
          '',
          'The full descent: your program → the door → the four managers → drivers → **the metal**.',
        ].join('\n'),
      },
      beats: [
        {
          line: "The four subsystems decide what needs to happen — schedule this process, read that file, send this packet — but they still face a messy reality: every piece of hardware is different. Your particular disk, your specific graphics card, your exact network chip each speak their own private dialect. The thing that bridges that gap, on the next layer down, is the device driver: a piece of code that knows how to talk to one specific kind of hardware, translating the kernel's generic request — write these bytes — into the precise signals that one device understands. Now here's what makes Linux flexible. Most drivers aren't baked permanently into the kernel; they're loadable kernel modules, files ending in dot-k-o, that can be slotted into a running kernel and pulled back out without a reboot — you can list them with lsmod and load one with modprobe. That's why Linux is described as a monolithic kernel with modules: it's one big privileged program running in ring zero, but you can extend it on the fly with these pluggable parts, so it supports thousands of devices without carrying all of them at once. And there's one more beautiful consequence that ties back to the VFS. Because everything is a file, the devices themselves show up as files, under a directory called slash dev — your disk is slash dev slash sda, and there's even slash dev slash null, the famous bottomless bucket. That means the very same read and write system calls you'd use on a text file also work to talk to physical hardware. And at the very bottom of the stack, at the base of the descent, sits the real metal: the CPU that runs the instructions, the RAM that holds the memory, the disk that stores the files, and the network card that moves the packets. And now you can see the whole descent in one glance: your program at the top makes a call, it traps down through the system-call door, one of the four managers handles it, a driver translates it, and the hardware at the bottom does the work. That's how a running machine is used, top to bottom. Let's pull all the way back and take in both directions at once.",
          delta: [{ kind: 'solidify', ids: METAL }],
        },
      ],
    },
    {
      // ── §10 you-are-here (bookend): pull back to the whole stack (`focus: []`) — both directions
      //    understood, road ahead lit. Bookend to §1. ──
      id: 'you-are-here',
      heading: 'You are here',
      scene: 'machine-stack',
      focus: [],
      slide: {
        title: 'You are here',
        body: [
          'One stack, two directions — you\'ve traced both: **built bottom-up** at boot, **used top-down** at runtime.',
          '',
          '### The boot climb (▲)',
          '- **Firmware → GRUB → kernel → init → shell** — the machine assembles itself from the bare metal up',
          '',
          '### The runtime descent (▼)',
          '- **Your program → the syscall door → the kernel\'s four managers → drivers → the metal**',
          '- The **kernel** is a privileged program reached only through **system calls**; **PID 1 / systemd** roots every process; a **distro** = kernel + GNU userland + packages',
          '',
          '### The road ahead',
          '- **Shell → Filesystem → Processes → Text** — driving the machine and moving data',
          '- **Admin → Scripting → Project** — operating it, automating it, and shipping a real tool',
          '',
          'The machine is booted and you know it **both ways**. Next course: **the shell** — the prompt at the top.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Here's the whole machine, and now you can read it both ways. Read it as the boot climb, up the left, and every piece has a place: you press power, and the firmware on the motherboard runs its self-test and finds a boot disk; it hands up to GRUB, the bootloader, which loads the kernel and its initramfs into memory and jumps in; the kernel decompresses itself, uses that temporary RAM filesystem to load drivers and reach the real disk, mounts the true root filesystem, and starts its very first process, PID one, systemd, which brings the rest of user space to life — the background services, and the login that finally handed you a shell prompt at the very top. The machine assembled itself from cold silicon, one rung at a time, bottom to top. Now read it the other way, as the runtime descent: you're up in user space, unprivileged; when your program needs the machine it makes a system call, trapping down through the one door into the kernel; there, four managers share out the machine — the scheduler for the CPU, the memory manager for RAM, the VFS for files, the network stack for sockets — and they reach the physical hardware at the bottom through loadable drivers. Built bottom-up, used top-down — the same stack, two directions, and the little puzzle of why userspace felt like it belonged at the bottom and the top at once now has a clean answer: it's the last thing boot builds and the least-privileged place a program runs. That's Course one: how a Linux machine goes from cold silicon to a running system, and what that system actually is underneath. And the whole thing you installed — kernel plus the GNU tools plus a package manager — is what we call a distribution. From here, the series is about using it. Next we sit down at that prompt and learn the shell — how to actually drive the machine by typing to it. After that, the filesystem you'll navigate, the processes you'll run, and the text tools that make Linux so powerful for working with data. Then administering a real system, automating it with scripts, and finally building and shipping a genuine tool of your own. The machine is booted, and now you know it both ways. In the next course, we start giving it commands.",
          delta: [{ kind: 'solidify', ids: MS_ALL }],
        },
      ],
    },
  ],
}
