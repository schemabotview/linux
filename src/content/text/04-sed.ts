import type { Section } from '../types'

export const sed: Section = {
  id: 'sed',
  title: 'sed: edit the stream',
  scene: 'sed-stream',
  slide: `## sed: edit the stream

**\`sed\`** — the *stream editor* — transforms lines as they flow past. Think "find-and-replace for pipelines."

### The \`s///\` substitution (its 90%)
- \`sed 's/foo/bar/'\` — replace the **first** \`foo\` on each line with \`bar\`
- \`sed 's/foo/bar/g'\` — **\`g\`** = every occurrence on the line (global)
- \`sed -E 's/[0-9]+/N/g'\` — the replace side is **regex-powered** too

### Print vs. edit in place
- By default sed **prints to stdout** — your file is untouched (safe to experiment)
- **\`-i\`** edits the file **in place** — powerful, and unforgiving; test *without* \`-i\` first

### Selecting lines
- \`sed -n '10,20p'\` — print only lines 10–20 · \`sed '/^#/d'\` — **delete** comment lines · \`'/^$/d'\` — drop blanks

grep finds lines; sed *rewrites* them. For anything with **columns**, though, the right tool is awk.`,
  narration:
    'If grep finds lines, sed changes them. Its name is short for stream editor, and that\'s exactly the mental model: it\'s a text editor that, instead of opening a file interactively, edits text as a stream flowing past it, applying your instructions to each line automatically. In practice, ninety percent of what anyone uses sed for is one command: substitution, written s-slash-find-slash-replace-slash. So sed space quote s-slash-foo-slash-bar-slash finds foo and replaces it with bar. By default, and this catches people, it only replaces the first occurrence on each line; to replace every occurrence, you add a g on the end, for global — s-slash-foo-slash-bar-slash-g. You can make it case-insensitive with an i flag too. And the find side, and even the replace, are regex-powered when you add dash-E, so you can do things like s-slash-bracket-zero-nine-plus-slash-N-slash-g to replace every run of digits with the letter N — masking numbers, say. Now, the single most important safety fact about sed: by default it does not touch your file at all. It reads the file, applies your transformation, and prints the result to standard output, leaving the original completely untouched. That\'s wonderful, because it means you can experiment freely — run your substitution, eyeball the output on screen, and nothing is at risk. When you\'re confident and actually want to modify the file, you add the dash-i flag, for in-place, and sed rewrites the file itself. Dash-i is powerful and it\'s permanent, so the golden rule is: always run it once without dash-i to preview, confirm the output looks right, and only then add dash-i. Beyond substitution, sed can also select and delete lines: sed dash-n with a range like ten-comma-twenty-p prints only lines ten through twenty; sed with a pattern and a d deletes matching lines, so slash-caret-hash-slash-d strips out comment lines that start with a hash, and slash-caret-dollar-slash-d removes blank lines. So grep filters, and sed rewrites — both working a line at a time. But a great deal of the text you\'ll deal with isn\'t just lines, it\'s columns: log files with fields, CSVs, tabular command output. For that kind of data there\'s a tool that\'s really a small programming language of its own — awk.',
}
