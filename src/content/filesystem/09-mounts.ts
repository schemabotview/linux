import type { Section } from '../types'

export const mounts: Section = {
  id: 'mounts',
  title: 'Mounts & the VFS',
  scene: 'mount-points',
  slide: `## Mounts & the VFS

One tree, many disks. The trick is **mounting** — attaching a whole filesystem at a **directory** inside the tree.

### Mounting
- **\`mount\`** attaches a device's filesystem at a **mount point** (a directory): a USB stick at \`/mnt/usb\`, a second disk at \`/home\`
- After that, \`/home/...\` transparently reads the *other* disk — you never think about which device (the **VFS** from Course 1 hides it)
- Different branches can be different filesystem types — **ext4**, **xfs**, **tmpfs** (a filesystem that lives in **RAM**, like \`/tmp\`)

### Persisted & inspected
- **\`/etc/fstab\`** lists what to mount **at boot** — that's how the whole tree assembles itself every start
- **\`df -h\`** — free space per mounted filesystem; **\`du -sh <dir>\`** — how much a directory uses

That completes the model: one tree, assembled from many mounted filesystems, presented as one by the VFS.`,
  narration:
    'We\'ve insisted the whole time that there\'s just one tree with one root — but of course a real machine often has several disks, a USB stick you plug in, maybe a network drive. How do all of those live inside a single tree? The answer is a wonderfully simple idea called mounting. To mount a filesystem is to attach it at a chosen directory inside the existing tree — that directory is called the mount point. So you might mount a USB stick at slash-mnt-slash-usb, and from that moment on, everything on the stick appears under that directory, as if it had always been part of the tree. On a server, you might put user home directories on a big second disk and mount it at slash-home — and then anyone reading slash-home-slash-sam is transparently reading that second disk, without ever knowing or caring. That transparency is exactly the VFS, the virtual filesystem from Course one, doing its job: it presents one seamless tree and hides which physical device each branch actually lives on. And because each branch is mounted independently, different branches can even be entirely different types of filesystem — your main disk might be formatted ext4, another xfs, and some, like slash-tmp, can be tmpfs, a filesystem that isn\'t on any disk at all but lives purely in RAM, which is precisely why slash-tmp is so fast and why it vanishes on reboot. Now, how does the tree reassemble itself the same way every time you boot? Through a configuration file — and it\'s a text file in slash-etc, just as we\'d expect — called slash-etc-slash-fstab, the filesystem table. It lists which devices to mount at which points at startup, and walking that list is one of the things that init does as the system comes up. Finally, two everyday commands for living with all this: df dash-h shows you each mounted filesystem and how much free space it has, in human-friendly units, and du dash-s-h on a directory tells you how much space that directory is using. And that completes the whole model of the filesystem: one single tree, assembled out of many separate mounted filesystems on many devices, all presented to you as one uniform thing by the VFS. Let\'s pull back and take it in.',
}
