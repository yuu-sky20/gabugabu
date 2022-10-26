/*  gabuPosition
  |       |       |
  |   0   |   1   |
  |       |       |
  |-------|-------|
  |       |       |
  |   2   |   3   |
  |       |       |
*/
const gabuPosition: Array<[number, number]> = [
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
]
const pt1: number[] = [0, 1, 3, 2, 3, 1, 0, 2]
const pt2: number[] = [0, 1, 0, 2, 3, 1, 3, 2]

export { gabuPosition, pt1, pt2 }
