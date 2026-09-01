import type { Section } from '../types'

export const packages: Section = {
  id: 'packages',
  title: 'Package management',
  scene: 'package-manager',
  slide: `## Package management

You don't download installers on Linux. A **package manager** installs software — **and every dependency** — from signed, trusted **repositories**, and tracks it all.

### What it does for you
- Resolves **dependencies** automatically (install \`nginx\`, get every library it needs)
- Pulls from **repositories** whose packages are **cryptographically signed** — trusted by default
- **Tracks** every file it installed, so it can cleanly **update** or **remove** it

### \`apt\` (Debian/Ubuntu — \`dnf\` on Fedora, \`pacman\` on Arch)
- **\`sudo apt update\`** — refresh the lists (do this **first**) · **\`apt upgrade\`** — update everything
- **\`sudo apt install nginx\`** · **\`apt remove nginx\`** · \`apt search\` / \`apt show\`

### The security point
- Prefer packages over \`curl … | bash\` — packages are **signed, versioned, and removable**; a piped script is none of those

Software on, software current. Next: making things happen **on a schedule**, with nobody watching.`,
  narration:
    'On Windows or a Mac, installing software usually means finding a website, downloading an installer, and clicking through it. Linux does something categorically better, and it\'s one of the things people miss most when they leave it: the package manager. Instead of hunting down installers, you have a single tool that installs software from curated, trusted collections called repositories, and it does three things that matter enormously. First, it resolves dependencies automatically. Real software is built on other software — libraries, tools, runtimes — and a package declares everything it needs; so when you ask to install the nginx web server, the package manager works out every library nginx depends on, and every library those depend on, and installs the whole tree in one shot, correctly. No more hunting for a missing DLL. Second, the repositories are trusted: their packages are cryptographically signed, so the package manager can verify that what you\'re installing genuinely came from the distribution and wasn\'t tampered with in transit. Third, it keeps a complete record of every file it installed, which means it can later update that software to a new version cleanly, or remove it completely without leaving junk behind. The commands differ a little by distribution family — apt on Debian and Ubuntu, dnf on Fedora and Red Hat, pacman on Arch — but the ideas are identical. Using apt as our example: you start with sudo apt update, which refreshes the local copy of what\'s available in the repositories, and you should run it before installing or upgrading so you\'re working from current information. sudo apt upgrade then updates all your installed packages to their latest versions — this is how you keep a system patched and secure. sudo apt install nginx installs a package and its dependencies; apt remove uninstalls; and apt search and apt show help you find and inspect packages. Now, one genuine security lesson to carry with you, because you\'ll be tempted otherwise: you\'ll often see installation instructions online that say pipe this URL straight into bash — curl something, pipe to bash. Prefer the package manager whenever you can, because a package is signed, versioned, and cleanly removable, while a script piped from the internet into a shell is unsigned, unversioned, runs with whatever privileges you gave it, and leaves no record of what it did. So the package manager is how software gets onto the box and stays current and secure. Next, let\'s make the box do things on its own, on a schedule, with no human present.',
}
