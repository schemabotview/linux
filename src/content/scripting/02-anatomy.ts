import type { Section } from '../types'

export const anatomy: Section = {
  id: 'anatomy',
  title: 'Shebang & running a script',
  scene: 'runnable-file',
  slide: `## Shebang & running a script

Three things turn a text file into a runnable program: a **shebang**, the **execute bit**, and a way to run it.

### The shebang
- The **first line**: \`#!/usr/bin/env bash\` — tells the kernel *which interpreter* runs this file
- \`#!/usr/bin/env bash\` (vs \`#!/bin/bash\`) finds bash via \`PATH\` — more portable

### Make it executable, then run
- **\`chmod +x backup.sh\`** (Course 3!) sets the execute bit
- **\`./backup.sh\`** — the \`./\` is required: the current dir isn't on \`PATH\` (a safety default)
- Or \`bash backup.sh\` without the exec bit — handy while developing

### Comments
- **\`#\`** to end of line — everything you've learned about the file *is* the documentation others read

A runnable file. Now give it memory and inputs — variables and arguments.`,
  narration:
    'Let\'s turn a plain text file into a program the system will run, which takes three things. The first is the shebang — a slightly odd name for the very first line of the script, which begins with a hash and an exclamation mark, hash-bang, followed by a path. That line tells the kernel which interpreter should run this file. For a bash script you write hash-bang slash-usr-slash-bin-slash-env bash. You might have seen the simpler hash-bang-slash-bin-slash-bash, and that often works, but the env form is more portable because it looks up bash through the PATH rather than assuming it lives in one exact spot, which matters across different systems. The kernel reads this line the moment you run the file and launches the right interpreter automatically. The second thing is the execute permission — and this connects right back to the filesystem course, where we learned that a file needs its x bit set to be runnable. So you run chmod plus-x on your script to mark it executable. The third is actually running it, and there\'s a subtlety that confuses every beginner exactly once. You\'d think you could just type the script\'s name, like you do for ls — but if you type backup.sh, the shell says command not found. Why? Because, as we learned, the shell searches PATH for commands, and for security reasons your current directory is deliberately not on PATH — otherwise a malicious file dropped in a folder could hijack a common command name. So to run a script in the current directory, you write dot-slash-backup.sh, where the dot-slash explicitly says the program is right here, in this directory. While you\'re still writing and testing a script, there\'s a shortcut that skips both the exec bit and the dot-slash: just run bash backup.sh, handing the file directly to bash — handy during development. One more essential: comments. Anything after a hash on a line is ignored by bash, and this is how you document what your script does and why — for your teammates, and for yourself six months from now, who will have completely forgotten. So now we have a file that runs. To make it useful, it needs to remember values and accept inputs — variables and arguments.',
}
