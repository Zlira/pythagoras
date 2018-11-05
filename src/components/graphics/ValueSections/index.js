import React from 'react'

import './index.css'


function VerticalLine({dashed, x, y1, y2}) {
    const className = 'goodness-value' + (
        dashed? ' dashed' : ''
    )
    return (
      <line x1={x} x2={x} y1={y1} y2={y2}
        className={className}/>
    )
}

function HorizontalLine({dashed, x1, x2, y}) {
    const className = 'lawfullness-value' + (
        dashed? ' dashed' : ''
    )
    return (
      <line x1={x1} x2={x2} y1={y} y2={y}
        className={className}/>
    )
}


function DiagonalLine({dashed, x1, x2, y1, y2}) {
    const className = 'distance-value' + (
        dashed? ' dashed' : ''
    )
    return (
      <line x1={x1} x2={x2} y1={y1} y2={y2}
        className={className}/>
    )
}


function TwoPointDistances({
    drawLines, userLawfullness, userGoodness,
    otherLawfullness, otherGoodness,
    xScale, yScale, diagonal=null,
}) {
    const xVal1 = xScale(userLawfullness),
      yVal1 = yScale(userGoodness),
      xVal2 = xScale(otherLawfullness),
      yVal2 = yScale(otherGoodness),
      lines = []
    let dashed, yVal, xVal
    for (const i of drawLines.keys()) {
        if (!drawLines[i]) { continue }
        dashed = drawLines[i] === 'dashed'
        if (!(i % 2)) {
            yVal = i === 0? yVal1 : yVal2
            lines.push(
              <HorizontalLine y={yVal} x1={xVal1} x2={xVal2}
                dashed={dashed} key={'line' + i}/>
            )
        }
        else {
            xVal = i === 1? xVal2 : xVal1
            lines.push(
              <VerticalLine x={xVal} y1={yVal1} y2={yVal2}
                dashed={dashed} key={'line' + i}/>
            )
        }
    }
    if (diagonal) {
        lines.push(
            <DiagonalLine x1={xVal1} y1={yVal1} x2={xVal2}
              y2={yVal2} dashed={diagonal === 'dashed'}
              key={'line_diagonal'}/>
        )
    }
    return (
        <g className="test-values">
            {lines}
        </g>
    )
}

export default TwoPointDistances