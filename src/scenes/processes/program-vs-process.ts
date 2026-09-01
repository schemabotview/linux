import type { Scene } from '../../render-engine'

// §1 what-is-a-process — the section's key move is one-to-MANY: one file on disk, three live
// instances, each with its own everything. So the scene is one node fanning into three identical-
// looking ones whose only difference is the PID, which is precisely the point being made.
export const programVsProcess: Scene = {
  id: 'program-vs-process',
  nodes: [
    { id: 'file', label: '/usr/bin/bash', sub: 'ONE program — a passive file on disk', pattern: 'storage', icon: 'file' },
    {
      id: 'procs',
      label: 'Three processes, from that one file',
      sub: 'open three terminals and this is what you have',
      pattern: 'service',
      cols: 3,
      children: [
        { id: 'pr-1', label: 'PID 2101', sub: 'its own memory', variant: 'tile', pattern: 'service', icon: 'gears' },
        { id: 'pr-2', label: 'PID 2140', sub: 'its own open files', variant: 'tile', pattern: 'service', icon: 'gears' },
        { id: 'pr-3', label: 'PID 2199', sub: 'its own everything', variant: 'tile', pattern: 'service', icon: 'gears' },
      ],
    },
    { id: 'parent', label: 'Every one has a parent', sub: 'follow the PPIDs up and you always arrive at PID 1', pattern: 'user', icon: 'workflow' },
  ],
  edges: [
    { source: 'file', target: 'procs', label: 'a process is that program RUNNING — a live instance the kernel manages' },
    { source: 'procs', target: 'parent', label: 'ps, pstree and /proc/<pid>/ all show this tree live' },
  ],
}
