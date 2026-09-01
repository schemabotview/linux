import type { Section } from '../types'

export const loops: Section = {
  id: 'loops',
  title: 'Loops',
  scene: 'loop-forms',
  slide: `## Loops

Loops repeat work over many items — files, lines, numbers — the heart of most automation.

### \`for\` — iterate a list
- \`for f in *.log; do … done\` — the shell expands the **glob**; \`"$f"\` each iteration (quote it!)
- \`for i in {1..5}\` — a range

### \`while\` — repeat while a command succeeds
- \`while (( n < 3 )); do … done\` — arithmetic condition
- **The file-reading idiom** (memorize it): \`while IFS= read -r line; do … done < file\` — safe, line-by-line

### \`until\`, \`break\`, \`continue\`
- \`until <cmd>; do …\` loops **until** success (e.g. wait for a host); \`break\` exits, \`continue\` skips to next

### The safety note
- Prefer globs/\`read\` over parsing \`ls\` output — and always quote \`"$f"\` (filenames have spaces)

Decisions and repetition — now organize it into reusable pieces: functions.`,
  narration:
    'Loops are where automation really earns its keep, because the whole point of a script is often to do the same thing to a hundred files, or every line of a log, without you lifting a finger a hundred times. Bash has a few loop forms. The most common is for, which iterates over a list. You write for, a variable name, in, and then a list of items, then do, a body, and done. The list can be anything the shell produces — most powerfully a glob: for f in star-dot-log walks every log file in the directory, because the shell expands that glob into the actual filenames before the loop runs, just as we learned in the shell course. Inside the loop, the variable holds each item in turn, and — you\'ll hear this refrain forever — you quote it, quote-dollar-f, because filenames can contain spaces. You can also loop over a numeric range with the brace syntax, for i in brace-one-dot-dot-five. The second form is while, which repeats its body as long as a command keeps succeeding — while such-and-such is true, keep going. With an arithmetic condition in double parentheses you get a classic counting loop. But the single most important use of while is an idiom you should simply memorize, because it\'s the correct, safe way to read a file line by line: while IFS-equals read dash-r line, do something with the line, done, with the file redirected into the loop with a less-than at the end. That precise incantation — the IFS-equals to preserve leading whitespace, the read dash-r to not mangle backslashes — reads any file, one line at a time, correctly, even lines with odd characters, and it\'s worth writing on a sticky note. There\'s also until, the mirror of while, which loops until a command finally succeeds — perfect for waiting on something, like until this host responds to a ping, keep sleeping and trying. And inside any loop, break jumps out of it entirely, while continue skips the rest of the current iteration and moves to the next. One safety habit to build: prefer looping over globs and using that read idiom over trying to parse the output of ls, which breaks on unusual filenames — and always, always quote your loop variable. So the script can now decide and repeat. As scripts grow, they need organizing into named, reusable pieces, and that\'s what functions are for.',
}
