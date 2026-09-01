import type { Section } from '../types'

export const quoting: Section = {
  id: 'quoting',
  title: 'Quoting: turning expansion off',
  scene: 'quoting-off',
  slide: `## Quoting: turning expansion off

Quoting is how you tell the shell **"treat this literally."** It's the flip side of expansion — and the cure for spaces and special characters.

### Three ways to quote
- **Double quotes** \`"…"\` — block **globbing** and **word-splitting**, but *still* expand \`$variables\` and \`$(…)\`
- **Single quotes** \`'…'\` — **everything** literal; no expansion at all
- **Backslash** \`\\\` — escape one character: \`\\*\`, \`\\$\`, \`\\ \` (a literal space)

### When it matters
- Filenames with spaces: \`rm "my file.txt"\` (unquoted → two arguments → wrong)
- **Always quote your variables**: \`"$file"\` — an unquoted \`$file\` re-splits if the value has spaces (the #1 shell bug)
- Literal specials: \`echo '$5.00 is 50% off'\` prints it verbatim

Expansion and quoting are two halves of one idea: the shell rewrites your line — unless you say don't.`,
  narration:
    'So expansion is powerful, but sometimes you want the shell to leave your text completely alone — you actually mean a literal dollar sign, or a filename that really does contain a space. That\'s what quoting is for: it\'s how you switch expansion off. There are three ways to do it, and the differences between them matter. Double quotes are the moderate option: they stop word-splitting and glob expansion, so a filename with spaces stays a single argument and a star stays a star — but, importantly, they still allow variable and command substitution. So inside double quotes, dollar-HOME still becomes your home path. That makes double quotes the everyday choice: safe against spaces, but still able to use your variables. Single quotes are the absolute option: everything inside them is taken one hundred percent literally, no expansion of any kind — a dollar sign is just a dollar sign, a star is just a star. Use single quotes when you want text exactly as written. And the backslash escapes just the single next character, so backslash-star is a literal star, backslash-space is a literal space. Now, where does this actually bite you in practice? Two places, constantly. First, filenames with spaces: if you type rm space my space file dot txt, the shell splits that into two arguments and tries to remove two things, neither named correctly. Quote it — rm quote my file dot txt quote — and it\'s one argument. Second, and this is the single most common bug in all of shell scripting: always put double quotes around your variables. If a variable\'s value contains spaces and you write it unquoted, the shell re-splits that value into multiple words after substituting it, and your command silently does the wrong thing. Writing dollar-file in double quotes prevents that entirely. Get in the habit now: variables go in double quotes, almost always. So step back and see the symmetry — expansion and quoting are two halves of one simple idea. The shell rewrites your line by default; quoting is how you tell it not to. Now that the line is fully split and expanded, the shell is finally ready to actually run something.',
}
