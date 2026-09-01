import type { Section } from '../types'

export const whyLinux: Section = {
  id: 'why-linux',
  title: 'Why Linux exists',
  scene: 'os-referee',
  slide: `## Why Linux exists

A computer is just circuits until something teaches it to be useful. That something is the **operating system** — and on servers, phones, cars, and the cloud, that OS is almost always **Linux**.

### What an OS is for
- One **referee** between your programs and the hardware — sharing the CPU, memory, disk, and network so many programs coexist
- A stable **set of services** (files, processes, networking) so a program never talks to a raw disk or network card itself
- The line between **your code** and **the machine** — everything in this course lives on one side of it or the other

### Where Linux came from
- **1991** — Linus Torvalds released a free Unix-like **kernel**; the **GNU** project supplied the userland around it
- **Open source** — anyone can read, change, and ship it; that is why it runs **most of the internet**, Android, and the cloud

Same stack, two directions. Let's **climb it** as it boots, then **come back down** as it runs.`,
  narration:
    'Before we touch a single command, it\'s worth knowing what an operating system actually is and why, on almost every server you\'ll ever use, that operating system is Linux. A bare computer is just circuits — a processor, some memory, a disk, a network card — and none of it does anything useful on its own. The operating system is the program that turns that pile of hardware into something you can run other programs on. Think of it as a referee: your web server, your database, your text editor all want the CPU and the memory and the disk at the same time, and the OS decides who gets what, when, and keeps them from trampling each other. It also hides the ugly details — no program you write ever pokes a raw disk or talks directly to a network card; it asks the operating system, which offers a clean, stable set of services for files, processes, and networking. That line — between the code you write and the machine underneath — is the single most important idea in this whole course; every topic we cover sits on one side of it or the other. Now, where did Linux come from. In 1991 a student named Linus Torvalds released a free, Unix-like kernel — the core of an operating system — and the GNU project supplied all the tools and utilities around it, which is why you\'ll sometimes hear it called GNU slash Linux. Because it\'s open source — anyone can read it, change it, and ship it — it spread everywhere: it runs most of the internet, it\'s the heart of Android, and it is the cloud. And it inherited a philosophy from Unix that we\'ll lean on again and again — small sharp tools, plain text everywhere, and the idea that everything is a file. Now look at this diagram, because we\'ll spend the whole course inside it, and it cleverly tells two stories at once. Read the numbered ladder up the left side, one to six, and that\'s how the machine boots — it comes alive from the bottom up, from the bare metal, through the kernel, all the way up to the shell prompt you type at. Read the stacked layers in the middle instead, from the top down, and that\'s how the running machine is built — your programs sitting on top, the hardware at the very bottom, and the kernel in between. Boot climbs this stack; a running program descends it. Same picture, two directions. Right now the whole thing is small and far away, exactly like the machine feels when you don\'t understand it. Let\'s start at the very bottom rung and watch it boot.',
}
