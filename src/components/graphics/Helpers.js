const pxPerUnit = 40
const signDigits = 2
const degreesInRad = 57.3

export function degreesToRad(deg) {
  return deg/degreesInRad
}


export function rightTrAngle(oppSide, adjSide) {
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