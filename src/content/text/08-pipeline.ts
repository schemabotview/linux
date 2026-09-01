import type { Section } from '../types'

export const pipeline: Section = {
  id: 'pipeline',
  title: 'Composing a real pipeline',
  scene: 'top-five-pipeline',
  slide: `## Composing a real pipeline

The payoff: chain these tools into a **one-line data pipeline**. A worked example — *the top 5 IPs hitting your server* — from a raw access log.

\`\`\`
grep " 500 " access.log \\   # 1. only 500-error requests
  | awk '{print $1}' \\      # 2. pull the IP (col 1)
  | sort \\                  # 3. group identical IPs
  | uniq -c \\               # 4. count each
  | sort -rn \\              # 5. rank, most first
  | head -5                 # 6. keep the top 5
\`\`\`

### Read it as a sentence
- *Filter* to errors → *extract* the IP → *tally* by IP → *rank* → *top 5*
- Each stage is a small tool doing one thing; the **pipe** is the composition
- Swap \`grep\`/\`awk\` bits and the same skeleton answers a hundred other questions

No script, no spreadsheet, no code — one line. **This** is why the toolkit matters.`,
  narration:
    'Let\'s build a real pipeline, the kind you\'d genuinely write on the job, and watch how the small tools combine into something powerful. Here\'s the question: given a web server\'s raw access log, who are the top five IP addresses causing server errors? Watch how it comes together, one stage at a time, each stage a tool we\'ve just learned. Stage one: grep space quote-space-five-hundred-space to keep only the lines for requests that returned a five-hundred error — we\'ve filtered the whole log down to just the failures. Pipe that into stage two: awk quote-brace-print-dollar-one, which pulls out just the first column, the IP address, from each of those error lines — now we have a raw list of IPs, one per error. Pipe that into stage three: sort, which brings identical IPs next to each other, because remember, the next tool needs them adjacent. Stage four: uniq dash-c, which collapses those runs of identical IPs and prefixes each with a count of how many times it appeared — now we have each IP paired with its number of errors. Stage five: sort dash-r-n, sorting those counts in reverse numeric order so the worst offender floats to the top. And stage six: head dash-five, keeping just the top five lines. Read the whole thing as a single English sentence: filter to the errors, extract the IP, tally by IP, rank them, and take the top five. Six little tools, five pipes, one line — and you\'ve answered a real operational question that would otherwise mean writing a script or loading the log into a spreadsheet. And here\'s the part that makes this a durable skill rather than a party trick: this skeleton is endlessly reusable. Change the grep to match a different status code, or a date, or a URL. Change the awk to pull a different column — the requested page instead of the IP. Suddenly the same six-stage pattern answers a completely different question: your most requested pages, your busiest hours, your most common user agents. You learn the shape once and reuse it forever. That composition — small tools, snapped together with pipes — is the entire reason this toolkit is worth mastering. Now, with all six tools in hand, a fair question is: when do you reach for which?',
}
