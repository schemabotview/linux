import type { Course } from '../types'
import { theProject } from './01-the-project'
import { structure } from './02-structure'
import { argumentsSection } from './03-arguments'
import { collect } from './04-collect'
import { transform } from './05-transform'
import { report } from './06-report'
import { schedule } from './07-schedule'
import { service } from './08-service'
import { harden } from './09-harden'
import { ship } from './10-ship'
import { youAreHere } from './11-you-are-here'

// project — sysreport, built end to end. Eleven sections: the brief (§1), then the nine stages,
// one per section (§2–§10), each one lighting its own tile on the shared board via `focus`; and the
// step back to the whole series (§11). Every stage is a callback: structure/arguments/harden to
// Course 7, collect to 4 and 6, transform to 5, report to 2, schedule/service to 6, ship to 3.
// Course COMPLETE — 11 sections, 11 scenes, 11 wavs (17.4 min).
export const project: Course = {
  id: 'project',
  title: 'The capstone — ship a real tool',
  sections: [
    theProject,
    structure,
    argumentsSection,
    collect,
    transform,
    report,
    schedule,
    service,
    harden,
    ship,
    youAreHere,
  ],
}
