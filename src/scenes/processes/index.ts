import type { Scene } from '../../render-engine'
import { programVsProcess } from './program-vs-process'
import { forkReturnsTwice } from './fork-returns-twice'
import { execInPlace } from './exec-in-place'
import { processStates } from './process-states'
import { zombieAndOrphan } from './zombie-and-orphan'
import { signalTable } from './signal-table'
import { threeLenses } from './three-lenses'
import { niceScale } from './nice-scale'
import { jobsAndCgroups } from './jobs-and-cgroups'
import { processesRecap } from './processes-recap'

// Scenes for the `processes` course — one per section (the studio repo rode five sections on one
// `process-lifecycle` board). Two tables, because two of these sections ARE columns of real output:
// §4 is the STATE column of ps, §6 is the signal list with its catchable flag.
export const processesScenes: Scene[] = [
  programVsProcess,
  forkReturnsTwice,
  execInPlace,
  processStates,
  zombieAndOrphan,
  signalTable,
  threeLenses,
  niceScale,
  jobsAndCgroups,
  processesRecap,
]
