import type { Section } from '../types'

export const variablesArgs: Section = {
  id: 'variables-args',
  title: 'Variables & arguments',
  scene: 'vars-and-args',
  slide: `## Variables & arguments

Scripts need **memory** (variables) and **inputs** (arguments) — the same expansion & quoting from Course 2, now in a file.

### Variables
- Assign with **no spaces**: \`name="Sam"\` (a space makes bash try to *run* \`name\`)
- Use with \`$\`: \`echo "$name"\` — **always quote** it; \`today=$(date +%F)\`; \`count=$(( 2 + 3 ))\` (math)

### Arguments — how a script receives input
- **\`$1 $2 …\`** the positional args · **\`$@\`** all of them (quoted: \`"$@"\`) · **\`$#\`** the count · **\`$0\`** the script name
- \`./deploy.sh prod v2\` → \`$1\`=\`prod\`, \`$2\`=\`v2\`, \`$#\`=\`2\`

### Reading interactively
- **\`read -r -p "Continue? " answer\`** — prompt and capture a line (\`-r\` = don't mangle backslashes)

Memory and inputs in hand — now the script needs to make **decisions**.`,
  narration:
    'A useful script needs to remember things and to take input, and both use ideas straight from the shell course — now living in a file. First, variables, the script\'s memory. You assign one by writing the name, an equals sign, and a value — name equals quote-Sam — and here\'s the rule that bites everyone at least once: there must be no spaces around the equals sign. If you write name space equals space Sam, bash reads name as a command to run and fails, because remember, spaces are how the shell splits words. So, name equals value, tight, no spaces. You read a variable back with a dollar sign in front, and as we drilled in the shell course, you almost always wrap it in double quotes — echo quote dollar-name — to protect against spaces and surprises in its value. Two handy assignment forms: dollar-parenthesis captures the output of a command into a variable, so today equals dollar-paren date, and dollar-double-parenthesis does arithmetic, so count equals dollar-double-paren two plus three. Now, inputs. How does a script receive information from whoever runs it? Through positional arguments — the words typed after the script\'s name on the command line. Inside the script, those arrive as special variables: dollar-one is the first argument, dollar-two the second, and so on. Dollar-at, written and quoted as quote-dollar-at, is all of the arguments together, each properly preserved. Dollar-hash is the count of how many arguments were given, which you\'ll use to check the script was called correctly. And dollar-zero is the script\'s own name, useful for printing usage messages. So if someone runs deploy.sh prod v2, then inside the script dollar-one is prod, dollar-two is v2, and dollar-hash is two. This is exactly how command-line tools take their inputs, and now your scripts do too. And when you need to ask the user something interactively, mid-run, the read command prompts and captures their reply into a variable — read dash-r dash-p with a prompt string, then a variable name, where dash-r means read the line literally without mangling backslashes, and is a good habit always to include. So the script has memory and inputs. The next thing any real program needs is the ability to make decisions based on them.',
}
