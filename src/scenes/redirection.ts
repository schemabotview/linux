import { type SceneSpec, PURPLE } from 'reveal-engine'

// Course 2 §8–§9 — redirection & pipes on their OWN whole-canvas scene: one big `code` card filling
// the stage so the terminal session reads large at 4K. The three streams as file descriptors, then
// the operators that reroute them, then pipes composing commands. Kept SHORT with short lines — a
// code card fits its font to the longest line + line count.
export const redirection: SceneSpec = {
  id: 'redirection',
  title: 'Streams, redirection & pipes',
  canvas: { width: 1500, height: 1320 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'rd-all', kind: 'code', filename: 'streams.sh', color: PURPLE, cell: [0, 0],
      label: [
        '# three streams, three file descriptors:',
        '#   0 = stdin    1 = stdout    2 = stderr',
        '$ ls /etc /nope',
        '/etc/hosts            # normal output → stdout (1)',
        'ls: /nope: not found  # errors         → stderr (2)',
        '',
        '# ── redirect stdout to a file ──',
        'ls  > out.txt       # 1 → file (overwrite)',
        'ls >> out.txt       # 1 → file (append)',
        'echo hi > /dev/null # discard it entirely',
        '',
        '# ── redirect stderr, or both ──',
        'cmd 2> err.txt      # just stderr',
        'cmd > all.txt 2>&1  # both: send 2 where 1 goes',
        'cmd &> all.txt      # bash shorthand for the same',
        '',
        '# ── feed input; here-doc ──',
        'sort < names.txt    # file → stdin (0)',
        '',
        '# ── pipes: stdout of one → stdin of the next ──',
        'ps aux | grep ssh | wc -l   # compose small tools',
        'ls | tee list.txt | wc -l   # tee: save AND pass on',
      ].join('\n'),
    },
  ],
  edges: [],
}
