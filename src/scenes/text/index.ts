import type { Scene } from '../../render-engine'
import { doOneThing } from './do-one-thing'
import { grepFlags } from './grep-flags'
import { regexSymbols } from './regex-symbols'
import { sedStream } from './sed-stream'
import { awkColumns } from './awk-columns'
import { connectiveTissue } from './connective-tissue'
import { findAndXargs } from './find-and-xargs'
import { topFivePipeline } from './top-five-pipeline'
import { whichTool } from './which-tool'
import { textRecap } from './text-recap'

// Scenes for the `text` course — the code-heaviest of the eight, and honestly so: seven of these ten
// sections are ABOUT literal syntax, and a card reading "sed substitutes text" is the claim without the
// evidence. Three tables carry the reference material (regex symbols, awk's field variables, the
// which-tool lookup), which is what tables are for.
export const textScenes: Scene[] = [
  doOneThing,
  grepFlags,
  regexSymbols,
  sedStream,
  awkColumns,
  connectiveTissue,
  findAndXargs,
  topFivePipeline,
  whichTool,
  textRecap,
]
