import React from 'react'
import { scaleLinear } from 'd3-scale'

import './TriangleGrid.css'
import { degreesToRad } from '../Helpers'

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

export function Grid({orientation='vertical', containerHeight, containerWidth, snapToValue=0}) {
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


export function RotatedGrid({angle=0, containerHeight, containerWidth, snapToX, snapToY}) {
    const angleRad = degreesToRad(angle),
      rightAngle = degreesToRad(90)
    const x1 = snapToX + snapToY / Math.tan(rightAngle - angleRad),
          x2 = x1 - containerHeight / Math.tan(rightAngle - angleRad),
          horDistBetweenLines = pxPerUnit/Math.cos(angleRad),
          numLinesToRight = Math.floor((containerWidth - x2) / pxPerUnit),
          numLinesToLeft = Math.floor(x1/pxPerUnit),
          lines = [],
          scale = (scaleLinear().domain([0, containerWidth])
                                .range([0, containerWidth])
                                .clamp(true))
    for (let i=-numLinesToLeft; i < numLinesToRight; i++) {
      let lx1 = x1 + i*horDistBetweenLines,
        lx2 = x2 + i*horDistBetweenLines,
        ly2 = containerHeight / (1 + (scale(lx2) - lx2) / (lx1 - scale(lx2)) ),
        ly1 = containerHeight / (1 + (scale(lx1) - lx2) / (lx1 - scale(lx1)) )
      lines.push(
        <line x1={scale(lx1)}
          x2={scale(lx2)} y1={ly1} y2={ly2}
          key={i}
        />
      )
    }
    return <g className="tr-grid rotated">{lines}</g>
}


function Grids({containerHeight, containerWidth, angle, snapRight, snapLeft, snapBottom}) {
    return (
        <g>
          <Grid orientation='vertical'
              containerHeight={containerHeight} containerWidth={containerWidth}
              snapToValue={snapLeft} />
          <Grid orientation='horizontal'
              containerHeight={containerHeight} containerWidth={containerWidth}
              snapToValue={snapBottom} />
          <RotatedGrid
              angle={angle}
              containerHeight={containerHeight}
              containerWidth={containerWidth}
              snapToX={snapRight}
              snapToY={snapBottom}/>
        </g>
    )
}

export default Grids