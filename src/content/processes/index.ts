import type { Course } from '../types'
import { whatIsAProcess } from './01-what-is-a-process'
import { fork } from './02-fork'
import { execTree } from './03-exec-tree'
import { statesScheduler } from './04-states-scheduler'
import { exitZombie } from './05-exit-zombie'
import { signals } from './06-signals'
import { monitoringLook } from './07-monitoring-look'
import { priority } from './08-priority'
import { jobsCgroups } from './09-jobs-cgroups'
import { youAreHere } from './10-you-are-here'

// processes — the running work. Ten sections following ONE process from birth to death: what it is
// (§1), fork (§2) and exec (§3) and the gap between them, its states under the scheduler (§4), its
// death and the two ways that goes wrong (§5); then how you interact with it — signals (§6), the three
// lenses that watch it (§7), priority (§8), and the two levers that steer it (§9), plus the bookend.
// Course COMPLETE — 10 sections, 10 scenes, 10 wavs (19.2 min).
export const processes: Course = {
  id: 'processes',
  title: 'Processes & signals',
  sections: [
    whatIsAProcess,
    fork,
    execTree,
    statesScheduler,
    exitZombie,
    signals,
    monitoringLook,
    priority,
    jobsCgroups,
    youAreHere,
  ],
}
