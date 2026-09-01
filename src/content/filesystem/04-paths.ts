import type { Section } from '../types'

export const paths: Section = {
  id: 'paths',
  title: 'Paths & navigation',
  scene: 'abs-vs-rel',
  slide: `## Paths & navigation

A **path** is an address in the tree. Two kinds — and a handful of commands to move around.

### Absolute vs. relative
- **Absolute** — starts at \`/\`, so it means the same thing from anywhere: \`/var/log/syslog\`
- **Relative** — starts from **where you are now** (\`pwd\`): \`projects/app.py\`
- Shorthands: **\`.\`** = here, **\`..\`** = parent, **\`~\`** = home, **\`-\`** = previous directory

### The core commands
- **\`pwd\`** — print working directory (*where am I?*)
- **\`cd\`** — change directory (\`cd /etc\`, \`cd ..\`, \`cd ~\` or bare \`cd\` → home)
- **\`ls\`** — list; **\`ls -l\`** long form; **\`ls -la\`** includes hidden **dotfiles** (names starting with \`.\`)

### Dotfiles
- A leading \`.\` just means "hidden from normal \`ls\`" — that's all. Config like \`~/.bashrc\` lives this way

Absolute for scripts (unambiguous), relative for quick moves. Now let's guard what's in the tree.`,
  narration:
    'To use the filesystem you have to be able to say where something is, and that\'s what a path is — an address in the tree. There are two kinds, and the difference matters constantly. An absolute path starts from the root, that leading slash, and spells out the whole way down: slash-var-slash-log-slash-syslog. Because it starts from the fixed root, an absolute path means exactly the same thing no matter where you currently are — which is why scripts almost always use them. A relative path, by contrast, starts from wherever you happen to be standing right now, your current directory: if you\'re in slash-home-slash-sam and you type projects-slash-app-dot-py, that means the app file inside the projects folder inside your current location. To make relative paths convenient, there are a few shorthands worth memorizing: a single dot means here, the current directory; two dots means the parent, one level up; the tilde means your home; and a dash, cleverly, means the previous directory you were in, so you can bounce back and forth. Now the commands to actually move. pwd, print working directory, answers the question where am I right now — it prints your current absolute path. cd, change directory, moves you: cd slash-etc jumps to an absolute location, cd dot-dot walks up one level to the parent, and cd with nothing after it, or cd tilde, takes you home. And ls lists what\'s in a directory: plain ls just shows the names, ls dash-l gives you the long form with permissions and owners and sizes and dates, and ls dash-l-a adds the hidden files. That brings up one last thing — hidden files, often called dotfiles. In Linux, hidden doesn\'t mean secret or protected; it\'s purely a display convention. Any file whose name starts with a dot is simply skipped by a normal ls, to keep clutter out of your way. That\'s the entire mechanism. It\'s how configuration tucks itself away — your shell\'s own settings live in a file called dot-bashrc in your home directory, quietly out of sight until you ask for it with dash-a. So: absolute paths when you need to be unambiguous, relative paths and shorthands when you\'re moving around quickly. Now that we can walk the tree freely, let\'s talk about who\'s allowed to do what — permissions.',
}
