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

export class ValuePoint extends React.Component {
  constructor(props) {
    super(props)
    this.textRef = React.createRef()
    this.state = {
      textBBox: undefined,
    }
  }

  componentDidMount() {
    this.setState({
      textBBox: this.textRef.current.getBBox()
    })
  }

  render() {
    const {goodness=0, lawfullness=0, xScale, yScale} = this.props
    let background = null
    if (this.state.textBBox) {
      const {width, height} = this.state.textBBox,
        boxPadding = 5,
        x = xScale(lawfullness) - boxPadding - width / 2,
        y = yScale(goodness) + height / 4
      background = <rect x={x} y={y} width={width + boxPadding * 2}
                     height={height} fill="white" opacity={.5}/>
    }
    return (
      <g className="test-values">
        {background}
        <UlabeledPoint goodness={goodness} lawfullness={lawfullness}
          yScale={yScale} xScale={xScale}
        />
        <PointLabel goodness={goodness} lawfullness={lawfullness}
          yScale={yScale} xScale={xScale} textRef={this.textRef}
        />
      </g>
    )
  }
}


export const UserValuePoint = connect(
    (state) => ({lawfullness: state.lawfullness, goodness: state.goodness})
)(ValuePoint)