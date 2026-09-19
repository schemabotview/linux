import { kernel } from './kernel'
import { shell } from './shell'
import { filesystem } from './filesystem'
import { processes } from './processes'
import { text } from './text'
import { admin } from './admin'
import { scripting } from './scripting'
import { project } from './project'
import type { Course, Section } from './types'

// The course catalog, in syllabus order. → past a course's last section rolls into the next course's
// first. Courses are added here as they're authored (slice by slice): kernel → shell → filesystem →
// processes → text → admin → scripting → project.
export const COURSES: Record<string, Course> = {
  [kernel.id]: kernel,
  [shell.id]: shell,
  [filesystem.id]: filesystem,
  [processes.id]: processes,
  [text.id]: text,
  [admin.id]: admin,
  [scripting.id]: scripting,
  [project.id]: project,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract the recorder drives, so it cannot be a per-repo decision. Re-exported here because
// this module is what the app and the scripts already import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
