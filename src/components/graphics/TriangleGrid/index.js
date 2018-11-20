import React from 'react'

import './TriangleGrid.css'

const pxPerUnit = 40

function getLines(linesStart, linesEnd, lenToCover, changingCoordName) {
    const repeatingCoordName = changingCoordName === 'x'? 'y' : 'x'
    return [...Array(
        Math.ceil(lenToCover / pxPerUnit)
    ).keys()].map(
        chCoord => <line {...{
            [repeatingCoordName + '1']: linesStart,
            [repeatingCoordName + '2']: linesEnd,
            [changingCoordName + '1']: chCoord * pxPerUnit,
            [changingCoordName + '2']: chCoord * pxPerUnit,
            key: chCoord
        }}/>
    )

}

function Grid({orientation='vertical', containerHeight, containerWidth, snapToValue=0}) {
    const linesStart = 0,
      [linesEnd, lenToCover, changingCoordName] = orientation === 'vertical'
      ? [containerHeight, containerWidth, 'x']
      : [containerWidth, containerHeight, 'y']
    const lines = getLines(linesStart, linesEnd, lenToCover, changingCoordName)
    const nearestToSnap = Math.round(snapToValue / pxPerUnit) * pxPerUnit
    const transform = orientation === 'vertical'
      ? `translate(${snapToValue - nearestToSnap}, 0)`
      : `translate(0, ${snapToValue - nearestToSnap})`
    return (
        <g className={"tr-grid " + orientation} transform={transform}>
            {lines}
        </g>
    )
}

export function RotatedGrid({angle, containerHeight, containerWidth, snapToX, snapToY}) {
    return (
        <g className="tr-grid-rotated" transform={
            `rotate(${angle}, ${snapToX}, ${snapToY}) translate(-200, -200)`
        }>
          <Grid containerHeight={containerHeight * 4} containerWidth={containerWidth * 4}
            snapToValue={snapToX}/>
        </g>
    )
}

export default Grid