import React from 'react'

import colors from '../colors'
import './triangle.css'


// todo move this somewhere
export function highlightClass(highlightId, idsMatchingElement) {
    return idsMatchingElement.includes(highlightId)? 'highlighted' : ''
}


function RightAngleSign({x, y}) {
    return (
        <g className="right-angle" transform={`translate(${x}, ${y})`}>
          <polyline points="0,0 15,0 15,15"/>
        </g>
    )
}

function Triangle({bCoords, width, height,
                   contHeight, highlightId, showRightAngle=false}) {
    const by = contHeight - bCoords.y
    // todo triangle side lengths should move to state
    const A = {
            x: bCoords.x, y: by - height
        },
        B = {
            x: bCoords.x, y: by
        },
        C = {
            x: bCoords.x + width, y: by
        }
    const rightAngleSign = showRightAngle
        ? <RightAngleSign x={B.x} y={B.y - 15}/>
        : null
    // todo move strokeWidth to stylesheet
    const currHighlightClass =
      idsMatchingEl => highlightClass(highlightId, idsMatchingEl)
    return (
        <g className='triangle'>
          {rightAngleSign}
          <line x1={A.x} x2={C.x} y1={A.y} y2={C.y}
                stroke={colors.red}
                className={
                    currHighlightClass(['highlight-hypothenuse', 'highlight-right-triangle'])
                  } />
          <line x1={B.x} x2={C.x} y1={B.y} y2={C.y}
                stroke={colors.yellow}
                className={
                  currHighlightClass(['highlight-cathetus', 'highlight-right-triangle'])
                } />
          <line x1={A.x} x2={B.x} y1={A.y} y2={B.y}
                stroke={colors.blue}
                className={
                  currHighlightClass(['highlight-cathetus', 'highlight-right-triangle'])
                }/>
          <g className='point-labels'>
            <text x={A.x - 1.5} y={A.y - 5}>A</text>
            <text x={B.x - 3} y={B.y + 21}>B</text>
            <text x={C.x - 10} y={C.y + 21}>C</text>
          </g>
        </g>
    )
}


export default Triangle