import type { Section } from '../types'

export const subsystems: Section = {
  id: 'subsystems',
  title: 'What the kernel manages',
  scene: 'four-managers',
  focus: 'ms-kernel',
  slide: `## What the kernel manages

Through the door, into ring 0. The kernel is really **four managers**, each sharing out one scarce resource among every program at once.

### The four subsystems
- **Scheduler** — shares the **CPU**: hundreds of processes, a few cores; it slices time so all appear to run *at once* (the topic of Course 4)
- **Memory manager** — gives each process its own **virtual** address space, paged to and from **RAM**; nobody sees anyone else's memory
- **VFS** (virtual filesystem) — one uniform tree over *many* filesystems (ext4, xfs, tmpfs) and devices — the root of *everything is a file* (Course 3)
- **Network stack** — the whole **TCP/IP** implementation lives here; a socket is just another file (Course 6)

Every command you'll ever run is really a conversation with these four — through the one door.`,
  narration:
    'We\'ve dropped through the system-call door into ring zero — so what is the kernel actually doing down here? It comes down to four big jobs, four managers, and each one takes a single scarce resource and shares it fairly among every program running on the machine at the same time. The first is the scheduler, and its job is the CPU. You might have hundreds of processes that all want to run, but only a handful of CPU cores to run them on. The scheduler slices time into tiny pieces and rotates through the processes so fast that they all appear to run simultaneously — that illusion of everything happening at once is the scheduler\'s doing, and it\'s so central we give it a whole course later on. The second is the memory manager. It hands every process its own private view of memory, called a virtual address space, and quietly maps those virtual addresses onto the real physical RAM behind the scenes, paging data in and out as needed. The payoff is isolation: your program thinks it has the machine\'s memory to itself and literally cannot see or corrupt another program\'s memory. The third is the VFS, the virtual filesystem. Your disk might be formatted ext4, a USB stick something else, and some filesystems live purely in RAM — the VFS presents all of them, plus your devices, as one single uniform tree of files and folders. That\'s the machinery that makes the famous Unix promise, everything is a file, actually true, and it\'s the subject of Course three. And the fourth is the network stack: the entire implementation of TCP/IP, the protocols of the internet, lives right here inside the kernel, which is why a network connection — a socket — is handled just like a file you read and write, the topic of Course six. So keep this picture: scheduler, memory, filesystems, network. Every single command you will ever type is, underneath, a conversation with these four managers, carried through that one door. But these managers still have to talk to real, physical hardware — so let\'s descend the last layer down.',
}
