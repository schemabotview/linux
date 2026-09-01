import type { Section } from '../types'

export const jobsCgroups: Section = {
  id: 'jobs-cgroups',
  title: 'Job control & cgroups',
  scene: 'jobs-and-cgroups',
  slide: `## Job control & cgroups

Two more levers: **job control** for the processes *your shell* launched, and **cgroups** for hard, system-wide **limits**.

### Job control (the shell — recap from Course 2)
- **\`&\`** starts a job in the **background**; **\`Ctrl-Z\`** suspends the foreground one (sends \`SIGSTOP\`)
- **\`jobs\`** lists them; **\`fg\`** resumes in foreground, **\`bg\`** in background; \`kill %1\` targets job 1
- Under the hood: job control is just the shell sending the **signals** from §6

### cgroups — control groups
- The kernel feature that puts a process (and its children) in a group with **hard caps**: max CPU, max memory, max I/O
- Exceed the memory cap → the group's processes are **killed** (the *OOM* story), not just slowed
- **This is what containers are built on** — Docker/Kubernetes are **cgroups + namespaces** wearing a nice UI

From a keystroke to a container limit, it's all the same primitives: processes, signals, and the scheduler.`,
  narration:
    'Two final levers of control, at opposite ends of the scale. The first is job control, which we actually previewed back in Course two — it\'s how you manage the processes you launch from your own interactive shell. Recall the pieces: ending a command with an ampersand starts it in the background so you get your prompt back immediately; Control-Z suspends whatever\'s running in the foreground; the jobs command lists everything your shell is managing; and fg and bg resume a job in the foreground or the background. And now, with this course behind you, you can see what job control really is under the hood — it\'s nothing more than the shell sending the signals we just learned. Control-Z is the shell delivering SIGSTOP; resuming a job is SIGCONT; and you can even kill a job by its job number with kill percent-one. It\'s signals all the way down. The second lever is at the opposite extreme — system-wide, enforced by the kernel, and far more powerful: cgroups, short for control groups. Where nice merely biases a process\'s share of the CPU, cgroups let you put a process and all its children into a named group and impose hard, absolute ceilings on it: this group may use at most two CPU cores, at most one gigabyte of memory, at most this much disk bandwidth — and these aren\'t suggestions, they\'re enforced. Cross the memory limit, for example, and the kernel doesn\'t just slow the group down, it starts killing processes in it — that\'s the out-of-memory killer in action. And here\'s the payoff that makes cgroups worth knowing about even if you never configure one by hand: this is the foundation that containers are built on. When you run a Docker container or a Kubernetes pod, what\'s actually happening underneath is cgroups enforcing the resource limits, combined with another kernel feature called namespaces that isolates what each process can see. All the container tooling — Docker, Kubernetes, the whole cloud-native world — is, at bottom, a friendly interface over cgroups and namespaces. There\'s no magic; it\'s these same process primitives. And that\'s the quiet theme of this whole course: from a single Control-C keystroke, to a graceful server shutdown, to a container capped at one gigabyte of RAM, it is all the same small set of ideas — processes, signals, and the scheduler. Let\'s bring it together.',
}
