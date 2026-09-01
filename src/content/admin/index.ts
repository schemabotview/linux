import type { Course } from '../types'
import { operatingABox } from './01-operating-a-box'
import { users } from './02-users'
import { sudo } from './03-sudo'
import { systemdServices } from './04-systemd-services'
import { systemdLogs } from './05-systemd-logs'
import { packages } from './06-packages'
import { scheduling } from './07-scheduling'
import { networking } from './08-networking'
import { ssh } from './09-ssh'
import { youAreHere } from './10-you-are-here'

// admin — operating the box rather than using it. Ten sections, area by area: the surface and the
// loop (§1), who is allowed on (§2–§3), what runs (§4) and where its output goes (§5), how software
// gets on (§6), how work happens unattended (§7), and how you reach the box at all (§8–§9), plus the
// bookend.
// Course COMPLETE — 10 sections, 10 scenes, 10 wavs (20.0 min).
export const admin: Course = {
  id: 'admin',
  title: 'Users, services & networking',
  sections: [
    operatingABox,
    users,
    sudo,
    systemdServices,
    systemdLogs,
    packages,
    scheduling,
    networking,
    ssh,
    youAreHere,
  ],
}
