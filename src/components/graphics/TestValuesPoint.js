// tood make one wrapper element that handles
// lawfullness and goodness and combine this with
// the value from step 5
import React from 'react'
import { connect } from 'react-redux'

export function UlabeledPoint({
  goodness=0, lawfullness=0, xScale, yScale
}) {
  return (<g className="combined-value">
    <circle r='7' cx={xScale(lawfullness)}
      cy={yScale(goodness)} />
  </g>)
}


export function PointLabel({
  goodness=0, lawfullness=0, xScale, yScale,
  textRef=null, lawRef=null, goodRef=null
}) {
  const xVal = xScale(lawfullness),
        yVal = yScale(goodness)
  return (
    <text x={xVal} y={yVal + 24} fontWeight='bold' ref={textRef}>
      <tspan ref={lawRef}>{lawfullness}</tspan>
      <tspan>{', '}</tspan>
      <tspan ref={goodRef}>{goodness}</tspan>
    </text>
  )
}

export function ValuePoint({goodness=0, lawfullness=0, xScale, yScale}) {
    return (
      // todo maybe add a white semitrnasparent background to the
      // text
      <g className="test-values">
        <UlabeledPoint goodness={goodness} lawfullness={lawfullness}
          yScale={yScale} xScale={xScale}
        />
        <PointLabel goodness={goodness} lawfullness={lawfullness}
          yScale={yScale} xScale={xScale}
        />
      </g>
    )
}


export const UserValuePoint = connect(
    (state) => ({lawfullness: state.lawfullness, goodness: state.goodness})
)(ValuePoint)