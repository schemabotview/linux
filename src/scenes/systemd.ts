import { type SceneSpec, BLUE, GREEN, ORANGE, PURPLE, TEAL, YELLOW } from 'reveal-engine'

// Course 6 §4–§5 — the `systemd` scene: how services are declared, managed, and logged. A control
// flow: a unit file declares a service; systemd (PID 1) manages it via systemctl; the running
// daemon's output is captured by journald (read with journalctl); targets group services into boot
// goals.
//
//   unit file (.service) ─▶ systemd (PID 1) ─▶ service (daemon) ─▶ journald / journalctl
//        systemctl ─steers─┘        targets ─group─┘
export const systemd: SceneSpec = {
  id: 'systemd',
  title: 'systemd: services & logs',
  canvas: { width: 980, height: 820 },
  grid: { cols: [1, 1, 1], rows: [0.85, 0.95, 0.85, 0.85], gap: 0.32, padding: 0.42 },
  nodes: [
    { id: 'sy-unit', label: 'unit file (.service)', sub: 'declares: what to run + deps', kind: 'symbol', color: BLUE, icon: 'file', cell: [1, 0] },
    { id: 'sy-systemctl', label: 'systemctl', sub: 'start·stop·enable·status', kind: 'symbol', color: TEAL, icon: 'terminal', cell: [0, 1] },
    { id: 'sy-systemd', label: 'systemd', sub: 'PID 1 · the manager', kind: 'symbol', color: PURPLE, icon: 'engine', cell: [1, 1] },
    { id: 'sy-target', label: 'targets', sub: 'boot goals (multi-user)', kind: 'symbol', color: YELLOW, icon: 'layers', cell: [2, 1] },
    { id: 'sy-service', label: 'service · daemon', sub: 'sshd · nginx · cron', kind: 'symbol', color: GREEN, icon: 'server', cell: [1, 2] },
    { id: 'sy-journal', label: 'journald → journalctl', sub: 'captures stdout/stderr', kind: 'symbol', color: ORANGE, icon: 'scroll', cell: [1, 3] },
  ],
  edges: [
    { from: 'sy-unit', to: 'sy-systemd' },
    { from: 'sy-systemctl', to: 'sy-systemd' },
    { from: 'sy-target', to: 'sy-systemd' },
    { from: 'sy-systemd', to: 'sy-service' },
    { from: 'sy-service', to: 'sy-journal' },
  ],
}
