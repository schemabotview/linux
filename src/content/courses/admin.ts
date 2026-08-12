import type { Course } from 'reveal-engine'

// Course 6 — "Users, services & networking" (the ADMINISTER stage). Opens on the `admin-overview`
// board (§1), then whole-canvas / flow scenes per area: `users-groups` (§2–§3), `systemd` (§4–§5),
// `packages` (§6), `scheduling` (§7), `networking` (§8–§9), bookending on the board (§10).
//
// STATUS: §1–§10 authored — Course 6 of 8.

const AO_ALL = ['ao-box', 'ao-users', 'ao-systemd', 'ao-pkg', 'ao-cron', 'ao-logs', 'ao-net']

const UG = ['ug-all']
const PK = ['pk-all']
const SC = ['sc-all']

const SY_SVC = ['sy-unit', 'sy-systemctl', 'sy-systemd', 'sy-service'] // §4
const SY_LOG = ['sy-systemd', 'sy-service', 'sy-journal', 'sy-target'] // §5

const NW_PATH = ['nw-host', 'nw-iface', 'nw-net', 'nw-remote', 'nw-tools', 'nw-ip', 'nw-ss', 'nw-curl'] // §8
const NW_SSH = ['nw-host', 'nw-net', 'nw-remote', 'nw-ssh'] // §9

export const admin: Course = {
  id: 'admin',
  title: 'Users, services & networking',
  sections: [
    {
      id: 'operating-a-box',
      heading: 'From user to operator',
      scene: 'admin-overview',
      focus: [],
      slide: {
        title: 'From user to operator',
        body: [
          'So far you\'ve *used* Linux. Now you\'ll **operate** it — the jobs that keep a real machine (especially a **server**) running.',
          '',
          '### The administrator\'s surface',
          '- **Users & groups** — who has an account, and who may do what (**`sudo`**)',
          '- **Services** — the background daemons `systemd` starts and supervises',
          '- **Packages** — installing and updating software safely',
          '- **Scheduling** — running jobs automatically, on a clock (`cron`, timers)',
          '- **Logs & networking** — seeing what happened, and reaching other machines',
          '',
          '### The mindset shift',
          '- Everything is **config in `/etc`** (text) + **`sudo`** for privilege + **logs** when it breaks — the loop you\'ll live in',
          '',
          'Let\'s operate a box, area by area — starting with **who** is allowed on it.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Up to now, everything we've done has been about using Linux — navigating, running commands, transforming text. This course is a shift in role: from user to operator, the person responsible for keeping a machine running. And this matters most on servers, because the overwhelming majority of Linux machines in the world are servers — headless boxes in data centers with no screen, running websites, databases, and services, that someone has to administer entirely over the network. That someone is now you. Let's map the administrator's job, which is what this board lays out. First, users and groups: who has an account on this machine, and critically, who is allowed to do what — the whole world of permissions and the sudo command that grants elevated power. Second, services: the background programs, the daemons, that do the actual work of a server, all started and supervised by systemd. Third, packages: how you install and update software safely, from trusted sources, without breaking the system. Fourth, scheduling: how you make jobs run automatically on a clock — a nightly backup, a cleanup every fifteen minutes — with cron and its modern cousins. And fifth, the twin skills of logs and networking: seeing what actually happened when something goes wrong, and reaching out to and between machines. There's a mental model that ties all of this together, and once you internalize it, administration stops feeling like a grab-bag of commands: nearly everything is configured by editing text files in slash-etc, nearly every administrative action needs sudo for privilege, and when something breaks, the answer is in the logs. Config, privilege, logs — that's the loop you'll live in as an operator. Let's start where security starts: with who is allowed on the machine at all.",
          delta: [{ kind: 'solidify', ids: AO_ALL }],
        },
      ],
    },
    {
      id: 'users',
      heading: 'Users & groups',
      scene: 'users-groups',
      focus: UG,
      slide: {
        title: 'Users & groups',
        body: [
          'Linux is **multi-user** to the core. Every account is a **user** with a numeric **UID**; **groups** bundle users to share access.',
          '',
          '### Who\'s who, and where it lives',
          '- **`whoami`** / **`id`** — your name, your UID, your groups',
          '- **`/etc/passwd`** — every account: `name:UID:GID:home:shell` (world-readable, plain text)',
          '- **`/etc/group`** — groups and their members · passwords are **hashed** in **`/etc/shadow`** (root-only)',
          '- **`root` = UID 0** (all-powerful); normal users start at **1000**',
          '',
          '### Managing accounts (needs `sudo`)',
          '- **`useradd -m -s /bin/bash sam`** (`-m` home dir, `-s` shell) → **`passwd sam`** to set a password',
          '- **`usermod -aG sudo sam`** — add to a group; the **`-a`** is vital (**`-G`** alone *replaces* all groups!)',
          '',
          'Accounts and groups are the *who*. Next: the command that lets a normal user borrow **root\'s** power.',
        ].join('\n'),
      },
      beats: [
        {
          line: "We touched on users back in the filesystem course, when we learned permissions; now let's manage them properly, because a real system has many accounts — human users, and also service accounts that daemons run under. Linux is multi-user right down to its bones. Every account is a user, and internally the system doesn't actually care about the username — it identifies users by a number, the UID. You can see your own identity with two commands: whoami just prints your username, and id prints the fuller picture — your UID and every group you belong to. Where do accounts actually live? In a text file, of course, following the pattern we've seen everywhere: slash-etc-slash-passwd. Despite the name, it holds no passwords; it's one line per account, with colon-separated fields — the username, the numeric UID, the primary group ID, the path to the home directory, and the login shell. It's world-readable, just a list of accounts. The actual passwords, hashed and salted for security, live in a separate file, slash-etc-slash-shadow, which only root can read — that separation is deliberate, so that the readable account list doesn't expose password hashes. Two special UID facts to anchor: root, the superuser, is always UID zero, and that number is what actually grants the power; normal human users conventionally start numbering at one thousand. Groups, listed in slash-etc-slash-group, are the mechanism for sharing: you put several users in a group, then grant the group access to a file or directory, and all of them get it at once — how a team shares a project directory. Now the management commands, all of which need sudo since they change the system. useradd creates an account — you'll want dash-m to also create their home directory and dash-s to set their shell — and then passwd sets their password. To add an existing user to a group, you use usermod dash-a-capital-G, and here is one of the most important gotchas in all of Linux administration: that little dash-a matters enormously. Dash-capital-G by itself replaces every group the user is in with just the one you named, silently kicking them out of all their others; dash-a-capital-G appends to their existing groups, which is almost always what you want. Forgetting the a has locked many an admin out of sudo. So users and groups define who exists on the machine and how they're bundled. But the real question in administration isn't just who exists — it's who's allowed to do powerful things. That's the sudo command, and it deserves a closer look.",
          delta: [{ kind: 'solidify', ids: UG }],
        },
      ],
    },
    {
      id: 'sudo',
      heading: 'sudo & root',
      scene: 'users-groups',
      focus: UG,
      slide: {
        title: 'sudo & root',
        body: [
          '**`root`** can do anything — which is exactly why you don\'t *log in* as root. **`sudo`** lets a trusted user borrow that power, one command at a time.',
          '',
          '### Why `sudo`, not root',
          '- Running as root **all the time** means one typo (`rm -rf /`) is catastrophic, and every action is unattributable',
          '- `sudo <cmd>` runs a **single** command as root, after your password — least privilege by default',
          '- It also **logs** who ran what (`/var/log/auth.log`) — accountability on shared systems',
          '',
          '### Who may sudo',
          '- Membership in the **`sudo`** group (Debian/Ubuntu) or **`wheel`** (Fedora) grants it',
          '- Fine-grained rules live in **`/etc/sudoers`** — always edit with **`sudo visudo`** (it syntax-checks; a broken sudoers can lock everyone out)',
          '- `sudo -l` lists what you\'re permitted; `sudo -i` opens a root shell (use sparingly)',
          '',
          'That\'s *who* and *how much*. Now, *what runs* on the box — the services `systemd` supervises.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Root is the superuser — it bypasses every permission check and can do absolutely anything on the machine. And precisely because it's that powerful, the modern rule is that you do not log in as root and work as root day to day. There are two solid reasons. The first is safety: when you're operating as root all the time, there's nothing between you and disaster — a single mistyped command, the infamous rm dash-r-f pointed at the wrong place, and there's no permission system to stop you from destroying the system. Working as a normal user means your everyday typos are contained. The second is accountability: on a server that several administrators share, if everyone logs in as root, you can never tell who did what. The tool that solves both problems is sudo. Instead of becoming root, you stay yourself, a normal limited user, and when you need root's power for one specific command, you prefix it with sudo, prove your identity with your own password, and that single command runs with root privileges — then you're back to being an ordinary user. This is the principle of least privilege in action: you hold elevated power only for the instant you actually need it. And sudo logs every use — who ran which command, when — to the authentication log, so on a shared box there's a clear record. Who is allowed to use sudo? Membership in a special group grants it — on Debian and Ubuntu that group is called sudo, on Fedora and Red Hat it's called wheel — which is why adding a new admin is often just usermod dash-a-capital-G sudo. For finer control — letting a user run only certain commands as root, say — there's a configuration file, slash-etc-slash-sudoers, but you must never edit it with a normal text editor. You edit it with the command visudo, run under sudo, and the reason is critical: visudo checks your syntax before saving, because a single typo in the sudoers file can lock every administrator out of root access on the entire machine, an extremely bad afternoon. Handy commands: sudo dash-l shows you exactly what you're permitted to run as root, and sudo dash-i drops you into a full root shell for when you have a lot of administrative work to do at once, though you should use that sparingly. So between users, groups, and sudo, you now control who is on the machine and how much they can do. The next question is what actually runs on the machine — the services doing the real work — and that brings us to systemd.",
          delta: [{ kind: 'solidify', ids: UG }],
        },
      ],
    },
    {
      id: 'systemd-services',
      heading: 'systemd: managing services',
      scene: 'systemd',
      highlight: SY_SVC,
      focus: [],
      slide: {
        title: 'systemd: managing services',
        body: [
          'A **service** (daemon) is a long-running background program — `sshd`, `nginx`, a database. **`systemd`** (PID 1, from Course 1) starts and supervises them all.',
          '',
          '### A service is declared by a unit file',
          '- A **`.service`** unit (in `/etc/systemd/system/` or `/lib/systemd/system/`) declares **what to run**, its **dependencies**, and how to **restart** it',
          '- Also `.timer`, `.socket`, `.target` units — but `.service` is the one you\'ll write',
          '',
          '### `systemctl` — the one command you\'ll use daily',
          '- **`systemctl start`/`stop`/`restart` nginx** — control it now',
          '- **`systemctl status nginx`** — running? healthy? recent log lines?',
          '- **`systemctl enable`/`disable` nginx** — **start at boot**, or not (≠ `start`, which is now-only)',
          '- After editing a unit: **`systemctl daemon-reload`**',
          '',
          'The two verbs to keep straight: **`start`** = now, **`enable`** = at every boot. Next: where a service\'s output *goes*.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Now, what actually runs on a server? Services — also called daemons — the long-running background programs that never show a prompt and just quietly do their job: the SSH server that lets you log in, the web server serving pages, the database answering queries, the scheduler firing off jobs. On a modern Linux system, every one of these is started and watched over by systemd, which — recall from Course one — is PID one, the very first process, and it stays running for the machine's whole life as the master service manager. How does systemd know about a service? Each one is described by a unit file, a small configuration file — a dot-service file — that declares what program to run, what other services it depends on so they start in the right order, and what to do if it crashes, like automatically restart it. These unit files live in slash-etc-slash-systemd-slash-system for ones you or your packages add, or slash-lib-slash-systemd-slash-system for ones that ship with the software. There are other unit types too — timers, sockets, targets — but the dot-service is the one you'll actually read and write. The command you'll use every single day to manage services is systemctl, and its verbs are intuitive. systemctl start, stop, or restart, followed by a service name, controls it right now. systemctl status is the one you'll reach for constantly — it tells you whether a service is running, whether it's healthy, when it last started, and even shows you the most recent lines of its log, all in one screen; it's the first thing to run when something isn't working. And then there's a pair that beginners constantly confuse, so let's nail it down. systemctl start runs the service right now, this moment — but it does nothing about the future, so after a reboot it won't come back. systemctl enable is the one that registers a service to start automatically at every boot. They're independent: start is now, enable is forever after. Usually you want both — enable it so it survives reboots, and start it so you don't have to wait for one. One more: after you edit a unit file, run systemctl daemon-reload so systemd re-reads it. So systemctl gives you complete control over what runs on the box. But a running service produces output — status messages, errors, warnings — and where all of that goes is the other half of the systemd story.",
          delta: [{ kind: 'solidify', ids: SY_SVC }],
        },
      ],
    },
    {
      id: 'systemd-logs',
      heading: 'journald, logs & targets',
      scene: 'systemd',
      highlight: SY_LOG,
      focus: [],
      slide: {
        title: 'journald, logs & targets',
        body: [
          'A service\'s output has to go *somewhere*. `systemd` captures it centrally with **`journald`**, read via **`journalctl`**.',
          '',
          '### The journal',
          '- Anything a service writes to **stdout/stderr** (Course 2!) is captured by **journald** — no manual log wiring',
          '- **`journalctl -u nginx`** — that service\'s logs · **`-f`** follow live (like `tail -f`) · **`-b`** since last boot · `-p err` by priority',
          '- Traditional text logs still live in **`/var/log`** (e.g. `/var/log/auth.log`) — both worlds coexist',
          '',
          '### Targets — the boot goal',
          '- A **target** groups services into a **state to reach**: `multi-user.target` (server), `graphical.target` (desktop)',
          '- The successor to old "runlevels"; `systemctl get-default` shows yours',
          '',
          '### The debugging loop',
          '- `systemctl status` → `journalctl -u <svc> -e` → fix the **unit or config** → `restart`. **This is the job.**',
          '',
          'Config, privilege, logs — the loop again. Next: getting the software onto the box in the first place.',
        ].join('\n'),
      },
      beats: [
        {
          line: "When a service is running in the background with no terminal attached, where does its output go — the status messages, the warnings, the errors it prints? This is where systemd's logging piece comes in, and it connects beautifully back to Course two. Remember the three streams: standard output and standard error. When systemd starts a service, it automatically captures whatever that service writes to stdout and stderr, and routes it into a central log system called journald, the journal daemon. This is a genuine convenience — the program's author doesn't have to set up log files at all; they just print, and systemd catches it. You read that journal with journalctl. The most useful form is journalctl dash-u followed by a service name, which shows you just that one service's logs — journalctl dash-u nginx to see everything nginx has said. Add dash-f to follow the log live, watching new lines appear in real time as they happen, exactly like tail dash-f on a file, which is invaluable while you're reproducing a problem. Dash-b limits it to the current boot, and dash-p lets you filter by priority, like showing only errors. Now, journald is the modern system, but the older tradition of plain text log files in slash-var-slash-log hasn't gone away — the authentication log, for instance, is often still there as slash-var-slash-log-slash-auth-dot-log — so in practice both worlds coexist and you'll read from both. There's one more systemd concept to name: targets. A target is a named group of services that together represent a state the system should reach. The most important is multi-user-dot-target, which is a fully working multi-user server with networking but no graphical desktop — the normal state for a server — versus graphical-dot-target, which additionally brings up the desktop environment. Targets are the modern replacement for the old idea of runlevels, and systemctl get-default shows which one your machine boots into. Now let's put the pieces together into the single most important loop in a system administrator's day, the debugging loop. Something's wrong with a service. You run systemctl status to see its state and last few log lines. You dig deeper with journalctl dash-u for the full logs. You spot the problem, fix the unit file or the service's config in slash-etc, and restart it. Status, journal, fix, restart — that cycle, which is really just our config-privilege-logs loop again, is the actual daily work of running services. So we can control and observe what runs. But how did that software get onto the machine to begin with? For that, package management.",
          delta: [{ kind: 'solidify', ids: SY_LOG }],
        },
      ],
    },
    {
      id: 'packages',
      heading: 'Package management',
      scene: 'packages',
      focus: PK,
      slide: {
        title: 'Package management',
        body: [
          'You don\'t download installers on Linux. A **package manager** installs software — **and every dependency** — from signed, trusted **repositories**, and tracks it all.',
          '',
          '### What it does for you',
          '- Resolves **dependencies** automatically (install `nginx`, get every library it needs)',
          '- Pulls from **repositories** whose packages are **cryptographically signed** — trusted by default',
          '- **Tracks** every file it installed, so it can cleanly **update** or **remove** it',
          '',
          '### `apt` (Debian/Ubuntu — `dnf` on Fedora, `pacman` on Arch)',
          '- **`sudo apt update`** — refresh the lists (do this **first**) · **`apt upgrade`** — update everything',
          '- **`sudo apt install nginx`** · **`apt remove nginx`** · `apt search` / `apt show`',
          '',
          '### The security point',
          '- Prefer packages over `curl … | bash` — packages are **signed, versioned, and removable**; a piped script is none of those',
          '',
          'Software on, software current. Next: making things happen **on a schedule**, with nobody watching.',
        ].join('\n'),
      },
      beats: [
        {
          line: "On Windows or a Mac, installing software usually means finding a website, downloading an installer, and clicking through it. Linux does something categorically better, and it's one of the things people miss most when they leave it: the package manager. Instead of hunting down installers, you have a single tool that installs software from curated, trusted collections called repositories, and it does three things that matter enormously. First, it resolves dependencies automatically. Real software is built on other software — libraries, tools, runtimes — and a package declares everything it needs; so when you ask to install the nginx web server, the package manager works out every library nginx depends on, and every library those depend on, and installs the whole tree in one shot, correctly. No more hunting for a missing DLL. Second, the repositories are trusted: their packages are cryptographically signed, so the package manager can verify that what you're installing genuinely came from the distribution and wasn't tampered with in transit. Third, it keeps a complete record of every file it installed, which means it can later update that software to a new version cleanly, or remove it completely without leaving junk behind. The commands differ a little by distribution family — apt on Debian and Ubuntu, dnf on Fedora and Red Hat, pacman on Arch — but the ideas are identical. Using apt as our example: you start with sudo apt update, which refreshes the local copy of what's available in the repositories, and you should run it before installing or upgrading so you're working from current information. sudo apt upgrade then updates all your installed packages to their latest versions — this is how you keep a system patched and secure. sudo apt install nginx installs a package and its dependencies; apt remove uninstalls; and apt search and apt show help you find and inspect packages. Now, one genuine security lesson to carry with you, because you'll be tempted otherwise: you'll often see installation instructions online that say pipe this URL straight into bash — curl something, pipe to bash. Prefer the package manager whenever you can, because a package is signed, versioned, and cleanly removable, while a script piped from the internet into a shell is unsigned, unversioned, runs with whatever privileges you gave it, and leaves no record of what it did. So the package manager is how software gets onto the box and stays current and secure. Next, let's make the box do things on its own, on a schedule, with no human present.",
          delta: [{ kind: 'solidify', ids: PK }],
        },
      ],
    },
    {
      id: 'scheduling',
      heading: 'Scheduling with cron & timers',
      scene: 'scheduling',
      focus: SC,
      slide: {
        title: 'Scheduling with cron & timers',
        body: [
          'Servers do work while you sleep — nightly backups, hourly cleanups, weekly reports. **`cron`** is the classic scheduler.',
          '',
          '### Your crontab',
          '- **`crontab -e`** edits *your* schedule; **`crontab -l`** lists it',
          '- Each line = **five time fields** + a command:',
          '```',
          'min hour day-of-month month day-of-week  command',
          ' 0   2    *            *     *   /opt/backup.sh   # 02:00 daily',
          ' */15 *   *            *     *   ./check.sh       # every 15 min',
          '```',
          '- **`*`** = every; **`*/15`** = every 15; a number pins a value',
          '',
          '### The classic gotcha',
          '- cron runs with a **bare environment** and no login `PATH` → **use absolute paths** and **redirect output to a log** (or you\'ll never see errors)',
          '',
          '### Modern alternative: `systemd` timers',
          '- `.timer` units — logged via journald, support dependencies & missed-run catch-up; `at` handles **one-off** jobs',
          '',
          'Automation on a clock. The last operator skill: reaching **other machines**.',
        ].join('\n'),
      },
      beats: [
        {
          line: "A defining feature of a server is that it works while nobody's watching — it backs itself up at two in the morning, clears out old temporary files every hour, emails a report every Monday. The classic tool that makes this happen is cron, a daemon that runs commands on a repeating schedule. Each user has their own schedule, called a crontab, which you edit with crontab dash-e and list with crontab dash-l. The format looks cryptic at first but it's just six columns: five time fields followed by the command to run. Those five fields, in order, are minute, hour, day of the month, month, and day of the week. The key to reading them is the asterisk, which means every. So a line that reads zero, two, asterisk, asterisk, asterisk, then a command, means: at minute zero of hour two, every day of the month, every month, every day of the week — in other words, run this every day at two a.m. You can do more than fixed times: asterisk-slash-fifteen in the minute field means every fifteen minutes, and putting a specific number in the day-of-week field, like one for Monday, pins it to that day. With those rules you can express almost any schedule. Now, there's one gotcha with cron that trips up absolutely everyone the first time, and knowing it will save you hours of confusion: cron runs your commands in a very minimal, bare environment — it does not load your normal shell setup, which means your PATH is nearly empty. So a script that runs perfectly when you type it by hand mysteriously does nothing under cron, because cron can't find the commands. The fix is a discipline: in anything you schedule, use full absolute paths to programs and files, and redirect the command's output to a log file — because otherwise, when a scheduled job fails at three in the morning, its error messages go nowhere and you'll never know it broke. Always give a cron job somewhere to write its output. Now, cron is old and universal, but modern Linux offers an alternative worth knowing: systemd timers, which are timer units that trigger services on a schedule. They're more to set up, but they log through journald like every other service, they can express dependencies, and they can catch up on a run that was missed while the machine was off — things plain cron can't do. And for a job you want to run just once at a future time, rather than repeatedly, there's a separate little command called at. So now the box can act on its own, on a clock. There's one last essential operator skill, and it's the one that makes remote servers possible at all: reaching other machines over the network.",
          delta: [{ kind: 'solidify', ids: SC }],
        },
      ],
    },
    {
      id: 'networking',
      heading: 'Networking: the path & the tools',
      scene: 'networking',
      focus: NW_PATH,
      slide: {
        title: 'Networking: the path & the tools',
        body: [
          'A server exists to be **reached**. Follow the path out — and meet the tools that inspect each hop.',
          '',
          '### The path (recall the network stack, Course 1)',
          '- Your **host** talks through a network **interface** (`eth0`), which has an **IP address**, out to the **network/router**, to a **remote host**',
          '- **DNS** turns a name (`example.com`) into an IP; a **port** picks which service on that host (80 = HTTP, 22 = SSH)',
          '',
          '### The everyday tools',
          '- **`ip a`** — your interfaces & IP addresses (`ip route` — how packets leave)',
          '- **`ss -tulpn`** — which **ports** are **listening**, and which process owns each (*"is my server up?"*)',
          '- **`ping host`** — is it reachable? · **`curl -I url`** — actually fetch (test an HTTP service)',
          '',
          '### The debugging ladder',
          '- `ip a` (do I have an address?) → `ping` (can I reach it?) → `ss`/`curl` (is the service answering?) — climb it in order',
          '',
        ].join('\n'),
      },
      beats: [
        {
          line: "A server's entire purpose is to be reached over the network — a website nobody can connect to is useless — so networking is a core operator skill. Let's trace the path a connection takes, which ties back to the network stack we saw inside the kernel in Course one. Your machine, the host, sends and receives data through a network interface — often named something like eth0 for a wired connection — and that interface has an IP address, its identity on the network. From there, traffic goes out to your local network and its router, and then across the wider network to a remote host, another machine identified by its own IP address. Two supporting ideas make this usable: DNS, the domain name system, translates a human-friendly name like example-dot-com into the numeric IP address the network actually routes on; and a port number selects which specific service on a host you want, since one machine runs many — port eighty is the convention for web traffic, port twenty-two for SSH. Now the tools, each of which inspects one part of that path. ip a — ip space a — shows you your interfaces and their IP addresses, answering do I even have a network address; its companion ip route shows how packets find their way out. ss dash-t-u-l-p-n is the one you'll use to answer is my server actually running — it lists which ports are open and listening on your machine and, crucially, which process owns each one, so you can confirm your web server is really up and bound to port eighty. ping followed by a host is the simplest reachability test: it sends a tiny probe and tells you whether the other end answers at all, and how fast. And curl actually makes a real request — curl dash-capital-I to a URL fetches just the headers from a web service, letting you test from the command line whether an HTTP server is responding correctly. Put these together and you get the network debugging ladder, which you climb in order when something can't connect: first ip a, do I have an address at all; then ping, can I reach the other machine; then ss or curl, is the actual service answering on its port. Working up that ladder isolates exactly where the break is. That's how you inspect the network. But there's one tool that a remote operator lives inside more than any other — the one that lets you securely become the shell on a machine across the world — and that's ssh.",
          delta: [{ kind: 'solidify', ids: NW_PATH }],
        },
      ],
    },
    {
      id: 'ssh',
      heading: 'ssh: the remote shell',
      scene: 'networking',
      focus: NW_SSH,
      slide: {
        title: 'ssh: the remote shell',
        body: [
          '**`ssh`** gives you an **encrypted shell on a remote machine** — it\'s how virtually all server administration happens.',
          '',
          '### Logging in',
          '- **`ssh sam@server.com`** — a secure `bash` prompt *on that server*; everything you\'ve learned now works remotely',
          '- **`ssh -p 2222 …`** for a non-default port · runs over port **22**',
          '',
          '### Keys, not passwords (the professional default)',
          '- **`ssh-keygen`** makes a **key pair**: a *private* key you keep, a *public* key you put on the server (`~/.ssh/authorized_keys`)',
          '- **`ssh-copy-id sam@server`** installs it — then login is keyed, no password: safer *and* scriptable',
          '- Guard the private key (`chmod 600`); disabling password login hardens a server',
          '',
          '### The companions',
          '- **`scp`** / **`rsync`** copy files over the same secure channel (`rsync` syncs efficiently, resumable)',
          '',
          'With `ssh` you administer any box on earth as if you were sitting at it. That completes the operator\'s toolkit.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Here is the tool that makes the entire world of remote servers possible: ssh, the secure shell. Think about the situation — the machine you need to administer is in a data center hundreds of miles away, with no screen and no keyboard you can touch. ssh solves this completely by giving you an encrypted shell session on that remote machine, right in your terminal. You type ssh, then your username, an at-sign, and the server's address — ssh sam-at-server-dot-com — and after authenticating you're sitting at a bash prompt on that remote server, as if you'd walked up to it. And this is the beautiful payoff of the whole series: everything you've learned — navigating the filesystem, managing processes, reading logs, controlling services with systemctl, editing config in slash-etc — all of it now works over that ssh connection, on a machine anywhere on Earth. The encryption means it's all safe from eavesdropping, even over the open internet. Now, you can log in with a password, but the professional way, and one worth adopting immediately, is to use key-based authentication instead. You run ssh-keygen once, which creates a matched pair of cryptographic keys: a private key that stays secret on your own machine and that you never share, and a public key that you place on any server you want to access, in a file called authorized_keys in your home directory's dot-ssh folder. The helper ssh-copy-id does that installation for you. Once it's set up, logging in requires no password at all — the two keys prove your identity to each other mathematically — and this is both more secure, because there's no password to guess or brute-force, and more convenient, because it can happen in a script without a human typing anything. You protect the private key with tight permissions, chmod six-hundred, and on a hardened server you disable password login entirely, allowing only keys. Alongside ssh come two companions that use the same secure channel to move files: scp, which copies files to and from a remote machine much like the cp command, and rsync, which is smarter — it efficiently synchronizes files and directories, transferring only what changed and resuming if interrupted, which makes it the standard tool for backups and deployments. With ssh and its companions in hand, you can log into, administer, and move files to and from any Linux machine in the world as though you were sitting right in front of it. And that completes the operator's toolkit. Let's bring it all together.",
          delta: [{ kind: 'solidify', ids: NW_SSH }],
        },
      ],
    },
    {
      id: 'you-are-here',
      heading: 'You are here',
      scene: 'admin-overview',
      focus: [],
      slide: {
        title: 'You are here',
        body: [
          'You can now **operate** a real Linux machine — the skills a server actually demands, day to day.',
          '',
          '### What you can now do',
          '- Manage **users & groups**, and grant power safely with **`sudo`** (not root logins)',
          '- Control and observe **services** with **`systemctl`** & **`journalctl`** (start vs enable; the status→journal→fix loop)',
          '- Install & update software via the **package manager** (signed, tracked, removable)',
          '- Automate on a clock with **`cron`** / timers, and reach any box with **`ssh`** + keys (`ip`, `ss`, `curl`)',
          '',
          '### The road ahead',
          '- **Scripting** — capturing these one-off commands into robust, reusable **bash scripts**',
          '- **Project** — combining everything into a real tool you build & ship',
          '',
          'You can run a server now. Next: **automating** the operator\'s work with real shell scripts.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Here's the whole administrator's surface, and you can now genuinely operate a Linux machine. You can manage the accounts on it — creating users, organizing them into groups, and above all granting elevated power the right way, through sudo and group membership rather than dangerous root logins, with every action logged and attributable. You can command the services that do a server's real work, using systemctl to start, stop, enable, and inspect them, keeping straight that start is for now and enable is for every boot; and when something breaks, you know the loop — systemctl status, then journalctl for the full logs, then fix the config and restart. You can install and maintain software through the package manager, getting signed, dependency-resolved, cleanly removable software instead of risky manual installs. You can make the machine work on its own schedule with cron and systemd timers, remembering to use absolute paths and capture output. And you can reach any machine anywhere with ssh and key-based authentication, inspecting the network along the way with ip, ss, ping, and curl. That is the daily reality of running a server. But notice something: almost everything we did was typing individual commands by hand. The real power of operating Linux comes when you stop doing things by hand and start capturing them — turning that nightly backup, that health check, that deployment into a script that runs itself, reliably, every time. That's the next course: shell scripting, where we take everything you've learned and weave it into robust, reusable programs. You can run the machine now; next, let's teach it to run itself.",
          delta: [{ kind: 'solidify', ids: AO_ALL }],
        },
      ],
    },
  ],
}
