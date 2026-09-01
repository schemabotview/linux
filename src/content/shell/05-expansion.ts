import type { Section } from '../types'

export const expansion: Section = {
  id: 'expansion',
  title: 'Expansion: globs, variables & $( )',
  scene: 'expansion-rewrite',
  slide: `## Expansion: globs, variables & $( )

Before running anything, the shell **rewrites** your words. This is the shell's superpower — and its most common surprise.

### Globs — filename wildcards
- \`*\` = any characters, \`?\` = one, \`[abc]\` = a set: \`*.txt\`, \`img_??.png\`, \`[A-Z]*\`
- The **shell** expands these into a list of matching filenames — **the command never sees the \`*\`**
- \`ls *.txt\` → the shell runs \`ls a.txt b.txt c.txt\`

### Variables
- \`$HOME\`, \`$USER\`, \`$PATH\` — the shell replaces \`$name\` with its value
- Set your own: \`name=Sam\` (no spaces!) then \`echo $name\`; \`export\` to pass it to child programs

### Command substitution
- \`$(command)\` runs it and drops its **output** right into the line
- \`echo "Today is $(date)"\` · \`files=$(ls | wc -l)\`

One rule explains a lot: expansion happens **in the shell**, before the program runs.`,
  narration:
    'Expansion is where the shell earns its keep, and where it surprises people who don\'t know it\'s happening. After splitting your line into words, the shell inspects those words and rewrites several kinds of them before anything runs. The first kind is globs — filename wildcards. The star means match any run of characters, a question mark matches exactly one character, and square brackets match any character from a set. So star-dot-txt means every filename ending in dot-txt. Here is the part that trips everyone up at least once: it is the shell that expands the glob, not the command. When you type ls star-dot-txt, the shell first looks in the current directory, finds a-dot-txt, b-dot-txt, c-dot-txt, and rewrites your line into ls a-dot-txt b-dot-txt c-dot-txt — and only then runs ls. The ls program never sees a star at all; it just receives a list of real filenames. This is why the same star behaves identically for every command — it\'s the shell doing the work, uniformly, before the command ever starts. The second kind is variables. When the shell sees a dollar sign followed by a name, it substitutes that variable\'s value. Dollar-HOME becomes the path to your home directory, dollar-USER your username. You can make your own variables too — just name equals value, and critically, no spaces around the equals sign, because remember, spaces are how the shell splits words. Then dollar-name gives you the value back. One subtlety: a plain variable is only visible to the current shell; if you want a program you launch to see it, you export it. The third kind is the cleverest: command substitution, written dollar-parenthesis command close-parenthesis. The shell runs the command inside, captures whatever it printed, and drops that text right into your line in place of the whole expression. So echo quote today is dollar-paren date close-paren runs the date command and splices today\'s date into your sentence. Or you can capture output into a variable — files equals dollar-paren ls pipe wc dash-l. So three forms of expansion — wildcards, variables, and command output — and one rule that ties them together and saves you endless confusion: all of it happens inside the shell, before your program ever runs. Which leads straight to the question: what if you want a star or a dollar sign to be taken literally, not expanded? For that, you need quoting.',
}
