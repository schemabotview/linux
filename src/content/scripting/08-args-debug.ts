import type { Section } from '../types'

export const argsDebug: Section = {
  id: 'args-debug',
  title: 'Options & debugging',
  scene: 'options-and-debug',
  slide: `## Options & debugging

The final polish: parse **options** like a real tool, and have a plan for when things break.

### \`getopts\` — proper flag parsing
- Handle \`-v\`, \`-f file\` the standard way instead of hand-rolling \`$1\` checks
- \`while getopts "vf:" opt; do case $opt in …\` — the \`:\` after \`f\` means it **takes a value** (\`$OPTARG\`)
- Pair with a **\`usage()\`** function and a \`-h\`/\`--help\` — a tool others can actually use

### Debugging
- **\`bash -x script.sh\`** (or \`set -x\`) — **trace** every line as it runs, with variables expanded: the #1 debugging tool
- **\`shellcheck script.sh\`** — a linter that catches quoting bugs, unset vars, and footguns *before* they bite. **Run it on everything.**

### The discipline
- Safety header + \`trap\` + \`getopts\` + \`shellcheck\` = a script you can hand to anyone and schedule with confidence
`,
  narration:
    'The final polish makes your script feel like a real command-line tool rather than a personal hack. First, option parsing. So far a script reads its inputs as dollar-one, dollar-two, positionally, but real tools take flags — dash-v for verbose, dash-f followed by a filename. You could hand-roll that with a pile of if statements, but bash has a built-in for exactly this called getopts, and it\'s the proper way. You loop with while getopts, giving it a short string that declares your options — something like v-f-colon, where a plain letter is a simple on-off flag and a letter followed by a colon means that option expects a value, which arrives in the variable OPTARG. Inside the loop a case statement handles each flag. Pair getopts with a small usage function that prints how to use the script, wired to a dash-h or help flag, and you\'ve got something a colleague can pick up and run without reading the source. Second, debugging — because scripts will misbehave, and staring at them rarely helps. The single most valuable debugging tool in all of shell scripting is trace mode: run your script as bash dash-x, or put set dash-x inside it, and bash prints every line as it executes, with all the variables already expanded to their actual values. Suddenly you can see exactly what the script is really doing, step by step, and the bug usually becomes obvious — you\'ll spot the empty variable, the wrong path, the condition that didn\'t fire. And there\'s one more tool that\'s frankly a superpower, and it\'s free: shellcheck. It\'s a linter for shell scripts — you run shellcheck on your file and it points out bugs before you ever hit them: unquoted variables that will break on spaces, uses of variables you never set, subtle quoting mistakes, and dozens of common footguns. Professional shell developers run shellcheck on everything, and many wire it into their editor so it flags problems as they type. Adopt it now and it will make you look far more careful than you are. Put the whole discipline together — the set dash-e-u-o safety header, a trap for cleanup, getopts for real options, and shellcheck keeping you honest — and you\'re no longer writing fragile little scripts; you\'re writing tools you can confidently hand to a teammate and schedule to run unattended at three in the morning. You can now write genuine, robust bash. Let\'s bring it all together and look ahead to the capstone.',
}
