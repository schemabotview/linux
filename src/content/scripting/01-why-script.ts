import type { Section } from '../types'

export const whyScript: Section = {
  id: 'why-script',
  title: 'From commands to programs',
  scene: 'commands-to-program',
  slide: `## From commands to programs

A **script** is just commands saved in a file — the shell you already know, made **repeatable**. This is where operating Linux becomes *automating* it.

### Why script
- **Repeatable & reliable** — the same steps, run identically every time, no forgotten flag
- **Automatable** — a script + \`cron\` (Course 6) = work that happens with nobody there
- **Shareable** — hand a teammate a tool, not a wiki page of commands to paste

### It's the same shell, plus structure
- Every command, pipe, and redirect you've learned works verbatim — scripting **adds** variables, conditionals, loops, and functions
- The building blocks on this board, in order — from a runnable file to a *robust* one

The last course was doing things by hand. This one is teaching the machine to do them for you.`,
  narration:
    'Everything we did in the last course, we did by typing commands one at a time. This course is about capturing those commands into files that run themselves — and that leap, from doing to automating, is where working with Linux gets genuinely powerful. A shell script, at its heart, is nothing more exotic than a sequence of shell commands saved in a text file, so that instead of typing them over and over, you run the file. That\'s it — if you can type it at the prompt, you can put it in a script. But that simple idea unlocks three big wins. First, repeatability and reliability: a complex deployment or backup might be fifteen commands in a precise order, and doing that by hand at midnight is how mistakes happen — one forgotten flag, one skipped step. A script does the exact same thing, correctly, every single time. Second, automation: a script combined with cron, from the last course, means the work happens on schedule with no human present at all — the backup just runs. Third, sharing: instead of handing a colleague a wiki page full of commands to copy and paste and probably get wrong, you hand them a tool they can just run. And here\'s the encouraging part: scripting is not a new language you have to learn from scratch. It is the very same bash you\'ve been using all along — every command, every pipe, every redirection works identically inside a script. Scripting simply adds structure on top: variables to remember values, conditionals to make decisions, loops to repeat work, and functions to organize it. Those building blocks are what\'s on this board, and we\'ll walk them in order, building from a script that merely runs to one that\'s genuinely robust — that handles errors, cleans up after itself, and can be trusted to run unattended. Let\'s start by turning a file of commands into a real program.',
}
