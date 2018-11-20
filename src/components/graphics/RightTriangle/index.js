import React from 'react'

import colors from '../colors'
import HighlightElement from '../../../containers/HighlightElement'
import '../animationKeyframes.css'
import './triangle.css'


function RightAngleSign({x, y}) {
    return (
        <g className="right-angle" transform={`translate(${x}, ${y})`}>
          <polyline points="0,0 15,0 15,15"/>
        </g>
    )
}

function Triangle({bCoords, width, height,
                   contHeight, showRightAngle=false,
                   step=0, aLabelShift=0}) {
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
    const triangleHighlightId = ['highlight-right-triangle']
    return (
        <g className='triangle'>
          {rightAngleSign}
          <HighlightElement highlightId="highlight-hypothenuse"
            otherMatchingIds={triangleHighlightId} step={step}>
            <line x2={A.x} x1={C.x} y2={A.y} y1={C.y}
                    stroke={colors.red}
                    className='hypothenuse'/>
          </HighlightElement>
          <HighlightElement highlightId="highlight-cathetus"
            otherMatchingIds={triangleHighlightId} step={step}>
            <line x1={B.x} x2={C.x} y1={B.y} y2={C.y}
                    stroke={colors.yellow}
                    className='cathetus-1'/>
          </HighlightElement>
          <HighlightElement highlightId="highlight-cathetus"
            otherMatchingIds={triangleHighlightId} step={step}>
            <line x2={A.x} x1={B.x} y2={A.y} y1={B.y}
                    stroke={colors.green}
                    className='cathetus-2'/>
          </HighlightElement>
          <g className='point-labels'>
            <text x={A.x - 1.5 + aLabelShift} y={A.y - 5}>A</text>
            <text x={B.x - 3} y={B.y + 21}>B</text>
            <text x={C.x - 10} y={C.y + 21}>C</text>
          </g>
        </g>
    )
}


export default Triangle