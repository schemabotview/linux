import type { Course } from 'reveal-engine'

// Course 7 — "Shell scripting" (the AUTOMATE stage). Opens on the `scripting-overview` board (§1),
// then a whole-canvas scene per construct — `script-basics` (§2–§3), `conditionals` (§4), `loops`
// (§5), `functions` (§6), `robust` (§7–§8) — bookending on the board (§9). Solid-tour reveal.
//
// STATUS: §1–§9 authored — Course 7 of 8.

const SV_ALL = ['sv-basics', 'sv-cond', 'sv-loop', 'sv-func', 'sv-robust', 'sv-args']

const SB = ['sb-all']
const CD = ['cd-all']
const LP = ['lp-all']
const FN = ['fn-all']
const RB = ['rb-all']

export const scripting: Course = {
  id: 'scripting',
  title: 'Shell scripting',
  sections: [
    {
      id: 'why-script',
      heading: 'From commands to programs',
      scene: 'scripting-overview',
      focus: [],
      slide: {
        title: 'From commands to programs',
        body: [
          'A **script** is just commands saved in a file — the shell you already know, made **repeatable**. This is where operating Linux becomes *automating* it.',
          '',
          '### Why script',
          '- **Repeatable & reliable** — the same steps, run identically every time, no forgotten flag',
          '- **Automatable** — a script + `cron` (Course 6) = work that happens with nobody there',
          '- **Shareable** — hand a teammate a tool, not a wiki page of commands to paste',
          '',
          '### It\'s the same shell, plus structure',
          '- Every command, pipe, and redirect you\'ve learned works verbatim — scripting **adds** variables, conditionals, loops, and functions',
          '- The building blocks on this board, in order — from a runnable file to a *robust* one',
          '',
          'The last course was doing things by hand. This one is teaching the machine to do them for you.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Everything we did in the last course, we did by typing commands one at a time. This course is about capturing those commands into files that run themselves — and that leap, from doing to automating, is where working with Linux gets genuinely powerful. A shell script, at its heart, is nothing more exotic than a sequence of shell commands saved in a text file, so that instead of typing them over and over, you run the file. That's it — if you can type it at the prompt, you can put it in a script. But that simple idea unlocks three big wins. First, repeatability and reliability: a complex deployment or backup might be fifteen commands in a precise order, and doing that by hand at midnight is how mistakes happen — one forgotten flag, one skipped step. A script does the exact same thing, correctly, every single time. Second, automation: a script combined with cron, from the last course, means the work happens on schedule with no human present at all — the backup just runs. Third, sharing: instead of handing a colleague a wiki page full of commands to copy and paste and probably get wrong, you hand them a tool they can just run. And here's the encouraging part: scripting is not a new language you have to learn from scratch. It is the very same bash you've been using all along — every command, every pipe, every redirection works identically inside a script. Scripting simply adds structure on top: variables to remember values, conditionals to make decisions, loops to repeat work, and functions to organize it. Those building blocks are what's on this board, and we'll walk them in order, building from a script that merely runs to one that's genuinely robust — that handles errors, cleans up after itself, and can be trusted to run unattended. Let's start by turning a file of commands into a real program.",
          delta: [{ kind: 'solidify', ids: SV_ALL }],
        },
      ],
    },
    {
      id: 'anatomy',
      heading: 'Shebang & running a script',
      scene: 'script-basics',
      focus: SB,
      slide: {
        title: 'Shebang & running a script',
        body: [
          'Three things turn a text file into a runnable program: a **shebang**, the **execute bit**, and a way to run it.',
          '',
          '### The shebang',
          '- The **first line**: `#!/usr/bin/env bash` — tells the kernel *which interpreter* runs this file',
          '- `#!/usr/bin/env bash` (vs `#!/bin/bash`) finds bash via `PATH` — more portable',
          '',
          '### Make it executable, then run',
          '- **`chmod +x backup.sh`** (Course 3!) sets the execute bit',
          '- **`./backup.sh`** — the `./` is required: the current dir isn\'t on `PATH` (a safety default)',
          '- Or `bash backup.sh` without the exec bit — handy while developing',
          '',
          '### Comments',
          '- **`#`** to end of line — everything you\'ve learned about the file *is* the documentation others read',
          '',
          'A runnable file. Now give it memory and inputs — variables and arguments.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Let's turn a plain text file into a program the system will run, which takes three things. The first is the shebang — a slightly odd name for the very first line of the script, which begins with a hash and an exclamation mark, hash-bang, followed by a path. That line tells the kernel which interpreter should run this file. For a bash script you write hash-bang slash-usr-slash-bin-slash-env bash. You might have seen the simpler hash-bang-slash-bin-slash-bash, and that often works, but the env form is more portable because it looks up bash through the PATH rather than assuming it lives in one exact spot, which matters across different systems. The kernel reads this line the moment you run the file and launches the right interpreter automatically. The second thing is the execute permission — and this connects right back to the filesystem course, where we learned that a file needs its x bit set to be runnable. So you run chmod plus-x on your script to mark it executable. The third is actually running it, and there's a subtlety that confuses every beginner exactly once. You'd think you could just type the script's name, like you do for ls — but if you type backup.sh, the shell says command not found. Why? Because, as we learned, the shell searches PATH for commands, and for security reasons your current directory is deliberately not on PATH — otherwise a malicious file dropped in a folder could hijack a common command name. So to run a script in the current directory, you write dot-slash-backup.sh, where the dot-slash explicitly says the program is right here, in this directory. While you're still writing and testing a script, there's a shortcut that skips both the exec bit and the dot-slash: just run bash backup.sh, handing the file directly to bash — handy during development. One more essential: comments. Anything after a hash on a line is ignored by bash, and this is how you document what your script does and why — for your teammates, and for yourself six months from now, who will have completely forgotten. So now we have a file that runs. To make it useful, it needs to remember values and accept inputs — variables and arguments.",
          delta: [{ kind: 'solidify', ids: SB }],
        },
      ],
    },
    {
      id: 'variables-args',
      heading: 'Variables & arguments',
      scene: 'script-basics',
      focus: SB,
      slide: {
        title: 'Variables & arguments',
        body: [
          'Scripts need **memory** (variables) and **inputs** (arguments) — the same expansion & quoting from Course 2, now in a file.',
          '',
          '### Variables',
          '- Assign with **no spaces**: `name="Sam"` (a space makes bash try to *run* `name`)',
          '- Use with `$`: `echo "$name"` — **always quote** it; `today=$(date +%F)`; `count=$(( 2 + 3 ))` (math)',
          '',
          '### Arguments — how a script receives input',
          '- **`$1 $2 …`** the positional args · **`$@`** all of them (quoted: `"$@"`) · **`$#`** the count · **`$0`** the script name',
          '- `./deploy.sh prod v2` → `$1`=`prod`, `$2`=`v2`, `$#`=`2`',
          '',
          '### Reading interactively',
          '- **`read -r -p "Continue? " answer`** — prompt and capture a line (`-r` = don\'t mangle backslashes)',
          '',
          'Memory and inputs in hand — now the script needs to make **decisions**.',
        ].join('\n'),
      },
      beats: [
        {
          line: "A useful script needs to remember things and to take input, and both use ideas straight from the shell course — now living in a file. First, variables, the script's memory. You assign one by writing the name, an equals sign, and a value — name equals quote-Sam — and here's the rule that bites everyone at least once: there must be no spaces around the equals sign. If you write name space equals space Sam, bash reads name as a command to run and fails, because remember, spaces are how the shell splits words. So, name equals value, tight, no spaces. You read a variable back with a dollar sign in front, and as we drilled in the shell course, you almost always wrap it in double quotes — echo quote dollar-name — to protect against spaces and surprises in its value. Two handy assignment forms: dollar-parenthesis captures the output of a command into a variable, so today equals dollar-paren date, and dollar-double-parenthesis does arithmetic, so count equals dollar-double-paren two plus three. Now, inputs. How does a script receive information from whoever runs it? Through positional arguments — the words typed after the script's name on the command line. Inside the script, those arrive as special variables: dollar-one is the first argument, dollar-two the second, and so on. Dollar-at, written and quoted as quote-dollar-at, is all of the arguments together, each properly preserved. Dollar-hash is the count of how many arguments were given, which you'll use to check the script was called correctly. And dollar-zero is the script's own name, useful for printing usage messages. So if someone runs deploy.sh prod v2, then inside the script dollar-one is prod, dollar-two is v2, and dollar-hash is two. This is exactly how command-line tools take their inputs, and now your scripts do too. And when you need to ask the user something interactively, mid-run, the read command prompts and captures their reply into a variable — read dash-r dash-p with a prompt string, then a variable name, where dash-r means read the line literally without mangling backslashes, and is a good habit always to include. So the script has memory and inputs. The next thing any real program needs is the ability to make decisions based on them.",
          delta: [{ kind: 'solidify', ids: SB }],
        },
      ],
    },
    {
      id: 'conditionals',
      heading: 'Conditionals',
      scene: 'conditionals',
      focus: CD,
      slide: {
        title: 'Conditionals',
        body: [
          'Decisions in bash hinge on the idea from Course 2: **exit code `0` = success = "true."**',
          '',
          '### `if` runs on an exit code',
          '- `if <command>; then … fi` — runs the branch when the command **succeeds** (exit 0)',
          '- `if grep -q error log; then …` — the condition is a **real command**',
          '',
          '### `[[ … ]]` is the test command',
          '- Files: `[[ -f path ]]` exists · `-d` dir · `-z "$s"` empty string',
          '- Strings: `[[ $a == foo ]]` · `!=` · `=~` (regex)',
          '- Numbers: `[[ $n -gt 5 ]]` (`-gt -lt -ge -le -eq -ne`)',
          '',
          '### `&&` / `||` and `case`',
          '- `mkdir -p out && cd out` (and-then) · `ping -c1 h || echo down` (or-else)',
          '- **`case`** matches one value against patterns — perfect for a `start|stop` argument',
          '',
          'Decisions made. To *repeat* work over many items, we need loops.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Now the script needs to make decisions, and bash conditionals work in a way that's a little surprising until it clicks, and then it feels elegant. The whole thing is built on the exit code idea from the shell course: every command returns a status, zero for success, non-zero for failure. And bash defines true as an exit code of zero. So when you write if, followed by a command, then, and a body — the body runs if that command succeeds, if it exits zero. The condition isn't some special boolean expression; it's a real command whose success or failure decides the branch. So you can write if grep dash-q error log, then do something — and it runs that something only when grep actually found the pattern, because grep exits zero when it finds a match. That's genuinely powerful: any command at all can be your condition. But most of the time you want to test a fact — does this file exist, are these two strings equal, is this number bigger than that one — and for those there's a built-in test written with double square brackets. And here's the key realization: those double brackets are themselves just a command, one that succeeds or fails, which is why they slot right into an if. Inside them you have a vocabulary of tests. For files: dash-f checks a file exists, dash-d a directory, dash-z whether a string is empty — handy for catching a missing argument. For strings: double-equals for equality, exclamation-equals for not-equal, and even equals-tilde for a regex match. And for numbers, because bash distinguishes them from strings, you use the lettered operators: dash-g-t for greater than, dash-l-t for less than, dash-e-q for equal, and so on. A full if can chain if, elif, else, closed with fi, which is if spelled backwards. There are two lighter-weight forms worth knowing. The and-and and or-or operators let you conditionally run one command based on another right on a single line: mkdir dash-p out and-and cd out means make the directory and, only if that succeeds, enter it; ping or-or echo unreachable means try the ping, and if it fails, print the message. And for matching a single value against several possibilities, there's case, which is far cleaner than a stack of elifs — it's the natural way to handle a script that takes an argument like start, stop, or restart, matching each and falling through to a usage message for anything else. So the script can now decide. The next essential is repeating work — doing something for every file, every line, every item — and that's loops.",
          delta: [{ kind: 'solidify', ids: CD }],
        },
      ],
    },
    {
      id: 'loops',
      heading: 'Loops',
      scene: 'loops',
      focus: LP,
      slide: {
        title: 'Loops',
        body: [
          'Loops repeat work over many items — files, lines, numbers — the heart of most automation.',
          '',
          '### `for` — iterate a list',
          '- `for f in *.log; do … done` — the shell expands the **glob**; `"$f"` each iteration (quote it!)',
          '- `for i in {1..5}` — a range',
          '',
          '### `while` — repeat while a command succeeds',
          '- `while (( n < 3 )); do … done` — arithmetic condition',
          '- **The file-reading idiom** (memorize it): `while IFS= read -r line; do … done < file` — safe, line-by-line',
          '',
          '### `until`, `break`, `continue`',
          '- `until <cmd>; do …` loops **until** success (e.g. wait for a host); `break` exits, `continue` skips to next',
          '',
          '### The safety note',
          '- Prefer globs/`read` over parsing `ls` output — and always quote `"$f"` (filenames have spaces)',
          '',
          'Decisions and repetition — now organize it into reusable pieces: functions.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Loops are where automation really earns its keep, because the whole point of a script is often to do the same thing to a hundred files, or every line of a log, without you lifting a finger a hundred times. Bash has a few loop forms. The most common is for, which iterates over a list. You write for, a variable name, in, and then a list of items, then do, a body, and done. The list can be anything the shell produces — most powerfully a glob: for f in star-dot-log walks every log file in the directory, because the shell expands that glob into the actual filenames before the loop runs, just as we learned in the shell course. Inside the loop, the variable holds each item in turn, and — you'll hear this refrain forever — you quote it, quote-dollar-f, because filenames can contain spaces. You can also loop over a numeric range with the brace syntax, for i in brace-one-dot-dot-five. The second form is while, which repeats its body as long as a command keeps succeeding — while such-and-such is true, keep going. With an arithmetic condition in double parentheses you get a classic counting loop. But the single most important use of while is an idiom you should simply memorize, because it's the correct, safe way to read a file line by line: while IFS-equals read dash-r line, do something with the line, done, with the file redirected into the loop with a less-than at the end. That precise incantation — the IFS-equals to preserve leading whitespace, the read dash-r to not mangle backslashes — reads any file, one line at a time, correctly, even lines with odd characters, and it's worth writing on a sticky note. There's also until, the mirror of while, which loops until a command finally succeeds — perfect for waiting on something, like until this host responds to a ping, keep sleeping and trying. And inside any loop, break jumps out of it entirely, while continue skips the rest of the current iteration and moves to the next. One safety habit to build: prefer looping over globs and using that read idiom over trying to parse the output of ls, which breaks on unusual filenames — and always, always quote your loop variable. So the script can now decide and repeat. As scripts grow, they need organizing into named, reusable pieces, and that's what functions are for.",
          delta: [{ kind: 'solidify', ids: LP }],
        },
      ],
    },
    {
      id: 'functions',
      heading: 'Functions',
      scene: 'functions',
      focus: FN,
      slide: {
        title: 'Functions',
        body: [
          'A **function** is a reusable named block — how a script grows past a wall of top-to-bottom commands into something maintainable.',
          '',
          '### Define & call',
          '- `name() { … }` defines it; `name arg1 arg2` calls it — **args work exactly like a script** (`$1`, `$@`, `$#` inside)',
          '',
          '### `local` scope',
          '- **`local name="$1"`** keeps a variable inside the function — without `local`, bash variables are **global** and leak (a real bug source)',
          '',
          '### Returning: code vs. data',
          '- A function **returns an exit code** (`0`–`255`) — so it works as an `if` condition: `if is_root; then …`',
          '- To return **data**, `echo` it and **capture** with `$(…)`: `now=$(timestamp)`',
          '- Log to **stderr** (`>&2`) so messages don\'t pollute captured stdout',
          '',
          'Now the pieces exist. The difference between a toy script and a trusted one is **robustness**.',
        ].join('\n'),
      },
      beats: [
        {
          line: "As a script grows past a handful of lines, a flat wall of commands top to bottom becomes hard to read and harder to maintain, especially when you find yourself repeating the same little sequence in several places. Functions solve this — they're reusable, named blocks of code, and they work just like the functions you know from any language, with a couple of bash-specific twists worth learning carefully. You define one by writing its name, empty parentheses, and a body in curly braces — greet, open-paren close-paren, brace, some commands, brace. Then you call it simply by writing its name, optionally with arguments after it, exactly as if it were a command. And here's a lovely bit of consistency: inside a function, arguments arrive as dollar-one, dollar-two, dollar-at, dollar-hash — the very same positional variables a script receives from the command line. A function is like a mini-script within your script. Now the first twist, and it's the source of many subtle bugs: by default, variables in bash are global. If you set a variable inside a function, it silently leaks out and can clobber a variable of the same name elsewhere in your script. The fix is the local keyword: writing local name equals dollar-one keeps that variable scoped to the function, invisible outside it. Get in the habit of declaring your function's variables local — it prevents a whole category of maddening bugs. The second twist is about returning values, and it trips up people coming from other languages. A bash function does not return a value the way you'd expect — it returns an exit code, a number from zero to two-fifty-five, meaning success or failure. That's actually useful, because it means a function can serve directly as an if condition: define is_root to test whether you're the superuser, and then write if is_root, then do the privileged thing. But what if you genuinely want to return data — a computed string, a timestamp? The bash idiom is: have the function echo its result to standard output, and capture that output at the call site with dollar-parentheses, exactly like command substitution. So now equals dollar-paren timestamp runs the function and captures what it printed. This leads to one more good habit: when a function needs to print status or log messages, send them to standard error with greater-than-ampersand-two, so they don't accidentally get captured as the function's data return. So we now have every building block — variables, conditions, loops, and functions. But a script that works when everything goes right is only half a script. The thing that separates a toy from a tool you'd trust to run unattended at 3 a.m. is robustness.",
          delta: [{ kind: 'solidify', ids: FN }],
        },
      ],
    },
    {
      id: 'robustness',
      heading: 'Robustness: fail fast & clean up',
      scene: 'robust',
      focus: RB,
      slide: {
        title: 'Robustness: fail fast & clean up',
        body: [
          'The gap between a script that *works* and one you can *trust* is error handling. Two habits close most of it.',
          '',
          '### The safety header — put it at the top of every script',
          '- **`set -euo pipefail`**:',
          '  - **`-e`** — exit the instant **any** command fails (don\'t blunder on after an error)',
          '  - **`-u`** — error on an **unset** variable (catches typos like `$flie` before they wipe the wrong path)',
          '  - **`-o pipefail`** — a failing stage makes the **whole pipe** fail (else only the last command\'s status counts)',
          '',
          '### Clean up with `trap`',
          '- **`trap \'rm -f "$tmp"\' EXIT`** — run cleanup on **any** exit: success, error, or `Ctrl-C` (the signals from Course 4)',
          '- No more temp files left behind when a script dies partway',
          '',
          'Fail fast, clean up always. The last touches: proper options and debugging.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Here's a hard truth about shell scripts: by default, bash is dangerously forgiving. If a command in the middle of your script fails, bash just shrugs and runs the next line anyway — so a backup script whose copy step failed will cheerfully go on to delete the originals, because it never noticed the copy didn't happen. Closing that gap is what turns a script into something you can trust, and two habits handle most of it. The first is a single line you should put at the top of essentially every script you write, right after the shebang: set dash-e-u-o pipefail. It's three safety switches bundled together. Dash-e makes the script exit immediately the moment any command fails, instead of blundering onward — so that broken backup stops before it does harm. Dash-u makes it an error to use a variable that was never set, which catches typos: if you misspell dollar-file as dollar-flie, instead of silently expanding to an empty string — and possibly running rm on the wrong path — the script stops and tells you. And dash-o pipefail fixes a sneaky default about pipes: normally a pipeline's success is judged only by its last command, so a failure earlier in the pipe goes unnoticed; pipefail makes the whole pipeline fail if any stage fails. Those three switches, set dash-e-u-o pipefail, prevent a huge fraction of real-world script disasters, and typing them should become pure muscle memory. The second habit is cleaning up after yourself, no matter how the script ends, and the tool for that is trap, which connects back to the signals we learned in the processes course. A script often creates temporary files, and if it dies partway — an error, or someone hitting Control-C — those temp files get left behind as litter. With trap, you register a cleanup command to run automatically whenever the script exits, for any reason: trap, then your cleanup like remove the temp file, then the word EXIT. Because EXIT fires on normal completion, on an error triggered by dash-e, and on an interrupt from Control-C alike, your cleanup always runs. Fail fast with the safety header, and always clean up with a trap — together they take you most of the way from a fragile script to a dependable one. There are just a couple of finishing touches left: giving your script proper command-line options, and knowing how to debug it when it misbehaves.",
          delta: [{ kind: 'solidify', ids: RB }],
        },
      ],
    },
    {
      id: 'args-debug',
      heading: 'Options & debugging',
      scene: 'robust',
      focus: RB,
      slide: {
        title: 'Options & debugging',
        body: [
          'The final polish: parse **options** like a real tool, and have a plan for when things break.',
          '',
          '### `getopts` — proper flag parsing',
          '- Handle `-v`, `-f file` the standard way instead of hand-rolling `$1` checks',
          '- `while getopts "vf:" opt; do case $opt in …` — the `:` after `f` means it **takes a value** (`$OPTARG`)',
          '- Pair with a **`usage()`** function and a `-h`/`--help` — a tool others can actually use',
          '',
          '### Debugging',
          '- **`bash -x script.sh`** (or `set -x`) — **trace** every line as it runs, with variables expanded: the #1 debugging tool',
          '- **`shellcheck script.sh`** — a linter that catches quoting bugs, unset vars, and footguns *before* they bite. **Run it on everything.**',
          '',
          '### The discipline',
          '- Safety header + `trap` + `getopts` + `shellcheck` = a script you can hand to anyone and schedule with confidence',
          '',
        ].join('\n'),
      },
      beats: [
        {
          line: "The final polish makes your script feel like a real command-line tool rather than a personal hack. First, option parsing. So far a script reads its inputs as dollar-one, dollar-two, positionally, but real tools take flags — dash-v for verbose, dash-f followed by a filename. You could hand-roll that with a pile of if statements, but bash has a built-in for exactly this called getopts, and it's the proper way. You loop with while getopts, giving it a short string that declares your options — something like v-f-colon, where a plain letter is a simple on-off flag and a letter followed by a colon means that option expects a value, which arrives in the variable OPTARG. Inside the loop a case statement handles each flag. Pair getopts with a small usage function that prints how to use the script, wired to a dash-h or help flag, and you've got something a colleague can pick up and run without reading the source. Second, debugging — because scripts will misbehave, and staring at them rarely helps. The single most valuable debugging tool in all of shell scripting is trace mode: run your script as bash dash-x, or put set dash-x inside it, and bash prints every line as it executes, with all the variables already expanded to their actual values. Suddenly you can see exactly what the script is really doing, step by step, and the bug usually becomes obvious — you'll spot the empty variable, the wrong path, the condition that didn't fire. And there's one more tool that's frankly a superpower, and it's free: shellcheck. It's a linter for shell scripts — you run shellcheck on your file and it points out bugs before you ever hit them: unquoted variables that will break on spaces, uses of variables you never set, subtle quoting mistakes, and dozens of common footguns. Professional shell developers run shellcheck on everything, and many wire it into their editor so it flags problems as they type. Adopt it now and it will make you look far more careful than you are. Put the whole discipline together — the set dash-e-u-o safety header, a trap for cleanup, getopts for real options, and shellcheck keeping you honest — and you're no longer writing fragile little scripts; you're writing tools you can confidently hand to a teammate and schedule to run unattended at three in the morning. You can now write genuine, robust bash. Let's bring it all together and look ahead to the capstone.",
          delta: [{ kind: 'solidify', ids: RB }],
        },
      ],
    },
    {
      id: 'you-are-here',
      heading: 'You are here',
      scene: 'scripting-overview',
      focus: [],
      slide: {
        title: 'You are here',
        body: [
          'You can now write **real, robust shell scripts** — turning everything you\'ve learned into tools that run themselves.',
          '',
          '### What you can now do',
          '- Make a runnable program — **shebang**, `chmod +x`, `./run` — with **variables** & **arguments** (`$1`, `$@`)',
          '- Make decisions (**`if`**, `[[ ]]`, `case`), repeat work (**`for`/`while`/`read`**), and organize with **functions** (`local`)',
          '- Harden it: **`set -euo pipefail`**, **`trap`** cleanup, **`getopts`**, `bash -x`, and **`shellcheck`**',
          '',
          '### The road ahead',
          '- **Project** — the capstone: combine *every* course into one real tool, built & shipped end to end',
          '- Boot → shell → filesystem → processes → text → admin → **scripting** — it all converges next',
          '',
          'You can automate the machine now. Next: put it **all** together and ship a real Linux tool.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Here's the whole toolkit of shell scripting, and you can now write real programs in bash. You can take a file of commands and make it a runnable tool, with a shebang, the execute bit, and a proper invocation, feeding it inputs through variables and command-line arguments. You can make it think — branching with if and the double-bracket test and case, all built on the exit-code notion of truth. You can make it repeat work with for and while loops, including that essential idiom for reading a file line by line. You can organize it with functions, scoping their variables with local and returning either an exit code or captured data. And, most importantly, you can make it robust — leading every script with set dash-e-u-o pipefail so it fails fast, trapping EXIT to always clean up, parsing options properly with getopts, tracing bugs with bash dash-x, and letting shellcheck catch your mistakes before they cost you. That's the difference between a fragile snippet and a tool you can trust to run on its own. And notice what's happened across this whole series: we started at the power button, learned the shell, mapped the filesystem, mastered processes, wielded the text tools, and learned to administer a box — and now, with scripting, we have the thread that ties every one of those together, because a real script uses all of them at once. That's exactly what the final course is: the capstone, where we build one genuine, complete Linux tool from scratch, weaving in every single thing you've learned, from boot-time concepts to text pipelines to systemd services. You can automate the machine now. In the last course, let's put it all together and ship something real.",
          delta: [{ kind: 'solidify', ids: SV_ALL }],
        },
      ],
    },
  ],
}
