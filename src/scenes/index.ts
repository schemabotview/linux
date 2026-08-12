import type { SceneSpec } from 'reveal-engine'
import { machineStack } from './machine-stack.ts'
import { shellPipeline } from './shell-pipeline.ts'
import { shellOverview } from './shell-overview.ts'
import { redirection } from './redirection.ts'
import { fhsOverview } from './fhs-overview.ts'
import { fsTree } from './fs-tree.ts'
import { permissions } from './permissions.ts'
import { inodesLinks } from './inodes-links.ts'
import { mountsVfs } from './mounts-vfs.ts'
import { processLifecycle } from './process-lifecycle.ts'
import { signals } from './signals.ts'
import { procMonitoring } from './proc-monitoring.ts'
import { textOverview } from './text-overview.ts'
import { grep } from './grep.ts'
import { sed } from './sed.ts'
import { awk } from './awk.ts'
import { sortUniq } from './sort-uniq.ts'
import { findXargs } from './find-xargs.ts'
import { adminOverview } from './admin-overview.ts'
import { usersGroups } from './users-groups.ts'
import { systemd } from './systemd.ts'
import { packages } from './packages.ts'
import { scheduling } from './scheduling.ts'
import { networking } from './networking.ts'
import { scriptingOverview } from './scripting-overview.ts'
import { scriptBasics } from './script-basics.ts'
import { conditionals } from './conditionals.ts'
import { loops } from './loops.ts'
import { functions } from './functions.ts'
import { robust } from './robust.ts'
import { capstoneSpine } from './capstone-spine.ts'
import { capStructure } from './cap-structure.ts'
import { capArgs } from './cap-args.ts'
import { capCollect } from './cap-collect.ts'
import { capTransform } from './cap-transform.ts'
import { capReport } from './cap-report.ts'
import { capSchedule } from './cap-schedule.ts'
import { capService } from './cap-service.ts'
import { capHarden } from './cap-harden.ts'
import { capShip } from './cap-ship.ts'

// This concept's scene registry. The engine's RevealPlayer resolves a section's scene id through
// getScene; content/courses reference these ids. Each course brings its own scenes — a control/
// data-flow diagram where there's genuine flow, else a reference board of peer topics.
//
// Course 1 (`kernel`): `machine-stack` — ONE scene fusing the boot timeline and the layer cake:
// boot climbs the left ribbon (built bottom-up), runtime descends the layers (used top-down). It
// replaced the old two-scene split (`boot-chain` + `kernel-internals`).
// Course 2 (`shell`): `shell-overview` (command anatomy board) + `shell-pipeline` (the read-eval
// loop spine) + `redirection` (streams & pipes, whole-canvas code).
// Course 3 (`filesystem`): `fhs-overview` (the / tree board) + whole-canvas `fs-tree` (paths) &
// `permissions`, + flow scenes `inodes-links` (name→inode→data) and `mounts-vfs` (one tree, many disks).
// Course 4 (`processes`): `process-lifecycle` (fork→exec→states→exit spine) + `signals` (whole-canvas
// code) + `proc-monitoring` (ps/top/nice/cgroups board).
// Course 5 (`text`): `text-overview` board + a whole-canvas code scene per tool — `grep`, `sed`,
// `awk`, `sort-uniq` (cut/sort/uniq/wc/tr), `find-xargs`.
// Course 6 (`admin`): `admin-overview` board + whole-canvas `users-groups`, `packages`, `scheduling`,
// and flow scenes `systemd` (unit→service→journal) and `networking` (host→remote + tools).
// Course 7 (`scripting`): `scripting-overview` board + a whole-canvas code scene per construct —
// `script-basics`, `conditionals`, `loops`, `functions`, `robust`.
// Course 8 (`project`): `capstone-spine` build-map board + a whole-canvas stage scene each —
// `cap-structure`/`-args`/`-collect`/`-transform`/`-report`/`-schedule`/`-service`/`-harden`/`-ship`.
const scenes: Record<string, SceneSpec> = {
  [machineStack.id]: machineStack,
  [shellPipeline.id]: shellPipeline,
  [shellOverview.id]: shellOverview,
  [redirection.id]: redirection,
  [fhsOverview.id]: fhsOverview,
  [fsTree.id]: fsTree,
  [permissions.id]: permissions,
  [inodesLinks.id]: inodesLinks,
  [mountsVfs.id]: mountsVfs,
  [processLifecycle.id]: processLifecycle,
  [signals.id]: signals,
  [procMonitoring.id]: procMonitoring,
  [textOverview.id]: textOverview,
  [grep.id]: grep,
  [sed.id]: sed,
  [awk.id]: awk,
  [sortUniq.id]: sortUniq,
  [findXargs.id]: findXargs,
  [adminOverview.id]: adminOverview,
  [usersGroups.id]: usersGroups,
  [systemd.id]: systemd,
  [packages.id]: packages,
  [scheduling.id]: scheduling,
  [networking.id]: networking,
  [scriptingOverview.id]: scriptingOverview,
  [scriptBasics.id]: scriptBasics,
  [conditionals.id]: conditionals,
  [loops.id]: loops,
  [functions.id]: functions,
  [robust.id]: robust,
  [capstoneSpine.id]: capstoneSpine,
  [capStructure.id]: capStructure,
  [capArgs.id]: capArgs,
  [capCollect.id]: capCollect,
  [capTransform.id]: capTransform,
  [capReport.id]: capReport,
  [capSchedule.id]: capSchedule,
  [capService.id]: capService,
  [capHarden.id]: capHarden,
  [capShip.id]: capShip,
}

export const getScene = (id: string): SceneSpec | undefined => scenes[id]
