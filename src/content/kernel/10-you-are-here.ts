import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here',
  scene: 'kernel-recap',
  slide: `## You are here

One stack, two directions — you've traced both: **built bottom-up** at boot, **used top-down** at runtime.

### The boot climb (▲)
- **Firmware → GRUB → kernel → init → shell** — the machine assembles itself from the bare metal up

### The runtime descent (▼)
- **Your program → the syscall door → the kernel's four managers → drivers → the metal**
- The **kernel** is a privileged program reached only through **system calls**; **PID 1 / systemd** roots every process; a **distro** = kernel + GNU userland + packages

### The road ahead
- **Shell → Filesystem → Processes → Text** — driving the machine and moving data
- **Admin → Scripting → Project** — operating it, automating it, and shipping a real tool

The machine is booted and you know it **both ways**. Next course: **the shell** — the prompt at the top.`,
  narration:
    'Here\'s the whole machine, and now you can read it both ways. Read it as the boot climb, up the left, and every piece has a place: you press power, and the firmware on the motherboard runs its self-test and finds a boot disk; it hands up to GRUB, the bootloader, which loads the kernel and its initramfs into memory and jumps in; the kernel decompresses itself, uses that temporary RAM filesystem to load drivers and reach the real disk, mounts the true root filesystem, and starts its very first process, PID one, systemd, which brings the rest of user space to life — the background services, and the login that finally handed you a shell prompt at the very top. The machine assembled itself from cold silicon, one rung at a time, bottom to top. Now read it the other way, as the runtime descent: you\'re up in user space, unprivileged; when your program needs the machine it makes a system call, trapping down through the one door into the kernel; there, four managers share out the machine — the scheduler for the CPU, the memory manager for RAM, the VFS for files, the network stack for sockets — and they reach the physical hardware at the bottom through loadable drivers. Built bottom-up, used top-down — the same stack, two directions, and the little puzzle of why userspace felt like it belonged at the bottom and the top at once now has a clean answer: it\'s the last thing boot builds and the least-privileged place a program runs. That\'s Course one: how a Linux machine goes from cold silicon to a running system, and what that system actually is underneath. And the whole thing you installed — kernel plus the GNU tools plus a package manager — is what we call a distribution. From here, the series is about using it. Next we sit down at that prompt and learn the shell — how to actually drive the machine by typing to it. After that, the filesystem you\'ll navigate, the processes you\'ll run, and the text tools that make Linux so powerful for working with data. Then administering a real system, automating it with scripts, and finally building and shipping a genuine tool of your own. The machine is booted, and now you know it both ways. In the next course, we start giving it commands.',
}
