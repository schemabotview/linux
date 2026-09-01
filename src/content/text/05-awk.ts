import type { Section } from '../types'

export const awk: Section = {
  id: 'awk',
  title: 'awk: columns',
  scene: 'awk-columns',
  slide: `## awk: columns

**\`awk\`** is a tiny language for **column-oriented** text. It auto-splits each line into fields — perfect for logs, CSVs, and tables.

### Fields for free
- Each line is split on whitespace into **\`$1 $2 … $NF\`** (last); **\`$0\`** is the whole line; **\`NR\`** is the row number
- \`awk '{print $1, $NF}'\` — first and last column · \`-F:\` sets a custom separator (\`/etc/passwd\`)

### Pattern → action
- A \`condition { action }\` runs the action only on matching rows:
- \`awk '$3 > 500'\` — rows where column 3 exceeds 500 · \`awk '/ERROR/ {print $5}'\`

### The killer feature: accumulate across lines
- \`awk '{sum += $2} END {print sum}'\` — **total** a column
- \`awk '{c[$1]++} END {for (k in c) print c[k], k}'\` — **count per key** (e.g. requests per IP)

grep/sed think in lines; awk thinks in **columns and running totals** — a mini spreadsheet in a pipe.`,
  narration:
    'awk is the most powerful of the three, and it\'s genuinely a small programming language, named after its three creators — Aho, Weinberger, and Kernighan. What makes it special is that it thinks in columns. When awk reads a line, it automatically splits it into fields on whitespace, and hands them to you as numbered variables: dollar-one is the first column, dollar-two the second, and so on, with dollar-NF being the last column no matter how many there are — NF stands for number of fields. Dollar-zero is the whole line, and NR is the current row number. So to print just the first column of a log, it\'s awk quote-brace print dollar-one — done, no parsing code. To print the first and last columns, print dollar-one comma dollar-NF. If your data isn\'t whitespace-separated — say it\'s the colon-separated slash-etc-slash-passwd, or a CSV — you tell awk the separator with dash-capital-F, like dash-F-colon. The next idea is awk\'s structure: a pattern, then an action in curly braces, and the action runs only on lines matching the pattern. So awk quote dollar-three greater-than five-hundred prints only the rows where the third column exceeds five hundred — a numeric filter, which grep can\'t do because grep doesn\'t understand columns or numbers. Or awk slash-ERROR-slash brace print dollar-five, which finds the error lines and pulls out their fifth field. And now the feature that truly sets awk apart, the one that makes people fall in love with it: it can accumulate values across all the lines, remembering state as it goes. awk quote brace sum plus-equals dollar-two brace END brace print sum reads down the whole file, adding up the second column, and at the very end prints the total — you\'ve just summed a column of numbers in a one-liner. Even better, awk has associative arrays, so you can count things by key: brace c-bracket-dollar-one-bracket plus-plus, END brace loop over c and print each. Point that at a web log keyed on the IP address, and in one line you\'ve counted how many requests came from each IP — a genuine aggregation, the kind of thing you\'d normally open a spreadsheet or write a script for. So the three big tools divide the work cleanly: grep and sed think in lines — find them, rewrite them — while awk thinks in columns and running totals, a miniature spreadsheet you can drop into the middle of a pipe. Now let\'s round out the toolkit with the smaller reshaping commands.',
}
