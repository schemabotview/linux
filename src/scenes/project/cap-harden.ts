import type { Scene } from '../../render-engine'
import { stagesBoard } from './stages'

// §9 harden — four safeguards against four specific 3 a.m. failures, so the band names the failure
// each one prevents rather than the technique it uses. Unattended code has to fail loudly and safely;
// the band is what "safely" decomposes into.
export const capHarden: Scene = {
  id: 'cap-harden',
  nodes: [
    stagesBoard(),
    {
      id: 'harden',
      kind: 'code',
      filename: 'sysreport.sh — hardening',
      label: [
        'command -v journalctl awk df >/dev/null || {   # preflight',
        '    warn "missing a required tool"; exit 1; }',
        '',
        '[[ "$LINES" =~ ^[0-9]+$ ]] || { warn "bad -n"; exit 1; }',
        '',
        'exec 9>/var/lock/sysreport.lock',
        'flock -n 9 || { warn "already running"; exit 1; }',
        '',
        "trap 'rm -f \"$tmp\"' EXIT   # even on Ctrl-C — Course 4",
      ].join('\n'),
    },
    {
      id: 'against',
      label: 'Four things that go wrong at 3 a.m.',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'hd-tool', label: 'A missing tool', sub: 'fails cryptically mid-run', variant: 'tile', pattern: 'warn', icon: 'ban' },
        { id: 'hd-input', label: 'A bad -n', sub: 'reaches tail unchecked', variant: 'tile', pattern: 'warn', icon: 'ban' },
        { id: 'hd-overlap', label: 'Two runs at once', sub: 'corrupt the output', variant: 'tile', pattern: 'warn', icon: 'copy' },
        { id: 'hd-litter', label: 'A killed run', sub: 'leaves its lock behind', variant: 'tile', pattern: 'warn', icon: 'skull' },
      ],
    },
  ],
  edges: [],
}
