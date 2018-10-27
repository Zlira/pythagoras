// tood make one wrapper element that handles
// lawfullness and goodness and combine this with
// the value from step 5
import React from 'react'
import { connect } from 'react-redux'

export default connect(
    (state) => ({lawfullness: state.lawfullness, goodness: state.goodness})
)(
    ({goodness=0, lawfullness=0, xScale, yScale}) => {
        const xVal = xScale(lawfullness),
              yVal = yScale(goodness)
        return (
            <g>
                <circle cx={xVal} cy={yVal} r="10" stroke="white" fillOpacity={0}/>
                <text x={xVal} y={yVal + 30} textAnchor="middle">
                  {`${lawfullness}, ${goodness}`}
                </text>
            </g>
        )
    }
)