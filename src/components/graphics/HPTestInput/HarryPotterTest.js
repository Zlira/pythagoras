import React from 'react'
import Draggable from 'react-draggable'
import { connect } from 'react-redux'

import { setLawfullness, setGoodness } from '../../../actions'
import Scale from '../Scale'
import Svg from '../Svg'
import './HarryPotterTest.css'


export function SvgTestInputs({
  lawfullness, goodness, setLawfullness, setGoodness, highlightId,
  disabled=false, transitioned=false
}) {
  console.log('rendering svg test inputs', transitioned)
  const inputLen = 400,
        // todo maybe range and domain are mixed up in this function
        xScale = Scale([0, inputLen], [-10, 10]),
        reverseScale = Scale([-10, 10], [-inputLen/2, inputLen/2])
  return (
    <g>
      <g
        className={
          "coord-axes test-input lawfullness"
          + (highlightId === "highlight-input-law"? " highlighted" : "")
          + (transitioned? " transitioned" : "")
        }
        >
        <InputTrack
          minLabel="Хаос" maxLabel="Закон" x={80} y={30} width={400} />
        <InputThumb scale={xScale} reverseScale={reverseScale}
          value={lawfullness} disabled={disabled}
          onChange={setLawfullness} className="lawfullness-value" />
      </g>
      <g
        className={
          "coord-axes test-input goodness"
          + (highlightId === "highlight-input-good"? " highlighted" : "")
          + (transitioned? " transitioned" : "")
        }
        >
        <InputTrack
          minLabel="Зло" maxLabel="Добро" x={80} y={90} width={400}
          rotateLabels={transitioned}/>
        <InputThumb scale={xScale} reverseScale={reverseScale}
          value={goodness} disabled={disabled}
          onChange={setGoodness}
          className="goodness-value"
          />
      </g>
    </g>
  )
}

function InputTrack({minLabel, maxLabel, width, rotateLabels=false}) {
  const textLabelY = -10
  return (
    // todo don't use this class, move style somewhere else
    <>
      <line x1={0} y1={0} x2={width} y2={0} />
      <text x={0} y={textLabelY} transform={
        rotateLabels? `rotate(90, ${0}, ${textLabelY})`: ''
      }>{minLabel}</text>
      <text x={width} y={textLabelY}
        textAnchor={rotateLabels? "middle" : "end"}
        transform={rotateLabels? `rotate(90, ${width}, ${textLabelY})` : ''}>
          {maxLabel}
      </text>
    </>
  )
}


class InputThumb extends React.Component {
  constructor(props) {
    super(props)
    this.initialVal = this.props.value
  }

  render() {
    const {onChange, value, scale, reverseScale, className, disabled} = this.props
    const step = Math.round(scale(1) - scale(0))
    return <g className={className + " test-values"}>
      <line x1={scale(0)} x2={scale(value)} y1={0} y2={0} />
      <text x={scale(value)} y={20}>{value}</text>
      <Draggable axis='x' onDrag={(e, ui) => {
          onChange(reverseScale(Math.round((ui.x) / step) * step) + this.initialVal)
        }}
        bounds={{left: scale(-10) - scale(this.initialVal),
                right: scale(10) - scale(this.initialVal)}}
        grid={[step, step]}
        disabled={disabled}>
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
    const width=500, height=150
    return (
      <div>
      <Svg width={width} height={height}>
        <ConnectedSvgInputs />
      </Svg>
      </div>
    )
}