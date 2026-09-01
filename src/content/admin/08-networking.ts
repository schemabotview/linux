import type { Section } from '../types'

export const networking: Section = {
  id: 'networking',
  title: 'Networking: the path & the tools',
  scene: 'network-path',
  slide: `## Networking: the path & the tools

A server exists to be **reached**. Follow the path out — and meet the tools that inspect each hop.

### The path (recall the network stack, Course 1)
- Your **host** talks through a network **interface** (\`eth0\`), which has an **IP address**, out to the **network/router**, to a **remote host**
- **DNS** turns a name (\`example.com\`) into an IP; a **port** picks which service on that host (80 = HTTP, 22 = SSH)

### The everyday tools
- **\`ip a\`** — your interfaces & IP addresses (\`ip route\` — how packets leave)
- **\`ss -tulpn\`** — which **ports** are **listening**, and which process owns each (*"is my server up?"*)
- **\`ping host\`** — is it reachable? · **\`curl -I url\`** — actually fetch (test an HTTP service)

### The debugging ladder
- \`ip a\` (do I have an address?) → \`ping\` (can I reach it?) → \`ss\`/\`curl\` (is the service answering?) — climb it in order
`,
  narration:
    'A server\'s entire purpose is to be reached over the network — a website nobody can connect to is useless — so networking is a core operator skill. Let\'s trace the path a connection takes, which ties back to the network stack we saw inside the kernel in Course one. Your machine, the host, sends and receives data through a network interface — often named something like eth0 for a wired connection — and that interface has an IP address, its identity on the network. From there, traffic goes out to your local network and its router, and then across the wider network to a remote host, another machine identified by its own IP address. Two supporting ideas make this usable: DNS, the domain name system, translates a human-friendly name like example-dot-com into the numeric IP address the network actually routes on; and a port number selects which specific service on a host you want, since one machine runs many — port eighty is the convention for web traffic, port twenty-two for SSH. Now the tools, each of which inspects one part of that path. ip a — ip space a — shows you your interfaces and their IP addresses, answering do I even have a network address; its companion ip route shows how packets find their way out. ss dash-t-u-l-p-n is the one you\'ll use to answer is my server actually running — it lists which ports are open and listening on your machine and, crucially, which process owns each one, so you can confirm your web server is really up and bound to port eighty. ping followed by a host is the simplest reachability test: it sends a tiny probe and tells you whether the other end answers at all, and how fast. And curl actually makes a real request — curl dash-capital-I to a URL fetches just the headers from a web service, letting you test from the command line whether an HTTP server is responding correctly. Put these together and you get the network debugging ladder, which you climb in order when something can\'t connect: first ip a, do I have an address at all; then ping, can I reach the other machine; then ss or curl, is the actual service answering on its port. Working up that ladder isolates exactly where the break is. That\'s how you inspect the network. But there\'s one tool that a remote operator lives inside more than any other — the one that lets you securely become the shell on a machine across the world — and that\'s ssh.',
}
