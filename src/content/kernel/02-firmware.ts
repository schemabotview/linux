import type { Section } from '../types'

export const firmware: Section = {
  id: 'firmware',
  title: 'Firmware: the first code that runs',
  scene: 'firmware-handoff',
  focus: 'ms-b1',
  slide: `## Firmware: the first code that runs

Boot begins at the **bottom of the ladder**, on the bare metal. Pressing power runs a tiny program baked into a chip on the motherboard: the **firmware**.

### UEFI (and the old BIOS)
- **POST** — *power-on self-test*: check the CPU, RAM, and devices are alive
- **Find a boot disk** — walk a configured order of drives looking for something bootable
- **UEFI** is the modern firmware (a small boot partition, the **ESP**); **BIOS** was the older style (a 512-byte **MBR** boot sector)

### Its one real job
- Locate a **bootloader** and hand control to it — then get out of the way
- Firmware knows *nothing* about Linux; it just loads the next stage **up**

The firmware is a relay runner: it starts the race and hands off **up the ladder** to GRUB.`,
  narration:
    'So you press the power button — what runs first? We start at the very bottom of the ladder, down on the bare metal, because at that instant the CPU can\'t even read your hard drive. It has no idea what a disk is, or a filesystem, or Linux. So it does the only thing it can: it runs a tiny program that\'s permanently baked into a chip on the motherboard, called the firmware. On modern machines this firmware is called UEFI; on older ones it was the BIOS, and you\'ll still hear both names. The firmware does two things. First, the POST — the power-on self-test — a quick check that the essential hardware is actually there and working: the processor responds, the memory is present, the basic devices are alive. That\'s the beep or the logo you sometimes see. Second, it goes looking for something to boot. It walks a configured list of drives — this disk, then that one, then a USB stick — searching each for a special bootable piece. On UEFI that\'s a small dedicated boot partition called the EFI System Partition; on the old BIOS it was a single 512-byte chunk at the very start of the disk called the master boot record. And that is genuinely all the firmware does for us. It doesn\'t know anything about Linux — it can\'t load a whole operating system. Its entire job is to find a small program called a bootloader and hand control over to it, then step aside. It\'s the first runner in a relay: it starts the race and passes the baton up to the next rung of the ladder. Let\'s follow the baton up — to GRUB.',
}
