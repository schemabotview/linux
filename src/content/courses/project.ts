import type { Course } from 'reveal-engine'

// Course 8 — "Capstone: ship a real CLI tool" (the SHIP stage). Builds `sysreport` — a system-
// health + log-summary tool — end to end, one stage per whole-canvas scene, deliberately calling
// back every prior course. Opens/closes on the `capstone-spine` build-map board. Solid-tour reveal.
//
// STATUS: §1–§11 authored — Course 8 of 8. Completes the Linux series.

const CS_ALL = ['cs-structure', 'cs-args', 'cs-collect', 'cs-transform', 'cs-report', 'cs-schedule', 'cs-service', 'cs-harden', 'cs-ship']

const CX = ['cx-all']
const CA = ['ca-all']
const CC = ['cc-all']
const CT = ['ct-all']
const CR = ['cr-all']
const CH = ['ch-all']
const CV = ['cv-all']
const CK = ['ck-all']
const CP = ['cp-all']

export const project: Course = {
  id: 'project',
  title: 'Capstone: ship a real CLI tool',
  sections: [
    {
      id: 'the-project',
      heading: 'The capstone: sysreport',
      scene: 'capstone-spine',
      focus: [],
      slide: {
        title: 'The capstone: sysreport',
        body: [
          'Time to put **all seven courses** together and build a real, shippable tool: **`sysreport`** — a system-health & log-summary CLI.',
          '',
          '### What it does',
          '- Gathers **uptime, disk, memory, top processes**, and **recent errors** from a live machine',
          '- **Summarizes** them into a clean report — flagging full disks and the most frequent error sources',
          '- Takes **options** (`-n`, `-o`), runs on a **schedule**, installs as a **systemd service**, and is **robust** enough to run unattended',
          '',
          '### The nine stages (and their callbacks)',
          '- Structure & args → collect → **transform** (Course 5) → report → **schedule/service** (Course 6) → **harden** (Course 7) → ship',
          '- Every stage leans on something you already learned — this is the whole series, converging',
          '',
          'We\'ll build it one stage at a time. Let\'s lay the foundation.',
        ].join('\n'),
      },
      beats: [
        {
          line: "This is the capstone, where everything comes together. Across seven courses you've learned how Linux boots and runs, how to drive the shell, navigate the filesystem, command processes, transform text, administer a machine, and write robust scripts — and now we're going to weave all of it into a single, real, genuinely useful tool that you could deploy to an actual server. The tool is called sysreport, and it's a system health and log summary utility — the kind of thing a real sysadmin writes and relies on. Here's what it'll do. It gathers the vital signs of a running machine: how long it's been up and how loaded it is, how full the disks are, how much memory is free, which processes are eating the CPU, and what errors have shown up recently in the system journal. Then it summarizes all of that into one clean, readable report — and not just a dump, but actual insight: it flags any disk that's dangerously full, and it tells you which error sources are the most frequent, using the exact tally pipeline we built in the text course. And it won't be a toy. It'll take proper command-line options, it'll run automatically every morning on a schedule, it'll install itself as a managed systemd service, and it'll be hardened enough to run unattended without making a mess. We'll build it in the nine stages on this board, and the beautiful thing is that nearly every stage is a callback to something you already know: structuring and arguments and hardening come from the scripting course, transforming the data comes from the text course, scheduling and the service come from the admin course, and setting permissions and installing come from the filesystem course. This is the whole series converging into one artifact. Let's start at stage one, laying the foundation.",
          delta: [{ kind: 'solidify', ids: CS_ALL }],
        },
      ],
    },
    {
      id: 'structure',
      heading: 'Stage 1 — Structure',
      scene: 'cap-structure',
      focus: CX,
      slide: {
        title: 'Stage 1 — Structure',
        body: [
          'Every good script starts the same way: a **shebang**, the **safety header**, and a skeleton you\'ll grow.',
          '',
          '### The foundation (Course 7)',
          '- **`#!/usr/bin/env bash`** + **`set -euo pipefail`** — fail fast from line one',
          '- **`readonly VERSION=…`** and **`SCRIPT="${0##*/}"`** — constants (the `${0##*/}` strips the path from `$0`)',
          '',
          '### The project layout',
          '- `sysreport.sh` (the tool) · `sysreport.service` + `.timer` (Course 6) · `install.sh` — a small, tidy repo',
          '',
          '### Start with a runnable stub',
          '- A **`main()`** that just prints the version, called as **`main "$@"`** — it *runs* today, and grows every stage',
          '- Building a working skeleton first (then filling it) beats writing 200 lines before the first test',
          '',
          'A running program, a clean shape. Next: let the user *tell it what to do*.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Stage one is the foundation, and it looks the way the start of every good script should, drawing straight from the scripting course. The very first line is the shebang, hash-bang slash-usr-slash-bin-slash-env bash, so the kernel runs it with bash. The very next line is the safety header, set dash-e-u-o pipefail, so that from the very first command, any failure stops the script, any unset variable is caught, and any broken pipe is noticed. Getting that in place before you write a single line of logic means the whole tool is built on solid ground. Then we define a couple of constants with readonly, which marks them unchangeable: a VERSION string, and SCRIPT, the tool's own name. That SCRIPT line uses a neat parameter-expansion trick, dollar-brace-zero-hash-hash-slash-star, which takes dollar-zero — the path the script was invoked as — and strips off everything up to the last slash, leaving just the bare filename, which is what we want in usage and log messages. Around the script we plan a tidy little project: the script itself, the systemd service and timer files we'll write in stages six and seven, and an install script for stage nine — a small, clean repository rather than one loose file. And here's a working-style point worth absorbing: rather than write two hundred lines and then try to run it, we start with a runnable stub — a main function that, for now, just prints the version, invoked at the bottom with main quote-dollar-at to pass along all the arguments. This means the tool actually runs, today, from the very first stage, and we grow it incrementally, testing as we go. A working skeleton you flesh out beats a big blob you debug all at once. So we have a running program with a clean shape. The first real capability it needs is to let the user tell it what to do — command-line options.",
          delta: [{ kind: 'solidify', ids: CX }],
        },
      ],
    },
    {
      id: 'arguments',
      heading: 'Stage 2 — Arguments',
      scene: 'cap-args',
      focus: CA,
      slide: {
        title: 'Stage 2 — Arguments',
        body: [
          'A real tool is **configurable**. Give it sensible defaults, then let flags override them — the `getopts` pattern from Course 7.',
          '',
          '### Defaults first',
          '- `LINES=20`, `OUTPUT="-"` (stdout), `VERBOSE=0` — it works with **no** arguments at all',
          '',
          '### Flags override — `getopts`',
          '- **`-n LINES`** how many log lines · **`-o FILE`** where to write · **`-v`** verbose · **`-h`** help',
          '- `while getopts "n:o:vh" opt` — the `:` after `n`/`o` marks options that **take a value** (in `$OPTARG`)',
          '',
          '### A real `usage()`',
          '- A **here-doc** prints clean multi-line help; `-h` shows it and exits `0`, a bad flag shows it on **stderr** and exits `1`',
          '',
          'Configurable and self-documenting. Now the tool needs something to report on — let\'s gather the data.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Stage two makes the tool configurable, because a real command-line utility isn't rigid — it adapts to what the user needs, through options. The pattern is exactly the one from the scripting course: sensible defaults first, then flags that override them. So we set defaults at the top — LINES to twenty, meaning summarize the last twenty log lines; OUTPUT to a single dash, our convention for print to standard output; and VERBOSE off. The crucial property here is that with these defaults in place, the tool works perfectly with no arguments at all — just run sysreport and it does something reasonable. That's good design: zero-config by default, configurable when you want. Then we parse the flags with getopts, looping over an option string of n-colon-o-colon-v-h. Remember the colon means that option expects a value, so dash-n and dash-o each take an argument — the number of lines, and the output file — which getopts hands us in the OPTARG variable, while dash-v and dash-h are simple on-off switches. A case statement inside the loop assigns each one. And we write a proper usage function using a here-doc — that's the cat with the double-less-than EOF syntax that lets you print a clean block of multi-line text — describing every option. We wire dash-h to print that help and exit zero, success, while an unrecognized flag prints the usage to standard error and exits one, failure — the correct conventions that make a tool feel professional and behave well in pipelines and scripts. So now sysreport is configurable and self-documenting; run it with dash-h and it tells you how to use it. But a reporting tool needs something to report on. Stage three is gathering the actual data.",
          delta: [{ kind: 'solidify', ids: CA }],
        },
      ],
    },
    {
      id: 'collect',
      heading: 'Stage 3 — Collect',
      scene: 'cap-collect',
      focus: CC,
      slide: {
        title: 'Stage 3 — Collect',
        body: [
          'Gather the raw facts — each source wrapped in its **own small function**. This is where the admin & process courses pay off.',
          '',
          '### One function per source',
          '- `collect_uptime` → **`uptime`** · `collect_disk` → **`df -h`** · `collect_memory` → **`free -h`**',
          '- `collect_top_cpu` → **`ps -eo … --sort=-%cpu`** (Course 4) · `collect_errors` → **`journalctl -p err -b`** (Course 6)',
          '',
          '### Why wrap each in a function',
          '- **Named, testable, replaceable** — run `collect_errors` alone to check it; swap its command without touching the rest',
          '- Keeps *gathering* cleanly separate from *interpreting* (next stage) and *formatting* (the one after)',
          '',
          '### A `warn` helper',
          '- `warn() { echo "…" >&2; }` — status goes to **stderr**, so it never contaminates the report on stdout',
          '',
          'Raw facts in hand. But raw output isn\'t insight — next we **transform** it.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Stage three is where sysreport starts doing its real job: collecting the facts about the machine. And notice the design choice — we wrap each source of information in its own small, named function. There's collect_uptime, which just runs the uptime command to get how long the system's been running and its load averages. There's collect_disk running df dash-h for human-readable disk usage, and collect_memory running free dash-h. There's collect_top_cpu, which uses the ps command from the processes course with a sort flag to list the top processes by CPU usage. And there's collect_errors, which pulls recent error-level messages from the journal using journalctl with the priority and boot flags we learned in the admin course, limited to the number of lines the user asked for. Now, why bother wrapping each single command in a function instead of just running them inline? Three good reasons, all of which come from thinking like a real developer. First, they're named, so the code reads like a description of what it does. Second, they're independently testable — while building, you can call just collect_errors on its own to check it produces what you expect, without running the whole tool. Third, they're replaceable — if you later want to get disk info a different way, you change one function and nothing else cares. And most importantly, wrapping them keeps a clean separation between the three phases of the tool: gathering the data here, interpreting it in the next stage, and formatting it in the stage after. Mixing those together is how scripts turn into unmaintainable spaghetti; keeping them apart is how you keep it sane. We also add a small warn helper that prints to standard error, so that any status or warning messages the tool emits go to stderr and never accidentally end up mixed into the report on stdout — that stream discipline from the shell course, applied. So now we have all the raw facts. But raw command output isn't the same as insight — a wall of df and ps output is data, not a summary. The next stage is where we turn it into something genuinely useful.",
          delta: [{ kind: 'solidify', ids: CC }],
        },
      ],
    },
    {
      id: 'transform',
      heading: 'Stage 4 — Transform',
      scene: 'cap-transform',
      focus: CT,
      slide: {
        title: 'Stage 4 — Transform',
        body: [
          'The heart of the tool: turn raw output into **insight** with the text toolkit — the whole point of Course 5.',
          '',
          '### From data to answers',
          '- **`top_cpu`** — `awk` keeps just the `%cpu` + process name from the raw `ps` block',
          '- **`top_errors`** — the **tally idiom**: `awk \'{print $5}\' | sort | uniq -c | sort -rn | head -5` → the *most frequent* error sources',
          '- **`disk_alerts`** — `awk \'$5+0 > 90\'` flags any mount **over 90% full** (numeric compare on the use%)',
          '',
          '### Why this is the payoff',
          '- Anyone can run `df`; the *value* is "which disk is about to fill" and "what\'s failing most" — that\'s **transformation**, not collection',
          '- Small functions compose the Course 5 pipelines you already know',
          '',
          'Now we have the *answers*. Stage 5 arranges them into a report a human wants to read.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Stage four is the heart of the tool, and it's where the text-processing course pays off completely — because this is the stage that turns raw data into actual insight. Anybody can run df and stare at disk numbers; the value of a good tool is that it does the thinking for you. So we build three small transforming functions on top of the collectors. top_cpu takes the raw ps output and pipes it through awk to keep only what matters — the CPU percentage and the process name — dropping the header and the noise. top_errors is the star, and it's the exact tally pipeline we built in the text course: it takes the collected error lines, uses awk to pull out the field identifying each error's source, then sort, then uniq dash-c to count each one, then sort dash-r-n to rank them, then head to take the top five. In one pipeline, it answers the question that actually matters — not here are your errors, but here are the five things going wrong most often. And disk_alerts uses awk with a numeric comparison to scan the df output and flag any filesystem that's over ninety percent full — the dollar-five-plus-zero trick coerces the percentage field to a number so we can compare it. This is the difference between a data dump and a report: instead of showing you every disk, it tells you which disk is about to cause an outage. That's transformation, not collection, and it's exactly the skill the text course was building toward — small functions each wrapping a pipeline of grep, awk, sort, and uniq that you already know how to write. So now the tool doesn't just have data, it has answers: the CPU hogs, the top error sources, the disks in danger. The final piece of the core tool is arranging those answers into a report that a human actually wants to read.",
          delta: [{ kind: 'solidify', ids: CT }],
        },
      ],
    },
    {
      id: 'report',
      heading: 'Stage 5 — Report',
      scene: 'cap-report',
      focus: CR,
      slide: {
        title: 'Stage 5 — Report',
        body: [
          'Arrange the answers into one clean, sectioned report — and honor the `-o` flag from Stage 2.',
          '',
          '### Assemble with a here-doc',
          '- One **`report()`** function, a single here-doc with **`$(…)`** command substitution dropping each section in place',
          '- Header (host + timestamp), then labelled sections: uptime · disk (+ alerts) · top CPU · top errors',
          '- Reads top-to-bottom like the output itself — easy to reorder or extend',
          '',
          '### Respect the output option',
          '- **`emit()`** checks `$OUTPUT`: `-` → **stdout** (pipe/redirect it yourself), else write to the **file**',
          '- `report | emit` — the report is generated **once**, then routed — a tiny, clean pipeline',
          '',
          'The **core tool is done** — it runs, takes options, and prints a real report. Now make it run *itself*.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Stage five assembles everything into the final report, and it's a lovely demonstration of how here-docs make output code readable. We write one report function, and inside it a single here-doc — the cat with double-less-than EOF — that lays out the entire report as a template. Throughout that template we use command substitution, dollar-parentheses, to drop each piece in place: a header line with the hostname and the current timestamp, then a series of clearly labelled sections — uptime and load, then disk usage followed by any disk alerts, then the top CPU consumers, then the top error sources. Because it's a here-doc, the code looks almost exactly like the output it produces, top to bottom, which makes it trivially easy to read, reorder, or add a new section to later. Then we honor the output option the user set back in stage two. A small emit function checks the OUTPUT variable: if it's the dash, our convention for standard output, it just passes the text through, so the user can redirect or pipe it themselves; otherwise it writes to the file they named with dash-o. And we tie it together with report piped into emit — the report is generated exactly once and then routed to the right place, a tiny, clean two-stage pipeline that reuses the stream concepts from the very first shell course. And with that, the core tool is genuinely complete: sysreport runs, accepts its options, gathers real data, transforms it into insight, and prints a clean report to your screen or a file. If we stopped here, it'd already be useful. But a report you have to remember to run by hand isn't much of an automation. The next stages are about making the tool run itself, reliably, without you — starting with scheduling.",
          delta: [{ kind: 'solidify', ids: CR }],
        },
      ],
    },
    {
      id: 'schedule',
      heading: 'Stage 6 — Schedule',
      scene: 'cap-schedule',
      focus: CH,
      slide: {
        title: 'Stage 6 — Schedule',
        body: [
          'A report is most useful **automatically**. Schedule it to run every morning — two ways, from Course 6.',
          '',
          '### The cron way (simple)',
          '- One crontab line: `0 7 * * * /usr/local/bin/sysreport -o /var/log/sysreport.txt`',
          '- (Remember the cron gotchas: **absolute paths**, and it writes to a **file** so output isn\'t lost)',
          '',
          '### The systemd-timer way (modern)',
          '- A **`.timer`** unit with **`OnCalendar=*-*-* 07:00:00`** — declarative, and **logged via journald**',
          '- **`Persistent=true`** — if the machine was **off** at 07:00, it runs at next boot (cron would just skip it)',
          '- The timer triggers a **service** — which we write next',
          '',
          'Scheduled to run itself. But a timer needs a *service* to trigger — Stage 7.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Stage six schedules the tool, because a health report is far more valuable if it just appears every morning than if you have to remember to run it. And we cover both ways from the admin course, because you'll meet both in the wild. The simple, classic way is cron: a single line in the crontab that says, at minute zero of hour seven every day, run sysreport and write its output to a log file. And here we deliberately apply the cron lessons we learned: we use the absolute path to the installed sysreport, because cron runs with a minimal PATH and wouldn't find it otherwise, and we direct its output to a file with dash-o, because a scheduled job's output would otherwise vanish. The modern way is a systemd timer, and it's worth preferring on a systemd machine. We write a dot-timer unit with an OnCalendar line specifying seven a.m. daily — a clean, declarative schedule — and it comes with two real advantages over cron. First, because it's a systemd unit, its runs are logged through journald, so you can see exactly when it fired and what happened with journalctl, whereas cron is famously silent. Second, we set Persistent equals true, which means if the machine happened to be powered off at seven a.m. — a laptop, say — the job runs at the next boot instead of simply being skipped forever, which is what plain cron would do. That catch-up behavior matters for anything you truly don't want to miss. Now, a systemd timer doesn't actually do the work itself — it's just a trigger, a clock. What it triggers is a companion service unit that defines what to run. So the natural next stage is writing that service.",
          delta: [{ kind: 'solidify', ids: CH }],
        },
      ],
    },
    {
      id: 'service',
      heading: 'Stage 7 — Service',
      scene: 'cap-service',
      focus: CV,
      slide: {
        title: 'Stage 7 — Service',
        body: [
          'The timer triggers a **service unit** — a `.service` file describing *what to run* (Course 6).',
          '',
          '### The unit',
          '- **`Type=oneshot`** — it runs once and exits (not a daemon that stays up) — exactly right for a report',
          '- **`ExecStart=`** the full command; **`User=root`** (needs system-wide access); **`Nice=10`** — polite priority (Course 4!)',
          '- `After=network.target` — ordering, so dependencies are up first',
          '',
          '### Wire it up & observe',
          '- `sudo systemctl daemon-reload` → `enable --now sysreport.timer` (enable = boot-persistent, Course 6)',
          '- `systemctl status` and **`journalctl -u sysreport.service`** — its output is captured automatically (stdout → journald)',
          '',
          'It now runs itself, on schedule, managed and logged by the system. Two stages left: make it **bulletproof**, then **ship** it.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Stage seven writes the service unit that the timer triggers, and it pulls together the systemd knowledge from the admin course along with a nice callback to the processes course. The service is a dot-service file, and the first important choice is the type: we set Type equals oneshot, which tells systemd this isn't a long-running daemon that stays up — it runs once, does its job, and exits, which is precisely the shape of a report generator. The ExecStart line gives the full command to run, the installed sysreport with its output flag. We set User equals root, because gathering system-wide stats and reading the full journal needs privilege. And here's a satisfying callback: we add Nice equals ten, applying the process-priority concept from the fourth course, so that our report generator runs at a low priority and stays polite — it won't steal CPU from the machine's real work while it gathers its stats. We also add After equals network target, an ordering hint so the service waits for basic system readiness before running. Then we wire it all up with the systemctl commands from the admin course: daemon-reload so systemd picks up the new units, then enable dash-dash-now on the timer, which both enables it to start at every boot — remember, enable is the boot-persistent one — and starts it immediately. And because it's now a proper systemd service, we get observability for free: systemctl status shows its health, and journalctl dash-u sysreport-dot-service shows its output, since systemd automatically captured whatever the tool wrote to standard output and standard error into the journal. So the tool now runs itself, on schedule, fully managed and logged by the system, exactly like any professional service. There are two stages left, and they're what separate a personal script from something you'd actually deploy: making it bulletproof against the things that go wrong when nobody's watching, and packaging it up to ship.",
          delta: [{ kind: 'solidify', ids: CV }],
        },
      ],
    },
    {
      id: 'harden',
      heading: 'Stage 8 — Harden',
      scene: 'cap-harden',
      focus: CK,
      slide: {
        title: 'Stage 8 — Harden',
        body: [
          'It runs unattended at 07:00 — so it must survive the messy real world. Four safeguards (Courses 4 & 7).',
          '',
          '### The safeguards',
          '- **Preflight checks** — `command -v journalctl awk df` up front; a missing tool fails **early with a clear message**, not cryptically mid-run',
          '- **A lockfile** — `flock -n` on an fd, so two runs can never **overlap** and corrupt the output file',
          '- **Cleanup `trap`** — remove the lock on **any** exit, including `Ctrl-C` / `SIGTERM` (Course 4 signals)',
          '- **Input validation** — `[[ "$LINES" =~ ^[0-9]+$ ]]` — reject a bad `-n` before it reaches `tail`',
          '',
          '### The mindset',
          '- Unattended code must **fail loudly and safely**, never silently or halfway — assume everything that *can* go wrong *will*, at 3 a.m.',
          '',
          'Bulletproof. The last step: package it so anyone can install and run it — ship it.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Stage eight is hardening, and it embodies a mindset that separates amateur scripts from professional ones: code that runs unattended, at seven in the morning with nobody watching, must be built to survive the messy real world, where tools go missing, runs overlap, and inputs are wrong. We add four safeguards, drawing on the scripting and processes courses. First, preflight checks: before doing anything, we loop over the commands the tool depends on — journalctl, awk, df — and use command dash-v to verify each one exists, exiting early with a clear message like missing journalctl if one doesn't. That way, on a system where a tool isn't installed, sysreport fails immediately and understandably, rather than getting halfway through and producing a broken, confusing report. Second, a lockfile, using flock on a file descriptor: this guarantees that two copies of the tool can never run at the same time and stomp on each other's output file — if a run is already in progress, the second one exits gracefully rather than causing corruption. Third, a cleanup trap: we trap the EXIT so that the lockfile is always removed no matter how the script ends — normal completion, an error, or an interrupt like Control-C or a SIGTERM from systemd — which is the signals-and-traps combination from the processes and scripting courses working together, so we never leave a stale lock behind that would block all future runs. And fourth, input validation: we check that the dash-n value the user gave is actually a number, using a regex match, and reject it clearly if it's not, rather than passing garbage down to tail and failing cryptically. The through-line in all four is a single principle: unattended code must fail loudly and safely, never silently and never halfway. You assume that anything that can go wrong will go wrong, at the worst possible time, and you make the tool handle it gracefully. Now sysreport is genuinely bulletproof. The one thing left is to package it so that anyone can install and run it — to ship it.",
          delta: [{ kind: 'solidify', ids: CK }],
        },
      ],
    },
    {
      id: 'ship',
      heading: 'Stage 9 — Ship',
      scene: 'cap-ship',
      focus: CP,
      slide: {
        title: 'Stage 9 — Ship',
        body: [
          'The final step: package it so **anyone** can install it in one command — and call it truly *done*.',
          '',
          '### An `install.sh`',
          '- **`install -m 755 sysreport.sh /usr/local/bin/sysreport`** — copy **and** set permissions in one step (Course 3); now it\'s on **`PATH`** (bare `sysreport` works)',
          '- Place the `.service` / `.timer` in `/etc/systemd/system/`, then **`daemon-reload`** + **`enable --now`**',
          '- `/usr/local/bin` is the right home for **local, admin-installed** tools',
          '',
          '### What "shipped" really means',
          '- A **README** (what, why, how) · **`shellcheck`-clean** code · a set **`VERSION`** · **documented exit codes**',
          '- The difference between "works on my machine" and "someone else can run it"',
          '',
          'sysreport is **built, hardened, and shipped** — a real tool. Let\'s step all the way back.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Stage nine is shipping — packaging the tool so that anyone can install it cleanly in a single command, which is the difference between it works on my machine and something a colleague or a fleet of servers can actually use. We write a small install script, and it's a nice final callback to the filesystem course. The key line uses the install command, which copies a file and sets its permissions in one atomic step — install dash-m seven-five-five puts sysreport into slash-usr-slash-local-slash-bin with executable permissions. And that location matters: slash-usr-slash-local-slash-bin is the standard home for locally installed, admin-provided tools, and because it's on the system PATH, once installed you can run the tool by just typing sysreport from anywhere, with no path and no dot-slash — it feels like a built-in command. The installer also places the service and timer files into slash-etc-slash-systemd-slash-system with the right read permissions, then runs daemon-reload and enable-dash-dash-now to activate the schedule — automating the whole setup we did by hand in the earlier stages. But shipping is about more than copying files, and it's worth being clear about what done really means for a real tool. It means there's a README explaining what the tool is, why it exists, and how to use it, so someone can understand it without reading the source. It means the code is shellcheck-clean, having passed the linter from the scripting course with no warnings. It means the VERSION is set, so people know what they're running. And it means the exit codes are documented, so other scripts can rely on it. Those things are unglamorous, but they're exactly what turns a personal hack into software other people can trust and build on. And with that, sysreport is complete: designed, built stage by stage, transformed from raw data into insight, scheduled, serviced, hardened against the real world, and shipped. It's a genuine, deployable Linux tool. Let's step all the way back and take in everything this represents.",
          delta: [{ kind: 'solidify', ids: CP }],
        },
      ],
    },
    {
      id: 'you-are-here',
      heading: 'You are here — the whole series',
      scene: 'capstone-spine',
      focus: [],
      slide: {
        title: 'You are here — the whole series',
        body: [
          'You built **`sysreport`** end to end — and in doing so, used **every course** in this series. That convergence is the point.',
          '',
          '### Every course, in one tool',
          '- **Kernel** — the syscalls & processes underneath it all · **Shell** — streams, pipes, exit codes',
          '- **Filesystem** — paths, permissions, `install` · **Processes** — `ps`, `nice`, signals & traps',
          '- **Text** — the `grep`/`awk`/`sort | uniq -c` insight pipeline · **Admin** — `systemd`, `journalctl`, scheduling',
          '- **Scripting** — the whole robust-bash foundation the tool is written in',
          '',
          '### Where to go next',
          '- Extend `sysreport` (email alerts, JSON output, more checks) — the best way to learn is to keep building',
          '- Containers, cloud, config management (Ansible) — all stand on exactly these fundamentals',
          '',
          'From a cold power button to a shipped tool. **You know Linux now** — not as commands, but as a system. Go build.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Here's the whole capstone, and stepping back, look at what it really represents: a single tool that used every single course in this series. That was the entire point of building it. Think about everything that went into sysreport. The kernel course gave you the mental model of the processes and system calls happening underneath every command it runs. The shell course gave you the streams, the pipes, and the exit codes that the tool is built out of. The filesystem course gave you paths, permissions, and the install command that ships it. The processes course gave you ps and nice for gathering and prioritizing, and the signals and traps that make it clean up after itself. The text course gave you the beating heart of the tool — the grep, awk, and sort-uniq-count pipeline that turns raw data into real insight. The admin course gave you systemd, journalctl, and scheduling, so the tool runs itself and is managed like a real service. And the scripting course gave you the entire robust foundation — the safety header, the functions, the getopts, the validation — that the whole thing is written on. Every course, converging into one artifact. That convergence is what it means to actually know Linux: not memorizing a list of commands, but understanding the system deeply enough that all the pieces click together into something you can build with. So where do you go from here? The best next step is to keep building — extend sysreport itself: add email alerts when a disk is critical, output JSON so another program can consume it, add more health checks. Tools grow by use. And beyond that, everything in the modern infrastructure world — containers, the cloud, configuration management tools like Ansible — stands directly on the fundamentals you now hold. There's no magic above this layer; it's all just these ideas, composed. You started this series at a cold power button, not knowing what happened when a machine turned on. You're ending it having built and shipped a real tool. You know Linux now — not as a set of commands, but as a system you understand from the boot chain up. Go build something.",
          delta: [{ kind: 'solidify', ids: CS_ALL }],
        },
      ],
    },
  ],
}
