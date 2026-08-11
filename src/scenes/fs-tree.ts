import { type SceneSpec, TEAL } from 'reveal-engine'

// Course 3 §4 — paths & navigation on a whole-canvas `code` card: the single-rooted tree drawn as
// text, then the handful of commands that move through it. One cohesive terminal session; kept
// SHORT with short lines so the code card's auto-fit font renders large at 4K.
export const fsTree: SceneSpec = {
  id: 'fs-tree',
  title: 'Paths & navigation',
  canvas: { width: 1500, height: 1240 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'ft-all', kind: 'code', filename: 'navigate.sh', color: TEAL, cell: [0, 0],
      label: [
        '# ONE tree. Everything hangs off a single root: /',
        '/',
        '├── etc/            # config',
        '├── home/',
        '│   └── sam/        #  ~  ==  /home/sam',
        '├── usr/bin/        # programs',
        '└── var/log/        # logs',
        '',
        '# absolute path: starts at /   (same from anywhere)',
        'cd /var/log',
        '',
        '# relative path: from where you ARE (pwd)',
        'pwd            # where am I?     → /home/sam',
        'cd projects    # into ./projects',
        'cd ..          # up one   ( . = here,  .. = parent )',
        'cd ~   or  cd  # home',
        'cd -           # back to previous dir',
        '',
        '# look around',
        'ls             # names here',
        'ls -l          # long: perms, owner, size, date',
        'ls -la         # + hidden ".dotfiles"',
      ].join('\n'),
    },
  ],
  edges: [],
}
