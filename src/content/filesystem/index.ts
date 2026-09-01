import type { Course } from '../types'
import { theTree } from './01-the-tree'
import { fhsSystem } from './02-fhs-system'
import { fhsYou } from './03-fhs-you'
import { paths } from './04-paths'
import { permissionsRead } from './05-permissions-read'
import { permissionsChange } from './06-permissions-change'
import { inodes } from './07-inodes'
import { links } from './08-links'
import { mounts } from './09-mounts'
import { youAreHere } from './10-you-are-here'

// filesystem — the world the commands act in. Ten sections that descend: the one tree and the
// FHS map (§1–§3), the addresses you type (§4), the gate that stops you (§5–§6), then under the
// surface — name → inode → data (§7), the two kinds of link that model explains (§8), and the mounts
// that assemble the whole tree (§9), plus the bookend.
// Course COMPLETE — 10 sections, 10 scenes, 10 wavs (18.8 min).
export const filesystem: Course = {
  id: 'filesystem',
  title: 'The filesystem & permissions',
  sections: [
    theTree,
    fhsSystem,
    fhsYou,
    paths,
    permissionsRead,
    permissionsChange,
    inodes,
    links,
    mounts,
    youAreHere,
  ],
}
