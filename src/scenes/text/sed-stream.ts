import type { Scene } from '../../render-engine'

// §4 sed — s/// is 90% of it and the difference between `/` and `/g` is one character, so the two forms
// have to sit on adjacent lines to be seen at all. -i gets its own node because it is the one flag here
// that can lose your data.
export const sedStream: Scene = {
  id: 'sed-stream',
  nodes: [
    {
      id: 'sed-code',
      kind: 'code',
      filename: 'sed',
      label: [
        "sed 's/foo/bar/'       # the FIRST foo on each line",
        "sed 's/foo/bar/g'      # every one — g is for global",
        "sed -E 's/[0-9]+/N/g'  # the match side is regex too",
        '',
        "sed -n '10,20p'        # print only lines 10 to 20",
        "sed '/^#/d'            # delete comment lines",
        "sed '/^$/d'            # delete blank lines",
      ].join('\n'),
    },
    {
      id: 'inplace',
      label: 'By default it prints',
      sub: 'your file is untouched — so -i is the unforgiving one',
      pattern: 'warn',
      icon: 'pencil',
    },
  ],
  edges: [
    { source: 'sed-code', target: 'inplace', label: 'grep finds lines; sed rewrites them — always run it once WITHOUT -i first' },
  ],
}
