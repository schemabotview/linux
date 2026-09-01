import type { Section } from '../types'

export const youAreHere: Section = {
  id: 'you-are-here',
  title: 'You are here',
  scene: 'script-layers',
  slide: `## You are here

You can now write **real, robust shell scripts** — turning everything you've learned into tools that run themselves.

### What you can now do
- Make a runnable program — **shebang**, \`chmod +x\`, \`./run\` — with **variables** & **arguments** (\`$1\`, \`$@\`)
- Make decisions (**\`if\`**, \`[[ ]]\`, \`case\`), repeat work (**\`for\`/\`while\`/\`read\`**), and organize with **functions** (\`local\`)
- Harden it: **\`set -euo pipefail\`**, **\`trap\`** cleanup, **\`getopts\`**, \`bash -x\`, and **\`shellcheck\`**

### The road ahead
- **Project** — the capstone: combine *every* course into one real tool, built & shipped end to end
- Boot → shell → filesystem → processes → text → admin → **scripting** — it all converges next

You can automate the machine now. Next: put it **all** together and ship a real Linux tool.`,
  narration:
    'Here\'s the whole toolkit of shell scripting, and you can now write real programs in bash. You can take a file of commands and make it a runnable tool, with a shebang, the execute bit, and a proper invocation, feeding it inputs through variables and command-line arguments. You can make it think — branching with if and the double-bracket test and case, all built on the exit-code notion of truth. You can make it repeat work with for and while loops, including that essential idiom for reading a file line by line. You can organize it with functions, scoping their variables with local and returning either an exit code or captured data. And, most importantly, you can make it robust — leading every script with set dash-e-u-o pipefail so it fails fast, trapping EXIT to always clean up, parsing options properly with getopts, tracing bugs with bash dash-x, and letting shellcheck catch your mistakes before they cost you. That\'s the difference between a fragile snippet and a tool you can trust to run on its own. And notice what\'s happened across this whole series: we started at the power button, learned the shell, mapped the filesystem, mastered processes, wielded the text tools, and learned to administer a box — and now, with scripting, we have the thread that ties every one of those together, because a real script uses all of them at once. That\'s exactly what the final course is: the capstone, where we build one genuine, complete Linux tool from scratch, weaving in every single thing you\'ve learned, from boot-time concepts to text pipelines to systemd services. You can automate the machine now. In the last course, let\'s put it all together and ship something real.',
}
