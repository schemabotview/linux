import type { Section } from '../types'

export const whatIsAShell: Section = {
  id: 'what-is-a-shell',
  title: 'What a shell is',
  scene: 'shell-repl',
  slide: `## What a shell is

Course 1 ended by handing you a **prompt**. That prompt is a program — the **shell** — and it's how you actually drive a Linux machine.

### A read-eval loop for the whole OS
- The shell **reads** a line you type, **runs** it, prints the result, and loops — a REPL for the operating system
- Every line is a **command**: a program to run, plus **options** and **arguments**
- The default shell is **\`bash\`** (others: \`zsh\`, \`fish\`) — this course is bash

### Why the command line at all
- **Precise & repeatable** — a typed command is exact, and can be saved into a script (Course 7)
- **Composable** — small commands **pipe** into big ones (later this course)
- **Everywhere** — the one interface every Linux box has, even a server with no screen

Let's name the parts of a command, then watch the shell take one apart.`,
  narration:
    'The last course ended by handing you a prompt — that little symbol blinking on the screen, waiting. It\'s time to explain what that prompt actually is, because it\'s the single most important tool you\'ll use on a Linux system. The prompt belongs to a program called the shell, and the shell is how you drive the machine by typing to it. At its heart the shell does something very simple, in a loop: it reads a line you type, it runs that line, it shows you whatever came back, and then it prints the prompt again and waits for the next line. If you took the first course, this loop should sound familiar — it\'s the same read-eval-print idea, but here it\'s driving the entire operating system instead of one language. Every line you type is a command, and a command is just a program to run, usually followed by some options that adjust how it behaves and some arguments that say what to act on. The default shell on almost every Linux system is called bash — there are others like zsh and fish, but bash is the standard and it\'s what we\'ll use throughout. Now, you might wonder why bother typing commands at all when there are graphical interfaces. Three reasons that matter enormously. First, it\'s precise and repeatable: a typed command is exact, and you can save it into a file to run again forever, which is the whole basis of automation later in this series. Second, it composes: small commands snap together into powerful ones through a mechanism called pipes, which we\'ll get to. And third, it is genuinely everywhere — every Linux machine has a shell, including the headless servers in a data center that have no screen or mouse at all; the command line is often the only way in. So let\'s start by naming the parts of a command, and then we\'ll watch the shell pull one apart, word by word.',
}
