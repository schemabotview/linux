import type { Section } from '../types'

export const theLoop: Section = {
  id: 'the-loop',
  title: 'The shell\'s read-eval loop',
  scene: 'eval-stages',
  slide: `## The shell's read-eval loop

Here's the whole machine. Every line you type walks this path top to bottom, then the loop returns to the prompt for the next.

### The stages
1. **Read** the line, **split** it into words on spaces (command + args)
2. **Expand** the words — globs, variables, \`$(…)\` (next section)
3. **Find** the command — builtin, else search \`PATH\`
4. **Run & wait** — fork a child, exec the program, wait, collect \`$?\`

### It starts by splitting
- \`ls -l *.txt\` becomes the words \`ls\`, \`-l\`, \`*.txt\` — **word-splitting** on whitespace
- This is why **spaces matter** and why filenames with spaces need quoting

The order is the whole point: the shell **transforms** your line *before* it ever runs anything.`,
  narration:
    'Now let\'s see the whole machine at once, because understanding this one diagram will save you from a hundred confusing bugs. When you type a line and press enter, the shell doesn\'t just blindly run it — it processes it through a fixed sequence of stages, every single time, and then loops back to the prompt for your next line. Here\'s the order. First it reads the line and splits it into words, breaking on spaces. Second, it expands those words — this is where wildcards, variables, and other substitutions get filled in, and it\'s a big enough deal that it\'s the next thing we\'ll cover. Third, it figures out what the first word actually refers to: is it a builtin, or does it need to go search PATH. And fourth, it runs the command and waits for it to finish, collecting that exit code. The crucial insight — the thing most beginners never learn explicitly — is that all of this transformation happens before your program ever runs. The program never sees what you typed; it sees the result after the shell has chopped and expanded it. Look at the first stage, splitting. When you type ls space dash-l space star-dot-txt, the shell splits it on the spaces into three separate words: ls, dash-l, and star-dot-txt. This is called word-splitting, and it\'s why spaces are so significant in the shell — they\'re the delimiter. It\'s also the reason a filename with a space in it, like my document dot txt, causes trouble: the shell would split it into two words, my and document, and hand your command two arguments instead of one. That\'s a preview of why quoting exists. But first, let\'s look at that second stage, expansion — because it\'s where the shell does its most surprising and powerful work.',
}
