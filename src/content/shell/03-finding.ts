import type { Section } from '../types'

export const finding: Section = {
  id: 'finding',
  title: 'PATH, builtins & exit codes',
  scene: 'path-search',
  slide: `## PATH, builtins & exit codes

You type \`ls\`, not \`/usr/bin/ls\`. Two questions: where does the shell *find* it, and how does it tell you if it *worked*?

### PATH — where commands live
- **\`PATH\`** is a variable: a \`:\`-separated list of directories (\`/usr/bin:/bin:/usr/local/bin…\`)
- The shell searches them **in order** and runs the **first** match — \`which ls\` / \`type ls\` shows the winner

### Builtins vs. binaries
- Most commands are **programs** on disk (\`/bin/ls\`); some are **built into the shell** itself (\`cd\`, \`echo\`, \`export\`)
- \`cd\` *must* be a builtin — it changes **the shell's own** directory, which no separate program could do

### Exit codes — did it work?
- Every command returns a number: **\`0\` = success**, non-zero = a failure (its kind)
- The last one is in **\`$?\`**: \`ls /nope; echo $?\` → \`2\`
- This is what \`&&\` (*and-then*) and \`||\` (*or-else*) test — the basis of scripting

Now the shell knows what to run and where it is. Let's watch it process a whole line.`,
  narration:
    'Here\'s a question that seems trivial but isn\'t: when you type ls and hit enter, how does the shell know that ls is a program sitting at slash-usr-slash-bin-slash-ls? You didn\'t tell it the full path. The answer is a special variable called PATH — capital P-A-T-H. PATH holds a list of directories, separated by colons, something like slash-usr-slash-bin colon slash-bin colon slash-usr-slash-local-slash-bin. When you type a bare command name, the shell walks that list in order, checking each directory for a program by that name, and runs the very first one it finds. That ordering matters — if two directories both have a program called ls, the one earlier in PATH wins. You can see exactly which one will run with the command which ls, or type ls, and this is genuinely useful for debugging when the wrong version of something keeps running. Now, not every command is a program on disk. Some are built directly into the shell itself — these are called builtins, and the classic example is cd, for changing directory. Here\'s why cd has to be a builtin and can\'t be a separate program: cd changes the shell\'s own current directory, and a separate program runs as its own isolated process, so when it finished, its directory change would vanish along with it. Only the shell itself can change the shell\'s own state. Other builtins include echo and export. So there are two kinds of command — builtins like cd, and external binaries like slash-bin-slash-ls — and type will tell you which is which. Finally, how does a command tell you whether it succeeded? Every single command, when it finishes, hands back a number called its exit code. And the convention, which never changes, is that zero means success and any non-zero number means some kind of failure. The shell tucks the last command\'s exit code into a special variable, dollar-question-mark; run ls on a directory that doesn\'t exist, then echo dollar-question-mark, and you\'ll see a two. This little number is quietly the foundation of everything: it\'s exactly what the and-and and or-or operators test to chain commands together, and it\'s how every script you write later will know whether a step worked. So now the shell knows what to run, where to find it, and how to report back. Let\'s put it all together and watch it chew through a real line, start to finish.',
}
