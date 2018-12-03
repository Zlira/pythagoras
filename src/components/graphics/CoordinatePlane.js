import React from 'react'
import { scaleLinear } from 'd3-scale'

import './CoordinatePlane.css'


export function CoordGrid({width, height, transVert=1, transHoriz=1}) {
    const xGridSpacing = Math.round(width / 3),
          yGridSpacing = Math.round(height / 3),
          xScale = scaleLinear().domain([0, 1]).range([0, width]),
          yScale = scaleLinear().domain([0, 1]).range([0, height])
    const verticalLines = [...Array(4).keys()].map(
      i => <line key={'v'+ i}
            x1={xGridSpacing*i} x2={xGridSpacing*i} y1={0}
            y2={yScale(transVert)}/>
    )
    const horizontalLines = [...Array(4).keys()].map(
      i => <line key={'v' + i} x1={0} x2={xScale(transHoriz)}
            y1={yGridSpacing*i} y2={yGridSpacing*i}/>
    )
    return (
        <g className='coord-grid'>
          {verticalLines}
          {horizontalLines}
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


function CoordLabels({width, height}) {
  const padding = 20
  return (
    <g>
      <text className="axis-label" x={width/2 - 18} y={-padding}>
        Добро
      </text>
      <text className="axis-label" x={width/2 - 18} y={height + padding + 14}>
        Зло
      </text>
      <text className="axis-label" x={0 - padding} y={height/2 + 6} textAnchor="end">
        Хаос
      </text>
      <text className="axis-label" x={width + padding} y={height/2 + 6}>
        Закон
      </text>
    </g>
  )
}


export default ({
  width, height, transitioned, children, gridTransVert, gridTransHoriz
}) => {
  return (
    <g className='coord-system'>
      <CoordGrid width={width} height={height}
        transHoriz={gridTransHoriz}
        transVert={gridTransVert} />
      <CoordAxes width={width} height={height} />
      {children}
      <CoordLabels width={width} height={height} />
    </g>
  )
}