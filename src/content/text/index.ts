import type { Course } from '../types'
import { unixPhilosophy } from './01-unix-philosophy'
import { grep } from './02-grep'
import { regex } from './03-regex'
import { sed } from './04-sed'
import { awk } from './05-awk'
import { reshape } from './06-reshape'
import { findXargs } from './07-find-xargs'
import { pipeline } from './08-pipeline'
import { whichTool } from './09-which-tool'
import { youAreHere } from './10-you-are-here'

// text — the toolkit that turns logs into answers. Ten sections: the philosophy (§1), then the tools
// one at a time — grep (§2) and the regex it speaks (§3), sed (§4), awk (§5), the supporting cast (§6),
// find and xargs (§7) — and then the real skill, composing them into one line (§8) and knowing which
// one to reach for (§9), plus the bookend.
// Course COMPLETE — 10 sections, 10 scenes, 10 wavs (19.1 min).
export const text: Course = {
  id: 'text',
  title: 'Text processing & pipelines',
  sections: [
    unixPhilosophy,
    grep,
    regex,
    sed,
    awk,
    reshape,
    findXargs,
    pipeline,
    whichTool,
    youAreHere,
  ],
}
