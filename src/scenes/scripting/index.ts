import type { Scene } from '../../render-engine'
import { commandsToProgram } from './commands-to-program'
import { runnableFile } from './runnable-file'
import { varsAndArgs } from './vars-and-args'
import { zeroIsTrue } from './zero-is-true'
import { loopForms } from './loop-forms'
import { codeVsData } from './code-vs-data'
import { failFast } from './fail-fast'
import { optionsAndDebug } from './options-and-debug'
import { scriptLayers } from './script-layers'

// Scenes for the `scripting` course — NINE sections, not ten (the audio is fixed, so the count is what
// it is). Seven carry a code card, which is honest for a course about syntax; each pairs it with the
// one thing that card cannot show — the silent trap, the fork, or the class of bug a flag prevents.
export const scriptingScenes: Scene[] = [
  commandsToProgram,
  runnableFile,
  varsAndArgs,
  zeroIsTrue,
  loopForms,
  codeVsData,
  failFast,
  optionsAndDebug,
  scriptLayers,
]
