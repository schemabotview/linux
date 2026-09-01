import type { Scene } from '../../render-engine'

// §2 fhs-system — four peers, no flow between them, so no edges inside the box. The node below is not
// a fifth directory: it is the consequence the section draws from all four being plain text, which is
// why it hangs off the band as its own claim.
export const fhsSystemDirs: Scene = {
  id: 'fhs-system-dirs',
  nodes: [
    {
      id: 'system',
      label: 'The system’s own space',
      sub: 'the FHS means these mean the same thing on every distro',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'd-etc', label: '/etc', sub: 'all configuration, as files you can edit', pattern: 'service', icon: 'wrench' },
        { id: 'd-var', label: '/var', sub: 'data that grows: logs, spools, caches', pattern: 'storage', icon: 'database' },
        { id: 'd-usr', label: '/usr', sub: 'the bulk of installed software', pattern: 'network', icon: 'boxes' },
        { id: 'd-bin', label: '/bin and /sbin', sub: 'essentials, even on a broken system', pattern: 'external', icon: 'terminal' },
      ],
    },
    { id: 'text', label: 'All of it plain text', sub: 'so you can diff it, back it up, and keep it in git', pattern: 'service', icon: 'gitbranch' },
  ],
  edges: [{ source: 'system', target: 'text', label: 'there is no registry — that is the whole design' }],
}
