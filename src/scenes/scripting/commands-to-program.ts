import type { Scene } from '../../render-engine'

// §1 why-script — the section's framing is that scripting is not a new language, it is the shell you
// already have plus four constructs. So the scene is deliberately additive: the reasons on top, and
// below them the four things that get ADDED, which is also this course's own table of contents.
export const commandsToProgram: Scene = {
  id: 'commands-to-program',
  nodes: [
    {
      id: 'why',
      label: 'Why put commands in a file at all',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'wy-repeat', label: 'Repeatable', sub: 'no forgotten flag, ever', pattern: 'service', icon: 'repeat' },
        { id: 'wy-auto', label: 'Automatable', sub: 'a script plus cron', pattern: 'network', icon: 'clock' },
        { id: 'wy-share', label: 'Shareable', sub: 'a tool, not a wiki page', pattern: 'user', icon: 'gitbranch' },
      ],
    },
    {
      id: 'adds',
      label: 'The same shell — scripting only ADDS these four',
      sub: 'and this course is exactly that list, in order',
      pattern: 'service',
      cols: 4,
      children: [
        { id: 'ad-var', label: 'Variables', sub: 'memory', variant: 'tile', pattern: 'service', icon: 'tag' },
        { id: 'ad-if', label: 'Conditionals', sub: 'decisions', variant: 'tile', pattern: 'service', icon: 'gitbranch' },
        { id: 'ad-loop', label: 'Loops', sub: 'repetition', variant: 'tile', pattern: 'service', icon: 'repeat' },
        { id: 'ad-fn', label: 'Functions', sub: 'structure', variant: 'tile', pattern: 'service', icon: 'braces' },
      ],
    },
  ],
  edges: [
    { source: 'why', target: 'adds', label: 'every command, pipe and redirect from Course 2 works verbatim in a file — nothing you know is replaced' },
  ],
}
