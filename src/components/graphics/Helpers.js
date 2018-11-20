export function rightTrAngle(oppSide, adjSide) {
  const degreesInRad = 57.3
  return Math.atan(oppSide / adjSide) * degreesInRad
}