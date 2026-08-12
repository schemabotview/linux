import type { Course } from 'reveal-engine'

// Course 3 — "The filesystem & permissions" (the NAVIGATE stage). Opens on the `fhs-overview` board
// (§1–§3), then a whole-canvas scene per deep topic: `fs-tree` paths (§4), `permissions` (§5–§6),
// `inodes-links` (§7–§8), `mounts-vfs` (§9), bookending back on the board (§10). Solid-tour reveal.
//
// STATUS: §1–§10 authored — Course 3 of 8.

// The `fhs-overview` scene is now a rooted TREE: the root `/`, the top-level dirs, and three
// grandchildren (/usr/bin, /var/log, /home/sam) that show the nesting. FH_ALL = every node, so
// scene entry (§1, §10) solidifies the whole tree; the bands light each dir with its lineage.
const FH_ALL = ['fh-slash', 'fh-etc', 'fh-var', 'fh-usr', 'fh-bin', 'fh-home', 'fh-tmp', 'fh-dev', 'fh-proc', 'fh-root', 'fh-usrbin', 'fh-varlog', 'fh-homesam']
const FHS_SYS = ['fh-etc', 'fh-var', 'fh-usr', 'fh-bin', 'fh-usrbin', 'fh-varlog'] // §2 — system dirs + their children
const FHS_YOU = ['fh-home', 'fh-tmp', 'fh-dev', 'fh-proc', 'fh-root', 'fh-homesam'] // §3 — yours + virtual + ~

const FT = ['ft-all'] // §4
const PM = ['pm-all'] // §5–§6

const IL_ALL = ['il-name', 'il-dirent', 'il-inode', 'il-meta', 'il-ptrs', 'il-blocks', 'il-hard', 'il-sym']
const IL_CHAIN = ['il-name', 'il-dirent', 'il-inode', 'il-meta', 'il-ptrs', 'il-blocks'] // §7
const IL_LINKS = ['il-hard', 'il-sym', 'il-inode', 'il-name'] // §8 highlight

const MV_ALL = ['mv-vfs', 'mv-mounts', 'mv-root', 'mv-home', 'mv-tmp', 'mv-dev', 'mv-sda', 'mv-sdb', 'mv-ram'] // §9

export const filesystem: Course = {
  id: 'filesystem',
  title: 'The filesystem & permissions',
  sections: [
    {
      id: 'the-tree',
      heading: 'One tree, everything a file',
      scene: 'fhs-overview',
      focus: [],
      slide: {
        title: 'One tree, everything a file',
        body: [
          'Windows has `C:`, `D:`, `E:`. Linux has **one** tree, rooted at **`/`** — every disk, device, and file hangs off that single root.',
          '',
          '### Everything is a file',
          '- Your documents, yes — but *also* your **disks** (`/dev/sda`), **processes** (`/proc`), and **kernel settings** (`/sys`)',
          '- One uniform interface: the same `ls`, `cat`, `cp`, and permissions work on *all* of them (this is the **VFS** from Course 1)',
          '',
          '### A place for everything',
          '- The layout isn\'t random — the **Filesystem Hierarchy Standard (FHS)** means `/etc`, `/var`, `/home` mean the same thing on **every** distro',
          '- Learn the map once and you can find your way around any Linux box',
          '',
          'Let\'s tour the important directories, then learn to walk the tree, secure it, and see how it really stores a file.',
        ].join('\n'),
      },
      beats: [
        {
          line: "If you come from Windows, you're used to drives with letters — C drive, D drive, a USB stick showing up as E. Linux does something fundamentally different, and it's one of the first things to really internalize: there is exactly one tree. A single root, written as a lone forward slash, and absolutely everything hangs off of it. Your second hard drive isn't a separate D drive; it gets attached at some directory inside the one tree, and you reach it by walking down to that directory. This is the unified filesystem we first glimpsed in Course one as the VFS. And it goes further than just disks, because of that Unix promise: everything is a file. Your documents are files, obviously — but so are your physical disks, which appear as files under slash-dev; so are your running processes, which show up as files under slash-proc; and so are the kernel's own tuning knobs, exposed as files under slash-sys. The payoff is uniformity: the very same handful of commands — ls to list, cat to read, cp to copy — and the very same permission system work on all of them, whether it's a text file, a hard drive, or a running program. Now, the layout of this tree is not arbitrary. There's a standard called the Filesystem Hierarchy Standard, the FHS, and it means that slash-etc, slash-var, slash-home have the same meaning on Ubuntu, on Debian, on Fedora, on Arch — everywhere. That's a gift: learn this map once, and you can sit down at any Linux machine on earth and know where things live. So let's tour the important directories, then learn to walk the tree, lock it down with permissions, and finally crack open how it actually stores a single file on disk.",
          delta: [{ kind: 'solidify', ids: FH_ALL }],
        },
      ],
    },
    {
      id: 'fhs-system',
      heading: 'The system directories',
      scene: 'fhs-overview',
      focus: FHS_SYS,
      slide: {
        title: 'The system directories',
        body: [
          'Four directories hold the **system itself** — its configuration, its changing data, and its programs.',
          '',
          '### The big four',
          '- **`/etc`** — *all* system configuration, as **plain-text files** you edit (`/etc/ssh/sshd_config`, `/etc/hosts`, `/etc/fstab`). No registry — just readable text',
          '- **`/var`** — **variable** data that grows while running: **logs** (`/var/log`), mail spools, caches, databases',
          '- **`/usr`** — the bulk of **installed software**: `/usr/bin` (programs), `/usr/lib` (libraries), `/usr/share` (data)',
          '- **`/bin` · `/sbin`** — the **essential** commands needed even in a broken system (`ls`, `cp`, `mount`); `sbin` = admin tools',
          '',
          '### Why it matters',
          '- Config in `/etc` is text ⇒ you can **diff it, back it up, and version it in git**',
          '- Something misbehaving? Its logs are almost always in **`/var/log`**',
          '',
          'That\'s the system\'s own space. Next: the directories that are *yours* — and the ones that aren\'t real.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Let's start with the four directories that hold the system itself. The first, and maybe the most important to know, is slash-etc. This is where all system configuration lives, and here's the beautiful part: it's all plain text files that you can open and read and edit with any editor. The SSH server's settings, the list of hostnames, the table of which disks to mount at boot — all of it, just text, in slash-etc. There is no opaque binary registry like on Windows; if you want to change how something on the system behaves, you find its text file in slash-etc and edit it. And because it's text, you can compare versions, back it up trivially, and even keep it in git. The second is slash-var, for variable data — this is the stuff that grows and changes while the system runs. Above all, that means logs, which live in slash-var-slash-log, and this is genuinely one of the most useful things to remember in all of Linux: when something is misbehaving, when a service won't start or a website is throwing errors, the answer is almost always waiting for you in a log file under slash-var-slash-log. Var also holds mail spools, caches, and the data for things like databases. The third is slash-usr, and despite the name it's not about users — it holds the bulk of your installed software: slash-usr-slash-bin has the programs, slash-usr-slash-lib the shared libraries they need, slash-usr-slash-share their data files. When you install an application, most of it lands under slash-usr. And the fourth is slash-bin, along with its sibling slash-sbin. These hold the essential commands — the absolute basics like ls, cp, and mount that must be available even if the system is half-broken and slash-usr hasn't been mounted yet. The s in sbin means system: these are the administrative commands, mostly for the root user. So that's the system's own territory — its config, its changing data, and its programs. Now let's look at the directories that belong to you, and a couple that aren't even really on the disk at all.",
          delta: [{ kind: 'solidify', ids: FHS_SYS }],
        },
      ],
    },
    {
      id: 'fhs-you',
      heading: 'Your files & the virtual trees',
      scene: 'fhs-overview',
      focus: FHS_YOU,
      slide: {
        title: 'Your files & the virtual trees',
        body: [
          'The rest of the tree is **yours to use** — plus two branches that are windows into the *running kernel*, not files on any disk.',
          '',
          '### Where you live',
          '- **`/home`** — one directory per user; yours is `/home/<you>`, and **`~`** is a shorthand for it',
          '- **`/root`** — the **root** (admin) user\'s home; *not* the same as `/`',
          '- **`/tmp`** — scratch space anyone can use; **wiped on reboot**, so never keep anything you need there',
          '',
          '### The virtual filesystems',
          '- **`/dev`** — every device as a file: `/dev/sda` (disk), `/dev/null` (the void), `/dev/random`',
          '- **`/proc` · `/sys`** — **generated by the kernel on the fly**: `/proc/cpuinfo`, `/proc/<pid>/…` — read them and you\'re reading **live kernel state** (Course 4), not a disk',
          '',
          'A tree of real files *and* live windows into the machine — all through the same file interface.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Now the parts of the tree that are yours, and a couple that are stranger than they look. First, slash-home. This is where user files live, with one subdirectory per person on the system — if your username is sam, your home directory is slash-home-slash-sam, and it's the one place you can always freely create, edit, and delete files without special permission. It's so central that the shell gives it a shorthand: the tilde character, which always means your home directory. There's a related one, slash-root — that's the home directory of the administrative user, who is literally named root, and it's a common trap for beginners: slash-root, the admin's home, is a completely different thing from plain slash, the top of the whole tree. Then there's slash-tmp, temporary scratch space that any program or user can scribble in — but with a catch that has burned everyone at least once: slash-tmp is wiped clean on every reboot, so never, ever leave something there you actually need to keep. Now for the genuinely mind-bending ones. Slash-dev is where all those device files live — your disk as slash-dev-slash-sda, and special ones like slash-dev-slash-null, the black hole that swallows anything written to it, and slash-dev-slash-random, an endless source of random bytes. But the strangest of all are slash-proc and slash-sys. These directories are not stored on any disk at all. The kernel generates their contents on the fly, the instant you look, as a live window into itself. Read the file slash-proc-slash-cpuinfo and the kernel manufactures a description of your CPU right then. There's a directory under slash-proc for every single running process, named by its process ID, and reading inside it tells you exactly what that program is doing this moment — something we'll lean on heavily in the next course. So the filesystem is this remarkable hybrid: a tree of real files on disk, and also a set of live, always-current windows into the running machine — and the magic is that you touch both through the exact same file interface. Now that we know the map, let's learn to actually walk it.",
          delta: [{ kind: 'solidify', ids: FHS_YOU }],
        },
      ],
    },
    {
      id: 'paths',
      heading: 'Paths & navigation',
      scene: 'fs-tree',
      focus: FT,
      slide: {
        title: 'Paths & navigation',
        body: [
          'A **path** is an address in the tree. Two kinds — and a handful of commands to move around.',
          '',
          '### Absolute vs. relative',
          '- **Absolute** — starts at `/`, so it means the same thing from anywhere: `/var/log/syslog`',
          '- **Relative** — starts from **where you are now** (`pwd`): `projects/app.py`',
          '- Shorthands: **`.`** = here, **`..`** = parent, **`~`** = home, **`-`** = previous directory',
          '',
          '### The core commands',
          '- **`pwd`** — print working directory (*where am I?*)',
          '- **`cd`** — change directory (`cd /etc`, `cd ..`, `cd ~` or bare `cd` → home)',
          '- **`ls`** — list; **`ls -l`** long form; **`ls -la`** includes hidden **dotfiles** (names starting with `.`)',
          '',
          '### Dotfiles',
          '- A leading `.` just means "hidden from normal `ls`" — that\'s all. Config like `~/.bashrc` lives this way',
          '',
          'Absolute for scripts (unambiguous), relative for quick moves. Now let\'s guard what\'s in the tree.',
        ].join('\n'),
      },
      beats: [
        {
          line: "To use the filesystem you have to be able to say where something is, and that's what a path is — an address in the tree. There are two kinds, and the difference matters constantly. An absolute path starts from the root, that leading slash, and spells out the whole way down: slash-var-slash-log-slash-syslog. Because it starts from the fixed root, an absolute path means exactly the same thing no matter where you currently are — which is why scripts almost always use them. A relative path, by contrast, starts from wherever you happen to be standing right now, your current directory: if you're in slash-home-slash-sam and you type projects-slash-app-dot-py, that means the app file inside the projects folder inside your current location. To make relative paths convenient, there are a few shorthands worth memorizing: a single dot means here, the current directory; two dots means the parent, one level up; the tilde means your home; and a dash, cleverly, means the previous directory you were in, so you can bounce back and forth. Now the commands to actually move. pwd, print working directory, answers the question where am I right now — it prints your current absolute path. cd, change directory, moves you: cd slash-etc jumps to an absolute location, cd dot-dot walks up one level to the parent, and cd with nothing after it, or cd tilde, takes you home. And ls lists what's in a directory: plain ls just shows the names, ls dash-l gives you the long form with permissions and owners and sizes and dates, and ls dash-l-a adds the hidden files. That brings up one last thing — hidden files, often called dotfiles. In Linux, hidden doesn't mean secret or protected; it's purely a display convention. Any file whose name starts with a dot is simply skipped by a normal ls, to keep clutter out of your way. That's the entire mechanism. It's how configuration tucks itself away — your shell's own settings live in a file called dot-bashrc in your home directory, quietly out of sight until you ask for it with dash-a. So: absolute paths when you need to be unambiguous, relative paths and shorthands when you're moving around quickly. Now that we can walk the tree freely, let's talk about who's allowed to do what — permissions.",
          delta: [{ kind: 'solidify', ids: FT }],
        },
      ],
    },
    {
      id: 'permissions-read',
      heading: 'Reading permissions',
      scene: 'permissions',
      focus: PM,
      slide: {
        title: 'Reading permissions',
        body: [
          'Linux is **multi-user** — so every file records *who* may do *what*. Learn to read the string `ls -l` prints.',
          '',
          '### Three actions, three audiences',
          '- Actions: **`r`** read · **`w`** write · **`x`** execute (run, or for a dir, *enter*)',
          '- Audiences: the file\'s **owner** (user) · its **group** · **other** (everyone else)',
          '',
          '### Decoding `-rw-r--r--`',
          '- First char = **type**: `-` file · `d` directory · `l` symlink',
          '- Then **three triads** — owner / group / other:',
          '  - `rw-` owner may read + write · `r--` group may read · `r--` other may read',
          '- `ls -l` also shows the **owner** and **group** names beside them',
          '',
          'Nine bits — three actions × three audiences. Once you can read them, changing them is easy.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Linux was built from the start to be a multi-user system — many people sharing one machine — and that shapes everything about how it handles files. Every single file and directory carries a record of who is allowed to do what to it, and learning to read that record is an essential skill. When you run ls dash-l, the very first thing on each line is a cryptic-looking string like dash-r-w-dash-r-dash-dash-r-dash-dash, and it's completely logical once you break it down. There are two ideas multiplied together. The first idea is that there are three things you might do to a file: read it, write to it, or execute it — abbreviated r, w, and x. Read and write are obvious; execute means run it as a program, and for a directory, execute means something slightly different that we'll come back to — permission to enter it. The second idea is that there are three different audiences these permissions apply to: the owner of the file, usually the person who created it; the group, a named set of users who can be granted shared access; and other, meaning everyone else on the system. So now decode that string. The very first character isn't a permission at all — it's the type: a dash means a regular file, a d means a directory, an l means a symbolic link. After that come nine characters, and here's the key: read them as three groups of three. The first triad is the owner's permissions, the second is the group's, the third is everyone else's. So dash-r-w-dash r-dash-dash r-dash-dash reads as: it's a regular file; the owner can read and write it but not execute it; the group can only read it; and everyone else can also only read it. Alongside that string, ls dash-l helpfully prints the actual owner's name and the group's name, so you can see not just what the permissions are but who they apply to. That's the whole system — nine bits, three actions across three audiences. Once you can read them fluently, changing them is the easy part.",
          delta: [{ kind: 'solidify', ids: PM }],
        },
      ],
    },
    {
      id: 'permissions-change',
      heading: 'Changing permissions & sudo',
      scene: 'permissions',
      focus: PM,
      slide: {
        title: 'Changing permissions & sudo',
        body: [
          'Two commands set access — `chmod` (the *what*) and `chown` (the *who*) — plus `sudo`, the key to the whole box.',
          '',
          '### `chmod` — two notations',
          '- **Octal**: each triad is a digit, **r=4 w=2 x=1** summed → `chmod 644` = `rw-r--r--`, `chmod 755` = `rwx r-x r-x`',
          '- **Symbolic**: who + change + what → `chmod u+x script.sh` (give owner execute), `chmod go-w file`',
          '- A script needs **`x`** to run; a **directory** needs `x` to be *entered* (traversed)',
          '',
          '### `chown` & `umask`',
          '- **`chown sam:staff file`** — set owner : group (needs `sudo`)',
          '- **`umask`** — the default permissions stripped from new files',
          '',
          '### root & sudo',
          '- **root** (UID 0) bypasses every check — total power; **`sudo <cmd>`** runs one command as root',
          '- Rule: work as a normal user, reach for `sudo` only when you truly need it',
          '',
        ].join('\n'),
      },
      beats: [
        {
          line: "Now that you can read permissions, let's change them, with two commands. The first is chmod, change mode, which sets what can be done — those r, w, x bits — and it accepts two different notations that confuse people until they see both. The first is octal, using numbers, and it's based on a neat trick: within each triad, read gives four, write gives two, execute gives one, and you just add them up. So read plus write is six, read plus write plus execute is seven, read only is four. That means chmod six-four-four sets the three triads to read-write, read, read — a normal file — and chmod seven-five-five sets them to read-write-execute, read-execute, read-execute — a typical program or script that everyone can run but only the owner can change. The other notation is symbolic, which reads almost like English: you name the audience — u for user slash owner, g for group, o for other, a for all — then a plus to add or minus to remove, then the permission. So chmod u-plus-x script-dot-sh means give the owner execute permission on this script, and chmod g-o-minus-w file means take write away from group and other. This is where that directory-execute subtlety pays off: a script file needs the x bit before you're allowed to run it, and a directory needs the x bit before you're allowed to enter it and reach what's inside — no execute on a folder, no getting in. The second command is chown, change owner, which sets who owns the file — chown sam colon staff file makes sam the owner and staff the group — and changing ownership generally requires administrative rights. There's also umask, which quietly controls the default permissions that new files are created with. And that brings us to the master key of the whole system: the root user. Root, which has user ID zero, is the superuser, and root bypasses every permission check entirely — root can read, write, and delete anything, anywhere. That's enormous power, and the modern way to wield it safely is a command called sudo. You do your normal work as an ordinary, limited user, and when you genuinely need administrative power for one command — installing software, editing a system config in slash-etc, changing ownership — you prefix just that command with sudo, prove it's really you with your password, and it runs as root for that one command only. The discipline is simple and important: live as a normal user, and reach for sudo only when you truly must. So permissions really are the entire security model of a Linux box, and now you can both read them and set them. But we've been treating a file as if the name and the file are the same thing. They're not — and seeing why unlocks one of the filesystem's most elegant tricks.",
          delta: [{ kind: 'solidify', ids: PM }],
        },
      ],
    },
    {
      id: 'inodes',
      heading: 'Names, inodes & data',
      scene: 'inodes-links',
      focus: IL_CHAIN,
      slide: {
        title: 'Names, inodes & data',
        body: [
          'Here\'s a surprise: a filename and the file are **two different things**. The name just *points* at the real file — the **inode**.',
          '',
          '### Three layers',
          '- A **filename** is a **directory entry** — a line in a directory that maps a **name → an inode number**',
          '- The **inode** *is* the file: it holds the **metadata** (permissions, owner, size, timestamps) and **pointers to the data blocks** — but **no name**',
          '- The **data blocks** are the actual bytes on disk',
          '',
          '### Why this matters',
          '- The name lives in the *directory*, the file lives in the *inode* — so renaming or moving a file within a disk just **rewrites a directory entry**; the inode and data never move',
          '- `ls -i` shows inode numbers; `df -i` shows you can even **run out of inodes** while disk space remains',
          '',
          'One inode, reached by a name. Which raises a great question: can *two* names point at *one* inode?',
        ].join('\n'),
      },
      beats: [
        {
          line: "Here's something that sounds like a technicality but is actually one of the most clarifying ideas in the whole filesystem: a filename and the file itself are two completely separate things. We casually say the file report-dot-txt, but really report-dot-txt is just a name that points at the file — and the actual file is something called an inode. Let's follow the chain. When you have a file in a directory, what the directory literally stores is a tiny entry, called a directory entry, that maps a name to a number — the inode number. That's all a filename is: a line in a directory saying this name refers to inode number so-and-so. Follow that number and you arrive at the inode, and the inode is the real file. It holds everything about the file except its name: the permissions and ownership we just discussed, the size, the timestamps for when it was created and last modified, and — crucially — the pointers to where the actual data lives on the disk. Notice what's not in the inode: the name. The name lives up in the directory, not in the file. And then those pointers lead to the third layer, the data blocks, which are the actual raw bytes of your file's contents scattered across the disk. So: name, to inode, to data. Why does separating these matter so much in practice? Because it explains behavior that's otherwise baffling. Since the name lives in the directory and the file lives in the inode, renaming a file, or moving it to another folder on the same disk, doesn't touch the file's data or even its inode at all — it just rewrites a directory entry, which is why moving a huge file across the same disk is instant. You can see the inode numbers yourself with ls dash-i, and here's a fun one: since inodes are a finite resource created when the disk is formatted, you can actually run out of inodes — be unable to create a new file even though there's plenty of free space left — which df dash-i will reveal. So one file is one inode, reached through a name. And that framing sets up a wonderful question: if a name is just a pointer to an inode, what happens if two different names point at the very same inode?",
          delta: [{ kind: 'solidify', ids: IL_ALL }],
        },
      ],
    },
    {
      id: 'links',
      heading: 'Hard links & symlinks',
      scene: 'inodes-links',
      focus: IL_ALL,
      highlight: IL_LINKS,
      slide: {
        title: 'Hard links & symlinks',
        body: [
          'Two names, one file — that\'s a **link**. There are two kinds, and the inode model explains both exactly.',
          '',
          '### Hard link — a second name for the same inode',
          '- `ln target newname` — both names point at the **same inode**; they are **equal**, neither is "the original"',
          '- The inode keeps a **link count**; the data is freed only when it hits **0** (the last name is removed)',
          '- Limits: same filesystem only, and not for directories',
          '',
          '### Symbolic link — a tiny file holding a path',
          '- `ln -s /path/to/target linkname` — a small file whose *contents* are a **path**; following it re-resolves that path',
          '- Can cross filesystems and point at directories; if the target is deleted, the link **dangles** (broken)',
          '- This is what `/usr/bin/python` → `python3.12` is, and how config `sites-enabled` tricks work',
          '',
          'Hard link = another name for the file; symlink = a signpost to a name. The inode model makes both obvious.',
        ].join('\n'),
      },
      beats: [
        {
          line: "The answer is yes — two names can absolutely point at the same file — and that's exactly what a link is. There are two kinds, and the beauty is that once you hold the inode picture in your head, both of them are completely obvious. The first is the hard link. You create one with the ln command — ln target newname — and what it does is add a second directory entry pointing at the very same inode as the first. And here's the thing that surprises people: the two names are utterly equal. There is no original and no copy; they are two names for one identical file, sharing one inode, one set of data blocks. Change the file through one name and you see the change through the other, because it is literally the same file. So how does the system know when to actually free the data? The inode keeps a link count — how many names point at it — and every time you delete one of the names, that count drops by one. The data blocks are only reclaimed when the count hits zero, when the very last name is gone. That's actually what deleting a file really is: not erasing data, just removing one directory entry and decrementing the count. Hard links have two limits, though: because they're just pointers to an inode number, and inode numbers are only unique within a single filesystem, a hard link can't cross from one disk to another, and by convention you can't hard-link directories. The second kind of link solves both of those, and works completely differently. It's the symbolic link, or symlink, created with ln dash-s. A symlink is not a second name for an inode — it's a whole separate tiny file of its own, and the contents of that little file are simply a path, a text string pointing at another location. When you access a symlink, the system reads the path inside it and re-resolves it, following the signpost to wherever it points. Because it's just storing a path as text, a symlink can happily point across different filesystems and can point at directories — but it has its own weakness: if you delete or move whatever it points at, the symlink is left dangling, pointing at nothing, broken. You see symlinks constantly in real systems: the command slash-usr-slash-bin-slash-python is usually a symlink pointing at the specific version, like python-three-point-twelve, so upgrading Python is just repointing one link. So keep the two straight with a simple mental image: a hard link is another true name for the same file, while a symlink is a signpost that names a path. The inode model makes the whole thing click. Now, one last question about the tree: we said everything hangs off a single root — but a real machine has several disks. How does one tree span many disks?",
          delta: [{ kind: 'solidify', ids: IL_ALL }],
        },
      ],
    },
    {
      id: 'mounts',
      heading: 'Mounts & the VFS',
      scene: 'mounts-vfs',
      focus: MV_ALL,
      slide: {
        title: 'Mounts & the VFS',
        body: [
          'One tree, many disks. The trick is **mounting** — attaching a whole filesystem at a **directory** inside the tree.',
          '',
          '### Mounting',
          '- **`mount`** attaches a device\'s filesystem at a **mount point** (a directory): a USB stick at `/mnt/usb`, a second disk at `/home`',
          '- After that, `/home/...` transparently reads the *other* disk — you never think about which device (the **VFS** from Course 1 hides it)',
          '- Different branches can be different filesystem types — **ext4**, **xfs**, **tmpfs** (a filesystem that lives in **RAM**, like `/tmp`)',
          '',
          '### Persisted & inspected',
          '- **`/etc/fstab`** lists what to mount **at boot** — that\'s how the whole tree assembles itself every start',
          '- **`df -h`** — free space per mounted filesystem; **`du -sh <dir>`** — how much a directory uses',
          '',
          'That completes the model: one tree, assembled from many mounted filesystems, presented as one by the VFS.',
        ].join('\n'),
      },
      beats: [
        {
          line: "We've insisted the whole time that there's just one tree with one root — but of course a real machine often has several disks, a USB stick you plug in, maybe a network drive. How do all of those live inside a single tree? The answer is a wonderfully simple idea called mounting. To mount a filesystem is to attach it at a chosen directory inside the existing tree — that directory is called the mount point. So you might mount a USB stick at slash-mnt-slash-usb, and from that moment on, everything on the stick appears under that directory, as if it had always been part of the tree. On a server, you might put user home directories on a big second disk and mount it at slash-home — and then anyone reading slash-home-slash-sam is transparently reading that second disk, without ever knowing or caring. That transparency is exactly the VFS, the virtual filesystem from Course one, doing its job: it presents one seamless tree and hides which physical device each branch actually lives on. And because each branch is mounted independently, different branches can even be entirely different types of filesystem — your main disk might be formatted ext4, another xfs, and some, like slash-tmp, can be tmpfs, a filesystem that isn't on any disk at all but lives purely in RAM, which is precisely why slash-tmp is so fast and why it vanishes on reboot. Now, how does the tree reassemble itself the same way every time you boot? Through a configuration file — and it's a text file in slash-etc, just as we'd expect — called slash-etc-slash-fstab, the filesystem table. It lists which devices to mount at which points at startup, and walking that list is one of the things that init does as the system comes up. Finally, two everyday commands for living with all this: df dash-h shows you each mounted filesystem and how much free space it has, in human-friendly units, and du dash-s-h on a directory tells you how much space that directory is using. And that completes the whole model of the filesystem: one single tree, assembled out of many separate mounted filesystems on many devices, all presented to you as one uniform thing by the VFS. Let's pull back and take it in.",
          delta: [{ kind: 'solidify', ids: MV_ALL }],
        },
      ],
    },
    {
      id: 'you-are-here',
      heading: 'You are here',
      scene: 'fhs-overview',
      focus: [],
      slide: {
        title: 'You are here',
        body: [
          'You can now **navigate, secure, and reason about** the filesystem — from the top of the tree down to the bytes on disk.',
          '',
          '### What you can now do',
          '- Read the **FHS** map — find config in `/etc`, logs in `/var/log`, devices in `/dev`, live kernel state in `/proc`',
          '- Move by **absolute & relative paths** (`cd`, `ls -la`, `.`/`..`/`~`) and reveal **dotfiles**',
          '- Read *and* set **permissions & ownership** (`chmod` octal/symbolic, `chown`, `sudo`)',
          '- Explain a file as **name → inode → data**, and use **hard links & symlinks**; assemble the tree with **mounts** & `/etc/fstab`',
          '',
          '### The road ahead',
          '- **Processes** — the running programs `/proc` hinted at: lifecycle, signals, monitoring',
          '- **Text → Admin → Scripting → Project** — transforming data and operating the system',
          '',
          'You know the world your commands act in. Next: the **processes** that do the acting.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Here's the whole filesystem, and you can now navigate it with real understanding. You know it's a single tree rooted at slash, with a standard layout you can rely on anywhere: configuration as plain text in slash-etc, the logs you'll debug with in slash-var-slash-log, installed programs in slash-usr and slash-bin, your own files in slash-home under the tilde shorthand, throwaway space in slash-tmp, devices as files in slash-dev, and those magical live windows into the running kernel in slash-proc and slash-sys. You can move through it by absolute and relative paths, list it with ls, and reveal the hidden dotfiles where configuration hides. You can read the nine permission bits — read, write, execute across owner, group, and other — and change them with chmod and chown, reaching for sudo only when you truly need root's power. You understand that a filename is just a directory entry pointing at an inode, that the inode is the real file holding the metadata and the pointers to the data, and that this is why links work the way they do — hard links as equal second names, symlinks as signposts to a path. And you know the one tree is really many filesystems mounted together on many devices, assembled at boot from slash-etc-slash-fstab and presented as one by the VFS. That's the entire world your commands live and act in. And notice the thread we keep tugging: slash-proc kept pointing at running programs, each with its own directory, its own live state. Those are processes — the programs actually doing the work on the machine — and they're the whole subject of the next course. We've mapped the world; now let's meet the things that move within it.",
          delta: [{ kind: 'solidify', ids: FH_ALL }],
        },
      ],
    },
  ],
}
