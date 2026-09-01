import type { Section } from '../types'

export const operatingABox: Section = {
  id: 'operating-a-box',
  title: 'From user to operator',
  scene: 'operator-surface',
  slide: `## From user to operator

So far you've *used* Linux. Now you'll **operate** it — the jobs that keep a real machine (especially a **server**) running.

### The administrator's surface
- **Users & groups** — who has an account, and who may do what (**\`sudo\`**)
- **Services** — the background daemons \`systemd\` starts and supervises
- **Packages** — installing and updating software safely
- **Scheduling** — running jobs automatically, on a clock (\`cron\`, timers)
- **Logs & networking** — seeing what happened, and reaching other machines

### The mindset shift
- Everything is **config in \`/etc\`** (text) + **\`sudo\`** for privilege + **logs** when it breaks — the loop you'll live in

Let's operate a box, area by area — starting with **who** is allowed on it.`,
  narration:
    'Up to now, everything we\'ve done has been about using Linux — navigating, running commands, transforming text. This course is a shift in role: from user to operator, the person responsible for keeping a machine running. And this matters most on servers, because the overwhelming majority of Linux machines in the world are servers — headless boxes in data centers with no screen, running websites, databases, and services, that someone has to administer entirely over the network. That someone is now you. Let\'s map the administrator\'s job, which is what this board lays out. First, users and groups: who has an account on this machine, and critically, who is allowed to do what — the whole world of permissions and the sudo command that grants elevated power. Second, services: the background programs, the daemons, that do the actual work of a server, all started and supervised by systemd. Third, packages: how you install and update software safely, from trusted sources, without breaking the system. Fourth, scheduling: how you make jobs run automatically on a clock — a nightly backup, a cleanup every fifteen minutes — with cron and its modern cousins. And fifth, the twin skills of logs and networking: seeing what actually happened when something goes wrong, and reaching out to and between machines. There\'s a mental model that ties all of this together, and once you internalize it, administration stops feeling like a grab-bag of commands: nearly everything is configured by editing text files in slash-etc, nearly every administrative action needs sudo for privilege, and when something breaks, the answer is in the logs. Config, privilege, logs — that\'s the loop you\'ll live in as an operator. Let\'s start where security starts: with who is allowed on the machine at all.',
}
