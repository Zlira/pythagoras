import React from 'react'
import { scaleLinear } from 'd3-scale'


function sectorStart(val) {
  const sectorLen = 20/3
  if (val === 10) {return 2 * sectorLen - 10}
  return Math.floor((val + 10) / sectorLen) * sectorLen - 10
}

export default function AlignmentSecotor({
  containerWidth, containerHeight,
  lawfullness, goodness, highlightId
}) {
  const sectorsPerLine = 3,
    sectorWidth = Math.round(containerWidth / sectorsPerLine),
    sectorHeight = Math.round(containerHeight / sectorsPerLine),
    xScale = scaleLinear().domain([-10, 10]).range([0, containerWidth]),
    yScale = scaleLinear().domain([-10, 10]).range([containerHeight, 0]),
    sectorX = Math.round(xScale(sectorStart(lawfullness))),
    sectorY = Math.round(yScale(sectorStart(goodness) + 20/3))
    return (
      <rect x={sectorX} y={sectorY}
       width={sectorWidth} height={sectorHeight}
       fill="#eeeef2"
       className={
        highlightId==='highlight-alignment-sector'?
        'highlighted' : ''
       }/>
    )
}