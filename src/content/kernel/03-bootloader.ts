import type { Section } from '../types'

export const bootloader: Section = {
  id: 'bootloader',
  title: 'The bootloader: GRUB',
  scene: 'grub-loads',
  focus: 'ms-b2',
  slide: `## The bootloader: GRUB

The firmware found a small program and jumped to it — one rung up. That program is the **bootloader**, on most Linux systems **GRUB**.

### What GRUB is for
- The firmware can't load an OS; GRUB can — it understands filesystems enough to **find and load the kernel**
- Shows the **boot menu** — pick a kernel version, an older one, or another OS (dual-boot)
- Loads two things into memory: the **kernel** (\`vmlinuz\`) and a small **initramfs** (next)

### Then it hands off, up
- GRUB **jumps into the kernel** and is done — it never runs again this boot
- It can pass **kernel parameters** (e.g. \`quiet\`, or which partition is root)

Firmware → bootloader → **kernel**: each rung exists only to load the bigger one **above** it.`,
  narration:
    'The firmware found a small bootable program and jumped straight up into it, and that program is the bootloader. On the great majority of Linux systems it\'s called GRUB. Why do we even need a separate rung here? Because of that limitation we just saw — the firmware is too simple to load a whole operating system; it can barely read a disk. GRUB is the bridge. It\'s sophisticated enough to understand filesystems well enough to go find the actual kernel file sitting on your disk — usually a file named vmlinuz — and load it into memory. If you\'ve ever rebooted and seen a menu offering a few kernel versions, or a choice between Linux and Windows, that menu is GRUB; it lets you pick which kernel to boot, fall back to an older one if a new one is broken, or choose another operating system entirely. When you make a choice — or after a couple of seconds, the default — GRUB loads two things into memory: the kernel itself, and a second, small bundle called the initramfs, which we\'ll unpack in a moment. It can also pass along parameters to the kernel, little instructions like run quietly, or here\'s which disk partition holds the real system. And then GRUB does the same thing the firmware did to it: it jumps up into the kernel and hands over completely. GRUB will not run again for the rest of this boot. Notice the pattern climbing the ladder — firmware loads the bootloader, the bootloader loads the kernel — each rung is just barely capable enough to load the bigger, smarter thing on the rung above it. Now the baton is in the hands of the star of the show. Let\'s watch the kernel wake up.',
}
