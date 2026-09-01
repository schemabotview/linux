import type { Section } from '../types'

export const kernelBoot: Section = {
  id: 'kernel-boot',
  title: 'The kernel wakes up',
  scene: 'kernel-wakes',
  focus: 'ms-b3',
  slide: `## The kernel wakes up

GRUB jumped into the kernel — rungs 3 and 4. As it boots, the whole **kernel layer** (ring 0) switches on beneath your future programs.

### The early-boot sequence
- **Decompress** — the kernel ships compressed (\`vmlinuz\`); it unpacks itself in memory
- **initramfs** — GRUB also loaded a *tiny temporary root filesystem in RAM*, carrying the **drivers** needed to reach the real disk
- **Load drivers & detect hardware** — probe CPUs, memory, disks, controllers
- **Mount the real root \`/\`** — pivot from the RAM filesystem onto your actual disk

### The kernel layer comes alive
- Its four managers — **scheduler, memory, VFS, network** — and the **drivers** below now exist (we tour them top-down in Pass 2)
- Its last boot act: start **exactly one** user-space program — **\`init\`**, **PID 1** (rung 5)

A chicken-and-egg fix: you need a driver to read the disk that holds the driver — so \`initramfs\` carries it in **RAM** first.`,
  narration:
    'GRUB jumps up into the kernel, and now the real operating system is running for the first time — and as it boots, watch the whole kernel layer in the middle of the stack switch on. But the kernel wakes up with a very specific mission: it needs to get just enough hardware working to reach your actual disk and launch the very first program. Watch the sequence. First it decompresses itself — the kernel ships as a compressed file, that vmlinuz, to save space, so the first thing it does is unpack itself in memory. Then comes a clever trick that solves a genuine chicken-and-egg problem. To read your real hard drive, the kernel needs the right driver for your particular disk controller — but that driver is a file that lives on the very disk it can\'t read yet. So GRUB helpfully loaded a second bundle alongside the kernel: the initramfs, a tiny, temporary root filesystem that lives entirely in RAM and carries exactly the drivers needed to reach the real hardware. Using that RAM filesystem, the kernel loads its drivers and probes the machine — how many CPU cores, how much memory, which disks and controllers are present — building up a working picture of the hardware. Once it can finally talk to your real storage, it does the pivot: it mounts the real root filesystem, the disk with slash on it that holds your actual system, and leaves the temporary RAM one behind. And in doing all this, the kernel layer we see here comes fully alive — its four managers for the CPU, memory, filesystems, and network, and the drivers beneath them, are all now running; we\'ll come back down and meet them one by one in the second half of this course. For now, the kernel does the final act of the boot process — the thing everything so far was climbing toward. It starts one single user-space program, the first process, called init, and hands it the special process ID number one. From this moment the kernel stops being a program that runs start to finish; it settles into the background as the permanent referee underneath everything else. Let\'s follow that first process up the last rungs of the ladder.',
}
