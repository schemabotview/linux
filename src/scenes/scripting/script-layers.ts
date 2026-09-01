import type { Scene } from '../../render-engine'

// §9 you-are-here — the course added capability in layers, each of which is a different kind of thing
// (it runs / it takes input / it has structure / you can trust it). The recap is those four layers,
// because the order is what turns a saved command into something you would schedule.
export const scriptLayers: Scene = {
  id: 'script-layers',
  nodes: [
    {
      id: 'layers',
      label: 'A script, layer by layer',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'sl-run', label: 'It runs', sub: 'shebang, chmod +x, ./run', pattern: 'service', icon: 'filecode' },
        { id: 'sl-input', label: 'It takes input', sub: 'variables, $1, $@, read', pattern: 'network', icon: 'tag' },
        { id: 'sl-struct', label: 'It has structure', sub: 'if, case, for, while, functions', pattern: 'network', icon: 'braces' },
        { id: 'sl-trust', label: 'You can trust it', sub: 'set -euo pipefail, trap, getopts, shellcheck', pattern: 'service', icon: 'shieldcheck' },
      ],
    },
    { id: 'next', label: 'Next — the capstone', sub: 'one real tool, built and shipped', pattern: 'user', icon: 'boxes' },
  ],
  edges: [
    { source: 'layers', target: 'next', label: 'boot, shell, filesystem, processes, text, admin, scripting — it all converges next' },
  ],
}
