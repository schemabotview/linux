import { type SceneSpec, RED } from 'reveal-engine'

// Course 4 §6 — signals on a whole-canvas `code` card: a signal is an async message to a process.
// The common ones, how to send them (kill/killall), and the two that can't be caught. One terminal
// session; short lines so the auto-fit font stays large at 4K.
export const signals: SceneSpec = {
  id: 'signals',
  title: 'Signals',
  canvas: { width: 1520, height: 1220 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'sg-all', kind: 'code', filename: 'signals.sh', color: RED, cell: [0, 0],
      label: [
        '# a signal = a short async message to a process',
        'ps aux | grep server     # find its PID → 4127',
        '',
        '# ── the ones you actually use ──',
        'kill 4127         # SIGTERM (15): "please stop" ← default',
        'kill -INT 4127    # SIGINT  (2) : what Ctrl-C sends',
        'kill -HUP 4127    # SIGHUP  (1) : often "reload config"',
        'kill -STOP 4127   # pause   ·   -CONT to resume',
        'kill -KILL 4127   # SIGKILL (9) : forced, cannot be caught',
        'killall nginx     # by name instead of PID',
        '',
        '# a process can TRAP a catchable signal to clean up:',
        "trap 'rm -f \"$tmp\"; exit' INT TERM   # (in a script)",
        '',
        '# SIGKILL (9) and SIGSTOP CANNOT be trapped —',
        '# the kernel acts on them directly.',
        '# Try TERM first; reach for -9 only as a last resort.',
      ].join('\n'),
    },
  ],
  edges: [],
}
