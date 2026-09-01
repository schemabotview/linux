import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here',
  scene: 'shell-recap',
  slide: `## You are here

You can now **drive** a Linux machine — and, more importantly, you know what the shell does with every line you type.

### What you can now do
- Read a command as **command · options · arguments**, and find it via **\`PATH\`** / \`type\`
- Predict **expansion** (globs, \`$vars\`, \`$(…)\`) and control it with **quoting** — always quote \`"$vars"\`
- Read **exit codes** (\`$?\`), run jobs in the **background** (\`&\`, \`bg\`/\`fg\`)
- Reroute **streams** (\`>\`, \`>>\`, \`2>\`, \`<\`) and compose tools with **pipes** (\`|\`, \`tee\`)

### The road ahead
- **Filesystem** — the tree you've been navigating: paths, permissions, links, mounts
- **Processes → Text → Admin → Scripting → Project** — running work, transforming data, and automating it all

You can type to the machine now. Next: **the filesystem** those commands live and act in.`,
  narration:
    'Here\'s the whole shell in one picture, and it should feel very different now than it did twenty minutes ago. You type a line; the shell splits it into words on the spaces. It expands those words — filling in wildcards from the filenames on disk, substituting your variables, running any command substitutions — unless you\'ve quoted them to say leave this literal, and you now know to keep your variables in double quotes to stay safe. Then it resolves the first word — a builtin, or a program found by searching PATH — and it runs that program by forking a child and exec-ing into it, waiting for the result and remembering the exit code in dollar-question-mark. And all along, you can reroute the three streams every program is born with — standard input, output, and error — sending them to files with the redirection operators, or piping the output of one command straight into the next to compose small tools into powerful ones. That whole cycle, repeating at every prompt, is the shell. You can genuinely drive a Linux machine now. From here the series builds outward. Next we\'ll map the filesystem — the tree of files and directories that all these commands have been quietly navigating and acting upon, and the permission system that guards it. After that, processes, so you can see and control the programs you launch; then a deep course on the text tools you\'ve just started piping together; then administering a real system, automating it with scripts, and finally building a real tool of your own. You\'ve learned to talk to the machine. Next, let\'s map the world your commands live in.',
}
