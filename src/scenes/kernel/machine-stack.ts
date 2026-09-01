import type { SceneNode } from '../../render-engine'

// The `machine-stack` board, shared by every scene in the kernel course.
//
// THIS IS NOT A STYLE CHOICE — the generated narration describes this exact picture and cannot be
// changed. §1 says "read the numbered ladder up the left side, one to six" and "read the stacked
// layers in the middle, from the top down"; §6 says "the kernel — the layer in the middle of this
// stack"; §7 calls the syscall row "the red bar in the middle of the stack"; §10 says "read it as the
// boot climb, up the left". A course whose narration points at a ladder must have a ladder.
//
// The insight the board fuses (inherited from the studio design): boot and runtime are the SAME
// structure seen twice. Boot BUILDS it bottom-up, so the left ribbon ascends (flow 'BT', 1 firmware →
// 6 userspace). Runtime USES it top-down, so the right cake descends (flow 'TB', ring 3 → hardware).
// Userspace sits at the top in both readings: the last thing built, and the least privileged.
//
// BOTH columns are numbered tiles in an EDGELESS container, and that is a deliberate trade the whole
// board depends on. An edgeless stack uses STACK_GAP_Y (28px); a flow uses GAP_Y (90px). Eleven nodes
// across two columns meant ~600px of pure gap in a pane that is roughly square — and fitView scales to
// the LONG axis, so the arrows were shrinking every label on the board to say what `1 ·` … `6 ·` says
// for free. The ribbon reads 6→1 in source so it renders climbing; the cake reads 1→5 descending.
//
// The studio lit one region at a time with a camera. This engine has none, so every section gets its
// own scene that spreads this board and sets `Section.focus` to the rung or layer it is about — the
// same technique the capstone uses. (check-content.mjs treats a module with no top-level Scene as a
// shared node factory, so those focus ids are in scope for every scene and a typo still fails.)
export const STACK_IDS = {
  firmware: 'ms-b1',
  grub: 'ms-b2',
  kernel: 'ms-b3',
  mount: 'ms-b4',
  init: 'ms-b5',
  userspace: 'ms-b6',
  ring3: 'ms-user',
  syscall: 'ms-syscall',
  ring0: 'ms-kernel',
  drivers: 'ms-drivers',
  hardware: 'ms-hw',
} as const

export const machineStack = (): SceneNode => ({
  id: 'machine-stack',
  label: 'One machine, two directions',
  sub: 'built bottom-up as it boots · used top-down as it runs',
  pattern: 'group',
  cols: 2,
  children: [
    {
      id: 'boot-ribbon',
      label: 'Boot ▲ bottom-up',
      sub: 'read it 1 → 6, climbing',
      pattern: 'service',
      children: [
        { id: STACK_IDS.userspace, label: '6 · userspace', sub: 'services, login, shell', variant: 'tile', pattern: 'service', icon: 'terminal' },
        { id: STACK_IDS.init, label: '5 · init', sub: 'PID 1, systemd', variant: 'tile', pattern: 'service', icon: 'workflow' },
        { id: STACK_IDS.mount, label: '4 · mount /', sub: 'the real disk', variant: 'tile', pattern: 'service', icon: 'harddrive' },
        { id: STACK_IDS.kernel, label: '3 · kernel', sub: 'unpack, initramfs', variant: 'tile', pattern: 'service', icon: 'cpu' },
        { id: STACK_IDS.grub, label: '2 · GRUB', sub: 'load the kernel', variant: 'tile', pattern: 'service', icon: 'layers' },
        { id: STACK_IDS.firmware, label: '1 · firmware', sub: 'POST, find a disk', variant: 'tile', pattern: 'service', icon: 'power' },
      ],
    },
    {
      id: 'layer-cake',
      label: 'Runtime ▼ top-down',
      sub: 'read it 1 → 5, descending',
      pattern: 'network',
      children: [
        { id: STACK_IDS.ring3, label: '1 · User space', sub: 'ring 3 — your programs', variant: 'tile', pattern: 'user', icon: 'users' },
        { id: STACK_IDS.syscall, label: '2 · System calls', sub: 'the only door in', variant: 'tile', pattern: 'warn', icon: 'dooropen' },
        { id: STACK_IDS.ring0, label: '3 · Kernel', sub: 'ring 0 — scheduler, VFS', variant: 'tile', pattern: 'service', icon: 'cpu' },
        { id: STACK_IDS.drivers, label: '4 · Drivers', sub: 'one per device model', variant: 'tile', pattern: 'network', icon: 'plug' },
        { id: STACK_IDS.hardware, label: '5 · Hardware', sub: 'CPU, RAM, disk, NIC', variant: 'tile', pattern: 'storage', icon: 'harddrive' },
      ],
    },
  ],
})
