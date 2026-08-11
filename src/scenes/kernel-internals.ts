import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, GRAY, RED, YELLOW } from 'reveal-engine'

// The `kernel-internals` scene — Course 1's DETOUR (like python's `pvm-internals`): what "the
// kernel" actually is, drawn as the layer cake it really is. User programs sit on top and can only
// reach the hardware through ONE door — the system-call interface; below that door the kernel's
// four subsystems share out the machine; device drivers translate to the metal.
//
//   User space (ring 3):   your program · shell · glibc      ← unprivileged
//   ─────────────────────  system calls  ──────────────────  ← the only door (trap into ring 0)
//   Kernel (ring 0):       scheduler · memory · VFS · net     ← privileged
//   Device drivers:        kernel modules
//   Hardware:              CPU · RAM · Disk · NIC
//
// Solid-tour reveal: §4 (a scene switch from `boot-chain`) solidifies the WHOLE scene; §5–§7 ride
// it and just move focus (the syscall door → the four subsystems → the hardware boundary).
export const kernelInternals: SceneSpec = {
  id: 'kernel-internals',
  title: 'What the kernel actually is',
  canvas: { width: 1040, height: 860 },
  grid: { cols: [1, 1, 1, 1], rows: [1.0, 0.5, 1.0, 0.5, 1.0], gap: 0.32, padding: 0.42 },
  nodes: [
    // ── user space: unprivileged programs, above the line ──
    {
      id: 'ki-user', label: 'User space · ring 3', kind: 'container', color: GRAY, icon: 'users', cell: [0, 0, 4, 1],
      layout: { cols: [1, 1, 1], rows: 1, gap: 0.3, padding: 0.5 },
      children: [
        { id: 'ki-app', label: 'your program', sub: 'ls, python, nginx…', kind: 'symbol', color: BLUE, icon: 'app', cell: [0, 0] },
        { id: 'ki-shell', label: 'shell', sub: 'bash', kind: 'symbol', color: ORANGE, icon: 'terminal', cell: [1, 0] },
        { id: 'ki-libc', label: 'glibc', sub: 'wraps the raw calls', kind: 'symbol', color: TEAL, icon: 'layers', cell: [2, 0] },
      ],
    },

    // ── the boundary: the only way from ring 3 into the kernel ──
    { id: 'ki-syscall', label: 'System calls · the only door in', sub: 'read, write, open, fork, mmap…', kind: 'symbol', color: RED, icon: 'shield', cell: [0, 1, 4, 1] },

    // ── the kernel proper: four subsystems that share out the machine ──
    {
      id: 'ki-kernel', label: 'Kernel · ring 0', kind: 'container', color: PURPLE, icon: 'engine', cell: [0, 2, 4, 1],
      layout: { cols: [1, 1, 1, 1], rows: 1, gap: 0.3, padding: 0.5 },
      children: [
        { id: 'ki-sched', label: 'Scheduler', sub: 'shares the CPU', kind: 'symbol', color: GREEN, icon: 'workflow', cell: [0, 0] },
        { id: 'ki-mem', label: 'Memory', sub: 'virtual memory, paging', kind: 'symbol', color: BLUE, icon: 'memory', cell: [1, 0] },
        { id: 'ki-vfs', label: 'VFS', sub: 'files & filesystems', kind: 'symbol', color: TEAL, icon: 'file', cell: [2, 0] },
        { id: 'ki-net', label: 'Network stack', sub: 'TCP/IP, sockets', kind: 'symbol', color: ORANGE, icon: 'stream', cell: [3, 0] },
      ],
    },

    // ── drivers: kernel modules that speak each device's language ──
    { id: 'ki-drivers', label: 'Device drivers · kernel modules', sub: 'loadable: .ko', kind: 'symbol', color: YELLOW, icon: 'plug', cell: [0, 3, 4, 1] },

    // ── the metal ──
    {
      id: 'ki-hw', label: 'Hardware', kind: 'container', color: GRAY, icon: 'server', cell: [0, 4, 4, 1],
      layout: { cols: [1, 1, 1, 1], rows: 1, gap: 0.3, padding: 0.5 },
      children: [
        { id: 'ki-cpu', label: 'CPU', kind: 'symbol', color: GREEN, icon: 'engine', cell: [0, 0] },
        { id: 'ki-ram', label: 'RAM', kind: 'symbol', color: BLUE, icon: 'memory', cell: [1, 0] },
        { id: 'ki-disk', label: 'Disk', kind: 'symbol', color: TEAL, icon: 'disk', cell: [2, 0] },
        { id: 'ki-nic', label: 'NIC', kind: 'symbol', color: ORANGE, icon: 'stream', cell: [3, 0] },
      ],
    },
  ],
  edges: [
    // a program can only reach the kernel by trapping through the syscall door
    { from: 'ki-app', to: 'ki-libc' },
    { from: 'ki-shell', to: 'ki-libc' },
    { from: 'ki-libc', to: 'ki-syscall' },
    { from: 'ki-syscall', to: 'ki-kernel' },
    // each subsystem drives the metal through a driver
    { from: 'ki-kernel', to: 'ki-drivers' },
    { from: 'ki-drivers', to: 'ki-hw' },
  ],
}
