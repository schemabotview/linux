import type { Section } from '../types'

export const streams: Section = {
  id: 'streams',
  title: 'The three streams',
  scene: 'three-streams',
  slide: `## The three streams

Every program is born wired to **three streams** — three open files it can read from and write to without knowing where they go.

### stdin, stdout, stderr
- **stdin** (fd **0**) — where input comes *from* (your keyboard, by default)
- **stdout** (fd **1**) — where normal output goes (your screen, by default)
- **stderr** (fd **2**) — where **errors** go (also the screen — but a *separate* stream)

### Why two output streams
- Splitting errors from results lets you **save the data** while still **seeing the problems** — or the reverse
- \`ls /etc /nope\` prints the listing to stdout **and** the error to stderr, interleaved on screen but distinct underneath

### Redirection reroutes them
- The defaults are just defaults — you can point any stream at a **file** instead (next)

Three streams, referred to by number — 0, 1, 2 — is the whole vocabulary of redirection.`,
  narration:
    'Here\'s an idea that unlocks half the power of the command line. Every single program, the moment it starts, is automatically connected to three streams — three channels it can read from and write to without ever knowing or caring where they actually lead. They have names and, more importantly, numbers. The first is standard input, stdin, numbered zero: this is where a program reads its input from, and by default it\'s connected to your keyboard. The second is standard output, stdout, numbered one: this is where a program writes its normal, everyday output, and by default that\'s your screen. The third is standard error, stderr, numbered two: this is where a program writes its error messages and warnings — and by default it also goes to your screen, but — and this is the clever part — it\'s a completely separate stream from stdout. Why on earth have two output streams that both go to the screen? Because keeping them separate gives you enormous control. Imagine a command that produces useful data but also occasionally complains about something. If results and errors were mixed into one stream, saving the data to a file would also bury the errors in it. By keeping them apart, you can save the real output to a file while still letting the error messages show up on your screen where you\'ll notice them — or do the exact opposite. You can see both at once: run ls on a directory that exists and one that doesn\'t, and you\'ll see the listing and the error printed together on screen — but underneath, one came down stream one and the other down stream two. And here\'s the punchline that makes this matter: those default destinations — keyboard, screen, screen — are only defaults. You can grab any of these three streams and point it somewhere else entirely, most usefully at a file. That rerouting is called redirection, and the three little numbers — zero, one, two — are its entire vocabulary. Let\'s use them.',
}
