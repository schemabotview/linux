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

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}

// The slug for a section is `<courseId>-<sectionId>` — section IS the unit (one slide, one
// narration), so no trailing beat index.
export function slugOf(course: Course, section: Section): string {
  return `${course.id}-${section.id}`
}

export function allSections(course: Course): { section: Section; slug: string }[] {
  return course.sections.map((section) => ({ section, slug: slugOf(course, section) }))
}
