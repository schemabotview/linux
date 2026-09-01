import type { Section } from '../types'

export const findXargs: Section = {
  id: 'find-xargs',
  title: 'find & xargs',
  scene: 'find-and-xargs',
  slide: `## find & xargs

The last pair operates on **files**, not their contents: **\`find\`** locates them across the tree; **\`xargs\`** acts on the list.

### \`find\` — walk the tree by test
- \`find . -name '*.log'\` (name) · \`-type f\`/\`-type d\` · \`-size +100M\` · \`-mtime -7\` (changed < 7 days)
- Combine tests; then **act**: \`-delete\`, or **\`-exec cmd {} \\;\`** (run a command per match, \`{}\` = the file)

### \`xargs\` — a list on stdin → arguments
- Many commands take arguments, not stdin. \`xargs\` bridges: \`find … | xargs gzip\` runs \`gzip file1 file2 …\`
- \`grep -rl TODO . | xargs wc -l\` — count lines of every file containing TODO
- **Spaces-safe**: \`find … -print0 | xargs -0 …\` (the pro habit)

Now you have the whole toolkit. The real skill isn't any one tool — it's **wiring them together**.`,
  narration:
    'The final pair of tools works at a different level than the others. Everything so far — grep, sed, awk, the reshapers — operates on the text inside files. find and xargs operate on the files themselves. find walks a directory tree recursively and keeps the files that pass the tests you give it. You can match by name — find dot dash-name star-dot-log finds every log file below the current directory — by type, with dash-type-f for regular files or dash-type-d for directories, by size, with dash-size-plus-one-hundred-M for files over a hundred megabytes, or by age, with dash-mtime-minus-seven for files modified in the last seven days. And you can combine these tests to narrow things down precisely — every dot-log file over ten megabytes not touched in a month, say, which is exactly how you hunt down what\'s filling a disk. Once find has its list of matching files, you can act on them. The simplest is dash-delete, which removes them. More generally, dash-exec runs a command on each match, with the curious syntax of a pair of curly braces standing in for each filename and a backslash-semicolon marking the end of the command — so find with dash-name star-dot-py dash-exec grep dash-l TODO curly-braces backslash-semicolon runs grep on every Python file to find which ones contain TODO. Now, closely related is xargs, and it solves a specific, common mismatch. Many commands — gzip, rm, wc — expect their inputs as command-line arguments, not on standard input, so you can\'t just pipe a list of filenames into them directly. xargs is the adapter: it reads a list of items from standard input and turns them into arguments for a command. So find star-dot-log piped into xargs gzip becomes gzip file-one file-two file-three, compressing them all in one go. Or grep dash-r-l TODO dot, which lists every file containing TODO, piped into xargs wc dash-l, to count the lines in each of those files. One professional habit worth adopting from the start: filenames can contain spaces, which normally break this list-passing, so the safe idiom is find with dash-print-zero piped into xargs dash-zero, which separates filenames with an invisible null character instead of spaces, handling any filename correctly. And with that, you have the entire classic toolkit in hand. But here\'s the thing — knowing each tool individually is only the beginning. The real skill, the thing that makes someone look like a wizard at the terminal, is wiring them together into a single pipeline. Let\'s do exactly that.',
}
