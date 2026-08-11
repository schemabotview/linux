import { type SceneSpec, GREEN } from 'reveal-engine'

// Course 5 §4 — sed (stream editor) on a whole-canvas `code` card. The s/// substitution workhorse,
// in-place editing, and line selection/deletion. Short lines keep the auto-fit font large at 4K.
export const sed: SceneSpec = {
  id: 'sed',
  title: 'sed — edit the stream',
  canvas: { width: 1560, height: 1240 },
  grid: { cols: [1], rows: [1], gap: 0, padding: 0.2 },
  nodes: [
    {
      id: 'sd-all', kind: 'code', filename: 'sed.sh', color: GREEN, cell: [0, 0],
      label: [
        '# sed: transform lines as they flow past.',
        '# the workhorse is   s/FIND/REPLACE/',
        "sed 's/foo/bar/'  file    # 1st foo per line → bar",
        "sed 's/foo/bar/g' file    # g = ALL foo on the line",
        "sed 's/foo/bar/gi' file   # + i = case-insensitive",
        "sed -E 's/[0-9]+/N/g' f   # -E regex: digits → N",
        '',
        '# by default sed only PRINTS; the file is untouched',
        "sed -i 's/foo/bar/g' file # -i: edit IN PLACE (careful!)",
        '',
        '# select lines by number or pattern',
        "sed -n '10,20p' file      # print ONLY lines 10-20",
        "sed '/^#/d'  config       # delete comment lines",
        "sed '/^$/d'  file         # delete blank lines",
        '',
        '# in a pipe, like everything else:',
        "cat access.log | sed 's/\\t/ /g'",
      ].join('\n'),
    },
  ],
  edges: [],
}
