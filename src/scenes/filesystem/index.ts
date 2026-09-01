import type { Scene } from '../../render-engine'
import { oneRoot } from './one-root'
import { fhsSystemDirs } from './fhs-system-dirs'
import { realVsVirtual } from './real-vs-virtual'
import { absVsRel } from './abs-vs-rel'
import { permissionBits } from './permission-bits'
import { chmodChown } from './chmod-chown'
import { nameInodeData } from './name-inode-data'
import { twoKindsOfLink } from './two-kinds-of-link'
import { mountPoints } from './mount-points'
import { fsRecap } from './fs-recap'

// Scenes for the `filesystem` course — one per section (the studio repo shared five across the ten).
// Two of them lean on the table node: §5 draws the nine permission bits AS a three-by-three grid, and
// §7 lists the inode's real fields so that the absence of a name is something you can see.
export const filesystemScenes: Scene[] = [
  oneRoot,
  fhsSystemDirs,
  realVsVirtual,
  absVsRel,
  permissionBits,
  chmodChown,
  nameInodeData,
  twoKindsOfLink,
  mountPoints,
  fsRecap,
]
