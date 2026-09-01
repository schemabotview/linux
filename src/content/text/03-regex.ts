import type { Section } from '../types'

export const regex: Section = {
  id: 'regex',
  title: 'Regular expressions',
  scene: 'regex-symbols',
  slide: `## Regular expressions

A **regex** describes a *shape* of text, not a fixed string. Learn a handful of symbols and you can match almost anything. (\`grep -E\`, and \`sed\`/\`awk\` speak them too.)

### The core metacharacters
- **\`.\`** any one character · **\`\\.\`** a literal dot (backslash **escapes**)
- **\`^\`** start of line · **\`$\`** end of line
- **\`*\`** 0+ of the previous · **\`+\`** 1+ · **\`?\`** 0 or 1
- **\`[abc]\`** any one of a set · **\`[0-9]\`** a range · **\`[^…]\`** *not* these
- **\`{3}\`** exactly 3 · **\`( … )\`** group · **\`a|b\`** a **or** b

### Reading real patterns
- \`^ERROR\` — a line that **starts with** ERROR
- \`[0-9]{3}-[0-9]{4}\` — three digits, a dash, four digits (a phone number)
- \`HTTP/1\\.[01]\` — \`HTTP/1.0\` or \`HTTP/1.1\` (note the escaped dot)

Regex is a language of its own — and it powers grep, sed, awk, and half your editor. Now let's *change* text.`,
  narration:
    'Regular expressions, or regex, are one of those skills that feel cryptic for a day and then pay you back for the rest of your career — and they show up far beyond grep, in sed, in awk, in your code editor, in nearly every programming language. The core idea is that instead of matching a fixed word, you describe a shape or a pattern that text can fit. And you can get enormous mileage out of maybe a dozen symbols. Let\'s walk the essentials. A dot matches any single character. A star means zero or more of whatever came just before it, a plus means one or more, and a question mark means zero or one — optional. So a-star matches any run of a\'s including none, and dot-star, famously, matches any run of any characters at all. Then there are two anchors that don\'t match characters but positions: a caret means the start of the line, and a dollar sign means the end of the line — so caret-ERROR matches only lines that begin with ERROR, not ones that merely contain it somewhere. Square brackets define a character class, a set of allowed characters: bracket a-b-c matches any one of those three, bracket zero-dash-nine is the shorthand for any digit, and a caret inside the brackets negates it — match anything except these. Curly braces let you specify a count: something followed by brace-three means exactly three of it. Parentheses group things together, and a vertical bar means or — this pattern or that one. Now here\'s the one gotcha that catches everyone: since the dot is a special character meaning any character, when you want to match a literal, actual dot — like the dot in a version number or a filename — you have to escape it with a backslash, backslash-dot. Backslash is the universal escape: it strips a metacharacter of its magic and makes it literal. Let\'s read a couple of real patterns to make it concrete. Caret-ERROR, we said, is a line starting with ERROR. Bracket-zero-nine-brace-three, dash, bracket-zero-nine-brace-four is three digits, a hyphen, then four digits — a North American phone number. And HTTP-slash-one-backslash-dot-bracket-zero-one matches HTTP-slash-one-dot-zero or HTTP-slash-one-dot-one, with that escaped dot in the middle being a real dot. With grep you turn on this full pattern language with the dash-E flag, for extended regular expressions. Regex is genuinely a small language worth investing in, because once you know it, you know it everywhere. So grep, with regex, lets you find any shape of text. But finding is only half the job — often you want to change the text you find. That\'s sed.',
}
