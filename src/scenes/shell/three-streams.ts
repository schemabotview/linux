import type { Scene } from '../../render-engine'

// §8 streams — the section's real point is that there are TWO outputs, not one, and that they are
// separate underneath even though both land on the same screen. So the scene forks on the way out:
// one input, one program, two exits. The fan IS the claim.
export const threeStreams: Scene = {
  id: 'three-streams',
  nodes: [
    { id: 'stdin', label: 'stdin — fd 0', sub: 'where input comes from: your keyboard, by default', pattern: 'user', icon: 'terminal' },
    { id: 'prog', label: 'Any program', sub: 'born wired to all three, without knowing where they go', pattern: 'service', icon: 'box' },
    { id: 'stdout', label: 'stdout — fd 1', sub: 'the results', pattern: 'storage', icon: 'monitor' },
    { id: 'stderr', label: 'stderr — fd 2', sub: 'the problems', pattern: 'warn', icon: 'monitor' },
  ],
  edges: [
    { source: 'stdin', target: 'prog' },
    { source: 'prog', target: 'stdout', label: 'ls /etc /nope prints the listing here…' },
    { source: 'prog', target: 'stderr', label: '…and the error here — same screen, separate streams' },
  ],
}
