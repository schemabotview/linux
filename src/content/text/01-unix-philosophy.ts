import type { Section } from '../types'

export const unixPhilosophy: Section = {
  id: 'unix-philosophy',
  title: 'The Unix philosophy',
  scene: 'do-one-thing',
  slide: `## The Unix philosophy

On Linux, almost everything is **text** — logs, config, command output, CSVs. So the tools that *transform* text are among the most powerful you have.

### One idea, endlessly composed
- **Write programs that do one thing well**; make each read **stdin** and write **stdout**
- Then **pipe** them together (Course 2) into exactly the tool you need — no big monolith required
- The classic toolkit: **grep** (search), **sed** (edit), **awk** (columns), plus **sort/uniq/cut/wc/tr** and **find/xargs**

### Line-oriented
- These tools work **line by line**, streaming — so they handle a **100 GB** log without loading it into memory

Learn each tool on its own, then the real skill: **combining** them into one-line data pipelines.`,
  narration:
    'Here\'s a fact about Linux that turns into a superpower once you lean into it: almost everything on the system is plain text. Your logs are text, your configuration in slash-etc is text, the output of nearly every command is text, your data files — CSVs, reports — are text. And because so much is text, the tools that slice, search, and reshape text become some of the most valuable skills you can have; a person fluent with them can answer questions about a system in seconds that would otherwise take a custom script or a spreadsheet. All of these tools grow from a single design idea, the Unix philosophy, and it\'s worth stating plainly because it explains why they feel the way they do: write programs that each do one thing well, and make each one read from standard input and write to standard output. That\'s it. No single tool tries to do everything. Instead, because they all speak the same interface of stdin and stdout, you snap them together with the pipes we learned in Course two, building up exactly the custom tool you need for this one moment out of small, sharp, reusable pieces. The classic members of this toolkit are the ones on the board: grep for searching, sed for editing, awk for working with columns, and a supporting cast — sort, uniq, cut, wc, tr — for reshaping and counting, plus find and xargs for locating files and acting on them in bulk. One more property makes them industrial-strength: they\'re line-oriented and streaming. They process text one line at a time as it flows past, which means they can chew through a hundred-gigabyte log file without ever trying to load it all into memory — something that would defeat a naive script or a text editor instantly. So here\'s the plan for this course: we\'ll meet each tool on its own terms, one per scene, and then — because this is where the real power lives — we\'ll learn to combine them into single-line data pipelines. Let\'s start with the one you\'ll use most: grep.',
}
