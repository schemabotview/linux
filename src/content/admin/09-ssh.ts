import type { Section } from '../types'

export const ssh: Section = {
  id: 'ssh',
  title: 'ssh: the remote shell',
  scene: 'ssh-keys',
  slide: `## ssh: the remote shell

**\`ssh\`** gives you an **encrypted shell on a remote machine** — it's how virtually all server administration happens.

### Logging in
- **\`ssh sam@server.com\`** — a secure \`bash\` prompt *on that server*; everything you've learned now works remotely
- **\`ssh -p 2222 …\`** for a non-default port · runs over port **22**

### Keys, not passwords (the professional default)
- **\`ssh-keygen\`** makes a **key pair**: a *private* key you keep, a *public* key you put on the server (\`~/.ssh/authorized_keys\`)
- **\`ssh-copy-id sam@server\`** installs it — then login is keyed, no password: safer *and* scriptable
- Guard the private key (\`chmod 600\`); disabling password login hardens a server

### The companions
- **\`scp\`** / **\`rsync\`** copy files over the same secure channel (\`rsync\` syncs efficiently, resumable)

With \`ssh\` you administer any box on earth as if you were sitting at it. That completes the operator's toolkit.`,
  narration:
    'Here is the tool that makes the entire world of remote servers possible: ssh, the secure shell. Think about the situation — the machine you need to administer is in a data center hundreds of miles away, with no screen and no keyboard you can touch. ssh solves this completely by giving you an encrypted shell session on that remote machine, right in your terminal. You type ssh, then your username, an at-sign, and the server\'s address — ssh sam-at-server-dot-com — and after authenticating you\'re sitting at a bash prompt on that remote server, as if you\'d walked up to it. And this is the beautiful payoff of the whole series: everything you\'ve learned — navigating the filesystem, managing processes, reading logs, controlling services with systemctl, editing config in slash-etc — all of it now works over that ssh connection, on a machine anywhere on Earth. The encryption means it\'s all safe from eavesdropping, even over the open internet. Now, you can log in with a password, but the professional way, and one worth adopting immediately, is to use key-based authentication instead. You run ssh-keygen once, which creates a matched pair of cryptographic keys: a private key that stays secret on your own machine and that you never share, and a public key that you place on any server you want to access, in a file called authorized_keys in your home directory\'s dot-ssh folder. The helper ssh-copy-id does that installation for you. Once it\'s set up, logging in requires no password at all — the two keys prove your identity to each other mathematically — and this is both more secure, because there\'s no password to guess or brute-force, and more convenient, because it can happen in a script without a human typing anything. You protect the private key with tight permissions, chmod six-hundred, and on a hardened server you disable password login entirely, allowing only keys. Alongside ssh come two companions that use the same secure channel to move files: scp, which copies files to and from a remote machine much like the cp command, and rsync, which is smarter — it efficiently synchronizes files and directories, transferring only what changed and resuming if interrupted, which makes it the standard tool for backups and deployments. With ssh and its companions in hand, you can log into, administer, and move files to and from any Linux machine in the world as though you were sitting right in front of it. And that completes the operator\'s toolkit. Let\'s bring it all together.',
}
