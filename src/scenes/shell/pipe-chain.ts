import type { Scene } from '../../render-engine'

// §9 pipes — two halves. Redirection is vocabulary, so it is a code card (the exact operators, on
// real lines). A pipe is a genuine FLOW between processes, so it is drawn as one: three programs, and
// the arrows are the pipes. Together they are the section's claim — the defaults are only defaults.
export const pipeChain: Scene = {
  id: 'pipe-chain',
  nodes: [
    {
      id: 'redir',
      kind: 'code',
      filename: 'redirection.sh',
      label: [
        'sort < names.txt > sorted.txt   # stdin from a file, stdout to one',
        'echo more >> sorted.txt         # append instead of overwrite',
        'make > build.log 2>&1           # both streams into one place',
        'curl -s example.com > /dev/null # throw a stream away',
      ].join('\n'),
    },
    {
      id: 'pipeline',
      label: 'Or wire the streams into each other',
      sub: 'no temp file: each program’s stdout IS the next one’s stdin',
      pattern: 'service',
      flow: 'LR',
      children: [
        { id: 'pc-ps', label: 'ps aux', sub: 'list processes', variant: 'tile', pattern: 'service', icon: 'gears' },
        { id: 'pc-grep', label: 'grep ssh', sub: 'keep the matches', variant: 'tile', pattern: 'service', icon: 'funnel' },
        { id: 'pc-wc', label: 'wc -l', sub: 'count them', variant: 'tile', pattern: 'service', icon: 'table' },
      ],
      edges: [
        { source: 'pc-ps', target: 'pc-grep', label: '|' },
        { source: 'pc-grep', target: 'pc-wc', label: '|' },
      ],
    },
  ],
  edges: [{ source: 'redir', target: 'pipeline', label: 'small tools that each do one thing well — the whole Unix philosophy' }],
}
