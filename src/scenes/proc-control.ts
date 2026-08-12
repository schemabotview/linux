import { type SceneSpec, PURPLE } from 'reveal-engine'

// Course 4 §9 — the two remaining control levers on a whole-canvas `code` card: shell job control
// (which is just the §6 signals in disguise) and cgroups (hard, kernel-enforced ceilings — what
// containers are built on). Replaces the `jobs`+`cgroups` band, which zoomed to near-empty tiles.
// Short lines so the auto-fit font stays large at 4K.
export const procControl: SceneSpec = {
  id: 'proc-control',
  title: 'Job control & cgroups',
  canvas: { width: 1520, height: 1160 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'pc-all', kind: 'code', filename: 'control.sh', color: PURPLE, cell: [0, 0],
      label: [
        '# JOB CONTROL — processes YOUR shell launched (§6 signals)',
        '$ ./long-task.sh &   # run in background → prompt back',
        '[1] 4127',
        '$ ^Z                 # Ctrl-Z: suspend fg job  (SIGSTOP)',
        '$ jobs               # [1]+ Stopped  ./long-task.sh',
        '$ bg %1              # resume in background     (SIGCONT)',
        '$ fg %1              # bring back to foreground',
        '$ kill %1            # signal job 1 by its job number',
        '',
        '# CGROUPS — hard, kernel-enforced ceilings (not a bias)',
        '$ systemd-run --scope \\',
        '    -p MemoryMax=1G -p CPUQuota=50% ./job',
        '#   exceed the cap → OOM-killed, not just slowed',
        '#   containers = cgroups + namespaces  (Docker / K8s)',
      ].join('\n'),
    },
  ],
  edges: [],
}
