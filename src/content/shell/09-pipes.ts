import type { Section } from '../types'

export const pipes: Section = {
  id: 'pipes',
  title: 'Redirection & pipes',
  scene: 'pipe-chain',
  slide: `## Redirection & pipes

Now reroute those streams — to files, or **into each other**. Pipes are the reason the Unix toolkit is so powerful.

### Redirect to files
- \`> file\` sends **stdout** to a file (**overwrite**); \`>>\` **appends**
- \`2> file\` sends **stderr**; \`> file 2>&1\` sends **both** to one place (\`&>\` is bash shorthand)
- \`< file\` feeds a file into **stdin**; \`> /dev/null\` discards a stream entirely

### Pipes — stdout → stdin
- \`a | b\` wires **a's stdout** straight into **b's stdin** — no temp file
- Chain them: \`ps aux | grep ssh | wc -l\` — *list processes → keep ssh lines → count them*
- **\`tee\`** taps a pipe: \`... | tee out.txt | ...\` saves a copy **and** passes it on

### The Unix philosophy
- Small tools that each **do one thing well**, composed with pipes into exactly the tool you need

That composition is what Course 5 (text tools) is built on. This is the heart of the shell.`,
  narration:
    'Now let\'s actually reroute those three streams, first to files. To capture a command\'s normal output, you use the greater-than sign: ls greater-than out-dot-txt takes everything ls would have printed to the screen and writes it into the file out-dot-txt instead — but be careful, a single greater-than overwrites the file completely. If you want to add to the end of a file instead of clobbering it, use two of them, greater-than greater-than, which appends. Now recall that errors travel on a separate stream, number two — so to redirect just the errors you write two-greater-than, and to send both the output and the errors to the same file you write greater-than the file, then two-greater-than-ampersand-one, which reads as send stream two to wherever stream one is now going. Bash offers a shorthand for that common case, ampersand-greater-than. You can go the other direction too: less-than feeds a file into a program\'s standard input, and there\'s a special destination called slash-dev-slash-null, the system\'s bottomless trash can — redirect a stream there and it simply vanishes, which is how you silence output you don\'t care about. So that\'s redirecting streams to and from files. But the real magic — the single feature that defines the Unix way of working — is redirecting the output of one command directly into the input of another, with no file in between. That\'s the pipe, written as a vertical bar. When you write command-a bar command-b, the shell connects a\'s standard output straight to b\'s standard input, so a\'s results flow directly into b as they\'re produced. And because each command still has its own output, you can chain as many as you like. Look at ps aux bar grep ssh bar wc dash-l: the first command lists every running process, the pipe feeds that list into grep which keeps only the lines mentioning ssh, and another pipe feeds those into wc dash-l which counts them — so the whole chain answers how many ssh-related processes are running, built from three simple tools that each knew nothing about the others. There\'s even a handy tool called tee, which sits in the middle of a pipe and splits it: it writes a copy of what\'s passing through to a file while also passing it along to the next command, so you can save an intermediate result without breaking the chain. And this is the Unix philosophy in one sentence: build small tools that each do one thing well, then compose them with pipes into exactly the tool you need for the moment. That idea is so central that an entire course later in this series — the text-processing tools — is nothing but a deep dive into the commands you\'ll be piping together. This, right here, is the beating heart of the shell. Let\'s step back and take in the whole thing.',
}
