import type { Course } from 'reveal-engine'

// Course 2 — "The shell & command line" (the DRIVE stage). It rides the `shell-pipeline` read-eval
// loop as its single spine for §1–§7 — the whole course tours the same control-flow diagram, the
// camera zooming one band at a time — then detours to the `redirection` whole-canvas scene for
// streams & pipes (§8–§9) and bookends back on the pipeline (§10). (The old `shell-overview` anatomy
// board was retired: half its tiles were true peers, half silently duplicated this flow's find/exit
// nodes — so command anatomy now frames the typed line at the top of the pipeline instead.)
// Solid-tour reveal: 1 beat = 1 section; each scene solidifies on entry.
//
// STATUS: §1–§10 authored — Course 2 of 8.

const PIPE_ALL = ['sp-line', 'sp-split', 'sp-expand', 'se-glob', 'se-var', 'se-cmd', 'se-quote', 'sp-find', 'sp-run', 'sr-fork', 'sr-wait', 'sr-exit']
// §2 & §3 keep the WHOLE loop framed (focus: []) so the reader never loses the outer flow, and only
// LIGHT their band via `highlight`. §4+ then begin the band-by-band camera zoom down the pipeline.
const ANATOMY = ['sp-line'] // §2 — light the typed line, broken into command · options · arguments in the slide
const FINDING = ['sp-find', 'sr-exit'] // §3 — light where it's found (PATH/builtin) + how it reports back ($?)
const READSPLIT = ['sp-line', 'sp-split'] // §4
const EXPAND = ['sp-expand', 'se-glob', 'se-var', 'se-cmd', 'se-quote'] // §5–§6
const FIND_RUN = ['sp-find', 'sp-run', 'sr-fork', 'sr-wait', 'sr-exit'] // §7

const RD = ['rd-all'] // §8–§9

export const shell: Course = {
  id: 'shell',
  title: 'The shell & command line',
  sections: [
    {
      id: 'what-is-a-shell',
      heading: 'What a shell is',
      scene: 'shell-pipeline',
      focus: [],
      slide: {
        title: 'What a shell is',
        body: [
          'Course 1 ended by handing you a **prompt**. That prompt is a program — the **shell** — and it\'s how you actually drive a Linux machine.',
          '',
          '### A read-eval loop for the whole OS',
          '- The shell **reads** a line you type, **runs** it, prints the result, and loops — a REPL for the operating system',
          '- Every line is a **command**: a program to run, plus **options** and **arguments**',
          '- The default shell is **`bash`** (others: `zsh`, `fish`) — this course is bash',
          '',
          '### Why the command line at all',
          '- **Precise & repeatable** — a typed command is exact, and can be saved into a script (Course 7)',
          '- **Composable** — small commands **pipe** into big ones (later this course)',
          '- **Everywhere** — the one interface every Linux box has, even a server with no screen',
          '',
          'Let\'s name the parts of a command, then watch the shell take one apart.',
        ].join('\n'),
      },
      beats: [
        {
          line: "The last course ended by handing you a prompt — that little symbol blinking on the screen, waiting. It's time to explain what that prompt actually is, because it's the single most important tool you'll use on a Linux system. The prompt belongs to a program called the shell, and the shell is how you drive the machine by typing to it. At its heart the shell does something very simple, in a loop: it reads a line you type, it runs that line, it shows you whatever came back, and then it prints the prompt again and waits for the next line. If you took the first course, this loop should sound familiar — it's the same read-eval-print idea, but here it's driving the entire operating system instead of one language. Every line you type is a command, and a command is just a program to run, usually followed by some options that adjust how it behaves and some arguments that say what to act on. The default shell on almost every Linux system is called bash — there are others like zsh and fish, but bash is the standard and it's what we'll use throughout. Now, you might wonder why bother typing commands at all when there are graphical interfaces. Three reasons that matter enormously. First, it's precise and repeatable: a typed command is exact, and you can save it into a file to run again forever, which is the whole basis of automation later in this series. Second, it composes: small commands snap together into powerful ones through a mechanism called pipes, which we'll get to. And third, it is genuinely everywhere — every Linux machine has a shell, including the headless servers in a data center that have no screen or mouse at all; the command line is often the only way in. So let's start by naming the parts of a command, and then we'll watch the shell pull one apart, word by word.",
          delta: [{ kind: 'solidify', ids: PIPE_ALL }],
        },
      ],
    },
    {
      id: 'anatomy',
      heading: 'Command · options · arguments',
      scene: 'shell-pipeline',
      focus: [],
      highlight: ANATOMY,
      slide: {
        title: 'Command · options · arguments',
        body: [
          'A command line is just **words separated by spaces**. The first word is the program; the rest modify or feed it.',
          '',
          '```',
          'ls   -l   -a   /etc',
          '│    │    │    │',
          '│    │    │    └─ argument (what to act on)',
          '│    └────┴────── options / flags (how)',
          '└─────────────── the command (what to run)',
          '```',
          '',
          '### Options come in two styles',
          '- **Short**: a dash + a letter — `-l`, `-a` — and they **bundle**: `-la` = `-l -a`',
          '- **Long**: two dashes + a word — `--all`, `--help` (clearer in scripts)',
          '- Some take a value: `--width=80` or `-o output.txt`',
          '',
          '### Arguments',
          '- The **things** the command acts on — files, directories, text, URLs',
          '- `--help` (or `man <cmd>`) shows every option a command accepts',
          '',
          'Command, options, arguments — just words. Next: how the shell *finds* that first word.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Let's take a command apart. The beautiful thing is that a command line is nothing more than words separated by spaces — that's the entire syntax. Take the line ls space dash-l space dash-a space slash-etc. The very first word is always the command: the name of the program you want to run — here, ls, which lists files. Everything after it falls into two buckets. Options, also called flags, change how the command behaves — they almost always start with a dash. Dash-l tells ls to use the long format with permissions and sizes; dash-a tells it to show hidden files too. And arguments are the things the command acts on — here, slash-etc, the directory you want listed. So: what to run, how to run it, and what to run it on. A couple of practical details about options, because they trip people up. Short options are a single dash and a single letter, and a handy trick is that you can bundle them: dash-l dash-a can be squished into dash-l-a, one dash, both letters. Long options use two dashes and a whole word — dash-dash-all, dash-dash-help — and while they're more to type, they're much clearer, especially in scripts where someone else has to read them later. Some options take a value of their own, like dash-dash-width equals eighty, or dash-o followed by a filename. And here's the most useful habit you can build starting today: almost every command accepts dash-dash-help, and for the fuller story there's the man command — man followed by a command name opens its manual page. When you don't know what a command or option does, those two are how you find out, without ever leaving the terminal. So that's the anatomy — command, options, arguments, all just words. But when you type ls, how does the shell actually know where the ls program lives on the disk? That's the next piece.",
          delta: [{ kind: 'solidify', ids: ANATOMY }],
        },
      ],
    },
    {
      id: 'finding',
      heading: 'PATH, builtins & exit codes',
      scene: 'shell-pipeline',
      focus: [],
      highlight: FINDING,
      slide: {
        title: 'PATH, builtins & exit codes',
        body: [
          'You type `ls`, not `/usr/bin/ls`. Two questions: where does the shell *find* it, and how does it tell you if it *worked*?',
          '',
          '### PATH — where commands live',
          '- **`PATH`** is a variable: a `:`-separated list of directories (`/usr/bin:/bin:/usr/local/bin…`)',
          '- The shell searches them **in order** and runs the **first** match — `which ls` / `type ls` shows the winner',
          '',
          '### Builtins vs. binaries',
          '- Most commands are **programs** on disk (`/bin/ls`); some are **built into the shell** itself (`cd`, `echo`, `export`)',
          '- `cd` *must* be a builtin — it changes **the shell\'s own** directory, which no separate program could do',
          '',
          '### Exit codes — did it work?',
          '- Every command returns a number: **`0` = success**, non-zero = a failure (its kind)',
          '- The last one is in **`$?`**: `ls /nope; echo $?` → `2`',
          '- This is what `&&` (*and-then*) and `||` (*or-else*) test — the basis of scripting',
          '',
          'Now the shell knows what to run and where it is. Let\'s watch it process a whole line.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Here's a question that seems trivial but isn't: when you type ls and hit enter, how does the shell know that ls is a program sitting at slash-usr-slash-bin-slash-ls? You didn't tell it the full path. The answer is a special variable called PATH — capital P-A-T-H. PATH holds a list of directories, separated by colons, something like slash-usr-slash-bin colon slash-bin colon slash-usr-slash-local-slash-bin. When you type a bare command name, the shell walks that list in order, checking each directory for a program by that name, and runs the very first one it finds. That ordering matters — if two directories both have a program called ls, the one earlier in PATH wins. You can see exactly which one will run with the command which ls, or type ls, and this is genuinely useful for debugging when the wrong version of something keeps running. Now, not every command is a program on disk. Some are built directly into the shell itself — these are called builtins, and the classic example is cd, for changing directory. Here's why cd has to be a builtin and can't be a separate program: cd changes the shell's own current directory, and a separate program runs as its own isolated process, so when it finished, its directory change would vanish along with it. Only the shell itself can change the shell's own state. Other builtins include echo and export. So there are two kinds of command — builtins like cd, and external binaries like slash-bin-slash-ls — and type will tell you which is which. Finally, how does a command tell you whether it succeeded? Every single command, when it finishes, hands back a number called its exit code. And the convention, which never changes, is that zero means success and any non-zero number means some kind of failure. The shell tucks the last command's exit code into a special variable, dollar-question-mark; run ls on a directory that doesn't exist, then echo dollar-question-mark, and you'll see a two. This little number is quietly the foundation of everything: it's exactly what the and-and and or-or operators test to chain commands together, and it's how every script you write later will know whether a step worked. So now the shell knows what to run, where to find it, and how to report back. Let's put it all together and watch it chew through a real line, start to finish.",
          delta: [{ kind: 'solidify', ids: FINDING }],
        },
      ],
    },
    {
      id: 'the-loop',
      heading: 'The shell\'s read-eval loop',
      scene: 'shell-pipeline',
      focus: READSPLIT,
      slide: {
        title: 'The shell\'s read-eval loop',
        body: [
          'Here\'s the whole machine. Every line you type walks this path top to bottom, then the loop returns to the prompt for the next.',
          '',
          '### The stages',
          '1. **Read** the line, **split** it into words on spaces (command + args)',
          '2. **Expand** the words — globs, variables, `$(…)` (next section)',
          '3. **Find** the command — builtin, else search `PATH`',
          '4. **Run & wait** — fork a child, exec the program, wait, collect `$?`',
          '',
          '### It starts by splitting',
          '- `ls -l *.txt` becomes the words `ls`, `-l`, `*.txt` — **word-splitting** on whitespace',
          '- This is why **spaces matter** and why filenames with spaces need quoting',
          '',
          'The order is the whole point: the shell **transforms** your line *before* it ever runs anything.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Now let's see the whole machine at once, because understanding this one diagram will save you from a hundred confusing bugs. When you type a line and press enter, the shell doesn't just blindly run it — it processes it through a fixed sequence of stages, every single time, and then loops back to the prompt for your next line. Here's the order. First it reads the line and splits it into words, breaking on spaces. Second, it expands those words — this is where wildcards, variables, and other substitutions get filled in, and it's a big enough deal that it's the next thing we'll cover. Third, it figures out what the first word actually refers to: is it a builtin, or does it need to go search PATH. And fourth, it runs the command and waits for it to finish, collecting that exit code. The crucial insight — the thing most beginners never learn explicitly — is that all of this transformation happens before your program ever runs. The program never sees what you typed; it sees the result after the shell has chopped and expanded it. Look at the first stage, splitting. When you type ls space dash-l space star-dot-txt, the shell splits it on the spaces into three separate words: ls, dash-l, and star-dot-txt. This is called word-splitting, and it's why spaces are so significant in the shell — they're the delimiter. It's also the reason a filename with a space in it, like my document dot txt, causes trouble: the shell would split it into two words, my and document, and hand your command two arguments instead of one. That's a preview of why quoting exists. But first, let's look at that second stage, expansion — because it's where the shell does its most surprising and powerful work.",
          delta: [{ kind: 'solidify', ids: PIPE_ALL }],
        },
      ],
    },
    {
      id: 'expansion',
      heading: 'Expansion: globs, variables & $( )',
      scene: 'shell-pipeline',
      focus: EXPAND,
      slide: {
        title: 'Expansion: globs, variables & $( )',
        body: [
          'Before running anything, the shell **rewrites** your words. This is the shell\'s superpower — and its most common surprise.',
          '',
          '### Globs — filename wildcards',
          '- `*` = any characters, `?` = one, `[abc]` = a set: `*.txt`, `img_??.png`, `[A-Z]*`',
          '- The **shell** expands these into a list of matching filenames — **the command never sees the `*`**',
          '- `ls *.txt` → the shell runs `ls a.txt b.txt c.txt`',
          '',
          '### Variables',
          '- `$HOME`, `$USER`, `$PATH` — the shell replaces `$name` with its value',
          '- Set your own: `name=Sam` (no spaces!) then `echo $name`; `export` to pass it to child programs',
          '',
          '### Command substitution',
          '- `$(command)` runs it and drops its **output** right into the line',
          '- `echo "Today is $(date)"` · `files=$(ls | wc -l)`',
          '',
          'One rule explains a lot: expansion happens **in the shell**, before the program runs.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Expansion is where the shell earns its keep, and where it surprises people who don't know it's happening. After splitting your line into words, the shell inspects those words and rewrites several kinds of them before anything runs. The first kind is globs — filename wildcards. The star means match any run of characters, a question mark matches exactly one character, and square brackets match any character from a set. So star-dot-txt means every filename ending in dot-txt. Here is the part that trips everyone up at least once: it is the shell that expands the glob, not the command. When you type ls star-dot-txt, the shell first looks in the current directory, finds a-dot-txt, b-dot-txt, c-dot-txt, and rewrites your line into ls a-dot-txt b-dot-txt c-dot-txt — and only then runs ls. The ls program never sees a star at all; it just receives a list of real filenames. This is why the same star behaves identically for every command — it's the shell doing the work, uniformly, before the command ever starts. The second kind is variables. When the shell sees a dollar sign followed by a name, it substitutes that variable's value. Dollar-HOME becomes the path to your home directory, dollar-USER your username. You can make your own variables too — just name equals value, and critically, no spaces around the equals sign, because remember, spaces are how the shell splits words. Then dollar-name gives you the value back. One subtlety: a plain variable is only visible to the current shell; if you want a program you launch to see it, you export it. The third kind is the cleverest: command substitution, written dollar-parenthesis command close-parenthesis. The shell runs the command inside, captures whatever it printed, and drops that text right into your line in place of the whole expression. So echo quote today is dollar-paren date close-paren runs the date command and splices today's date into your sentence. Or you can capture output into a variable — files equals dollar-paren ls pipe wc dash-l. So three forms of expansion — wildcards, variables, and command output — and one rule that ties them together and saves you endless confusion: all of it happens inside the shell, before your program ever runs. Which leads straight to the question: what if you want a star or a dollar sign to be taken literally, not expanded? For that, you need quoting.",
          delta: [{ kind: 'solidify', ids: EXPAND }],
        },
      ],
    },
    {
      id: 'quoting',
      heading: 'Quoting: turning expansion off',
      scene: 'shell-pipeline',
      focus: EXPAND,
      highlight: ['se-quote'],
      slide: {
        title: 'Quoting: turning expansion off',
        body: [
          'Quoting is how you tell the shell **"treat this literally."** It\'s the flip side of expansion — and the cure for spaces and special characters.',
          '',
          '### Three ways to quote',
          '- **Double quotes** `"…"` — block **globbing** and **word-splitting**, but *still* expand `$variables` and `$(…)`',
          '- **Single quotes** `\'…\'` — **everything** literal; no expansion at all',
          '- **Backslash** `\\` — escape one character: `\\*`, `\\$`, `\\ ` (a literal space)',
          '',
          '### When it matters',
          '- Filenames with spaces: `rm "my file.txt"` (unquoted → two arguments → wrong)',
          '- **Always quote your variables**: `"$file"` — an unquoted `$file` re-splits if the value has spaces (the #1 shell bug)',
          '- Literal specials: `echo \'$5.00 is 50% off\'` prints it verbatim',
          '',
          'Expansion and quoting are two halves of one idea: the shell rewrites your line — unless you say don\'t.',
        ].join('\n'),
      },
      beats: [
        {
          line: "So expansion is powerful, but sometimes you want the shell to leave your text completely alone — you actually mean a literal dollar sign, or a filename that really does contain a space. That's what quoting is for: it's how you switch expansion off. There are three ways to do it, and the differences between them matter. Double quotes are the moderate option: they stop word-splitting and glob expansion, so a filename with spaces stays a single argument and a star stays a star — but, importantly, they still allow variable and command substitution. So inside double quotes, dollar-HOME still becomes your home path. That makes double quotes the everyday choice: safe against spaces, but still able to use your variables. Single quotes are the absolute option: everything inside them is taken one hundred percent literally, no expansion of any kind — a dollar sign is just a dollar sign, a star is just a star. Use single quotes when you want text exactly as written. And the backslash escapes just the single next character, so backslash-star is a literal star, backslash-space is a literal space. Now, where does this actually bite you in practice? Two places, constantly. First, filenames with spaces: if you type rm space my space file dot txt, the shell splits that into two arguments and tries to remove two things, neither named correctly. Quote it — rm quote my file dot txt quote — and it's one argument. Second, and this is the single most common bug in all of shell scripting: always put double quotes around your variables. If a variable's value contains spaces and you write it unquoted, the shell re-splits that value into multiple words after substituting it, and your command silently does the wrong thing. Writing dollar-file in double quotes prevents that entirely. Get in the habit now: variables go in double quotes, almost always. So step back and see the symmetry — expansion and quoting are two halves of one simple idea. The shell rewrites your line by default; quoting is how you tell it not to. Now that the line is fully split and expanded, the shell is finally ready to actually run something.",
          delta: [{ kind: 'solidify', ids: EXPAND }],
        },
      ],
    },
    {
      id: 'exec',
      heading: 'Finding & running the command',
      scene: 'shell-pipeline',
      focus: FIND_RUN,
      slide: {
        title: 'Finding & running the command',
        body: [
          'The line is now final words. The shell resolves the command and runs it — the same **fork + exec** the kernel gave PID 1 (Course 1).',
          '',
          '### Resolve, then run',
          '- **Builtin?** run it in the shell itself. Otherwise **search `PATH`** for the binary',
          '- **`fork`** — the shell clones itself into a child process',
          '- **`exec`** — the child *replaces itself* with the requested program',
          '- **`wait`** — the shell pauses until the child exits, then reads its **`$?`**',
          '',
          '### Job control — don\'t always wait',
          '- End a line with **`&`** to run it in the **background** (the shell doesn\'t wait)',
          '- **`Ctrl-Z`** suspends the foreground job; **`bg`**/`fg` resume it; **`jobs`** lists them',
          '- **`Ctrl-C`** sends an interrupt to kill the foreground job (a signal — Course 4)',
          '',
          'Then the loop returns to the prompt. That cycle *is* the shell. Next: wiring commands together.',
        ].join('\n'),
      },
      beats: [
        {
          line: "The line has been split and fully expanded — the shell now has its final list of words, and it's ready to actually run something. First it resolves the command: if that first word is a builtin like cd, the shell just does it internally and we're done. Otherwise it searches PATH, finds the program on disk, and runs it — and the way it runs it is exactly the fork-and-exec mechanism we met in Course one when the kernel started PID one. It goes like this. The shell forks: it makes a clone of itself, a child process, nearly identical to the parent. Then that child execs: it throws away its own program and replaces itself, in place, with the program you asked for — ls, or grep, or whatever it was. So now there's a child process that has become ls. Meanwhile the parent shell waits: it pauses and does nothing until the child finishes, and when the child exits, the shell collects its exit code into dollar-question-mark. Then, and only then, the shell prints the prompt again, and the whole loop begins anew. That fork, exec, wait cycle, over and over, is the shell. Now, waiting isn't always what you want — some commands take a long time, and you don't want your terminal frozen. That's what job control is for. If you end a command with an ampersand, the shell launches it and does not wait — it runs in the background and hands you the prompt back immediately. If you started something in the foreground and wish you hadn't, Control-Z suspends it, and then you can type bg to let it continue in the background, or fg to bring it back to the foreground; the jobs command lists everything you've got running. And Control-C is the emergency stop — it interrupts and usually kills whatever's running in the foreground. Those keystrokes are actually sending signals to the process, which is a whole topic we'll open up in the processes course. So that's the complete life of a single command line. But the real power of the shell isn't running one command — it's wiring the output of one command into the input of the next. To do that, we need to talk about streams.",
          delta: [{ kind: 'solidify', ids: FIND_RUN }],
        },
      ],
    },
    {
      id: 'streams',
      heading: 'The three streams',
      scene: 'redirection',
      focus: RD,
      slide: {
        title: 'The three streams',
        body: [
          'Every program is born wired to **three streams** — three open files it can read from and write to without knowing where they go.',
          '',
          '### stdin, stdout, stderr',
          '- **stdin** (fd **0**) — where input comes *from* (your keyboard, by default)',
          '- **stdout** (fd **1**) — where normal output goes (your screen, by default)',
          '- **stderr** (fd **2**) — where **errors** go (also the screen — but a *separate* stream)',
          '',
          '### Why two output streams',
          '- Splitting errors from results lets you **save the data** while still **seeing the problems** — or the reverse',
          '- `ls /etc /nope` prints the listing to stdout **and** the error to stderr, interleaved on screen but distinct underneath',
          '',
          '### Redirection reroutes them',
          '- The defaults are just defaults — you can point any stream at a **file** instead (next)',
          '',
          'Three streams, referred to by number — 0, 1, 2 — is the whole vocabulary of redirection.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Here's an idea that unlocks half the power of the command line. Every single program, the moment it starts, is automatically connected to three streams — three channels it can read from and write to without ever knowing or caring where they actually lead. They have names and, more importantly, numbers. The first is standard input, stdin, numbered zero: this is where a program reads its input from, and by default it's connected to your keyboard. The second is standard output, stdout, numbered one: this is where a program writes its normal, everyday output, and by default that's your screen. The third is standard error, stderr, numbered two: this is where a program writes its error messages and warnings — and by default it also goes to your screen, but — and this is the clever part — it's a completely separate stream from stdout. Why on earth have two output streams that both go to the screen? Because keeping them separate gives you enormous control. Imagine a command that produces useful data but also occasionally complains about something. If results and errors were mixed into one stream, saving the data to a file would also bury the errors in it. By keeping them apart, you can save the real output to a file while still letting the error messages show up on your screen where you'll notice them — or do the exact opposite. You can see both at once: run ls on a directory that exists and one that doesn't, and you'll see the listing and the error printed together on screen — but underneath, one came down stream one and the other down stream two. And here's the punchline that makes this matter: those default destinations — keyboard, screen, screen — are only defaults. You can grab any of these three streams and point it somewhere else entirely, most usefully at a file. That rerouting is called redirection, and the three little numbers — zero, one, two — are its entire vocabulary. Let's use them.",
          delta: [{ kind: 'solidify', ids: RD }],
        },
      ],
    },
    {
      id: 'pipes',
      heading: 'Redirection & pipes',
      scene: 'redirection',
      focus: RD,
      slide: {
        title: 'Redirection & pipes',
        body: [
          'Now reroute those streams — to files, or **into each other**. Pipes are the reason the Unix toolkit is so powerful.',
          '',
          '### Redirect to files',
          '- `> file` sends **stdout** to a file (**overwrite**); `>>` **appends**',
          '- `2> file` sends **stderr**; `> file 2>&1` sends **both** to one place (`&>` is bash shorthand)',
          '- `< file` feeds a file into **stdin**; `> /dev/null` discards a stream entirely',
          '',
          '### Pipes — stdout → stdin',
          '- `a | b` wires **a\'s stdout** straight into **b\'s stdin** — no temp file',
          '- Chain them: `ps aux | grep ssh | wc -l` — *list processes → keep ssh lines → count them*',
          '- **`tee`** taps a pipe: `... | tee out.txt | ...` saves a copy **and** passes it on',
          '',
          '### The Unix philosophy',
          '- Small tools that each **do one thing well**, composed with pipes into exactly the tool you need',
          '',
          'That composition is what Course 5 (text tools) is built on. This is the heart of the shell.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Now let's actually reroute those three streams, first to files. To capture a command's normal output, you use the greater-than sign: ls greater-than out-dot-txt takes everything ls would have printed to the screen and writes it into the file out-dot-txt instead — but be careful, a single greater-than overwrites the file completely. If you want to add to the end of a file instead of clobbering it, use two of them, greater-than greater-than, which appends. Now recall that errors travel on a separate stream, number two — so to redirect just the errors you write two-greater-than, and to send both the output and the errors to the same file you write greater-than the file, then two-greater-than-ampersand-one, which reads as send stream two to wherever stream one is now going. Bash offers a shorthand for that common case, ampersand-greater-than. You can go the other direction too: less-than feeds a file into a program's standard input, and there's a special destination called slash-dev-slash-null, the system's bottomless trash can — redirect a stream there and it simply vanishes, which is how you silence output you don't care about. So that's redirecting streams to and from files. But the real magic — the single feature that defines the Unix way of working — is redirecting the output of one command directly into the input of another, with no file in between. That's the pipe, written as a vertical bar. When you write command-a bar command-b, the shell connects a's standard output straight to b's standard input, so a's results flow directly into b as they're produced. And because each command still has its own output, you can chain as many as you like. Look at ps aux bar grep ssh bar wc dash-l: the first command lists every running process, the pipe feeds that list into grep which keeps only the lines mentioning ssh, and another pipe feeds those into wc dash-l which counts them — so the whole chain answers how many ssh-related processes are running, built from three simple tools that each knew nothing about the others. There's even a handy tool called tee, which sits in the middle of a pipe and splits it: it writes a copy of what's passing through to a file while also passing it along to the next command, so you can save an intermediate result without breaking the chain. And this is the Unix philosophy in one sentence: build small tools that each do one thing well, then compose them with pipes into exactly the tool you need for the moment. That idea is so central that an entire course later in this series — the text-processing tools — is nothing but a deep dive into the commands you'll be piping together. This, right here, is the beating heart of the shell. Let's step back and take in the whole thing.",
          delta: [{ kind: 'solidify', ids: RD }],
        },
      ],
    },
    {
      id: 'you-are-here',
      heading: 'You are here',
      scene: 'shell-pipeline',
      focus: [],
      slide: {
        title: 'You are here',
        body: [
          'You can now **drive** a Linux machine — and, more importantly, you know what the shell does with every line you type.',
          '',
          '### What you can now do',
          '- Read a command as **command · options · arguments**, and find it via **`PATH`** / `type`',
          '- Predict **expansion** (globs, `$vars`, `$(…)`) and control it with **quoting** — always quote `"$vars"`',
          '- Read **exit codes** (`$?`), run jobs in the **background** (`&`, `bg`/`fg`)',
          '- Reroute **streams** (`>`, `>>`, `2>`, `<`) and compose tools with **pipes** (`|`, `tee`)',
          '',
          '### The road ahead',
          '- **Filesystem** — the tree you\'ve been navigating: paths, permissions, links, mounts',
          '- **Processes → Text → Admin → Scripting → Project** — running work, transforming data, and automating it all',
          '',
          'You can type to the machine now. Next: **the filesystem** those commands live and act in.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Here's the whole shell in one picture, and it should feel very different now than it did twenty minutes ago. You type a line; the shell splits it into words on the spaces. It expands those words — filling in wildcards from the filenames on disk, substituting your variables, running any command substitutions — unless you've quoted them to say leave this literal, and you now know to keep your variables in double quotes to stay safe. Then it resolves the first word — a builtin, or a program found by searching PATH — and it runs that program by forking a child and exec-ing into it, waiting for the result and remembering the exit code in dollar-question-mark. And all along, you can reroute the three streams every program is born with — standard input, output, and error — sending them to files with the redirection operators, or piping the output of one command straight into the next to compose small tools into powerful ones. That whole cycle, repeating at every prompt, is the shell. You can genuinely drive a Linux machine now. From here the series builds outward. Next we'll map the filesystem — the tree of files and directories that all these commands have been quietly navigating and acting upon, and the permission system that guards it. After that, processes, so you can see and control the programs you launch; then a deep course on the text tools you've just started piping together; then administering a real system, automating it with scripts, and finally building a real tool of your own. You've learned to talk to the machine. Next, let's map the world your commands live in.",
          delta: [{ kind: 'solidify', ids: PIPE_ALL }],
        },
      ],
    },
  ],
}
