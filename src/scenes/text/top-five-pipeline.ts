import type { Scene } from '../../render-engine'

// §8 pipeline — the payoff scene. The command has to be on screen in full, because the claim is that
// six small tools compose into one line; the band underneath is the same line read as a sentence, which
// is the skill being taught — seeing filter/extract/tally/rank instead of six unrelated commands.
export const topFivePipeline: Scene = {
  id: 'top-five-pipeline',
  nodes: [
    {
      id: 'pipeline-code',
      kind: 'code',
      filename: 'the top 5 IPs causing 500s',
      label: [
        'grep " 500 " access.log \\',
        "  | awk '{print $1}' \\",
        '  | sort \\',
        '  | uniq -c \\',
        '  | sort -rn \\',
        '  | head -5',
      ].join('\n'),
    },
    {
      id: 'sentence',
      label: 'Read it as a sentence',
      sub: 'no script, no spreadsheet — and the same skeleton answers a hundred other questions',
      pattern: 'service',
      flow: 'LR',
      children: [
        { id: 'st-filter', label: 'Filter', sub: 'to the errors', variant: 'tile', pattern: 'service', icon: 'search' },
        { id: 'st-extract', label: 'Extract', sub: 'the IP', variant: 'tile', pattern: 'service', icon: 'sigma' },
        { id: 'st-tally', label: 'Tally', sub: 'by IP', variant: 'tile', pattern: 'network', icon: 'hash' },
        { id: 'st-rank', label: 'Rank', sub: 'top 5', variant: 'tile', pattern: 'storage', icon: 'sortarrows' },
      ],
      edges: [
        { source: 'st-filter', target: 'st-extract' },
        { source: 'st-extract', target: 'st-tally' },
        { source: 'st-tally', target: 'st-rank' },
      ],
    },
  ],
  edges: [
    { source: 'pipeline-code', target: 'sentence', label: 'each stage is one small tool doing one thing; the pipe is the composition' },
  ],
}
