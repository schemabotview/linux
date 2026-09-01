import type { Section } from '../types'

export const drivers: Section = {
  id: 'drivers',
  title: 'Drivers & the hardware',
  scene: 'drivers-to-metal',
  focus: 'ms-drivers',
  slide: `## Drivers & the hardware

The bottom of the descent. The four subsystems decide *what* to do; **device drivers** know *how* to say it to one specific piece of hardware.

### Drivers translate to the metal
- Every disk model, GPU, and network card speaks its own dialect; a **driver** is the kernel's translator for that device
- Most drivers are **loadable kernel modules** (\`.ko\`) — added and removed on a running kernel (\`lsmod\`, \`modprobe\`)
- This is why Linux is called a **monolithic** kernel *with modules*: one big privileged program, extended by parts you load on demand

### Everything is a file — even devices
- Devices appear under **\`/dev\`** — \`/dev/sda\` (a disk), \`/dev/null\` — so the same \`read\`/\`write\` calls work on hardware too
- At the very bottom: the physical **CPU, RAM, disk, and NIC**

The full descent: your program → the door → the four managers → drivers → **the metal**.`,
  narration:
    'The four subsystems decide what needs to happen — schedule this process, read that file, send this packet — but they still face a messy reality: every piece of hardware is different. Your particular disk, your specific graphics card, your exact network chip each speak their own private dialect. The thing that bridges that gap, on the next layer down, is the device driver: a piece of code that knows how to talk to one specific kind of hardware, translating the kernel\'s generic request — write these bytes — into the precise signals that one device understands. Now here\'s what makes Linux flexible. Most drivers aren\'t baked permanently into the kernel; they\'re loadable kernel modules, files ending in dot-k-o, that can be slotted into a running kernel and pulled back out without a reboot — you can list them with lsmod and load one with modprobe. That\'s why Linux is described as a monolithic kernel with modules: it\'s one big privileged program running in ring zero, but you can extend it on the fly with these pluggable parts, so it supports thousands of devices without carrying all of them at once. And there\'s one more beautiful consequence that ties back to the VFS. Because everything is a file, the devices themselves show up as files, under a directory called slash dev — your disk is slash dev slash sda, and there\'s even slash dev slash null, the famous bottomless bucket. That means the very same read and write system calls you\'d use on a text file also work to talk to physical hardware. And at the very bottom of the stack, at the base of the descent, sits the real metal: the CPU that runs the instructions, the RAM that holds the memory, the disk that stores the files, and the network card that moves the packets. And now you can see the whole descent in one glance: your program at the top makes a call, it traps down through the system-call door, one of the four managers handles it, a driver translates it, and the hardware at the bottom does the work. That\'s how a running machine is used, top to bottom. Let\'s pull all the way back and take in both directions at once.',
}
