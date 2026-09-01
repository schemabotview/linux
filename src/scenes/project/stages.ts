import type { SceneNode } from '../../render-engine'

// The nine-stage board, shared by every scene in the capstone. §1's narration promises "the nine
// stages on this board", so the board has to be real and has to be the same object in every section —
// otherwise the course's spine is a sentence rather than a picture.
//
// The studio repo lit one stage at a time with a camera. This engine has no camera, so each section
// gets its OWN scene that spreads this board and sets `Section.focus` to its own stage: the lighting
// up happens ACROSS scenes instead of within one. Node ids only need to be unique per scene, so one
// factory serves all eleven. (scripts/check-content.mjs treats a module with no top-level Scene as a
// shared node factory and puts these ids in scope for every scene — so a focus typo still fails.)
export const STAGE_IDS = {
  structure: 'st-structure',
  arguments: 'st-arguments',
  collect: 'st-collect',
  transform: 'st-transform',
  report: 'st-report',
  schedule: 'st-schedule',
  service: 'st-service',
  harden: 'st-harden',
  ship: 'st-ship',
} as const

export const stagesBoard = (): SceneNode => ({
  id: 'stages',
  label: 'sysreport — the nine stages',
  sub: 'and nearly every one is a callback to a course you have already done',
  pattern: 'group',
  cols: 3,
  children: [
    { id: STAGE_IDS.structure, label: '1 · Structure', sub: 'Course 7', variant: 'tile', pattern: 'service', icon: 'filecode' },
    { id: STAGE_IDS.arguments, label: '2 · Arguments', sub: 'Course 7', variant: 'tile', pattern: 'service', icon: 'tag' },
    { id: STAGE_IDS.collect, label: '3 · Collect', sub: 'Courses 4 & 6', variant: 'tile', pattern: 'network', icon: 'gears' },
    { id: STAGE_IDS.transform, label: '4 · Transform', sub: 'Course 5', variant: 'tile', pattern: 'network', icon: 'sigma' },
    { id: STAGE_IDS.report, label: '5 · Report', sub: 'Course 2', variant: 'tile', pattern: 'network', icon: 'scroll' },
    { id: STAGE_IDS.schedule, label: '6 · Schedule', sub: 'Course 6', variant: 'tile', pattern: 'storage', icon: 'clock' },
    { id: STAGE_IDS.service, label: '7 · Service', sub: 'Course 6', variant: 'tile', pattern: 'storage', icon: 'server' },
    { id: STAGE_IDS.harden, label: '8 · Harden', sub: 'Courses 4 & 7', variant: 'tile', pattern: 'warn', icon: 'shieldcheck' },
    { id: STAGE_IDS.ship, label: '9 · Ship', sub: 'Course 3', variant: 'tile', pattern: 'user', icon: 'boxes' },
  ],
})
