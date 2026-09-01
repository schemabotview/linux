import type { Scene } from '../../render-engine'
import { shellRepl } from './shell-repl'
import { commandAnatomy } from './command-anatomy'
import { pathSearch } from './path-search'
import { evalStages } from './eval-stages'
import { expansionRewrite } from './expansion-rewrite'
import { quotingOff } from './quoting-off'
import { forkExecWait } from './fork-exec-wait'
import { threeStreams } from './three-streams'
import { pipeChain } from './pipe-chain'
import { shellRecap } from './shell-recap'

// Scenes for the `shell` course — one per section. The studio repo ran EIGHT of these ten on one
// `shell-pipeline` board and the other two on `redirection`. Four of the ten are code cards, on the
// rule the sql port arrived at: a claim about which WORD or which LINE something happens on needs the
// words on screen. The rest are flows, because the shell's stages genuinely are one.
export const shellScenes: Scene[] = [
  shellRepl,
  commandAnatomy,
  pathSearch,
  evalStages,
  expansionRewrite,
  quotingOff,
  forkExecWait,
  threeStreams,
  pipeChain,
  shellRecap,
]
