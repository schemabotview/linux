import type { Scene } from '../../render-engine'

// §6 reshape — five peers, then the one idiom worth memorising. The idiom is a card rather than a
// sixth tile because the ORDER is the teaching: uniq only collapses ADJACENT duplicates, so sort has
// to come first, and that is only visible when the stages are written in sequence.
export const connectiveTissue: Scene = {
  id: 'connective-tissue',
  nodes: [
    {
      id: 'small',
      label: 'The supporting cast — between the big three',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'sm-cut', label: 'cut', sub: 'pull out columns', variant: 'tile', pattern: 'network', icon: 'scissors' },
        { id: 'sm-sort', label: 'sort', sub: '-n, -r, -k2', variant: 'tile', pattern: 'network', icon: 'sortarrows' },
        { id: 'sm-uniq', label: 'uniq', sub: 'collapse duplicates', variant: 'tile', pattern: 'network', icon: 'copy' },
        { id: 'sm-wc', label: 'wc', sub: '-l lines, -w words', variant: 'tile', pattern: 'storage', icon: 'hash' },
        { id: 'sm-tr', label: 'tr', sub: 'translate, delete', variant: 'tile', pattern: 'storage', icon: 'repeat' },
      ],
    },
    {
      id: 'idiom',
      kind: 'code',
      filename: 'the one idiom to memorise',
      label: [
        'sort | uniq -c | sort -rn | head     # top N by frequency',
        '',
        '# on a column of IPs, error codes or status codes, this',
        '# answers "what is most common?" instantly',
      ].join('\n'),
    },
  ],
  edges: [
    { source: 'small', target: 'idiom', label: 'uniq only collapses ADJACENT duplicates — which is the whole reason sort comes first' },
  ],
}
