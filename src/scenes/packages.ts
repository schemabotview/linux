import { type SceneSpec, GREEN } from 'reveal-engine'

// Course 6 §6 — package management on a whole-canvas `code` card (Debian/Ubuntu apt shown; Fedora
// dnf, Arch pacman are the same ideas). Short lines keep the auto-fit font large at 4K.
export const packages: SceneSpec = {
  id: 'packages',
  title: 'Package management',
  canvas: { width: 1560, height: 1200 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'pk-all', kind: 'code', filename: 'packages.sh', color: GREEN, cell: [0, 0],
      label: [
        '# a package manager installs software + ALL its',
        '# dependencies, from trusted repositories, and',
        '# tracks what it installed so it can remove it.',
        '#   Debian/Ubuntu: apt   Fedora: dnf   Arch: pacman',
        '',
        'sudo apt update           # refresh the package lists',
        'sudo apt upgrade          # update installed packages',
        'sudo apt install nginx    # install (pulls in deps)',
        'sudo apt remove nginx     # uninstall',
        'apt search postgres       # find a package',
        'apt show nginx            # version, deps, description',
        'dpkg -l | grep nginx      # low-level: what is installed',
        '',
        '# repos are configured under /etc/apt/',
        '# always "apt update" before install/upgrade',
        '# prefer packages over curl|bash — signed & tracked',
      ].join('\n'),
    },
  ],
  edges: [],
}
