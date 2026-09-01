import type { Section } from '../types'

export const argumentsSection: Section = {
  id: 'arguments',
  title: 'Stage 2 — Arguments',
  scene: 'cap-arguments',
  focus: 'st-arguments',
  slide: `## Stage 2 — Arguments

A real tool is **configurable**. Give it sensible defaults, then let flags override them — the \`getopts\` pattern from Course 7.

### Defaults first
- \`LINES=20\`, \`OUTPUT="-"\` (stdout), \`VERBOSE=0\` — it works with **no** arguments at all

### Flags override — \`getopts\`
- **\`-n LINES\`** how many log lines · **\`-o FILE\`** where to write · **\`-v\`** verbose · **\`-h\`** help
- \`while getopts "n:o:vh" opt\` — the \`:\` after \`n\`/\`o\` marks options that **take a value** (in \`$OPTARG\`)

### A real \`usage()\`
- A **here-doc** prints clean multi-line help; \`-h\` shows it and exits \`0\`, a bad flag shows it on **stderr** and exits \`1\`

Configurable and self-documenting. Now the tool needs something to report on — let's gather the data.`,
  narration:
    'Stage two makes the tool configurable, because a real command-line utility isn\'t rigid — it adapts to what the user needs, through options. The pattern is exactly the one from the scripting course: sensible defaults first, then flags that override them. So we set defaults at the top — LINES to twenty, meaning summarize the last twenty log lines; OUTPUT to a single dash, our convention for print to standard output; and VERBOSE off. The crucial property here is that with these defaults in place, the tool works perfectly with no arguments at all — just run sysreport and it does something reasonable. That\'s good design: zero-config by default, configurable when you want. Then we parse the flags with getopts, looping over an option string of n-colon-o-colon-v-h. Remember the colon means that option expects a value, so dash-n and dash-o each take an argument — the number of lines, and the output file — which getopts hands us in the OPTARG variable, while dash-v and dash-h are simple on-off switches. A case statement inside the loop assigns each one. And we write a proper usage function using a here-doc — that\'s the cat with the double-less-than EOF syntax that lets you print a clean block of multi-line text — describing every option. We wire dash-h to print that help and exit zero, success, while an unrecognized flag prints the usage to standard error and exits one, failure — the correct conventions that make a tool feel professional and behave well in pipelines and scripts. So now sysreport is configurable and self-documenting; run it with dash-h and it tells you how to use it. But a reporting tool needs something to report on. Stage three is gathering the actual data.',
}
