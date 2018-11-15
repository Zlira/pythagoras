import React from 'react'


function DraggingIcon({x, y, isHorizontal=false}) {
    let height = 30,
      width = 16
    if (isHorizontal) {
        [width, height] = [height, width]
    }
    const points = [
          [0, -height/2], [width/2, 0], [0, height/2], [-width/2, 0]
      ]
    const middleLinePoints = isHorizontal
      ? [points[0], points[2]]
      : [points[1], points[3]]
    return (
        <g transform={`translate(${x}, ${y})`}>
          <polygon points={points.map(el => el.join(',')).join(' ')}
              fill='#0883ff' stroke='rgb(241, 241, 241)' stroke-width='2px'/>
          <line x1={middleLinePoints[0][0]} x2={middleLinePoints[1][0]}
              y1={middleLinePoints[0][1]} y2={middleLinePoints[1][1]}
              stroke='rgb(241, 241, 241)' stroke-width='2px'/>
        </g>
    )
}

export default DraggingIcon