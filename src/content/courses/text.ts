import type { Course } from 'reveal-engine'

// Course 5 — "Text processing & pipelines" (the TRANSFORM stage). Opens on the `text-pipeline` flow
// spine (§1 — stdin▸filters▸stdout), gives each tool its own whole-canvas scene (§2–§7: grep/regex,
// sed, awk, reshape, find/xargs), then COMPOSES them on the `pipeline-example` worked flow (§8),
// chooses between them on the `tool-decision` fork (§9), and recaps on the pipeline (§10). Solid-tour
// reveal: 1 beat = 1 section. (Retired the `text-overview` board — it hid the point, composition.)
//
// STATUS: §1–§10 authored — Course 5 of 8.

// The old `text-overview` board is retired. §1/§10 ride the `text-pipeline` flow spine, §8 the
// `pipeline-example` worked flow, §9 the `tool-decision` fork. Each solidifies its whole scene.
const TP = ['tp-stdin', 'tp-grep', 'tp-sed', 'tp-awk', 'tp-cols', 'tp-count', 'tp-stdout', 'tp-find'] // §1, §10
const PE = ['pe-log', 'pe-grep', 'pe-awk', 'pe-sort1', 'pe-uniq', 'pe-sort2', 'pe-head', 'pe-out'] // §8
const TD = ['td-q', 'td-grep', 'td-sed', 'td-awk', 'td-cols', 'td-find'] // §9

const GP = ['gp-all']
const SD = ['sd-all']
const AK = ['ak-all']
const SU = ['su-all']
const FX = ['fx-all']

export const text: Course = {
  id: 'text',
  title: 'Text processing & pipelines',
  sections: [
    {
      id: 'unix-philosophy',
      heading: 'The Unix philosophy',
      scene: 'text-pipeline',
      focus: [],
      slide: {
        title: 'The Unix philosophy',
        body: [
          'On Linux, almost everything is **text** — logs, config, command output, CSVs. So the tools that *transform* text are among the most powerful you have.',
          '',
          '### One idea, endlessly composed',
          '- **Write programs that do one thing well**; make each read **stdin** and write **stdout**',
          '- Then **pipe** them together (Course 2) into exactly the tool you need — no big monolith required',
          '- The classic toolkit: **grep** (search), **sed** (edit), **awk** (columns), plus **sort/uniq/cut/wc/tr** and **find/xargs**',
          '',
          '### Line-oriented',
          '- These tools work **line by line**, streaming — so they handle a **100 GB** log without loading it into memory',
          '',
          'Learn each tool on its own, then the real skill: **combining** them into one-line data pipelines.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Here's a fact about Linux that turns into a superpower once you lean into it: almost everything on the system is plain text. Your logs are text, your configuration in slash-etc is text, the output of nearly every command is text, your data files — CSVs, reports — are text. And because so much is text, the tools that slice, search, and reshape text become some of the most valuable skills you can have; a person fluent with them can answer questions about a system in seconds that would otherwise take a custom script or a spreadsheet. All of these tools grow from a single design idea, the Unix philosophy, and it's worth stating plainly because it explains why they feel the way they do: write programs that each do one thing well, and make each one read from standard input and write to standard output. That's it. No single tool tries to do everything. Instead, because they all speak the same interface of stdin and stdout, you snap them together with the pipes we learned in Course two, building up exactly the custom tool you need for this one moment out of small, sharp, reusable pieces. The classic members of this toolkit are the ones on the board: grep for searching, sed for editing, awk for working with columns, and a supporting cast — sort, uniq, cut, wc, tr — for reshaping and counting, plus find and xargs for locating files and acting on them in bulk. One more property makes them industrial-strength: they're line-oriented and streaming. They process text one line at a time as it flows past, which means they can chew through a hundred-gigabyte log file without ever trying to load it all into memory — something that would defeat a naive script or a text editor instantly. So here's the plan for this course: we'll meet each tool on its own terms, one per scene, and then — because this is where the real power lives — we'll learn to combine them into single-line data pipelines. Let's start with the one you'll use most: grep.",
          delta: [{ kind: 'solidify', ids: TP }],
        },
      ],
    },
    {
      id: 'grep',
      heading: 'grep: search',
      scene: 'grep',
      focus: GP,
      slide: {
        title: 'grep: search',
        body: [
          '**`grep`** prints the lines that **match a pattern** — the single most-used text tool. *Global Regular Expression Print.*',
          '',
          '### The essential flags',
          '- `grep error app.log` — every line containing `error`',
          '- **`-i`** ignore case · **`-w`** whole word · **`-c`** count instead of print',
          '- **`-r`** recurse a directory · **`-n`** show line numbers · **`-l`** list only *filenames*',
          '- **`-v`** — **invert**: the lines that *don\'t* match (great for excluding noise)',
          '- **`-A2 -B2`** — 2 lines of context After / Before a hit',
          '',
          '### Its natural home: a pipe',
          '- `ps aux | grep ssh` · `journalctl | grep -i fail` — filter *any* stream down to what you care about',
          '',
          'grep answers *"where does X appear?"*. To match *shapes* of text, not fixed words, it speaks **regex**.',
        ].join('\n'),
      },
      beats: [
        {
          line: "grep is the tool you'll reach for more than any other, so let's make you fluent. Its job is beautifully narrow: it reads text, line by line, and prints only the lines that match a pattern you give it. The name is an acronym from its origins — global regular expression print — which also tells you it has a hidden depth we'll get to. At its simplest, grep space error space app-dot-log prints every line in that log that contains the word error, instantly filtering a huge file down to the parts you care about. A handful of flags cover almost everything you'll do. Dash-i makes the match case-insensitive, so error also catches Error and ERROR. Dash-w matches only whole words, so cat won't also match category. Dash-c gives you a count of matching lines instead of the lines themselves. Dash-r recurses through an entire directory tree, searching every file — how you find which source file mentions a function. Dash-n prefixes each hit with its line number, and dash-l does the opposite of normal output, printing just the filenames that contain a match, not the matching lines. And one of the most useful, dash-v, inverts the whole thing: it prints the lines that do not match, which is how you strip out noise — show me the log, but not the debug lines. When you need to see a hit in context, dash-A-two and dash-B-two show you two lines after and before each match. But grep truly comes alive in a pipe, which is its natural home. Because it reads standard input, you can filter the output of any command through it: ps aux piped into grep ssh shows only the ssh-related processes; journalctl piped into grep dash-i fail shows only the failures in your system logs. grep is the universal filter — drop it into any stream to narrow it down. So grep answers the question where does this text appear. But so far we've only matched fixed words. The real power comes when you want to match a shape of text — any phone number, any line starting with ERROR, any date — and for that, grep speaks a pattern language called regular expressions.",
          delta: [{ kind: 'solidify', ids: GP }],
        },
      ],
    },
    {
      id: 'regex',
      heading: 'Regular expressions',
      scene: 'grep',
      focus: GP,
      slide: {
        title: 'Regular expressions',
        body: [
          'A **regex** describes a *shape* of text, not a fixed string. Learn a handful of symbols and you can match almost anything. (`grep -E`, and `sed`/`awk` speak them too.)',
          '',
          '### The core metacharacters',
          '- **`.`** any one character · **`\\.`** a literal dot (backslash **escapes**)',
          '- **`^`** start of line · **`$`** end of line',
          '- **`*`** 0+ of the previous · **`+`** 1+ · **`?`** 0 or 1',
          '- **`[abc]`** any one of a set · **`[0-9]`** a range · **`[^…]`** *not* these',
          '- **`{3}`** exactly 3 · **`( … )`** group · **`a|b`** a **or** b',
          '',
          '### Reading real patterns',
          '- `^ERROR` — a line that **starts with** ERROR',
          '- `[0-9]{3}-[0-9]{4}` — three digits, a dash, four digits (a phone number)',
          '- `HTTP/1\\.[01]` — `HTTP/1.0` or `HTTP/1.1` (note the escaped dot)',
          '',
          'Regex is a language of its own — and it powers grep, sed, awk, and half your editor. Now let\'s *change* text.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Regular expressions, or regex, are one of those skills that feel cryptic for a day and then pay you back for the rest of your career — and they show up far beyond grep, in sed, in awk, in your code editor, in nearly every programming language. The core idea is that instead of matching a fixed word, you describe a shape or a pattern that text can fit. And you can get enormous mileage out of maybe a dozen symbols. Let's walk the essentials. A dot matches any single character. A star means zero or more of whatever came just before it, a plus means one or more, and a question mark means zero or one — optional. So a-star matches any run of a's including none, and dot-star, famously, matches any run of any characters at all. Then there are two anchors that don't match characters but positions: a caret means the start of the line, and a dollar sign means the end of the line — so caret-ERROR matches only lines that begin with ERROR, not ones that merely contain it somewhere. Square brackets define a character class, a set of allowed characters: bracket a-b-c matches any one of those three, bracket zero-dash-nine is the shorthand for any digit, and a caret inside the brackets negates it — match anything except these. Curly braces let you specify a count: something followed by brace-three means exactly three of it. Parentheses group things together, and a vertical bar means or — this pattern or that one. Now here's the one gotcha that catches everyone: since the dot is a special character meaning any character, when you want to match a literal, actual dot — like the dot in a version number or a filename — you have to escape it with a backslash, backslash-dot. Backslash is the universal escape: it strips a metacharacter of its magic and makes it literal. Let's read a couple of real patterns to make it concrete. Caret-ERROR, we said, is a line starting with ERROR. Bracket-zero-nine-brace-three, dash, bracket-zero-nine-brace-four is three digits, a hyphen, then four digits — a North American phone number. And HTTP-slash-one-backslash-dot-bracket-zero-one matches HTTP-slash-one-dot-zero or HTTP-slash-one-dot-one, with that escaped dot in the middle being a real dot. With grep you turn on this full pattern language with the dash-E flag, for extended regular expressions. Regex is genuinely a small language worth investing in, because once you know it, you know it everywhere. So grep, with regex, lets you find any shape of text. But finding is only half the job — often you want to change the text you find. That's sed.",
          delta: [{ kind: 'solidify', ids: GP }],
        },
      ],
    },
    {
      id: 'sed',
      heading: 'sed: edit the stream',
      scene: 'sed',
      focus: SD,
      slide: {
        title: 'sed: edit the stream',
        body: [
          '**`sed`** — the *stream editor* — transforms lines as they flow past. Think "find-and-replace for pipelines."',
          '',
          '### The `s///` substitution (its 90%)',
          '- `sed \'s/foo/bar/\'` — replace the **first** `foo` on each line with `bar`',
          '- `sed \'s/foo/bar/g\'` — **`g`** = every occurrence on the line (global)',
          '- `sed -E \'s/[0-9]+/N/g\'` — the replace side is **regex-powered** too',
          '',
          '### Print vs. edit in place',
          '- By default sed **prints to stdout** — your file is untouched (safe to experiment)',
          '- **`-i`** edits the file **in place** — powerful, and unforgiving; test *without* `-i` first',
          '',
          '### Selecting lines',
          '- `sed -n \'10,20p\'` — print only lines 10–20 · `sed \'/^#/d\'` — **delete** comment lines · `\'/^$/d\'` — drop blanks',
          '',
          'grep finds lines; sed *rewrites* them. For anything with **columns**, though, the right tool is awk.',
        ].join('\n'),
      },
      beats: [
        {
          line: "If grep finds lines, sed changes them. Its name is short for stream editor, and that's exactly the mental model: it's a text editor that, instead of opening a file interactively, edits text as a stream flowing past it, applying your instructions to each line automatically. In practice, ninety percent of what anyone uses sed for is one command: substitution, written s-slash-find-slash-replace-slash. So sed space quote s-slash-foo-slash-bar-slash finds foo and replaces it with bar. By default, and this catches people, it only replaces the first occurrence on each line; to replace every occurrence, you add a g on the end, for global — s-slash-foo-slash-bar-slash-g. You can make it case-insensitive with an i flag too. And the find side, and even the replace, are regex-powered when you add dash-E, so you can do things like s-slash-bracket-zero-nine-plus-slash-N-slash-g to replace every run of digits with the letter N — masking numbers, say. Now, the single most important safety fact about sed: by default it does not touch your file at all. It reads the file, applies your transformation, and prints the result to standard output, leaving the original completely untouched. That's wonderful, because it means you can experiment freely — run your substitution, eyeball the output on screen, and nothing is at risk. When you're confident and actually want to modify the file, you add the dash-i flag, for in-place, and sed rewrites the file itself. Dash-i is powerful and it's permanent, so the golden rule is: always run it once without dash-i to preview, confirm the output looks right, and only then add dash-i. Beyond substitution, sed can also select and delete lines: sed dash-n with a range like ten-comma-twenty-p prints only lines ten through twenty; sed with a pattern and a d deletes matching lines, so slash-caret-hash-slash-d strips out comment lines that start with a hash, and slash-caret-dollar-slash-d removes blank lines. So grep filters, and sed rewrites — both working a line at a time. But a great deal of the text you'll deal with isn't just lines, it's columns: log files with fields, CSVs, tabular command output. For that kind of data there's a tool that's really a small programming language of its own — awk.",
          delta: [{ kind: 'solidify', ids: SD }],
        },
      ],
    },
    {
      id: 'awk',
      heading: 'awk: columns',
      scene: 'awk',
      focus: AK,
      slide: {
        title: 'awk: columns',
        body: [
          '**`awk`** is a tiny language for **column-oriented** text. It auto-splits each line into fields — perfect for logs, CSVs, and tables.',
          '',
          '### Fields for free',
          '- Each line is split on whitespace into **`$1 $2 … $NF`** (last); **`$0`** is the whole line; **`NR`** is the row number',
          '- `awk \'{print $1, $NF}\'` — first and last column · `-F:` sets a custom separator (`/etc/passwd`)',
          '',
          '### Pattern → action',
          '- A `condition { action }` runs the action only on matching rows:',
          '- `awk \'$3 > 500\'` — rows where column 3 exceeds 500 · `awk \'/ERROR/ {print $5}\'`',
          '',
          '### The killer feature: accumulate across lines',
          '- `awk \'{sum += $2} END {print sum}\'` — **total** a column',
          '- `awk \'{c[$1]++} END {for (k in c) print c[k], k}\'` — **count per key** (e.g. requests per IP)',
          '',
          'grep/sed think in lines; awk thinks in **columns and running totals** — a mini spreadsheet in a pipe.',
        ].join('\n'),
      },
      beats: [
        {
          line: "awk is the most powerful of the three, and it's genuinely a small programming language, named after its three creators — Aho, Weinberger, and Kernighan. What makes it special is that it thinks in columns. When awk reads a line, it automatically splits it into fields on whitespace, and hands them to you as numbered variables: dollar-one is the first column, dollar-two the second, and so on, with dollar-NF being the last column no matter how many there are — NF stands for number of fields. Dollar-zero is the whole line, and NR is the current row number. So to print just the first column of a log, it's awk quote-brace print dollar-one — done, no parsing code. To print the first and last columns, print dollar-one comma dollar-NF. If your data isn't whitespace-separated — say it's the colon-separated slash-etc-slash-passwd, or a CSV — you tell awk the separator with dash-capital-F, like dash-F-colon. The next idea is awk's structure: a pattern, then an action in curly braces, and the action runs only on lines matching the pattern. So awk quote dollar-three greater-than five-hundred prints only the rows where the third column exceeds five hundred — a numeric filter, which grep can't do because grep doesn't understand columns or numbers. Or awk slash-ERROR-slash brace print dollar-five, which finds the error lines and pulls out their fifth field. And now the feature that truly sets awk apart, the one that makes people fall in love with it: it can accumulate values across all the lines, remembering state as it goes. awk quote brace sum plus-equals dollar-two brace END brace print sum reads down the whole file, adding up the second column, and at the very end prints the total — you've just summed a column of numbers in a one-liner. Even better, awk has associative arrays, so you can count things by key: brace c-bracket-dollar-one-bracket plus-plus, END brace loop over c and print each. Point that at a web log keyed on the IP address, and in one line you've counted how many requests came from each IP — a genuine aggregation, the kind of thing you'd normally open a spreadsheet or write a script for. So the three big tools divide the work cleanly: grep and sed think in lines — find them, rewrite them — while awk thinks in columns and running totals, a miniature spreadsheet you can drop into the middle of a pipe. Now let's round out the toolkit with the smaller reshaping commands.",
          delta: [{ kind: 'solidify', ids: AK }],
        },
      ],
    },
    {
      id: 'reshape',
      heading: 'cut, sort, uniq, wc & tr',
      scene: 'sort-uniq',
      focus: SU,
      slide: {
        title: 'cut, sort, uniq, wc & tr',
        body: [
          'The supporting cast — small, sharp tools that shine **between** the big three in a pipe.',
          '',
          '### Each does one thing',
          '- **`cut`** — pull out columns: `cut -d, -f1,3` (by delimiter) · `cut -c1-8` (by character)',
          '- **`sort`** — order lines: **`-n`** numeric · **`-r`** reverse · **`-k2`** by column 2',
          '- **`uniq`** — collapse **adjacent** duplicates → **always `sort` first**; **`-c`** prefixes a count',
          '- **`wc`** — count: **`-l`** lines, `-w` words, `-c` bytes',
          '- **`tr`** — translate/delete characters: `tr a-z A-Z`, `tr -d \' \'`',
          '',
          '### The idiom to memorize',
          '- `sort | uniq -c | sort -rn | head` = **"top N by frequency"** — tally, then rank',
          '- `... | uniq -c` on a column of IPs, errors, or status codes answers *"what\'s most common?"* instantly',
          '',
          'These are the connective tissue of pipelines. Now the last pair — for acting on **files**, not streams.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Around the big three sits a supporting cast of smaller commands, each doing exactly one narrow job, and they earn their keep as the connective tissue between the larger tools in a pipe. Cut pulls out columns: cut dash-d-comma dash-f-one-comma-three grabs the first and third comma-separated fields, and cut dash-c-one-dash-eight grabs characters one through eight by position — it's a lighter-weight way to slice columns when you don't need all of awk. Sort orders lines: plain sort is alphabetical, dash-n sorts numerically — which matters, because alphabetically the number one hundred sorts before nine, but numerically it doesn't — dash-r reverses the order, and dash-k-two sorts by the second column instead of the whole line. Uniq collapses duplicate lines, but it comes with one critical catch that trips up everyone at first: it only removes adjacent duplicates, duplicates that are right next to each other. So uniq is almost always preceded by sort, to bring identical lines together first. And uniq's best trick is dash-c, which not only dedupes but prefixes each unique line with a count of how many times it appeared. wc counts things — dash-l for lines, which is the one you'll use constantly, plus words and bytes. And tr translates or deletes individual characters: tr a-z A-Z upper-cases everything, and tr dash-d space deletes all spaces. Now, all of this builds to one idiom you should simply commit to memory, because it answers a question you'll ask over and over: sort, piped into uniq dash-c, piped into sort dash-r-n, piped into head. Read it as a sentence: sort the lines so duplicates are adjacent, count each unique one, sort those counts in reverse numeric order so the biggest is first, and show the top few. That is the top-N-by-frequency pattern. Feed it a column of IP addresses and it tells you your heaviest visitors; feed it error messages and it tells you your most common failure; feed it HTTP status codes and it tells you how healthy your site is — all in one line. This little chain is one of the highest-value things in this entire course. So that's the full stream toolkit — searching, editing, columns, and reshaping. There's one last pair of tools that works a level up, not on the text inside files but on the files themselves.",
          delta: [{ kind: 'solidify', ids: SU }],
        },
      ],
    },
    {
      id: 'find-xargs',
      heading: 'find & xargs',
      scene: 'find-xargs',
      focus: FX,
      slide: {
        title: 'find & xargs',
        body: [
          'The last pair operates on **files**, not their contents: **`find`** locates them across the tree; **`xargs`** acts on the list.',
          '',
          '### `find` — walk the tree by test',
          '- `find . -name \'*.log\'` (name) · `-type f`/`-type d` · `-size +100M` · `-mtime -7` (changed < 7 days)',
          '- Combine tests; then **act**: `-delete`, or **`-exec cmd {} \\;`** (run a command per match, `{}` = the file)',
          '',
          '### `xargs` — a list on stdin → arguments',
          '- Many commands take arguments, not stdin. `xargs` bridges: `find … | xargs gzip` runs `gzip file1 file2 …`',
          '- `grep -rl TODO . | xargs wc -l` — count lines of every file containing TODO',
          '- **Spaces-safe**: `find … -print0 | xargs -0 …` (the pro habit)',
          '',
          'Now you have the whole toolkit. The real skill isn\'t any one tool — it\'s **wiring them together**.',
        ].join('\n'),
      },
      beats: [
        {
          line: "The final pair of tools works at a different level than the others. Everything so far — grep, sed, awk, the reshapers — operates on the text inside files. find and xargs operate on the files themselves. find walks a directory tree recursively and keeps the files that pass the tests you give it. You can match by name — find dot dash-name star-dot-log finds every log file below the current directory — by type, with dash-type-f for regular files or dash-type-d for directories, by size, with dash-size-plus-one-hundred-M for files over a hundred megabytes, or by age, with dash-mtime-minus-seven for files modified in the last seven days. And you can combine these tests to narrow things down precisely — every dot-log file over ten megabytes not touched in a month, say, which is exactly how you hunt down what's filling a disk. Once find has its list of matching files, you can act on them. The simplest is dash-delete, which removes them. More generally, dash-exec runs a command on each match, with the curious syntax of a pair of curly braces standing in for each filename and a backslash-semicolon marking the end of the command — so find with dash-name star-dot-py dash-exec grep dash-l TODO curly-braces backslash-semicolon runs grep on every Python file to find which ones contain TODO. Now, closely related is xargs, and it solves a specific, common mismatch. Many commands — gzip, rm, wc — expect their inputs as command-line arguments, not on standard input, so you can't just pipe a list of filenames into them directly. xargs is the adapter: it reads a list of items from standard input and turns them into arguments for a command. So find star-dot-log piped into xargs gzip becomes gzip file-one file-two file-three, compressing them all in one go. Or grep dash-r-l TODO dot, which lists every file containing TODO, piped into xargs wc dash-l, to count the lines in each of those files. One professional habit worth adopting from the start: filenames can contain spaces, which normally break this list-passing, so the safe idiom is find with dash-print-zero piped into xargs dash-zero, which separates filenames with an invisible null character instead of spaces, handling any filename correctly. And with that, you have the entire classic toolkit in hand. But here's the thing — knowing each tool individually is only the beginning. The real skill, the thing that makes someone look like a wizard at the terminal, is wiring them together into a single pipeline. Let's do exactly that.",
          delta: [{ kind: 'solidify', ids: FX }],
        },
      ],
    },
    {
      id: 'pipeline',
      heading: 'Composing a real pipeline',
      scene: 'pipeline-example',
      focus: [],
      slide: {
        title: 'Composing a real pipeline',
        body: [
          'The payoff: chain these tools into a **one-line data pipeline**. A worked example — *the top 5 IPs hitting your server* — from a raw access log.',
          '',
          '```',
          'grep " 500 " access.log \\   # 1. only 500-error requests',
          '  | awk \'{print $1}\' \\      # 2. pull the IP (col 1)',
          '  | sort \\                  # 3. group identical IPs',
          '  | uniq -c \\               # 4. count each',
          '  | sort -rn \\              # 5. rank, most first',
          '  | head -5                 # 6. keep the top 5',
          '```',
          '',
          '### Read it as a sentence',
          '- *Filter* to errors → *extract* the IP → *tally* by IP → *rank* → *top 5*',
          '- Each stage is a small tool doing one thing; the **pipe** is the composition',
          '- Swap `grep`/`awk` bits and the same skeleton answers a hundred other questions',
          '',
          'No script, no spreadsheet, no code — one line. **This** is why the toolkit matters.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Let's build a real pipeline, the kind you'd genuinely write on the job, and watch how the small tools combine into something powerful. Here's the question: given a web server's raw access log, who are the top five IP addresses causing server errors? Watch how it comes together, one stage at a time, each stage a tool we've just learned. Stage one: grep space quote-space-five-hundred-space to keep only the lines for requests that returned a five-hundred error — we've filtered the whole log down to just the failures. Pipe that into stage two: awk quote-brace-print-dollar-one, which pulls out just the first column, the IP address, from each of those error lines — now we have a raw list of IPs, one per error. Pipe that into stage three: sort, which brings identical IPs next to each other, because remember, the next tool needs them adjacent. Stage four: uniq dash-c, which collapses those runs of identical IPs and prefixes each with a count of how many times it appeared — now we have each IP paired with its number of errors. Stage five: sort dash-r-n, sorting those counts in reverse numeric order so the worst offender floats to the top. And stage six: head dash-five, keeping just the top five lines. Read the whole thing as a single English sentence: filter to the errors, extract the IP, tally by IP, rank them, and take the top five. Six little tools, five pipes, one line — and you've answered a real operational question that would otherwise mean writing a script or loading the log into a spreadsheet. And here's the part that makes this a durable skill rather than a party trick: this skeleton is endlessly reusable. Change the grep to match a different status code, or a date, or a URL. Change the awk to pull a different column — the requested page instead of the IP. Suddenly the same six-stage pattern answers a completely different question: your most requested pages, your busiest hours, your most common user agents. You learn the shape once and reuse it forever. That composition — small tools, snapped together with pipes — is the entire reason this toolkit is worth mastering. Now, with all six tools in hand, a fair question is: when do you reach for which?",
          delta: [{ kind: 'solidify', ids: PE }],
        },
      ],
    },
    {
      id: 'which-tool',
      heading: 'Which tool when?',
      scene: 'tool-decision',
      focus: [],
      slide: {
        title: 'Which tool when?',
        body: [
          'grep, sed, and awk overlap — but each has a clear sweet spot. Reach for the simplest one that does the job.',
          '',
          '### A quick decision guide',
          '- **Just finding lines?** → **`grep`**. Fast, simple, unbeatable at *"show me the lines with X."*',
          '- **Find-and-replace, or delete lines?** → **`sed`**. The `s///` substitution across a stream or file.',
          '- **Columns, conditions, or math/totals?** → **`awk`**. Anything with fields or accumulation.',
          '- **Files, not contents?** → **`find`** (+ `xargs`). Reshaping between stages? → `sort`/`uniq`/`cut`.',
          '',
          '### The guiding rule',
          '- **Simplest tool that works.** A `grep` beats a `sed` beats an `awk` for readability when it suffices',
          '- But don\'t force it — when you catch yourself abusing `grep`+`cut`+`sort` for column math, that\'s **awk** asking to be used',
          '',
          'Fluency is knowing the whole set *and* which one fits — then piping them together.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Because grep, sed, and awk overlap quite a bit, beginners often wonder which one they're supposed to use, and the honest answer is that each has a clear sweet spot, and the guiding principle is to reach for the simplest tool that does the job. Here's the decision guide. If all you're doing is finding lines — show me the lines that contain this, or match this pattern — that's grep, full stop. It's the fastest to type, the easiest to read, and unbeatable at its one job. If you need to change text — a find-and-replace, or deleting certain lines — that's sed, with its s-slash substitution. If your task involves columns, or comparing numbers, or any kind of arithmetic or running total — summing a field, counting by key, filtering on the third column being greater than something — that's awk, because it's the only one of the three that genuinely understands fields and math. If you're working with files themselves rather than their contents — locating them, deleting them, acting on them in bulk — that's find, usually paired with xargs. And when you need to reshape data between stages — slicing columns, ordering, deduplicating — that's the sort, uniq, cut family. The rule to internalize is: use the simplest tool that works. A solution built from grep is easier to read and reason about than one built from sed, which is easier than one built from awk, so if grep suffices, use grep. But — and this is the flip side — don't force the simple tool past its limits. The tell is when you find yourself stacking up grep and cut and sort and a second grep, all to do something with columns and counts; that awkward stack is awk quietly asking to be used, and rewriting it as a single clean awk expression is almost always clearer. So true fluency isn't just knowing all six tools — it's knowing which one fits the shape of the problem, reaching for the simplest that works, and then piping them together when no single one is enough. Let's wrap up.",
          delta: [{ kind: 'solidify', ids: TD }],
        },
      ],
    },
    {
      id: 'you-are-here',
      heading: 'You are here',
      scene: 'text-pipeline',
      focus: [],
      slide: {
        title: 'You are here',
        body: [
          'You now command the **text-processing toolkit** — the skill that turns raw logs and data into answers, in one line.',
          '',
          '### What you can now do',
          '- **`grep`** + **regex** — find any *shape* of text in any stream or tree',
          '- **`sed`** — substitute and delete across streams and files (safely, `-i` last)',
          '- **`awk`** — columns, conditions, and cross-line **totals** — a spreadsheet in a pipe',
          '- **`sort`/`uniq`/`cut`/`wc`/`tr`** and **`find`/`xargs`** — reshape, tally, and act on files in bulk',
          '- **Compose** them into real one-line data pipelines (the `sort | uniq -c | sort -rn` tally)',
          '',
          '### The road ahead',
          '- **Admin** — operating a real box: users, `systemd` services, packages, cron, networking',
          '- **Scripting → Project** — capturing these pipelines into robust, reusable tools',
          '',
          'You can transform any text on the system. Next: **administering** the machine itself.',
        ].join('\n'),
      },
      beats: [
        {
          line: "Here's the whole toolkit, and you can now do something genuinely valuable: take raw, messy text — logs, config, data dumps, command output — and turn it into an answer, often in a single line. You've got grep, with regular expressions, to find any shape of text you can describe, in any file, tree, or stream. You've got sed to rewrite and delete text as it flows, safely previewing before ever committing with dash-i. You've got awk, the little language that thinks in columns and can filter on conditions and accumulate running totals — a spreadsheet you drop into a pipe. You've got the reshaping crew — sort, uniq, cut, wc, and tr — and the file-level duo, find and xargs, for locating and acting on files in bulk. And most importantly, you can compose them, snapping small tools together with pipes into custom one-liners, with that top-N-by-frequency idiom — sort, uniq dash-c, sort dash-r-n — ready in your back pocket for any counting question. This is the transform stage of the whole series, and it's a skill that compounds: the more you use it, the faster you reach for it. From here we shift from working with data to operating the machine itself. The next course is administration — managing users and their permissions, controlling services with systemd, installing software with package managers, scheduling jobs with cron, and the basics of networking. And you'll notice these text tools coming right back, because reading logs and parsing system output is the daily bread of administration. You can shape any text on the box now; next, let's learn to run the box.",
          delta: [{ kind: 'solidify', ids: TP }],
        },
      ],
    },
  ],
}
