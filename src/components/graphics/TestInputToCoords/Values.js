import React from 'react'
import { scaleLinear } from 'd3-scale'


function Values({
  width, height, lawfullness=0, goodness=0, transition=1
}) {
    const xCenter = Math.round(width / 2),
          yCenter = Math.round(height / 2),
          xScale = scaleLinear().domain([-10, 10]).range([0, width]),
          yScale = scaleLinear().domain([-10, 10]).range([height, 0]),
          xVal = xScale(lawfullness),
          yVal = yScale(goodness)
    // todo refactor this mess
    return (
        <g className="test-values">
          <g className="lawfullness-value">
            <line x1={xScale(0)} x2={xScale(lawfullness * transition)} y1={yVal} y2={yVal}
              className="axis-to-val dashed"/>
          </g>
          <g className="goodness-value">
            <line x1={xVal} x2={xVal} y1={yScale(goodness * transition)} y2={yCenter}
              className="axis-to-val dashed"/>
          </g>
          <g className="lawfullness-value">
            <line x1={xScale(0)} x2={xVal} y1={yCenter} y2={yCenter}/>
            <circle r={6} cx={xVal} cy={yCenter}/>
            <text y={yCenter+ (goodness > 0? 20 : -20)}
              x={xVal}>{lawfullness}</text>
          </g>
          <g className="goodness-value">
            <line x1={xCenter} x2={xCenter} y1={yVal} y2={yCenter}/>
            <circle r={6} cx={xCenter} cy={yVal}/>
            <text
              y={yVal}
              x={xCenter + (lawfullness > 0? -20 : 20)}>
              {goodness}
            </text>
          </g>
          <g className='combined-value'>
            { transition === 1? <circle r='7' cx={xVal} cy={yVal} /> : null}
          </g>
        </g>
      )
}

export default Values;