import type { Scene } from '../../render-engine'

// §4 systemd-services — the section names one thing to keep straight, so that is the last band and the
// scene builds to it. start and enable are one keystroke apart, mean completely different things, and
// the pair sitting side by side is the only way that lands.
export const startVsEnable: Scene = {
  id: 'start-vs-enable',
  nodes: [
    { id: 'unit', label: 'A .service unit', sub: 'in /etc/systemd/system/', pattern: 'storage', icon: 'file' },
    {
      id: 'systemctl',
      kind: 'code',
      filename: 'systemctl',
      label: [
        'systemctl start nginx      # right now',
        'systemctl enable nginx     # at every boot — NOT the same thing',
        'systemctl enable --now nginx   # both, in one go',
        '',
        'systemctl status nginx     # running? healthy? recent log lines',
        'systemctl restart nginx',
        'systemctl daemon-reload    # after you EDIT a unit file',
      ].join('\n'),
    },
    {
      id: 'verbs',
      label: 'The two verbs to keep straight',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'v-start', label: 'start', sub: 'now, this once', pattern: 'service', icon: 'zap' },
        { id: 'v-enable', label: 'enable', sub: 'at every boot, from now on', pattern: 'network', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'unit', target: 'systemctl', label: 'it declares what to run, what it depends on, and how to restart it' },
    { source: 'systemctl', target: 'verbs', label: 'a stopped service you enabled still comes back at the next boot' },
  ],
}
