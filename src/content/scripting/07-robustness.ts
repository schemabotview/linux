import type { Section } from '../types'

export const robustness: Section = {
  id: 'robustness',
  title: 'Robustness: fail fast & clean up',
  scene: 'fail-fast',
  slide: `## Robustness: fail fast & clean up

The gap between a script that *works* and one you can *trust* is error handling. Two habits close most of it.

### The safety header — put it at the top of every script
- **\`set -euo pipefail\`**:
  - **\`-e\`** — exit the instant **any** command fails (don't blunder on after an error)
  - **\`-u\`** — error on an **unset** variable (catches typos like \`$flie\` before they wipe the wrong path)
  - **\`-o pipefail\`** — a failing stage makes the **whole pipe** fail (else only the last command's status counts)

### Clean up with \`trap\`
- **\`trap 'rm -f "$tmp"' EXIT\`** — run cleanup on **any** exit: success, error, or \`Ctrl-C\` (the signals from Course 4)
- No more temp files left behind when a script dies partway

Fail fast, clean up always. The last touches: proper options and debugging.`,
  narration:
    'Here\'s a hard truth about shell scripts: by default, bash is dangerously forgiving. If a command in the middle of your script fails, bash just shrugs and runs the next line anyway — so a backup script whose copy step failed will cheerfully go on to delete the originals, because it never noticed the copy didn\'t happen. Closing that gap is what turns a script into something you can trust, and two habits handle most of it. The first is a single line you should put at the top of essentially every script you write, right after the shebang: set dash-e-u-o pipefail. It\'s three safety switches bundled together. Dash-e makes the script exit immediately the moment any command fails, instead of blundering onward — so that broken backup stops before it does harm. Dash-u makes it an error to use a variable that was never set, which catches typos: if you misspell dollar-file as dollar-flie, instead of silently expanding to an empty string — and possibly running rm on the wrong path — the script stops and tells you. And dash-o pipefail fixes a sneaky default about pipes: normally a pipeline\'s success is judged only by its last command, so a failure earlier in the pipe goes unnoticed; pipefail makes the whole pipeline fail if any stage fails. Those three switches, set dash-e-u-o pipefail, prevent a huge fraction of real-world script disasters, and typing them should become pure muscle memory. The second habit is cleaning up after yourself, no matter how the script ends, and the tool for that is trap, which connects back to the signals we learned in the processes course. A script often creates temporary files, and if it dies partway — an error, or someone hitting Control-C — those temp files get left behind as litter. With trap, you register a cleanup command to run automatically whenever the script exits, for any reason: trap, then your cleanup like remove the temp file, then the word EXIT. Because EXIT fires on normal completion, on an error triggered by dash-e, and on an interrupt from Control-C alike, your cleanup always runs. Fail fast with the safety header, and always clean up with a trap — together they take you most of the way from a fragile script to a dependable one. There are just a couple of finishing touches left: giving your script proper command-line options, and knowing how to debug it when it misbehaves.',
}
