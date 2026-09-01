import type { Scene } from '../../render-engine'
import { operatorSurface } from './operator-surface'
import { accountFiles } from './account-files'
import { borrowingRoot } from './borrowing-root'
import { startVsEnable } from './start-vs-enable'
import { journalLoop } from './journal-loop'
import { packageManager } from './package-manager'
import { cronFields } from './cron-fields'
import { networkPath } from './network-path'
import { sshKeys } from './ssh-keys'
import { adminRecap } from './admin-recap'

// Scenes for the `admin` course — one per section (the studio repo shared six across the ten). Three
// of these end on a deliberate LOOP or LADDER rather than a list, because that is what the sections
// actually claim: §1 the operator's cycle, §5 "the debugging loop IS the job", §8 climb it in order.
export const adminScenes: Scene[] = [
  operatorSurface,
  accountFiles,
  borrowingRoot,
  startVsEnable,
  journalLoop,
  packageManager,
  cronFields,
  networkPath,
  sshKeys,
  adminRecap,
]
