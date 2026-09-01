import type { Scene } from '../../render-engine'

// §2 anatomy — three separate things have to be true before a text file will run, and each fails in a
// different way, so they are three cards rather than a sentence. The ./ card carries the reason the
// section gives, which is a safety default rather than a quirk.
export const runnableFile: Scene = {
  id: 'runnable-file',
  nodes: [
    {
      id: 'script',
      kind: 'code',
      filename: 'backup.sh',
      label: [
        '#!/usr/bin/env bash      # line 1, always — the shebang',
        '# backup.sh — copy /srv to /backup, nightly',
        '',
        'echo "hello from a real program"',
      ].join('\n'),
    },
    {
      id: 'three',
      label: 'Three things make a text file runnable',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'rf-shebang', label: 'The shebang', sub: 'which interpreter runs it', pattern: 'service', icon: 'filecode' },
        { id: 'rf-chmod', label: 'chmod +x', sub: 'the execute bit, Course 3', pattern: 'network', icon: 'lock' },
        { id: 'rf-dot', label: './backup.sh', sub: 'the dot-slash is required', pattern: 'user', icon: 'terminal' },
      ],
    },
  ],
  edges: [
    { source: 'script', target: 'three', label: 'env bash finds it via PATH, so it is portable — and the current directory is deliberately NOT on PATH' },
  ],
}
