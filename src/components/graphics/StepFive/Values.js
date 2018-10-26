import React from 'react'
import { connect } from 'react-redux'

import Scale from '../Scale'


function Values({width, height, lawfullness=0, goodness=0}) {
    const xCenter = Math.round(width / 2),
          yCenter = Math.round(height / 2),
          xScale = Scale([0, width], [-10, 10]),
          yScale = Scale([height, 0], [-10, 10]),
          xVal = xScale(lawfullness),
          yVal = yScale(goodness)
    // todo refactor this mess
    return (
        <g className="test-values">
          <g className="lawfullness-value">
            <line x1={xScale(0)} x2={xVal} y1={yCenter} y2={yCenter}/>
            <line x1={xScale(0)} x2={xVal} y1={yVal} y2={yVal}
              className="axis-to-val"/>
            <circle r={6} cx={xVal} cy={yCenter}/>
            <text y={yCenter+ (goodness > 0? 20 : -20)}
              x={xVal}>{lawfullness}</text>
          </g>
          <g className="goodness-value">
            <line x1={xCenter} x2={xCenter} y1={yVal} y2={yCenter}/>
            <line x1={xVal} x2={xVal} y1={yVal} y2={yCenter}
              className="axis-to-val"/>
            <circle r={6} cx={xCenter} cy={yVal}/>
            <text 
              y={yVal} 
              x={xCenter + (lawfullness > 0? -20 : 20)}>
              {goodness}
            </text>
          </g>
          <g className='combined-value'>
            <circle r='10' cx={xVal} cy={yVal} />
          </g>
        </g>
    )

}

export default connect(
    (state) => ({
        lawfullness: state.lawfullness,
        goodness: state.goodness,
    })
)(Values)