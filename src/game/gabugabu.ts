const pt1: number[] = [0, 1, 3, 2, 3, 1, 0, 2]
const pt2: number[] = [0, 1, 0, 2, 3, 1, 3, 2]

function selectPt(): number[] {
  const patternNum = 3
  let randomPt = Math.floor(Math.random() * patternNum)
  let pt: number[] = []
  switch (randomPt) {
    case 0:
      pt = pt1
      break
    case 1:
      pt = pt2
      break
    default:
      break
  }
  return pt
}

export default selectPt
