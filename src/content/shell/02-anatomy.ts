import type { Section } from '../types'

export const anatomy: Section = {
  id: 'anatomy',
  title: 'Command · options · arguments',
  scene: 'command-anatomy',
  slide: `## Command · options · arguments

A command line is just **words separated by spaces**. The first word is the program; the rest modify or feed it — \`ls -l -a /etc\` is one command, two options, one argument.

### Options come in two styles
- **Short**: a dash + a letter — \`-l\`, \`-a\` — and they **bundle**: \`-la\` = \`-l -a\`
- **Long**: two dashes + a word — \`--all\`, \`--help\` (clearer in scripts)
- Some take a value: \`--width=80\` or \`-o output.txt\`

### Arguments
- The **things** the command acts on — files, directories, text, URLs
- \`--help\` (or \`man <cmd>\`) shows every option a command accepts

Command, options, arguments — just words. Next: how the shell *finds* that first word.`,
  narration:
    'Let\'s take a command apart. The beautiful thing is that a command line is nothing more than words separated by spaces — that\'s the entire syntax. Take the line ls space dash-l space dash-a space slash-etc. The very first word is always the command: the name of the program you want to run — here, ls, which lists files. Everything after it falls into two buckets. Options, also called flags, change how the command behaves — they almost always start with a dash. Dash-l tells ls to use the long format with permissions and sizes; dash-a tells it to show hidden files too. And arguments are the things the command acts on — here, slash-etc, the directory you want listed. So: what to run, how to run it, and what to run it on. A couple of practical details about options, because they trip people up. Short options are a single dash and a single letter, and a handy trick is that you can bundle them: dash-l dash-a can be squished into dash-l-a, one dash, both letters. Long options use two dashes and a whole word — dash-dash-all, dash-dash-help — and while they\'re more to type, they\'re much clearer, especially in scripts where someone else has to read them later. Some options take a value of their own, like dash-dash-width equals eighty, or dash-o followed by a filename. And here\'s the most useful habit you can build starting today: almost every command accepts dash-dash-help, and for the fuller story there\'s the man command — man followed by a command name opens its manual page. When you don\'t know what a command or option does, those two are how you find out, without ever leaving the terminal. So that\'s the anatomy — command, options, arguments, all just words. But when you type ls, how does the shell actually know where the ls program lives on the disk? That\'s the next piece.',
}
