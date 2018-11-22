import React from 'react'
import Draggable from 'react-draggable'
import { connect } from 'react-redux'

import { setLawfullness, setGoodness } from '../../../actions'
import Scale from '../Scale'
import Svg from '../Svg'

function SvgTestInputs({
  lawfullness, goodness, setLawfullness, setGoodness, highlightId
}) {
  const width = 500, height=250,
        inputLen = 400,
        // todo maybe range and domain are mixed up in this function
        xScale = Scale([0, inputLen], [-10, 10]),
        reverseScale = Scale([-10, 10], [-inputLen/2, inputLen/2])
  // todo make inputs highlightable elements
  return (
    <Svg width={width} height={height}>
      <g transform={`translate(${80}, ${30})`}
        className={"coord-axes " + (highlightId === "highlight-input-law"? "highlighted" : "")}
        >
        <InputTrack
          minLabel="Хаос" maxLabel="Закон" x={80} y={30} width={400} />
        <InputThumb scale={xScale} reverseScale={reverseScale}
          value={lawfullness}
          onChange={setLawfullness} className="lawfullness-value" />
      </g>
      <g transform={`translate(${80}, ${90})`}
        className={"coord-axes " + (highlightId === "highlight-input-good"? "highlighted" : "")}
        >
        <InputTrack
          minLabel="Зло" maxLabel="Добро" x={80} y={90} width={400} />
        <InputThumb scale={xScale} reverseScale={reverseScale}
          value={goodness}
          onChange={setGoodness}
          className="goodness-value"
          />
      </g>
    </Svg>
  )
}

function InputTrack({minLabel, maxLabel, width}) {
  const textLabelY = -10
  return (
    // todo don't use this class, move style somewhere else
    <>
      <line x1={0} y1={0} x2={width} y2={0} />
      <text x={0} y={textLabelY}>{minLabel}</text>
      <text x={width} y={textLabelY} textAnchor="end">{maxLabel}</text>
    </>
  )
}


class InputThumb extends React.Component {
  constructor(props) {
    super(props)
    this.initialVal = this.props.value
  }

  render() {
    const {onChange, value, scale, reverseScale, className} = this.props
    const step = Math.round(scale(1) - scale(0))
    return <g className={className + " test-values"}>
      <line x1={scale(0)} x2={scale(value)} y1={0} y2={0} />
      <text x={scale(value)} y={20}>{value}</text>
      <Draggable axis='x' onDrag={(e, ui) => {
          onChange(reverseScale(Math.round((ui.x) / step) * step) + this.initialVal)
        }}
        bounds={{left: scale(-10) - scale(this.initialVal),
                right: scale(10) - scale(this.initialVal)}}
        grid={[step, step]}>
        <circle r={6} cx={scale(this.initialVal)} cy={0} fill="black"/>
      </Draggable>
    </g>
  }
}

const ConnectedSvgInputs = connect(
  (state) => ({
    goodness: state.goodness,
    lawfullness: state.lawfullness,
    highlightId: state.highlightId,
  }),
  (dispatch) => ({
    setGoodness: val => dispatch(setGoodness(val)),
    setLawfullness: val => dispatch(setLawfullness(val))
  })
)(SvgTestInputs)


export default () => {
    return (
      <div>
        <ConnectedSvgInputs />
      </div>
    )
}