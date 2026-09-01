import type { Course } from '../types'
import { whatIsAShell } from './01-what-is-a-shell'
import { anatomy } from './02-anatomy'
import { finding } from './03-finding'
import { theLoop } from './04-the-loop'
import { expansion } from './05-expansion'
import { quoting } from './06-quoting'
import { exec } from './07-exec'
import { streams } from './08-streams'
import { pipes } from './09-pipes'
import { youAreHere } from './10-you-are-here'

// shell — driving the machine. Ten sections that walk ONE line of input all the way through:
// what the shell is (§1) and what a command is made of (§2), then the eval loop itself — find (§3),
// the four stages (§4), expansion (§5), quoting (§6), fork+exec (§7) — and finally where the output
// goes: the three streams (§8) and the redirection and pipes that reroute them (§9), plus the bookend.
// Course COMPLETE — 10 sections, 10 scenes, 10 wavs (17.7 min).
export const shell: Course = {
  id: 'shell',
  title: 'The shell & the command line',
  sections: [
    whatIsAShell,
    anatomy,
    finding,
    theLoop,
    expansion,
    quoting,
    exec,
    streams,
    pipes,
    youAreHere,
  ],
}
