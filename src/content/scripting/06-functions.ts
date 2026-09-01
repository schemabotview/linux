import type { Section } from '../types'

export const functions: Section = {
  id: 'functions',
  title: 'Functions',
  scene: 'code-vs-data',
  slide: `## Functions

A **function** is a reusable named block — how a script grows past a wall of top-to-bottom commands into something maintainable.

### Define & call
- \`name() { … }\` defines it; \`name arg1 arg2\` calls it — **args work exactly like a script** (\`$1\`, \`$@\`, \`$#\` inside)

### \`local\` scope
- **\`local name="$1"\`** keeps a variable inside the function — without \`local\`, bash variables are **global** and leak (a real bug source)

### Returning: code vs. data
- A function **returns an exit code** (\`0\`–\`255\`) — so it works as an \`if\` condition: \`if is_root; then …\`
- To return **data**, \`echo\` it and **capture** with \`$(…)\`: \`now=$(timestamp)\`
- Log to **stderr** (\`>&2\`) so messages don't pollute captured stdout

Now the pieces exist. The difference between a toy script and a trusted one is **robustness**.`,
  narration:
    'As a script grows past a handful of lines, a flat wall of commands top to bottom becomes hard to read and harder to maintain, especially when you find yourself repeating the same little sequence in several places. Functions solve this — they\'re reusable, named blocks of code, and they work just like the functions you know from any language, with a couple of bash-specific twists worth learning carefully. You define one by writing its name, empty parentheses, and a body in curly braces — greet, open-paren close-paren, brace, some commands, brace. Then you call it simply by writing its name, optionally with arguments after it, exactly as if it were a command. And here\'s a lovely bit of consistency: inside a function, arguments arrive as dollar-one, dollar-two, dollar-at, dollar-hash — the very same positional variables a script receives from the command line. A function is like a mini-script within your script. Now the first twist, and it\'s the source of many subtle bugs: by default, variables in bash are global. If you set a variable inside a function, it silently leaks out and can clobber a variable of the same name elsewhere in your script. The fix is the local keyword: writing local name equals dollar-one keeps that variable scoped to the function, invisible outside it. Get in the habit of declaring your function\'s variables local — it prevents a whole category of maddening bugs. The second twist is about returning values, and it trips up people coming from other languages. A bash function does not return a value the way you\'d expect — it returns an exit code, a number from zero to two-fifty-five, meaning success or failure. That\'s actually useful, because it means a function can serve directly as an if condition: define is_root to test whether you\'re the superuser, and then write if is_root, then do the privileged thing. But what if you genuinely want to return data — a computed string, a timestamp? The bash idiom is: have the function echo its result to standard output, and capture that output at the call site with dollar-parentheses, exactly like command substitution. So now equals dollar-paren timestamp runs the function and captures what it printed. This leads to one more good habit: when a function needs to print status or log messages, send them to standard error with greater-than-ampersand-two, so they don\'t accidentally get captured as the function\'s data return. So we now have every building block — variables, conditions, loops, and functions. But a script that works when everything goes right is only half a script. The thing that separates a toy from a tool you\'d trust to run unattended at 3 a.m. is robustness.',
}
