import type { Section } from '../types'

export const exec: Section = {
  id: 'exec',
  title: 'Finding & running the command',
  scene: 'fork-exec-wait',
  slide: `## Finding & running the command

The line is now final words. The shell resolves the command and runs it — the same **fork + exec** the kernel gave PID 1 (Course 1).

### Resolve, then run
- **Builtin?** run it in the shell itself. Otherwise **search \`PATH\`** for the binary
- **\`fork\`** — the shell clones itself into a child process
- **\`exec\`** — the child *replaces itself* with the requested program
- **\`wait\`** — the shell pauses until the child exits, then reads its **\`$?\`**

### Job control — don't always wait
- End a line with **\`&\`** to run it in the **background** (the shell doesn't wait)
- **\`Ctrl-Z\`** suspends the foreground job; **\`bg\`**/\`fg\` resume it; **\`jobs\`** lists them
- **\`Ctrl-C\`** sends an interrupt to kill the foreground job (a signal — Course 4)

Then the loop returns to the prompt. That cycle *is* the shell. Next: wiring commands together.`,
  narration:
    'The line has been split and fully expanded — the shell now has its final list of words, and it\'s ready to actually run something. First it resolves the command: if that first word is a builtin like cd, the shell just does it internally and we\'re done. Otherwise it searches PATH, finds the program on disk, and runs it — and the way it runs it is exactly the fork-and-exec mechanism we met in Course one when the kernel started PID one. It goes like this. The shell forks: it makes a clone of itself, a child process, nearly identical to the parent. Then that child execs: it throws away its own program and replaces itself, in place, with the program you asked for — ls, or grep, or whatever it was. So now there\'s a child process that has become ls. Meanwhile the parent shell waits: it pauses and does nothing until the child finishes, and when the child exits, the shell collects its exit code into dollar-question-mark. Then, and only then, the shell prints the prompt again, and the whole loop begins anew. That fork, exec, wait cycle, over and over, is the shell. Now, waiting isn\'t always what you want — some commands take a long time, and you don\'t want your terminal frozen. That\'s what job control is for. If you end a command with an ampersand, the shell launches it and does not wait — it runs in the background and hands you the prompt back immediately. If you started something in the foreground and wish you hadn\'t, Control-Z suspends it, and then you can type bg to let it continue in the background, or fg to bring it back to the foreground; the jobs command lists everything you\'ve got running. And Control-C is the emergency stop — it interrupts and usually kills whatever\'s running in the foreground. Those keystrokes are actually sending signals to the process, which is a whole topic we\'ll open up in the processes course. So that\'s the complete life of a single command line. But the real power of the shell isn\'t running one command — it\'s wiring the output of one command into the input of the next. To do that, we need to talk about streams.',
}
