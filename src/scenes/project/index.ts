import type { Scene } from '../../render-engine'
import { capBrief } from './cap-brief'
import { capStructure } from './cap-structure'
import { capArguments } from './cap-arguments'
import { capCollect } from './cap-collect'
import { capTransform } from './cap-transform'
import { capReport } from './cap-report'
import { capSchedule } from './cap-schedule'
import { capService } from './cap-service'
import { capHarden } from './cap-harden'
import { capShip } from './cap-ship'
import { seriesConverges } from './series-converges'

// Scenes for the `project` capstone. Ten of the eleven spread the shared nine-stage board from
// stages.ts and set `Section.focus` to their own stage, so the board lights up ACROSS the course — the
// engine has no camera, and §1's narration explicitly promises "the nine stages on this board".
// §11 drops the board on purpose: it steps back from the tool to the series.
export const projectScenes: Scene[] = [
  capBrief,
  capStructure,
  capArguments,
  capCollect,
  capTransform,
  capReport,
  capSchedule,
  capService,
  capHarden,
  capShip,
  seriesConverges,
]
