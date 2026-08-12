import { type SceneSpec, BLUE } from 'reveal-engine'

// Course 4 §7 — watching processes on a whole-canvas `code` card. The three lenses (ps snapshot,
// top/htop live dashboard, the raw /proc truth everything else just formats) as one terminal
// session. Replaces the shared `proc-monitoring` board, whose zoomed bands were near-empty tiles.
// Short lines so the auto-fit font stays large at 4K.
export const procWatch: SceneSpec = {
  id: 'proc-watch',
  title: 'Watching processes',
  canvas: { width: 1520, height: 1160 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'pw-all', kind: 'code', filename: 'watch.sh', color: BLUE, cell: [0, 0],
      label: [
        '# THREE LENSES on live processes — raw → friendly',
        '$ ps aux                # snapshot: every process, 1 line',
        'USER   PID  %CPU %MEM S  COMMAND',
        'sam   1234  91.3  2.1 R  ./encode.sh     ← the CPU hog',
        'root   842   0.0  0.1 S  /usr/sbin/sshd',
        '$ ps aux | grep sshd    # find one PID (for scripts)',
        '',
        '$ top                   # live dashboard: ~1s, by CPU',
        '$ htop                  #   nicer: color, scroll, kill',
        '',
        '# the raw truth every tool above just formats:',
        '$ cat /proc/1234/status # state, memory, threads …',
        '$ ls  /proc/1234/       # cmdline  fd/  maps  status',
      ].join('\n'),
    },
  ],
  edges: [],
}
