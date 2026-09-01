import type { Section } from '../types'

export const conditionals: Section = {
  id: 'conditionals',
  title: 'Conditionals',
  scene: 'zero-is-true',
  slide: `## Conditionals

Decisions in bash hinge on the idea from Course 2: **exit code \`0\` = success = "true."**

### \`if\` runs on an exit code
- \`if <command>; then … fi\` — runs the branch when the command **succeeds** (exit 0)
- \`if grep -q error log; then …\` — the condition is a **real command**

### \`[[ … ]]\` is the test command
- Files: \`[[ -f path ]]\` exists · \`-d\` dir · \`-z "$s"\` empty string
- Strings: \`[[ $a == foo ]]\` · \`!=\` · \`=~\` (regex)
- Numbers: \`[[ $n -gt 5 ]]\` (\`-gt -lt -ge -le -eq -ne\`)

### \`&&\` / \`||\` and \`case\`
- \`mkdir -p out && cd out\` (and-then) · \`ping -c1 h || echo down\` (or-else)
- **\`case\`** matches one value against patterns — perfect for a \`start|stop\` argument

Decisions made. To *repeat* work over many items, we need loops.`,
  narration:
    'Now the script needs to make decisions, and bash conditionals work in a way that\'s a little surprising until it clicks, and then it feels elegant. The whole thing is built on the exit code idea from the shell course: every command returns a status, zero for success, non-zero for failure. And bash defines true as an exit code of zero. So when you write if, followed by a command, then, and a body — the body runs if that command succeeds, if it exits zero. The condition isn\'t some special boolean expression; it\'s a real command whose success or failure decides the branch. So you can write if grep dash-q error log, then do something — and it runs that something only when grep actually found the pattern, because grep exits zero when it finds a match. That\'s genuinely powerful: any command at all can be your condition. But most of the time you want to test a fact — does this file exist, are these two strings equal, is this number bigger than that one — and for those there\'s a built-in test written with double square brackets. And here\'s the key realization: those double brackets are themselves just a command, one that succeeds or fails, which is why they slot right into an if. Inside them you have a vocabulary of tests. For files: dash-f checks a file exists, dash-d a directory, dash-z whether a string is empty — handy for catching a missing argument. For strings: double-equals for equality, exclamation-equals for not-equal, and even equals-tilde for a regex match. And for numbers, because bash distinguishes them from strings, you use the lettered operators: dash-g-t for greater than, dash-l-t for less than, dash-e-q for equal, and so on. A full if can chain if, elif, else, closed with fi, which is if spelled backwards. There are two lighter-weight forms worth knowing. The and-and and or-or operators let you conditionally run one command based on another right on a single line: mkdir dash-p out and-and cd out means make the directory and, only if that succeeds, enter it; ping or-or echo unreachable means try the ping, and if it fails, print the message. And for matching a single value against several possibilities, there\'s case, which is far cleaner than a stack of elifs — it\'s the natural way to handle a script that takes an argument like start, stop, or restart, matching each and falling through to a usage message for anything else. So the script can now decide. The next essential is repeating work — doing something for every file, every line, every item — and that\'s loops.',
}
