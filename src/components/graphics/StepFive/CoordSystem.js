import React from 'react'

import './CoordSystem.css'
import Values from './Values'


function CoordGrid({width, height}) {
    const xGridSpacing = Math.round(width / 3),
          yGridSpacing = Math.round(height / 3)
    return (
        <g className='coord-grid'>
          <rect width={width} height={height} x='0' y='0'
          fillOpacity='0' />
          <line x1={xGridSpacing} x2={xGridSpacing} 
            y1='0' y2={height}/>
          <line x1={xGridSpacing * 2} x2={xGridSpacing * 2} 
            y1='0' y2={height}/>
          <line x1='0' x2={width} 
            y1={yGridSpacing} y2={yGridSpacing}/>
          <line x1='0' x2={width} 
            y1={yGridSpacing * 2} y2={yGridSpacing * 2}/>
        </g>
    )
}


function CoordAxes({width, height}) {
    const xPos = Math.round(width / 2),
          yPos = Math.round(height / 2)
    return (
        <g className='coord-axes'>
            <line x1={xPos} x2={xPos} y1='0' y2={height} />
            <line x1={0} x2={width} y1={yPos} y2={yPos} />
        </g>
    )
}


function CoordSystem() {
    const width = 400, height = 400,
          paddingLeft = 80, paddingTop = 30,
          svgWidth = width + 2*paddingLeft,
          svgHeight = height + 2*paddingTop
    return (
        <svg width={svgWidth} height={svgHeight}>
          <g transform={`translate(${paddingLeft}, ${paddingTop})`}>
            <CoordGrid width={width} height={height}/>
            <CoordAxes width={width} height={height}/>
            <Values width={width} height={height} />
          </g>
        </svg>
    )
}

export default CoordSystem