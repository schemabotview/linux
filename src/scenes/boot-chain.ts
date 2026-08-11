import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, GRAY } from 'reveal-engine'

// The `boot-chain` scene — Course 1's SPINE: a top-to-bottom CONTROL-FLOW diagram of what happens
// between pressing the power button and getting a shell prompt (wired nodes + edges, not a
// taxonomy grid). The handoff chain runs straight down the middle; each stage loads and jumps to
// the next.
//
//        Firmware · UEFI/BIOS   (POST → pick a boot disk)
//               │
//        Bootloader · GRUB      (load the kernel + initramfs)
//               │
//        ┌──────────────────────────────────────────────┐
//        │ Linux kernel:  decompress ▸ initramfs ▸       │
//        │                drivers ▸ mount real root /    │
//        └──────────────────────────────────────────────┘
//               │
//        init · PID 1 (systemd) (the first user process)
//               │
//        ┌──────────────────────────────────────────────┐
//        │ Userspace:  system services · login · shell   │
//        └──────────────────────────────────────────────┘
//
// Solid-tour reveal: the whole chain solidifies on entry; the per-section camera zooms one band at
// a time (§1–§3, §8–§10). §4–§7 detour into `kernel-internals`. Canvas kept near the pane aspect so
// the whole-scene bookends (§1/§10) aren't height-limited and labels don't read tiny.
export const bootChain: SceneSpec = {
  id: 'boot-chain',
  title: 'From power button to prompt',
  canvas: { width: 820, height: 880 },
  // Rows 0,1,3 are short SYMBOL bars that hug their icon+label; rows 2,4 are CONTAINERS that keep
  // height for their child grids.
  grid: { cols: [1, 1, 1], rows: [0.7, 0.7, 1.3, 0.62, 1.12], gap: 0.34, padding: 0.44 },
  nodes: [
    // ── firmware: the chip on the motherboard runs first ──
    { id: 'bc-firmware', label: 'Firmware · UEFI/BIOS', sub: 'POST → find a boot disk', kind: 'symbol', color: BLUE, icon: 'engine', cell: [1, 0] },

    // ── bootloader: firmware hands off to GRUB, which knows how to load an OS ──
    { id: 'bc-boot', label: 'Bootloader · GRUB', sub: 'load kernel + initramfs', kind: 'symbol', color: TEAL, icon: 'layers', cell: [1, 1] },

    // ── the kernel's own early boot: from a compressed blob to a mounted root filesystem ──
    {
      id: 'bc-kernel', label: 'Linux kernel', kind: 'container', color: PURPLE, icon: 'engine', cell: [0, 2, 3, 1],
      layout: { cols: [1, 1, 1, 1], rows: 1, gap: 0.3, padding: 0.5 },
      children: [
        { id: 'bc-decompress', label: 'Decompress', sub: 'unpack vmlinuz', kind: 'symbol', color: BLUE, icon: 'box', cell: [0, 0] },
        { id: 'bc-initramfs', label: 'initramfs', sub: 'tiny root in RAM', kind: 'symbol', color: ORANGE, icon: 'disk', cell: [1, 0] },
        { id: 'bc-drivers', label: 'Load drivers', sub: 'detect hardware', kind: 'symbol', color: GREEN, icon: 'plug', cell: [2, 0] },
        { id: 'bc-mountroot', label: 'Mount root /', sub: 'the real disk', kind: 'symbol', color: TEAL, icon: 'disk', cell: [3, 0] },
      ],
    },

    // ── init: the kernel starts exactly one user process, and it never dies ──
    { id: 'bc-init', label: 'init · PID 1 (systemd)', sub: 'the first user process', kind: 'symbol', color: GREEN, icon: 'workflow', cell: [1, 3] },

    // ── userspace: what init brings up — the running system you log into ──
    {
      id: 'bc-user', label: 'Userspace', kind: 'container', color: GRAY, icon: 'users', cell: [0, 4, 3, 1],
      layout: { cols: [1, 1, 1], rows: 1, gap: 0.3, padding: 0.5 },
      children: [
        { id: 'bc-services', label: 'System services', sub: 'daemons (sshd, cron…)', kind: 'symbol', color: BLUE, icon: 'server', cell: [0, 0] },
        { id: 'bc-login', label: 'Login', sub: 'getty → authenticate', kind: 'symbol', color: PURPLE, icon: 'key', cell: [1, 0] },
        { id: 'bc-shell', label: 'Your shell', sub: 'the prompt, at last', kind: 'symbol', color: ORANGE, icon: 'terminal', cell: [2, 0] },
      ],
    },
  ],
  edges: [
    // the handoff chain: each stage loads the next and jumps to it
    { from: 'bc-firmware', to: 'bc-boot' },
    { from: 'bc-boot', to: 'bc-kernel' },
    { from: 'bc-decompress', to: 'bc-initramfs' },
    { from: 'bc-initramfs', to: 'bc-drivers' },
    { from: 'bc-drivers', to: 'bc-mountroot' },
    { from: 'bc-kernel', to: 'bc-init' },
    { from: 'bc-init', to: 'bc-user' },
    // inside userspace: services come up, then login hands you a shell
    { from: 'bc-services', to: 'bc-login' },
    { from: 'bc-login', to: 'bc-shell' },
  ],
}
