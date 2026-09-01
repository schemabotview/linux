import type { Section } from '../types'

export const permissionsChange: Section = {
  id: 'permissions-change',
  title: 'Changing permissions & sudo',
  scene: 'chmod-chown',
  slide: `## Changing permissions & sudo

Two commands set access — \`chmod\` (the *what*) and \`chown\` (the *who*) — plus \`sudo\`, the key to the whole box.

### \`chmod\` — two notations
- **Octal**: each triad is a digit, **r=4 w=2 x=1** summed → \`chmod 644\` = \`rw-r--r--\`, \`chmod 755\` = \`rwx r-x r-x\`
- **Symbolic**: who + change + what → \`chmod u+x script.sh\` (give owner execute), \`chmod go-w file\`
- A script needs **\`x\`** to run; a **directory** needs \`x\` to be *entered* (traversed)

### \`chown\` & \`umask\`
- **\`chown sam:staff file\`** — set owner : group (needs \`sudo\`)
- **\`umask\`** — the default permissions stripped from new files

### root & sudo
- **root** (UID 0) bypasses every check — total power; **\`sudo <cmd>\`** runs one command as root
- Rule: work as a normal user, reach for \`sudo\` only when you truly need it
`,
  narration:
    'Now that you can read permissions, let\'s change them, with two commands. The first is chmod, change mode, which sets what can be done — those r, w, x bits — and it accepts two different notations that confuse people until they see both. The first is octal, using numbers, and it\'s based on a neat trick: within each triad, read gives four, write gives two, execute gives one, and you just add them up. So read plus write is six, read plus write plus execute is seven, read only is four. That means chmod six-four-four sets the three triads to read-write, read, read — a normal file — and chmod seven-five-five sets them to read-write-execute, read-execute, read-execute — a typical program or script that everyone can run but only the owner can change. The other notation is symbolic, which reads almost like English: you name the audience — u for user slash owner, g for group, o for other, a for all — then a plus to add or minus to remove, then the permission. So chmod u-plus-x script-dot-sh means give the owner execute permission on this script, and chmod g-o-minus-w file means take write away from group and other. This is where that directory-execute subtlety pays off: a script file needs the x bit before you\'re allowed to run it, and a directory needs the x bit before you\'re allowed to enter it and reach what\'s inside — no execute on a folder, no getting in. The second command is chown, change owner, which sets who owns the file — chown sam colon staff file makes sam the owner and staff the group — and changing ownership generally requires administrative rights. There\'s also umask, which quietly controls the default permissions that new files are created with. And that brings us to the master key of the whole system: the root user. Root, which has user ID zero, is the superuser, and root bypasses every permission check entirely — root can read, write, and delete anything, anywhere. That\'s enormous power, and the modern way to wield it safely is a command called sudo. You do your normal work as an ordinary, limited user, and when you genuinely need administrative power for one command — installing software, editing a system config in slash-etc, changing ownership — you prefix just that command with sudo, prove it\'s really you with your password, and it runs as root for that one command only. The discipline is simple and important: live as a normal user, and reach for sudo only when you truly must. So permissions really are the entire security model of a Linux box, and now you can both read them and set them. But we\'ve been treating a file as if the name and the file are the same thing. They\'re not — and seeing why unlocks one of the filesystem\'s most elegant tricks.',
}
