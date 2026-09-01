import type { Course } from '../types'
import { whyLinux } from './01-why-linux'
import { firmware } from './02-firmware'
import { bootloader } from './03-bootloader'
import { kernelBoot } from './04-kernel-boot'
import { initSystemd } from './05-init-systemd'
import { userspaceDistros } from './06-userspace-distros'
import { userVsKernel } from './07-user-vs-kernel'
import { subsystems } from './08-subsystems'
import { drivers } from './09-drivers'
import { youAreHere } from './10-you-are-here'

// kernel — the machine model everything else stands on. Ten sections, ONE stack read twice:
// §1 introduces the board, §2–§6 climb the boot ladder (firmware → GRUB → kernel → PID 1 → userspace
// and the distro), then §7–§9 turn around and descend the same stack at runtime (the syscall door →
// the four managers → drivers → the metal), and §10 reads the whole thing both ways again.
// Every section rides the shared `machine-stack` board and lights its own rung or layer via `focus` —
// the narration names that board directly, so it is a requirement rather than a design choice.
// Course COMPLETE — 10 sections, 10 scenes, 10 wavs (17.1 min).
export const kernel: Course = {
  id: 'kernel',
  title: 'Boot & the kernel',
  sections: [
    whyLinux,
    firmware,
    bootloader,
    kernelBoot,
    initSystemd,
    userspaceDistros,
    userVsKernel,
    subsystems,
    drivers,
    youAreHere,
  ],
}
