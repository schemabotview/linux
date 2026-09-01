import type { Scene } from '../../render-engine'

// §11 you-are-here — the one capstone scene WITHOUT the board, deliberately: the section steps back
// from the tool to the series, so the picture changes from "nine stages" to "seven courses". A table,
// because the claim is a mapping — each course, and the specific thing it contributed to the tool.
export const seriesConverges: Scene = {
  id: 'series-converges',
  nodes: [
    {
      id: 'converge',
      kind: 'table',
      label: 'Every course, in one tool',
      sub: 'that convergence is the point of building it at all',
      pattern: 'service',
      headers: ['course', 'what it gave sysreport'],
      values: [
        ['1 kernel', 'the processes and syscalls under all of it'],
        ['2 shell', 'streams, pipes, exit codes, $( )'],
        ['3 filesystem', 'paths, permissions, install -m 755'],
        ['4 processes', 'ps, nice, signals and the trap'],
        ['5 text', 'the awk | sort | uniq -c insight pipeline'],
        ['6 admin', 'systemd, journalctl, scheduling'],
        ['7 scripting', 'the robust bash it is all written in'],
      ],
    },
    {
      id: 'next',
      label: 'Keep building',
      sub: 'email alerts, JSON output, more checks',
      pattern: 'user',
      icon: 'gitbranch',
    },
  ],
  edges: [
    { source: 'converge', target: 'next', label: 'containers, cloud and config management all stand on exactly these fundamentals' },
  ],
}
