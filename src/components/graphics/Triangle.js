import React from 'react'

import SupScript from './SupScript'
import colors from './colors'


function Triangle({bCoords, width, height,
                   contHeight, highlightId}) {
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

    // todo move strokeWidth to stylesheet
    // todo make a TriangleSide component
    return (
        <g className='triangle'>
            <line x1={A.x} x2={C.x} y1={A.y} y2={C.y} 
                  stroke={colors.red}
                  className={
                      highlightId === 'highlight-hypothenuse' || highlightId === 'highlight-right-triangle'
                      ? 'highlighted'
                      : ''
                    }
                  strokeWidth='3px' />
            <line x1={A.x} x2={B.x} y1={A.y} y2={B.y}
                  stroke={colors.blue}
                  className={
                    highlightId === 'highlight-cathetus' || highlightId === 'highlight-right-triangle'
                    ? 'highlighted'
                    : ''
                  }
                  strokeWidth='3px' />
            <line x1={B.x} x2={C.x} y1={B.y} y2={C.y}
                  stroke={colors.yellow}
                  className={
                    highlightId === 'highlight-cathetus' || highlightId === 'highlight-right-triangle'
                    ? 'highlighted'
                    : ''
                  }
                  strokeWidth='3px' />
            <text x={A.x} y={A.y - 5}>A</text>
            <text x={B.x} y={B.y} dominantBaseline='hanging'>B</text>
            <text x={C.x} y={C.y} dominantBaseline='hanging'>C</text>
            <text x={B.x + 45} y={B.y - 45}>
                <tspan fill={colors.blue} > AB</tspan><SupScript child='2'/> +  
                <tspan fill={colors.yellow}> BC</tspan><SupScript child='2'/> = 
                <tspan fill={colors.red}> AC</tspan><SupScript child='2'/>
            </text>
        </g>
    )
}


export default Triangle