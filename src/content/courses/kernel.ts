import type { Course } from 'reveal-engine'

// Course 1 — "Boot & the kernel" (the BOOT stage). It rides the `boot-chain` control-flow spine —
// firmware → GRUB → kernel → init → userspace — touring it band by band (§1–§4, §8–§10), and
// detours to `kernel-internals` for what the kernel actually is (§5–§7). Solid-tour reveal: 1 beat
// = 1 section; each scene solidifies on entry and camera + focus tell the story.
//
// STATUS: §1–§10 authored — Course 1 of 8.

// The whole boot chain — solidified wholesale on scene entry (§1) so the full diagram redraws.
const BOOT_ALL = [
  'bc-firmware', 'bc-boot',
  'bc-kernel', 'bc-decompress', 'bc-initramfs', 'bc-drivers', 'bc-mountroot',
  'bc-init',
  'bc-user', 'bc-services', 'bc-login', 'bc-shell',
]

// Focus bands the camera frames, one section at a time.
const FIRMWARE = ['bc-firmware'] // §2 — the chip runs first
const BOOTLOADER = ['bc-firmware', 'bc-boot'] // §3 — firmware hands off to GRUB
const KERNEL_BAND = ['bc-kernel', 'bc-decompress', 'bc-initramfs', 'bc-drivers', 'bc-mountroot', 'bc-init'] // §4
const INIT_BAND = ['bc-init', 'bc-user', 'bc-services', 'bc-login', 'bc-shell'] // §8
const USER_BAND = ['bc-user', 'bc-services', 'bc-login', 'bc-shell'] // §9

// The `kernel-internals` detour (§5–§7): the syscall boundary, the four subsystems, the metal.
// §5 is a scene switch → solidify the WHOLE scene; §6–§7 stay on it and just move focus.
const KI_ALL = [
  'ki-user', 'ki-app', 'ki-shell', 'ki-libc',
  'ki-syscall',
  'ki-kernel', 'ki-sched', 'ki-mem', 'ki-vfs', 'ki-net',
  'ki-drivers',
  'ki-hw', 'ki-cpu', 'ki-ram', 'ki-disk', 'ki-nic',
]
const BOUNDARY = ['ki-user', 'ki-app', 'ki-shell', 'ki-libc', 'ki-syscall', 'ki-kernel'] // §5
const SUBSYS = ['ki-syscall', 'ki-kernel', 'ki-sched', 'ki-mem', 'ki-vfs', 'ki-net'] // §6
const METAL = ['ki-kernel', 'ki-drivers', 'ki-hw', 'ki-cpu', 'ki-ram', 'ki-disk', 'ki-nic'] // §7

export const kernel: Course = {
  id: 'kernel',
  title: 'Boot & the kernel',
  sections: [
    {
      // ── §1 problem statement (SOLID-TOUR entry): WHAT an operating system is and why Linux.
      //    Solidifies the WHOLE boot chain and frames it whole (`focus: []`) — the wide shot. ──
      id: 'why-linux',
      heading: 'Why Linux exists',
      scene: 'boot-chain',
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
          '- **Unix heritage** — small tools, plain text, *everything is a file* (the ideas the whole series builds on)',
          '',
          'This whole diagram is what happens between **power on** and a **prompt**. Let\'s walk it.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Before we touch a single command, it's worth knowing what an operating system actually is and why, on almost every server you'll ever use, that operating system is Linux. A bare computer is just circuits — a processor, some memory, a disk, a network card — and none of it does anything useful on its own. The operating system is the program that turns that pile of hardware into something you can run other programs on. Think of it as a referee: your web server, your database, your text editor all want the CPU and the memory and the disk at the same time, and the OS decides who gets what, when, and keeps them from trampling each other. It also hides the ugly details — no program you write ever pokes a raw disk or talks directly to a network card; it asks the operating system, which offers a clean, stable set of services for files, processes, and networking. That line — between the code you write and the machine underneath — is the single most important idea in this whole course; every topic we cover sits on one side of it or the other. Now, where did Linux come from. In 1991 a student named Linus Torvalds released a free, Unix-like kernel — the core of an operating system — and the GNU project supplied all the tools and utilities around it, which is why you'll sometimes hear it called GNU slash Linux. Because it's open source — anyone can read it, change it, and ship it — it spread everywhere: it runs most of the internet, it's the heart of Android, and it is the cloud. And it inherited a philosophy from Unix that we'll lean on again and again — small sharp tools, plain text everywhere, and the idea that everything is a file. This diagram is the entire journey from pressing the power button to getting a shell prompt. Right now it's small and far away, exactly like the boot process feels when you don't know it. Let's push in and follow it, step by step.",
          delta: [{ kind: 'solidify', ids: BOOT_ALL }],
        },
      ],
    },
    {
      // ── §2 firmware (same scene): push IN to the top of the chain — the chip that runs first. ──
      id: 'firmware',
      heading: 'Firmware: the first code that runs',
      scene: 'boot-chain',
      focus: FIRMWARE,
      slide: {
        title: 'Firmware: the first code that runs',
        body: [
          'When you press power, the CPU can\'t read your disk yet — it runs a tiny program baked into a chip on the motherboard: the **firmware**.',
          '',
          '### UEFI (and the old BIOS)',
          '- **POST** — *power-on self-test*: check the CPU, RAM, and devices are alive',
          '- **Find a boot disk** — walk a configured order of drives looking for something bootable',
          '- **UEFI** is the modern firmware (a small boot partition, the **ESP**); **BIOS** was the older style (a 512-byte **MBR** boot sector)',
          '',
          '### Its one real job',
          '- Locate a **bootloader** and hand control to it — then get out of the way',
          '- Firmware knows *nothing* about Linux; it just loads the next stage',
          '',
          'The firmware is a relay runner: it starts the race and passes the baton **down** to GRUB.',
        ].join('\n'),
      },
      beats: [
        {
          line: "So you press the power button — what runs first? Here's the catch: at that instant the CPU can't even read your hard drive. It has no idea what a disk is, or a filesystem, or Linux. So it does the only thing it can: it runs a tiny program that's permanently baked into a chip on the motherboard, called the firmware. On modern machines this firmware is called UEFI; on older ones it was the BIOS, and you'll still hear both names. The firmware does two things. First, the POST — the power-on self-test — a quick check that the essential hardware is actually there and working: the processor responds, the memory is present, the basic devices are alive. That's the beep or the logo you sometimes see. Second, it goes looking for something to boot. It walks a configured list of drives — this disk, then that one, then a USB stick — searching each for a special bootable piece. On UEFI that's a small dedicated boot partition called the EFI System Partition; on the old BIOS it was a single 512-byte chunk at the very start of the disk called the master boot record. And that is genuinely all the firmware does for us. It doesn't know anything about Linux — it can't load a whole operating system. Its entire job is to find a small program called a bootloader and hand control over to it, then step aside. It's the first runner in a relay: it starts the race and passes the baton down to the next stage. Let's follow the baton — to GRUB.",
          delta: [{ kind: 'solidify', ids: FIRMWARE }],
        },
      ],
    },
    {
      // ── §3 bootloader (same scene): the firmware→GRUB handoff; GRUB's job is to load the kernel. ──
      id: 'bootloader',
      heading: 'The bootloader: GRUB',
      scene: 'boot-chain',
      focus: BOOTLOADER,
      slide: {
        title: 'The bootloader: GRUB',
        body: [
          'The firmware found a small program and jumped to it. That program is the **bootloader** — on most Linux systems, **GRUB**.',
          '',
          '### What GRUB is for',
          '- The firmware can\'t load an OS; GRUB can — it understands filesystems enough to **find and load the kernel**',
          '- Shows the **boot menu** — pick a kernel version, an older one, or another OS (dual-boot)',
          '- Loads two things into memory: the **kernel** (`vmlinuz`) and a small **initramfs** (more on that next)',
          '',
          '### Then it hands off',
          '- GRUB **jumps into the kernel** and is done — it never runs again this boot',
          '- It can pass **kernel parameters** (e.g. `quiet`, or which partition is root)',
          '',
          'Firmware → bootloader → **kernel**: each stage exists only to load the bigger one after it.',
        ].join('\n'),
      },
      beats: [
        {
          line: "The firmware found a small bootable program and jumped straight into it, and that program is the bootloader. On the great majority of Linux systems it's called GRUB. Why do we even need a separate stage here? Because of that limitation we just saw — the firmware is too simple to load a whole operating system; it can barely read a disk. GRUB is the bridge. It's sophisticated enough to understand filesystems well enough to go find the actual kernel file sitting on your disk — usually a file named vmlinuz — and load it into memory. If you've ever rebooted and seen a menu offering a few kernel versions, or a choice between Linux and Windows, that menu is GRUB; it lets you pick which kernel to boot, fall back to an older one if a new one is broken, or choose another operating system entirely. When you make a choice — or after a couple of seconds, the default — GRUB loads two things into memory: the kernel itself, and a second, small bundle called the initramfs, which we'll unpack in a moment. It can also pass along parameters to the kernel, little instructions like run quietly, or here's which disk partition holds the real system. And then GRUB does the same thing the firmware did to it: it jumps into the kernel and hands over completely. GRUB will not run again for the rest of this boot. Notice the pattern forming — firmware loads the bootloader, the bootloader loads the kernel — each stage is just barely capable enough to load the bigger, smarter thing that comes after it. Now the baton is in the hands of the star of the show. Let's watch the kernel wake up.",
          delta: [{ kind: 'solidify', ids: BOOTLOADER }],
        },
      ],
    },
    {
      // ── §4 the kernel's early boot (same scene): the kernel band — decompress → initramfs →
      //    drivers → mount the real root → hand off to init. §5 then detours into what the kernel IS. ──
      id: 'kernel-boot',
      heading: 'The kernel wakes up',
      scene: 'boot-chain',
      focus: KERNEL_BAND,
      slide: {
        title: 'The kernel wakes up',
        body: [
          'GRUB jumped into the kernel. Its first mission: get enough of the hardware working to **mount the real disk** and start the first program.',
          '',
          '### The early-boot sequence',
          '- **Decompress** — the kernel ships compressed (`vmlinuz`); it unpacks itself in memory',
          '- **initramfs** — GRUB also loaded a *tiny temporary root filesystem in RAM*, carrying the **drivers** needed to reach the real disk',
          '- **Load drivers & detect hardware** — probe CPUs, memory, disks, controllers',
          '- **Mount the real root `/`** — pivot from the RAM filesystem onto your actual disk',
          '',
          '### The last step of boot',
          '- The kernel starts **exactly one** user-space program — **`init`**, which gets **PID 1** — then settles into its real job (running underneath everything)',
          '',
          'A chicken-and-egg fix: you need a driver to read the disk that holds the driver — so `initramfs` carries it in **RAM** first.',
        ].join('\n'),
      },
      beats: [
        {
          line: "GRUB jumps into the kernel, and now the real operating system is running for the first time. But it wakes up with a very specific mission: it needs to get just enough hardware working to reach your actual disk and launch the very first program. Watch the sequence. First it decompresses itself — the kernel ships as a compressed file, that vmlinuz, to save space, so the first thing it does is unpack itself in memory. Then comes a clever trick that solves a genuine chicken-and-egg problem. To read your real hard drive, the kernel needs the right driver for your particular disk controller — but that driver is a file that lives on the very disk it can't read yet. So GRUB helpfully loaded a second bundle alongside the kernel: the initramfs, a tiny, temporary root filesystem that lives entirely in RAM and carries exactly the drivers needed to reach the real hardware. Using that RAM filesystem, the kernel loads its drivers and probes the machine — how many CPU cores, how much memory, which disks and controllers are present — building up a working picture of the hardware. Once it can finally talk to your real storage, it does the pivot: it mounts the real root filesystem, the disk with slash on it that holds your actual system, and leaves the temporary RAM one behind. And now the kernel does the final act of the boot process — the thing everything so far was building toward. It starts one single user-space program, the first process, called init, and hands it the special process ID number one. From this moment the kernel stops being a program that runs start to finish; it settles into the background as the permanent referee underneath everything else. Which raises the real question of this course: what exactly is this kernel that's now running underneath it all? Let's step inside and look.",
          delta: [{ kind: 'solidify', ids: KERNEL_BAND }],
        },
      ],
    },
    {
      // ── §5 what the kernel is (SCENE SWITCH → `kernel-internals`): re-enters fully ghosted, so
      //    solidify the WHOLE scene, then focus the ring 3 / ring 0 split + the syscall door. ──
      id: 'user-vs-kernel',
      heading: 'User space vs. the kernel',
      scene: 'kernel-internals',
      focus: BOUNDARY,
      slide: {
        title: 'User space vs. the kernel',
        body: [
          'The kernel is running underneath everything now — so what *is* it? A program that lives in a **privileged** half of the machine, walled off from yours.',
          '',
          '### Two rings, one door',
          '- **User space (ring 3)** — where *your* programs run (`ls`, a browser, nginx): **unprivileged**, no direct hardware access',
          '- **Kernel space (ring 0)** — where the kernel runs: **full** control of CPU, memory, devices',
          '- The CPU itself enforces the wall — user code literally *can\'t* touch hardware',
          '',
          '### System calls — the only way in',
          '- A program that needs the hardware makes a **system call**: `read`, `write`, `open`, `fork`, `mmap`…',
          '- That **traps** into ring 0: the kernel checks it\'s allowed, does the work, returns',
          '- **`glibc`** wraps these raw calls so C (and everything above) just calls a function',
          '',
          'This wall is why one crashing program can\'t take down the machine — only the kernel touches the metal.',
        ].join('\n'),
      },
      beats: [
        {
          line: "So the kernel is now running underneath everything — let's actually define what it is, because it's the concept the whole rest of Linux hangs on. Here's the key idea: the machine runs in two different modes, and the CPU hardware itself enforces the split. Your programs — the shell, a web browser, nginx, anything you launch — run in what's called user space, sometimes ring three. In user space a program is unprivileged: it cannot touch the hardware directly, it can't read another program's memory, it can't reach out to the disk or the network card on its own. Below that line is kernel space, ring zero, and this is where the kernel runs with complete, unrestricted control over the CPU, the memory, and every device. That wall between the two is not a suggestion enforced by politeness — it's built into the processor, which will physically refuse to let user-space code execute privileged instructions. So now you might ask the obvious question: if my program can't touch the hardware, how does it ever read a file or send a network packet? The answer is the single most important mechanism in the operating system: the system call. When your program needs something only the kernel can do, it makes a system call — read, write, open, fork, mmap, and a few hundred others — and this traps into the kernel: control jumps across the wall into ring zero, the kernel checks that you're actually allowed to do what you asked, carries it out on your behalf, and hands the result back. It is the one and only door from your world into the kernel's. In practice you rarely call these by hand — a library called glibc wraps each raw system call in a normal function, so your C code, and every language built on top of it, just calls open or read like an ordinary function and the plumbing happens underneath. And this single door is exactly why Linux is stable: because only the kernel ever touches the metal, one buggy program crashing can bring itself down without taking the whole machine with it. Now let's open up that kernel and see what's actually behind the door.",
          delta: [{ kind: 'solidify', ids: KI_ALL }],
        },
      ],
    },
    {
      // ── §6 the four subsystems (same `kernel-internals` scene): re-focus the kernel row — the
      //    four managers behind the syscall door. Already solid from §5. ──
      id: 'subsystems',
      heading: 'What the kernel manages',
      scene: 'kernel-internals',
      focus: SUBSYS,
      slide: {
        title: 'What the kernel manages',
        body: [
          'Behind the system-call door, the kernel is really **four managers**, each sharing out one scarce resource among every program at once.',
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
          line: "Behind that system-call door, what is the kernel actually doing? It comes down to four big jobs, four managers, and each one takes a single scarce resource and shares it fairly among every program running on the machine at the same time. The first is the scheduler, and its job is the CPU. You might have hundreds of processes that all want to run, but only a handful of CPU cores to run them on. The scheduler slices time into tiny pieces and rotates through the processes so fast that they all appear to run simultaneously — that illusion of everything happening at once is the scheduler's doing, and it's so central we give it a whole course later on. The second is the memory manager. It hands every process its own private view of memory, called a virtual address space, and quietly maps those virtual addresses onto the real physical RAM behind the scenes, paging data in and out as needed. The payoff is isolation: your program thinks it has the machine's memory to itself and literally cannot see or corrupt another program's memory. The third is the VFS, the virtual filesystem. Your disk might be formatted ext4, a USB stick something else, and some filesystems live purely in RAM — the VFS presents all of them, plus your devices, as one single uniform tree of files and folders. That's the machinery that makes the famous Unix promise, everything is a file, actually true, and it's the subject of Course three. And the fourth is the network stack: the entire implementation of TCP/IP, the protocols of the internet, lives right here inside the kernel, which is why a network connection — a socket — is handled just like a file you read and write, the topic of Course six. So keep this picture: scheduler, memory, filesystems, network. Every single command you will ever type is, underneath, a conversation with these four managers, carried through that one door. But these managers still have to talk to real, physical hardware — and that's the last layer down.",
          delta: [{ kind: 'solidify', ids: SUBSYS }],
        },
      ],
    },
    {
      // ── §7 drivers & the metal (same `kernel-internals` scene): re-focus drivers + hardware — how
      //    the kernel speaks to devices (modules), and the "everything is a file" device view. ──
      id: 'drivers',
      heading: 'Drivers & the hardware',
      scene: 'kernel-internals',
      focus: METAL,
      slide: {
        title: 'Drivers & the hardware',
        body: [
          'The four subsystems decide *what* to do; **device drivers** know *how* to say it to one specific piece of hardware.',
          '',
          '### Drivers translate to the metal',
          '- Every disk model, GPU, and network card speaks its own dialect; a **driver** is the kernel\'s translator for that device',
          '- Most drivers are **loadable kernel modules** (`.ko`) — added and removed on a running kernel (`lsmod`, `modprobe`)',
          '- This is why Linux is called a **monolithic** kernel *with modules*: one big privileged program, extended by parts you load on demand',
          '',
          '### Everything is a file — even devices',
          '- Devices appear under **`/dev`** — `/dev/sda` (a disk), `/dev/null` — so the same `read`/`write` calls work on hardware too',
          '- Under it all: the physical **CPU, RAM, disk, and NIC**',
          '',
          'That completes the picture: your program → the door → the four managers → drivers → the metal.',
        ].join('\n'),
      },
      beats: [
        {
          line: "The four subsystems decide what needs to happen — schedule this process, read that file, send this packet — but they still face a messy reality: every piece of hardware is different. Your particular disk, your specific graphics card, your exact network chip each speak their own private dialect. The thing that bridges that gap is the device driver: a piece of code that knows how to talk to one specific kind of hardware, translating the kernel's generic request — write these bytes — into the precise signals that one device understands. Now here's what makes Linux flexible. Most drivers aren't baked permanently into the kernel; they're loadable kernel modules, files ending in dot-k-o, that can be slotted into a running kernel and pulled back out without a reboot — you can list them with lsmod and load one with modprobe. That's why Linux is described as a monolithic kernel with modules: it's one big privileged program running in ring zero, but you can extend it on the fly with these pluggable parts, so it supports thousands of devices without carrying all of them at once. And there's one more beautiful consequence here that ties back to the VFS. Because everything is a file, the devices themselves show up as files, under a directory called slash dev — your disk is slash dev slash sda, and there's even slash dev slash null, the famous bottomless bucket. That means the very same read and write system calls you'd use on a text file also work to talk to physical hardware. Underneath all of it, at the very bottom, sits the real metal: the CPU that runs the instructions, the RAM that holds the memory, the disk that stores the files, and the network card that moves the packets. And now you can see the whole path in one glance: your program makes a call, it traps through the system-call door, one of the four managers handles it, a driver translates it, and the hardware does the work. That's the kernel, end to end. Let's climb back up out of the kernel and return to boot — because the moment the kernel started that first process, the other half of the system came to life.",
          delta: [{ kind: 'solidify', ids: METAL }],
        },
      ],
    },
    {
      // ── §8 init & systemd (SCENE SWITCH back → `boot-chain`): re-entry re-ghosts, so re-solidify
      //    the WHOLE spine (redraw), then focus init + the userspace it brings up. ──
      id: 'init-systemd',
      heading: 'init: PID 1 & systemd',
      scene: 'boot-chain',
      focus: INIT_BAND,
      slide: {
        title: 'init: PID 1 & systemd',
        body: [
          'Back at boot: the kernel\'s final act was starting **one** program — **`init`** — with **PID 1**. Everything else in user space descends from it.',
          '',
          '### PID 1 is special',
          '- The **first** and **last** process — the kernel starts it; if it ever exits, the system **panics**',
          '- The **ancestor of every process**: each new process is *forked* from an existing one, so the whole tree traces back to PID 1 (Course 4)',
          '',
          '### On modern Linux, init is systemd',
          '- **systemd** brings the system up: it starts services **in parallel**, resolving *what depends on what*',
          '- Manages **services** (units) for the rest of uptime — `systemctl start/stop/status`, boot-time logs via `journalctl` (Course 6)',
          '- Older systems used **SysV init** — sequential shell scripts; systemd replaced it for speed and dependency tracking',
          '',
          'PID 1 is the root of the user-space tree — from here, the machine fills with running programs.',
        ].join('\n'),
      },
      beats: [
        {
          line: "So we're back at the boot chain, at the exact moment the kernel finished its early work. Remember its final act: it started a single user-space program and gave it process ID one. That process, traditionally called init, is special in a way nothing else on the system is. It is the very first process to run in user space, and it must be the last to die — if PID one ever exits, the kernel considers the system unusable and panics, halting the machine. It's also the ancestor of absolutely everything else. In Linux, you don't create a process from nothing; every new process is forked, split off, from an existing one — a detail we'll dig into in the processes course. Which means every program running on the machine, right now, traces its family tree straight back to that one process, PID one, at the root. So what actually is init on a modern Linux system? These days it's almost always a program called systemd. When the kernel starts systemd, systemd takes over the entire job of bringing the machine to life. Rather than starting services one after another in a slow line, it looks at what depends on what — the network should come up before the web server, logging before the things that log — and starts everything it can in parallel, which is a big reason modern Linux boots so fast. And systemd doesn't stop once boot is done; it stays running for the entire uptime of the machine as the manager of all your services, the background daemons like the SSH server and the scheduler. You'll spend real time with it later — systemctl to start, stop, and check services, and journalctl to read their logs. Older systems used a simpler predecessor called SysV init, which ran a sequence of shell scripts one at a time; systemd replaced it precisely because parallel startup and real dependency tracking are so much faster and more reliable. So PID one is the seed. From this one process, the whole user-space system now grows. Let's see what it grows into.",
          delta: [{ kind: 'solidify', ids: BOOT_ALL }],
        },
      ],
    },
    {
      // ── §9 userspace & distros (same `boot-chain` scene): keep the userspace band framed — the
      //    running system: services, login, your shell — and settle kernel-vs-distribution. ──
      id: 'userspace-distros',
      heading: 'Userspace: services, login & the distro',
      scene: 'boot-chain',
      focus: USER_BAND,
      slide: {
        title: 'Userspace: services, login & the distro',
        body: [
          'systemd fills user space with running programs — and hands *you* the way in.',
          '',
          '### The running system',
          '- **System services** — long-running background **daemons**: `sshd`, `cron`, the network manager, log collectors',
          '- **Login** — `getty` on each terminal prompts for a user; on success it launches your **shell**',
          '- **Your shell** — `bash` (or `zsh`): the **prompt** where Course 2 begins',
          '',
          '### Kernel vs. distribution',
          '- The **kernel** is *one* program — the same core Linux everywhere',
          '- A **distribution** (Ubuntu, Debian, Fedora, Arch) = that kernel **+** the GNU userland **+** a **package manager** + defaults',
          '- That\'s why it\'s sometimes **GNU/Linux**: the kernel is Linux; most commands you\'ll run are GNU tools *around* it (Course 6)',
          '',
          'Firmware, GRUB, kernel, init, services, login — and the baton finally reaches **you**, at a prompt.',
        ].join('\n'),
      },
      beats: [
        {
          line: "systemd goes to work, and user space fills up with running programs. There are broadly two kinds. First, the system services — long-running background programs, called daemons, that quietly keep the machine useful: the SSH server that lets you log in remotely, the cron scheduler that runs jobs on a timer, the network manager, the log collectors. These have no screen and no keyboard; they just run and wait to be needed. Second, systemd sets up the way for a human to actually get in. On each terminal it runs a small program, traditionally called getty, that shows the login prompt. You type your username and password, it checks them, and on success it launches a program for you — your shell, usually bash. And that shell, printing its prompt and waiting for your first command, is exactly where the next course picks up. Now that the whole machine is running, let's clear up one thing that confuses almost everyone at the start: the difference between the kernel and a distribution. The kernel — the Linux we just spent this whole course inside — is a single program, and it's essentially the same core everywhere. But nobody ships you just a kernel; a bare kernel can't even print hello. What you actually install is a distribution — Ubuntu, Debian, Fedora, Arch, and dozens more — and a distribution is that same Linux kernel, bundled with the GNU userland, which is all the everyday commands and libraries, plus a package manager to install more software, plus a set of sensible defaults. The kernel is the engine; the distribution is the whole car built around it. This is also why you'll sometimes see it written GNU slash Linux: the kernel is Linux, but a huge share of the commands you'll actually type — we'll meet them across the series — are GNU tools sitting on top. So: firmware, then GRUB, then the kernel, then init and systemd, then the services and the login — and the baton has finally, after this whole relay, reached you, sitting at a prompt. Let's step back and take in the whole journey at once.",
          delta: [{ kind: 'solidify', ids: USER_BAND }],
        },
      ],
    },
    {
      // ── §10 you-are-here (same scene): pull the camera back to the WHOLE chain (`focus: []`) — the
      //    boot path is understood end to end, and the road ahead is lit. Bookend to §1. ──
      id: 'you-are-here',
      heading: 'You are here',
      scene: 'boot-chain',
      focus: [],
      slide: {
        title: 'You are here',
        body: [
          'You\'ve traced the **whole** path — from a cold machine to a live prompt — and met the kernel underneath it all.',
          '',
          '### What you can now picture',
          '- **Firmware → GRUB → kernel → init → userspace** — each stage loading the next',
          '- The **kernel** as a privileged program reached only through **system calls**',
          '- Its four managers — **scheduler, memory, filesystems, network** — and the **drivers** below',
          '- **PID 1 / systemd** as the root of every process; a **distro** = kernel + GNU userland + packages',
          '',
          '### The road ahead',
          '- **Shell → Filesystem → Processes → Text** — driving the machine and moving data',
          '- **Admin → Scripting → Project** — operating it, automating it, and shipping a real tool',
          '',
          'The machine is booted and you know exactly how. Next course: **the shell** — the prompt you were just handed.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Here's the whole journey again, and now every piece should have a place. You press power, and the firmware on the motherboard runs its self-test and finds a boot disk. It hands off to GRUB, the bootloader, which loads the kernel and its initramfs into memory and jumps in. The kernel decompresses itself, uses that temporary RAM filesystem to load drivers and reach the real disk, mounts the true root filesystem, and starts its very first process. And underneath all of it, from that point on, the kernel sits as the privileged referee you can only reach through the one door of system calls — running its four managers for the CPU, memory, filesystems, and network, talking to the hardware through loadable drivers. That first process, PID one, is systemd, and it brings the rest of user space to life: the background services, and the login that finally handed you a shell prompt. And the whole thing you installed — kernel plus the GNU tools plus a package manager — is what we call a distribution. That's Course one: how a Linux machine goes from cold silicon to a running system, and what that system actually is underneath. From here, the series is about using it. Next we sit down at that prompt and learn the shell — how to actually drive the machine by typing to it. After that, the filesystem you'll navigate, the processes you'll run, and the text tools that make Linux so powerful for working with data. Then administering a real system, automating it with scripts, and finally building and shipping a genuine tool of your own. The machine is booted, and you know exactly how it got there. In the next course, we start giving it commands.",
          delta: [{ kind: 'solidify', ids: BOOT_ALL }],
        },
      ],
    },
  ],
}
