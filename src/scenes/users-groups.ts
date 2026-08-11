import { type SceneSpec, BLUE } from 'reveal-engine'

// Course 6 §2–§3 — users, groups & sudo on a whole-canvas `code` card. Who you are, where accounts
// live, how to manage them, and the sudo model. Short lines keep the auto-fit font large at 4K.
export const usersGroups: SceneSpec = {
  id: 'users-groups',
  title: 'Users, groups & sudo',
  canvas: { width: 1560, height: 1280 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'ug-all', kind: 'code', filename: 'users.sh', color: BLUE, cell: [0, 0],
      label: [
        '# who am I?',
        'whoami                 # your username',
        'id                     # your UID + all your groups',
        '',
        '# where accounts live (all plain text)',
        'cat /etc/passwd        # name:UID:GID:home:shell',
        'cat /etc/group         # groups and their members',
        '#  passwords are HASHED in /etc/shadow (root-only)',
        '#  root = UID 0 ; normal users start at 1000',
        '',
        '# manage accounts (need sudo)',
        'sudo useradd -m -s /bin/bash sam   # -m home  -s shell',
        'sudo passwd sam                    # set a password',
        'sudo usermod -aG sudo sam          # add to a group',
        '#         ^ -aG = APPEND (plain -G replaces!)',
        'sudo userdel -r sam                # delete + home',
        '',
        '# sudo: run ONE command as root; rules in /etc/sudoers',
        'sudo -l                # what may I run as root?',
        'sudo visudo            # edit sudoers SAFELY',
      ].join('\n'),
    },
  ],
  edges: [],
}
