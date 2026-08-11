import type { Course } from 'reveal-engine'
import { kernel } from './kernel.ts'
import { shell } from './shell.ts'
import { filesystem } from './filesystem.ts'
import { processes } from './processes.ts'
import { text } from './text.ts'
import { admin } from './admin.ts'
import { scripting } from './scripting.ts'
import { project } from './project.ts'

// This concept's course catalog. Each course is routed by id (#/<id>) and shown on the index by
// title. All courses share the concept's scene registry (scenes/index.ts).
//
// The proposed 8-course arc (the real operator's workflow —
// boot → drive → navigate → run → transform → administer → automate → ship;
// see COURSE-PLAN.md for the scene inventory + rationale):
//   1. kernel      — Boot & the kernel                                       [Boot]
//   2. shell       — The shell & command line                               [Drive]
//   3. filesystem  — The filesystem & permissions                           [Navigate]
//   4. processes   — Processes & signals                                    [Run]
//   5. text        — Text processing & pipelines                            [Transform]
//   6. admin       — Users, services & networking                           [Administer]
//   7. scripting   — Shell scripting                                        [Automate]
//   8. project     — Capstone: ship a real CLI tool                         [Ship]
// Each authored Course is added to `courses` (order = syllabus order) with a one-line BLURBS entry.
export const CONCEPT = 'Linux'

export const courses: Course[] = [kernel, shell, filesystem, processes, text, admin, scripting, project]

export const courseById = (id: string): Course | undefined => courses.find((c) => c.id === id)

// One-line blurb per course (concept-specific copy — the engine's Course type carries only
// id/title/sections). Consumed by the app landing (CourseIndex). Keyed by course id.
export const BLURBS: Record<string, string> = {
  kernel: 'From the power button to a prompt — firmware, GRUB, the kernel, PID 1, and the syscall boundary between your programs and the machine.',
  shell: 'Drive the machine by typing to it — command anatomy, PATH, expansion & quoting, exit codes, and composing tools with streams, redirection & pipes.',
  filesystem: 'One tree, everything a file — the FHS map, paths & navigation, permissions & ownership, inodes & links, and how mounts assemble the tree.',
  processes: 'Programs brought to life — fork & exec, process states & the scheduler, zombies & orphans, signals, and watching & steering with ps, top, nice & cgroups.',
  text: 'The Unix text toolkit — grep & regex, sed, awk, sort/uniq/cut/wc/tr, find & xargs — and composing them into one-line data pipelines.',
  admin: 'Operate a real box — users & sudo, systemd services & journalctl, package management, cron & timers, and networking with ip, ss, curl & ssh.',
  scripting: 'Turn commands into programs — shebang & variables, conditionals, loops & functions, and robust bash with set -euo pipefail, traps, getopts & shellcheck.',
  project: 'The capstone — build & ship sysreport, a system-health & log-summary CLI, end to end, weaving in every prior course from boot to systemd.',
}
