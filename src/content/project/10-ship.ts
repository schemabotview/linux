import type { Section } from '../types'

export const ship: Section = {
  id: 'ship',
  title: 'Stage 9 — Ship',
  scene: 'cap-ship',
  focus: 'st-ship',
  slide: `## Stage 9 — Ship

The final step: package it so **anyone** can install it in one command — and call it truly *done*.

### An \`install.sh\`
- **\`install -m 755 sysreport.sh /usr/local/bin/sysreport\`** — copy **and** set permissions in one step (Course 3); now it's on **\`PATH\`** (bare \`sysreport\` works)
- Place the \`.service\` / \`.timer\` in \`/etc/systemd/system/\`, then **\`daemon-reload\`** + **\`enable --now\`**
- \`/usr/local/bin\` is the right home for **local, admin-installed** tools

### What "shipped" really means
- A **README** (what, why, how) · **\`shellcheck\`-clean** code · a set **\`VERSION\`** · **documented exit codes**
- The difference between "works on my machine" and "someone else can run it"

sysreport is **built, hardened, and shipped** — a real tool. Let's step all the way back.`,
  narration:
    'Stage nine is shipping — packaging the tool so that anyone can install it cleanly in a single command, which is the difference between it works on my machine and something a colleague or a fleet of servers can actually use. We write a small install script, and it\'s a nice final callback to the filesystem course. The key line uses the install command, which copies a file and sets its permissions in one atomic step — install dash-m seven-five-five puts sysreport into slash-usr-slash-local-slash-bin with executable permissions. And that location matters: slash-usr-slash-local-slash-bin is the standard home for locally installed, admin-provided tools, and because it\'s on the system PATH, once installed you can run the tool by just typing sysreport from anywhere, with no path and no dot-slash — it feels like a built-in command. The installer also places the service and timer files into slash-etc-slash-systemd-slash-system with the right read permissions, then runs daemon-reload and enable-dash-dash-now to activate the schedule — automating the whole setup we did by hand in the earlier stages. But shipping is about more than copying files, and it\'s worth being clear about what done really means for a real tool. It means there\'s a README explaining what the tool is, why it exists, and how to use it, so someone can understand it without reading the source. It means the code is shellcheck-clean, having passed the linter from the scripting course with no warnings. It means the VERSION is set, so people know what they\'re running. And it means the exit codes are documented, so other scripts can rely on it. Those things are unglamorous, but they\'re exactly what turns a personal hack into software other people can trust and build on. And with that, sysreport is complete: designed, built stage by stage, transformed from raw data into insight, scheduled, serviced, hardened against the real world, and shipped. It\'s a genuine, deployable Linux tool. Let\'s step all the way back and take in everything this represents.',
}
