import type { Scene } from '../render-engine'
import { kernelScenes } from './kernel'
import { shellScenes } from './shell'
import { filesystemScenes } from './filesystem'
import { processesScenes } from './processes'
import { textScenes } from './text'
import { adminScenes } from './admin'
import { scriptingScenes } from './scripting'
import { projectScenes } from './project'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as they're authored, one slice at a time.
const ALL: Scene[] = [...kernelScenes, ...shellScenes, ...filesystemScenes, ...processesScenes, ...textScenes, ...adminScenes, ...scriptingScenes, ...projectScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
