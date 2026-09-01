import type { Scene } from '../../render-engine'
import { osReferee } from './os-referee'
import { firmwareHandoff } from './firmware-handoff'
import { grubLoads } from './grub-loads'
import { kernelWakes } from './kernel-wakes'
import { pidOneTree } from './pid-one-tree'
import { distroAnatomy } from './distro-anatomy'
import { syscallDoor } from './syscall-door'
import { fourManagers } from './four-managers'
import { driversToMetal } from './drivers-to-metal'
import { kernelRecap } from './kernel-recap'

// Scenes for the `kernel` course. Every one spreads the shared `machine-stack` board and sets
// `Section.focus` to the rung or layer its section is about — the same technique as the capstone, and
// for a stronger reason: this course's narration NAMES the board repeatedly ("the numbered ladder up
// the left side", "the red bar in the middle of the stack"). The audio is already generated, so the
// picture is the constraint, not the choice. Each scene then adds its own band underneath, so no two
// sections are the same frame.
export const kernelScenes: Scene[] = [
  osReferee,
  firmwareHandoff,
  grubLoads,
  kernelWakes,
  pidOneTree,
  distroAnatomy,
  syscallDoor,
  fourManagers,
  driversToMetal,
  kernelRecap,
]
