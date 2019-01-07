import React from 'react'

import { hypothenuseLen, pxToUnitsFixed } from '../Helpers'
import HighlightElement from '../../../containers/HighlightElement'
import './triangle.css'


// todo actually use this in other places
export const defaultTriangleSize = {
  width: 500 * .7,
  height: 250 * .8,
}

function RightAngleSign({x, y}) {
    return (
        <g className="right-angle" transform={`translate(${x}, ${y})`}>
          <polyline points="0,0 15,0 15,15"/>
        </g>
    )
}

function Triangle({bCoords, width, height,
                   contHeight, showRightAngle=false,
                   showSideLengths=false,
                   step=0, aXLabelShift=0, cXLabelShift=0}) {
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
    const sideLengths = showSideLengths
      ? (
          <g>
              <text x={B.x - 7} y={B.y-height/2} className="side-len cathetus-2">
                {pxToUnitsFixed(height)}
              </text>
              <text x={B.x+width/2} y={B.y + 20} className="side-len cathetus-1">
                {pxToUnitsFixed(width)}
              </text>
              <text x={B.x+width/2 + 7} y={B.y-height/2} className="side-len hypothenuse">
                {pxToUnitsFixed(hypothenuseLen(width, height))}
              </text>
          </g>
      )
      : null
    return (
        <g className='triangle'>
          {rightAngleSign}
          <HighlightElement highlightId="highlight-hypothenuse"
            otherMatchingIds={triangleHighlightId} step={step}>
            <line x2={A.x} x1={C.x} y2={A.y} y1={C.y}
                    className='hypothenuse'/>
          </HighlightElement>
          <HighlightElement highlightId="highlight-cathetus"
            otherMatchingIds={triangleHighlightId} step={step}>
            <line x1={B.x} x2={C.x} y1={B.y} y2={C.y}
                    className='cathetus-1'/>
          </HighlightElement>
          <HighlightElement highlightId="highlight-cathetus"
            otherMatchingIds={triangleHighlightId} step={step}>
            <line x2={A.x} x1={B.x} y2={A.y} y1={B.y}
                    className='cathetus-2'/>
          </HighlightElement>
          <g className='point-labels'>
            <text x={A.x - 1.5 + aXLabelShift} y={A.y - 5}>A</text>
            <text x={B.x - 3} y={B.y + 21}>B</text>
            <text x={C.x - 10 + cXLabelShift} y={C.y + 21}>C</text>
          </g>
          {sideLengths}
        </g>
    )
}


export default Triangle