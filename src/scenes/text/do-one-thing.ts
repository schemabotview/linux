import type { Scene } from '../../render-engine'

// §1 unix-philosophy — the toolkit is a set of peers, so it is a board, not a chain. The node below is
// the property that makes the board composable at all: every one of them reads stdin and writes
// stdout, line by line, which is also why they do not care how big the file is.
export const doOneThing: Scene = {
  id: 'do-one-thing',
  nodes: [
    {
      id: 'toolkit',
      label: 'Programs that each do one thing well',
      sub: 'almost everything on Linux is text, so these are the sharpest tools you have',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 't-grep', label: 'grep', sub: 'search', variant: 'tile', pattern: 'service', icon: 'search' },
        { id: 't-sed', label: 'sed', sub: 'edit', variant: 'tile', pattern: 'service', icon: 'pencil' },
        { id: 't-awk', label: 'awk', sub: 'columns', variant: 'tile', pattern: 'service', icon: 'sigma' },
        { id: 't-sort', label: 'sort, uniq', variant: 'tile', sub: 'tally', pattern: 'network', icon: 'sortarrows' },
        { id: 't-cut', label: 'cut, wc, tr', variant: 'tile', sub: 'reshape', pattern: 'network', icon: 'scissors' },
        { id: 't-find', label: 'find, xargs', variant: 'tile', sub: 'files', pattern: 'storage', icon: 'folder' },
      ],
    },
    {
      id: 'streaming',
      label: 'Line by line',
      sub: '100 GB never fits in RAM',
      pattern: 'service',
      icon: 'waves',
    },
  ],
  edges: [
    { source: 'toolkit', target: 'streaming', label: 'each reads stdin and writes stdout, streaming — which is what lets the pipe compose them, and why the size of the file never comes up' },
  ],
}
