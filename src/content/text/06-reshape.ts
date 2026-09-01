import type { Section } from '../types'

export const reshape: Section = {
  id: 'reshape',
  title: 'cut, sort, uniq, wc & tr',
  scene: 'connective-tissue',
  slide: `## cut, sort, uniq, wc & tr

The supporting cast — small, sharp tools that shine **between** the big three in a pipe.

### Each does one thing
- **\`cut\`** — pull out columns: \`cut -d, -f1,3\` (by delimiter) · \`cut -c1-8\` (by character)
- **\`sort\`** — order lines: **\`-n\`** numeric · **\`-r\`** reverse · **\`-k2\`** by column 2
- **\`uniq\`** — collapse **adjacent** duplicates → **always \`sort\` first**; **\`-c\`** prefixes a count
- **\`wc\`** — count: **\`-l\`** lines, \`-w\` words, \`-c\` bytes
- **\`tr\`** — translate/delete characters: \`tr a-z A-Z\`, \`tr -d ' '\`

### The idiom to memorize
- \`sort | uniq -c | sort -rn | head\` = **"top N by frequency"** — tally, then rank
- \`... | uniq -c\` on a column of IPs, errors, or status codes answers *"what's most common?"* instantly

These are the connective tissue of pipelines. Now the last pair — for acting on **files**, not streams.`,
  narration:
    'Around the big three sits a supporting cast of smaller commands, each doing exactly one narrow job, and they earn their keep as the connective tissue between the larger tools in a pipe. Cut pulls out columns: cut dash-d-comma dash-f-one-comma-three grabs the first and third comma-separated fields, and cut dash-c-one-dash-eight grabs characters one through eight by position — it\'s a lighter-weight way to slice columns when you don\'t need all of awk. Sort orders lines: plain sort is alphabetical, dash-n sorts numerically — which matters, because alphabetically the number one hundred sorts before nine, but numerically it doesn\'t — dash-r reverses the order, and dash-k-two sorts by the second column instead of the whole line. Uniq collapses duplicate lines, but it comes with one critical catch that trips up everyone at first: it only removes adjacent duplicates, duplicates that are right next to each other. So uniq is almost always preceded by sort, to bring identical lines together first. And uniq\'s best trick is dash-c, which not only dedupes but prefixes each unique line with a count of how many times it appeared. wc counts things — dash-l for lines, which is the one you\'ll use constantly, plus words and bytes. And tr translates or deletes individual characters: tr a-z A-Z upper-cases everything, and tr dash-d space deletes all spaces. Now, all of this builds to one idiom you should simply commit to memory, because it answers a question you\'ll ask over and over: sort, piped into uniq dash-c, piped into sort dash-r-n, piped into head. Read it as a sentence: sort the lines so duplicates are adjacent, count each unique one, sort those counts in reverse numeric order so the biggest is first, and show the top few. That is the top-N-by-frequency pattern. Feed it a column of IP addresses and it tells you your heaviest visitors; feed it error messages and it tells you your most common failure; feed it HTTP status codes and it tells you how healthy your site is — all in one line. This little chain is one of the highest-value things in this entire course. So that\'s the full stream toolkit — searching, editing, columns, and reshaping. There\'s one last pair of tools that works a level up, not on the text inside files but on the files themselves.',
}
