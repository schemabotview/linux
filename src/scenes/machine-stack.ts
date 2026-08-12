import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, GRAY, RED, YELLOW } from 'reveal-engine'

// The `machine-stack` scene — the COMBINED view (Option B): it fuses the boot timeline and the
// layer cake into one diagram, on the insight that they are the SAME structure seen two ways:
//
//   • BOOT builds the stack BOTTOM-UP  — the left ribbon (1 firmware … 6 shell) ascends: the metal
//     comes alive first, then the kernel, then userspace populates. (Was `boot-chain`.)
//   • RUNTIME uses the stack TOP-DOWN  — a program in ring 3 calls DOWN through the syscall door,
//     into the kernel, to a driver, to the hardware. (Was `kernel-internals`.)
//
// So the vertical axis finally agrees with itself: userspace is at the TOP both as the LAST thing
// boot builds and as the LEAST-privileged ring. One picture answers "how does it start up?" AND
// "how is it structured?" — the two questions the old pair split apart.
//
//   [boot ▲]        User space · ring 3   (your program · shell · glibc)
//    6 shell  ─────▶ ─── system calls · the only door ───
//    5 init          Kernel · ring 0   (scheduler · memory · VFS · network)   ◀── request ▼
//    4 mount /       device drivers
//    3 kernel        Hardware   (CPU · RAM · Disk · NIC)
//    2 GRUB   ─┐
//    1 firmware ┴──▶ (metal first)
export const machineStack: SceneSpec = {
  id: 'machine-stack',
  title: 'The machine: built bottom-up, used top-down',
  canvas: { width: 1060, height: 780 },
  // col 0 = the boot ribbon — widened enough to hold the kernel/userspace sub-steps HORIZONTALLY
  // (3 chips across); cols 1–4 = the layer cake. Rows mirror `kernel-internals`.
  grid: { cols: [2.4, 1, 1, 1, 1], rows: [1, 0.5, 1, 0.5, 1], gap: 0.2, padding: 0.4 },
  labelCap: 15,
  nodes: [
    // ── the boot ribbon: the same six stages as boot-chain, but ASCENDING (metal at the bottom,
    //    shell at the top) so each stage sits beside the layer it brings alive. Read bottom→top = 1→6.
    {
      id: 'bs-boot', label: 'Boot · builds bottom-up', kind: 'container', color: GRAY, icon: 'workflow', cell: [0, 0, 1, 5],
      // the two rungs with real sub-structure — userspace (index 0) and kernel (index 3) — lay their
      // sub-steps out HORIZONTALLY, so they need only a little extra height for the title row.
      layout: { cols: [1], rows: [1.5, 1, 1, 1.5, 1, 1], gap: 0.22, padding: 0.1 },
      children: [
        // rung 6 — what init brings up: background services, the login, and finally your shell
        {
          id: 'bs-b6', label: '6 · userspace', kind: 'container', color: ORANGE, icon: 'users', cell: [0, 0],
          layout: { cols: [1, 1, 1], rows: [1], gap: 0.22, padding: 0.34 },
          children: [
            { id: 'bs-b6a', label: 'services', sub: 'sshd…', kind: 'symbol', color: BLUE, icon: 'server', cell: [0, 0] },
            { id: 'bs-b6b', label: 'login', sub: 'getty', kind: 'symbol', color: PURPLE, icon: 'key', cell: [1, 0] },
            { id: 'bs-b6c', label: 'shell', sub: 'bash', kind: 'symbol', color: ORANGE, icon: 'terminal', cell: [2, 0] },
          ],
        },
        { id: 'bs-b5', label: '5 · init', sub: 'PID 1', kind: 'symbol', color: GREEN, icon: 'workflow', cell: [0, 1] },
        { id: 'bs-b4', label: '4 · mount /', sub: 'real disk', kind: 'symbol', color: TEAL, icon: 'disk', cell: [0, 2] },
        // rung 3 — the kernel's early boot, its sub-steps restored (matches §4's narrated sequence)
        {
          id: 'bs-b3', label: '3 · kernel', kind: 'container', color: PURPLE, icon: 'engine', cell: [0, 3],
          layout: { cols: [1, 1, 1], rows: [1], gap: 0.22, padding: 0.34 },
          children: [
            { id: 'bs-b3a', label: 'decompress', sub: 'vmlinuz', kind: 'symbol', color: BLUE, icon: 'box', cell: [0, 0] },
            { id: 'bs-b3b', label: 'initramfs', sub: 'in RAM', kind: 'symbol', color: ORANGE, icon: 'disk', cell: [1, 0] },
            { id: 'bs-b3c', label: 'drivers', sub: 'detect HW', kind: 'symbol', color: GREEN, icon: 'plug', cell: [2, 0] },
          ],
        },
        { id: 'bs-b2', label: '2 · GRUB', sub: 'load the kernel', kind: 'symbol', color: TEAL, icon: 'layers', cell: [0, 4] },
        { id: 'bs-b1', label: '1 · firmware', sub: 'POST', kind: 'symbol', color: BLUE, icon: 'engine', cell: [0, 5] },
      ],
    },

    // ── the layer cake (structure), userspace on top → hardware at the bottom ──
    {
      id: 'bs-user', label: 'User space · ring 3', kind: 'container', color: GRAY, icon: 'users', cell: [1, 0, 4, 1],
      layout: { cols: [1, 1, 1], rows: 1, gap: 0.3, padding: 0.2 },
      children: [
        { id: 'bs-app', label: 'your program', sub: 'ls, python, nginx…', kind: 'symbol', color: BLUE, icon: 'app', cell: [0, 0] },
        { id: 'bs-shell', label: 'shell', sub: 'bash', kind: 'symbol', color: ORANGE, icon: 'terminal', cell: [1, 0] },
        { id: 'bs-libc', label: 'glibc', sub: 'wraps the raw calls', kind: 'symbol', color: TEAL, icon: 'layers', cell: [2, 0] },
      ],
    },
    { id: 'bs-syscall', label: 'System calls · the only door in', sub: 'read, write, open, fork, mmap…', kind: 'symbol', color: RED, icon: 'shield', cell: [1, 1, 4, 1] },
    {
      id: 'bs-kernel', label: 'Kernel · ring 0', kind: 'container', color: PURPLE, icon: 'engine', cell: [1, 2, 4, 1],
      layout: { cols: [1, 1, 1, 1], rows: 1, gap: 0.3, padding: 0.2 },
      children: [
        { id: 'bs-sched', label: 'Scheduler', sub: 'shares the CPU', kind: 'symbol', color: GREEN, icon: 'workflow', cell: [0, 0] },
        { id: 'bs-mem', label: 'Memory', sub: 'virtual memory', kind: 'symbol', color: BLUE, icon: 'memory', cell: [1, 0] },
        { id: 'bs-vfs', label: 'VFS', sub: 'files & filesystems', kind: 'symbol', color: TEAL, icon: 'file', cell: [2, 0] },
        { id: 'bs-net', label: 'Network stack', sub: 'TCP/IP, sockets', kind: 'symbol', color: ORANGE, icon: 'stream', cell: [3, 0] },
      ],
    },
    { id: 'bs-drivers', label: 'Device drivers · kernel modules', sub: 'loadable: .ko', kind: 'symbol', color: YELLOW, icon: 'plug', cell: [1, 3, 4, 1] },
    {
      id: 'bs-hw', label: 'Hardware', kind: 'container', color: GRAY, icon: 'server', cell: [1, 4, 4, 1],
      layout: { cols: [1, 1, 1, 1], rows: 1, gap: 0.3, padding: 0.5 },
      children: [
        { id: 'bs-cpu', label: 'CPU', kind: 'symbol', color: GREEN, icon: 'engine', cell: [0, 0] },
        { id: 'bs-ram', label: 'RAM', kind: 'symbol', color: BLUE, icon: 'memory', cell: [1, 0] },
        { id: 'bs-disk', label: 'Disk', kind: 'symbol', color: TEAL, icon: 'disk', cell: [2, 0] },
        { id: 'bs-nic', label: 'NIC', kind: 'symbol', color: ORANGE, icon: 'stream', cell: [3, 0] },
      ],
    },
  ],
  edges: [
    // RUNTIME — the request path DOWN through the stack (animated: the live flow)
    { from: 'bs-app', to: 'bs-libc' },
    { from: 'bs-shell', to: 'bs-libc' },
    { from: 'bs-libc', to: 'bs-syscall' },
    { from: 'bs-syscall', to: 'bs-kernel' },
    { from: 'bs-kernel', to: 'bs-drivers' },
    { from: 'bs-drivers', to: 'bs-hw' },
    // BOOT — three anchor links, ribbon → the layer each stage brings alive (structural, not a flow)
    { from: 'bs-b1', to: 'bs-hw', animated: false },
    { from: 'bs-b3', to: 'bs-kernel', animated: false },
    { from: 'bs-b6', to: 'bs-user', animated: false },
  ],
}
