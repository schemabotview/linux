import type { Course } from '../types'
import { whyScript } from './01-why-script'
import { anatomy } from './02-anatomy'
import { variablesArgs } from './03-variables-args'
import { conditionals } from './04-conditionals'
import { loops } from './05-loops'
import { functions } from './06-functions'
import { robustness } from './07-robustness'
import { argsDebug } from './08-args-debug'
import { youAreHere } from './09-you-are-here'

// scripting — teaching the machine to do it for you. NINE sections (not ten; the generated audio
// fixes the count): a runnable file (§1–§2), memory and inputs (§3), decisions (§4), repetition (§5),
// structure (§6), then the two that separate a toy from a tool — failing fast and cleaning up (§7),
// proper options and a debugging plan (§8) — plus the bookend.
// Course COMPLETE — 9 sections, 9 scenes, 9 wavs (17.3 min).
export const scripting: Course = {
  id: 'scripting',
  title: 'Shell scripting',
  sections: [
    whyScript,
    anatomy,
    variablesArgs,
    conditionals,
    loops,
    functions,
    robustness,
    argsDebug,
    youAreHere,
  ],
}
