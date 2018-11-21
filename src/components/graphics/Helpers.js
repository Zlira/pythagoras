const pxPerUnit = 40
const signDigits = 2


export function rightTrAngle(oppSide, adjSide) {
  const degreesInRad = 57.3
  return Math.atan(oppSide / adjSide) * degreesInRad
}


export function hypothenuseLen(cat1, cat2) {
  return Math.sqrt(cat1**2 + cat2**2)
}

export function pxToUnits(px) {
  return px/pxPerUnit
}

export function toFixed(float) {
  return float.toFixed(signDigits)
}

export function pxToUnitsFixed(pxFloat) {
  return toFixed(pxToUnits(pxFloat))
}