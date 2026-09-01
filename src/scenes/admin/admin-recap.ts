import type { Scene } from '../../render-engine'

// §10 you-are-here — five areas, each named by the command you would actually type, because that is
// what the course handed over. The next-course card points at the thing all of these have in common:
// every one of them was a line you typed once and will want to type again.
export const adminRecap: Scene = {
  id: 'admin-recap',
  nodes: [
    {
      id: 'operator',
      label: 'You can operate a real server now',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'ar-users', label: 'Accounts', sub: 'useradd, usermod -aG, sudo', pattern: 'user', icon: 'users' },
        { id: 'ar-svc', label: 'Services', sub: 'systemctl, start vs enable', pattern: 'service', icon: 'server' },
        { id: 'ar-logs', label: 'Logs', sub: 'journalctl -u, -f, -b', pattern: 'network', icon: 'scroll' },
        { id: 'ar-pkg', label: 'Software', sub: 'apt update, then install', pattern: 'storage', icon: 'boxes' },
        { id: 'ar-cron', label: 'Schedules', sub: 'crontab, or a .timer', pattern: 'network', icon: 'clock' },
        { id: 'ar-net', label: 'Reach', sub: 'ip, ss, curl, ssh, rsync', pattern: 'service', icon: 'globe' },
      ],
    },
    { id: 'next', label: 'Next — scripting', sub: 'capturing all of these into real tools', pattern: 'user', icon: 'filecode' },
  ],
  edges: [
    { source: 'operator', target: 'next', label: 'every one of these was a line you typed once and will want to type again' },
  ],
}
