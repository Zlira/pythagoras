import React from 'react'

import './TestValues.css'
import Values from './Values'
import CoordPlane from '../CoordinatePlane'


function CoordSystem() {
    const width = 400, height = 400,
          paddingLeft = 80, paddingTop = 40,
          svgWidth = width + 2*paddingLeft,
          svgHeight = height + 2*paddingTop
    return (
        <svg width={svgWidth} height={svgHeight} xmlns="http://www.w3.org/2000/svg">
          <g transform={`translate(${paddingLeft}, ${paddingTop})`}>
            <CoordPlane width={width} height={height}/>
            <Values width={width} height={height} />
          </g>
        </svg>
    )
}

export default CoordSystem