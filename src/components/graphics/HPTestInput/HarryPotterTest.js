import React from 'react'
import Draggable from 'react-draggable'
import { connect } from 'react-redux'

import { LawfullnessInput, GoodnessInput } from './TestInput'
import { setLawfullness, setGoodness } from '../../../actions'
import Scale from '../Scale'
import Svg from '../Svg'

function SvgTestInputs({
  lawfullness, goodness, setLawfullness, setGoodness,
}) {
  const width = 500, height=250,
        inputLen = 400,
        // todo maybe range and domain are mixed up in this function
        xScale = Scale([0, inputLen], [-10, 10]),
        reverseScale = Scale([-10, 10], [-inputLen/2, inputLen/2])
  // todo make inputs highlightable elements
  return (
    <Svg width={width} height={height}>
      <g transform={`translate(${80}, ${30})`} className="coord-axes">
        <InputTrack
          minLabel="Хаос" maxLabel="Закон" x={80} y={30} width={400} />
        <InputThumb scale={xScale} reverseScale={reverseScale}
          value={lawfullness}
          onChange={setLawfullness} />
      </g>
      <g transform={`translate(${80}, ${90})`} className="coord-axes">
        <InputTrack
          minLabel="Зло" maxLabel="Добро" x={80} y={90} width={400} />
        <InputThumb scale={xScale} reverseScale={reverseScale}
          value={goodness}
          onChange={setGoodness}
          />
      </g>
    </Svg>
  )
}

function InputTrack({minLabel, maxLabel, width}) {
  const textLabelY = -8, numLabelY = 18
  return (
    // todo don't use this class, move style somewhere else
    <>
      <line x1={0} y1={0} x2={width} y2={0} />
      <text x={0} y={textLabelY}>{minLabel}</text>
      <text x={0} y={numLabelY}>{-10}</text>
      <text x={width} y={textLabelY} textAnchor="end">{maxLabel}</text>
      <text x={width} y={numLabelY} textAnchor="end">{10}</text>
    </>
  )
}


class InputThumb extends React.Component {
  constructor(props) {
    super(props)
    this.initialVal = this.props.value
  }

  render() {
    const {onChange, scale, reverseScale} = this.props
    const step = Math.round(scale(1) - scale(0))
    return <>
      <Draggable axis='x' onDrag={(e, ui) => {
          console.log(ui)
          console.log(this.initialVal)
          onChange(reverseScale(Math.round((ui.x) / step) * step) + this.initialVal)
        }}
        bounds={{left: scale(-10) - scale(this.initialVal),
                right: scale(10) - scale(this.initialVal)}}
        grid={[step, step]}>
        <circle r={6} cx={scale(this.initialVal)} cy={0} fill="black"/>
      </Draggable>
    </>
  }
}

const ConnectedSvgInputs = connect(
  (state) => ({
    goodness: state.goodness,
    lawfullness: state.lawfullness,
  }),
  (dispatch) => ({
    setGoodness: val => dispatch(setGoodness(val)),
    setLawfullness: val => dispatch(setLawfullness(val))
  })
)(SvgTestInputs)

// todo dispatch events for setting lawfullness and
// goodness to 0 at the start
export default () => {
    return (
      <div>
        <ConnectedSvgInputs />
        <form style={{position: 'relative', left: '80px'}}>
          <p>Слухняність</p>
          <LawfullnessInput className='lawfullness' />
          <p>Добрість</p>
          <GoodnessInput className='goodness' />
        </form>
      </div>
    )
}