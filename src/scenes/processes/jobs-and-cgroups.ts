import type { Scene } from '../../render-engine'

// §9 jobs-cgroups — two levers at opposite scales, so two columns. The pairing is deliberate: the
// left one turns out to be signals from §6 wearing a shell interface, and the right one turns out to
// be what every container you have ever run is actually made of.
export const jobsAndCgroups: Scene = {
  id: 'jobs-and-cgroups',
  cols: 2,
  padding: 0.14,
  nodes: [
    {
      id: 'jobs',
      label: 'Job control — your shell’s processes',
      sub: 'a soft lever, over the things you launched',
      pattern: 'user',
      children: [
        { id: 'j-start', label: '& and Ctrl-Z', sub: 'background it, or suspend it', pattern: 'user', icon: 'terminal' },
        { id: 'j-manage', label: 'jobs, fg, bg', sub: 'kill %1 targets job 1', pattern: 'user', icon: 'repeat' },
        { id: 'j-really', label: 'It is just signals', sub: 'the shell is sending SIGSTOP and SIGCONT', pattern: 'network', icon: 'bell' },
      ],
    },
    {
      id: 'cgroups',
      label: 'cgroups — the kernel’s hard caps',
      sub: 'a group of processes and a ceiling it cannot pass — Docker and Kubernetes are this, wearing a UI',
      pattern: 'service',
      children: [
        { id: 'c-caps', label: 'Hard limits', sub: 'max CPU, max memory, max I/O', pattern: 'service', icon: 'gauge' },
        { id: 'c-oom', label: 'Over the cap', sub: 'the group is killed, not just slowed — the OOM story', pattern: 'warn', icon: 'skull' },
        { id: 'c-containers', label: 'This IS containers', sub: 'cgroups plus namespaces', pattern: 'storage', icon: 'boxes' },
      ],
    },
  ],
  edges: [],
}
