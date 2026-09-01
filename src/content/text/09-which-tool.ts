import type { Section } from '../types'

export const whichTool: Section = {
  id: 'which-tool',
  title: 'Which tool when?',
  scene: 'which-tool',
  slide: `## Which tool when?

grep, sed, and awk overlap — but each has a clear sweet spot. Reach for the simplest one that does the job.

### A quick decision guide
- **Just finding lines?** → **\`grep\`**. Fast, simple, unbeatable at *"show me the lines with X."*
- **Find-and-replace, or delete lines?** → **\`sed\`**. The \`s///\` substitution across a stream or file.
- **Columns, conditions, or math/totals?** → **\`awk\`**. Anything with fields or accumulation.
- **Files, not contents?** → **\`find\`** (+ \`xargs\`). Reshaping between stages? → \`sort\`/\`uniq\`/\`cut\`.

### The guiding rule
- **Simplest tool that works.** A \`grep\` beats a \`sed\` beats an \`awk\` for readability when it suffices
- But don't force it — when you catch yourself abusing \`grep\`+\`cut\`+\`sort\` for column math, that's **awk** asking to be used

Fluency is knowing the whole set *and* which one fits — then piping them together.`,
  narration:
    'Because grep, sed, and awk overlap quite a bit, beginners often wonder which one they\'re supposed to use, and the honest answer is that each has a clear sweet spot, and the guiding principle is to reach for the simplest tool that does the job. Here\'s the decision guide. If all you\'re doing is finding lines — show me the lines that contain this, or match this pattern — that\'s grep, full stop. It\'s the fastest to type, the easiest to read, and unbeatable at its one job. If you need to change text — a find-and-replace, or deleting certain lines — that\'s sed, with its s-slash substitution. If your task involves columns, or comparing numbers, or any kind of arithmetic or running total — summing a field, counting by key, filtering on the third column being greater than something — that\'s awk, because it\'s the only one of the three that genuinely understands fields and math. If you\'re working with files themselves rather than their contents — locating them, deleting them, acting on them in bulk — that\'s find, usually paired with xargs. And when you need to reshape data between stages — slicing columns, ordering, deduplicating — that\'s the sort, uniq, cut family. The rule to internalize is: use the simplest tool that works. A solution built from grep is easier to read and reason about than one built from sed, which is easier than one built from awk, so if grep suffices, use grep. But — and this is the flip side — don\'t force the simple tool past its limits. The tell is when you find yourself stacking up grep and cut and sort and a second grep, all to do something with columns and counts; that awkward stack is awk quietly asking to be used, and rewriting it as a single clean awk expression is almost always clearer. So true fluency isn\'t just knowing all six tools — it\'s knowing which one fits the shape of the problem, reaching for the simplest that works, and then piping them together when no single one is enough. Let\'s wrap up.',
}
