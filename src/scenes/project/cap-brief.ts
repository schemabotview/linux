import type { Scene } from '../../render-engine'
import { stagesBoard } from './stages'

// §1 the-project — the only scene that shows the board with nothing lit, because the section is the
// promise rather than a stage. The card above is what the tool actually does, so the board reads as
// nine steps toward something concrete instead of nine abstract nouns.
export const capBrief: Scene = {
  id: 'cap-brief',
  nodes: [
    {
      id: 'tool',
      label: 'sysreport',
      sub: 'a system-health and log-summary CLI, for a live machine',
      pattern: 'service',
      icon: 'terminal',
    },
    stagesBoard(),
  ],
  edges: [],
}
