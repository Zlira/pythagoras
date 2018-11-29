import React from 'react'
import Draggable from 'react-draggable'
import { connect } from 'react-redux'
import anime from 'animejs'

import { setLawfullness, setGoodness } from '../../../actions'
import Scale from '../Scale'
import Svg from '../Svg'


/* TODO move this kind of animated behavior to a HOC */
export class LafullnessInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      translateX: 80,
      translateY: 30,
    }
    this.animateAppear = this.animateAppear.bind(this)
  }

  componentWillUnmount() {
    anime.remove(this.copiedState)
  }

  componentDidMount(prevProps) {
    if (this.props.transition) {
      this.animateAppear()
    }
  }

  animateAppear() {
    this.copiedState = {...this.state}
    this.animation = anime({
      targets: this.copiedState,
      translateY: 240,
      elasticity: 0,
      run: anim => this.setState(prevState => ({
        translateY: this.copiedState.translateY,
      }))
    })
  }

  render() {
    const {
      highlightId, xScale, reverseScale,
      lawfullness, disabled, updateLawfullness
    } = this.props
    const {translateX, translateY} = this.state
  return (
    <g
      transform={`translate(${translateX}, ${translateY})`}
      className={
        "coord-axes test-input lawfullness"
        + (highlightId === "highlight-input-law"? " highlighted" : "")
      }
      >
      <InputTrack
        minLabel="Хаос" maxLabel="Закон" width={400} />
      <InputThumb scale={xScale} reverseScale={reverseScale}
        value={lawfullness} disabled={disabled}
        onChange={updateLawfullness} className="lawfullness-value" />
    </g>
  )
}
}


export class GoodnessInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      translateX: 80,
      translateY: 90,
      rotate: 0,
    }
    this.animateAppear = this.animateAppear.bind(this)
  }

  componentDidMount() {
    if (this.props.transition) {
      this.animateAppear()
    }
  }

  componentWillUnmount() {
    anime.remove(this.copiedState)
  }

  animateAppear() {
    this.copiedState = {...this.state}
    this.animation = anime({
      targets: this.copiedState,
      rotate: -90,
      translateY: 240,
      elasticity: 0,
      run: anim => {
        this.setState(prevState => ({
          rotate: this.copiedState.rotate,
          translateY: this.copiedState.translateY,
        }))
      }
    })
  }

  render() {
    const {
      highlightId, xScale, reverseScale,
      goodness, disabled, updateGoodness
    } = this.props
    const {translateX, translateY, rotate} = this.state
    return (
      <g
        transform={
          `translate(${translateX}, ${translateY}) rotate(${rotate}, 200, 0)`
        }
        className={
          "coord-axes test-input goodness"
          + (highlightId === "highlight-input-good"? " highlighted" : "")
        }
        >
        <InputTrack
          minLabel="Зло" maxLabel="Добро" width={400}
          rotateLabels={rotate}/>
        <InputThumb scale={xScale} reverseScale={reverseScale}
          value={goodness} disabled={disabled}
          onChange={updateGoodness}
          className="goodness-value"
          rotateLabel={rotate}
          />
      </g>
    )
  }
}

export function SvgTestInputs({
  lawfullness, goodness, setLawfullness, setGoodness, highlightId,
  disabled=false, transition=false
}) {
  const inputLen = 400,
        // todo maybe range and domain are mixed up in this function
        xScale = Scale([0, inputLen], [-10, 10]),
        reverseScale = Scale([-10, 10], [-inputLen/2, inputLen/2])
  return (
    <g>
      <LafullnessInput lawfullness={lawfullness} xScale={xScale}
        reverseScale={reverseScale} updateLawfullness={setLawfullness}
        highlightId={highlightId} transition={transition}
        disabled={disabled} />
      <GoodnessInput goodness={goodness} xScale={xScale}
        reverseScale={reverseScale} updateGoodness={setGoodness}
        highlightId={highlightId} transition={transition}
        disabled={disabled} />
    </g>
  )
}

function InputTrack({minLabel, maxLabel, width, rotateLabels=0}) {
  const textLabelY = 6
  return (
    // todo don't use this class, move style somewhere else
    <>
      <line x1={0} y1={0} x2={width} y2={0} />
      <text x={-5} y={textLabelY}
        textAnchor="end"
        transform={`rotate(${-rotateLabels}, ${-12}, ${textLabelY - 5})`}>
        {minLabel}
      </text>
      <text x={width + 5} y={textLabelY}
        textAnchor="start"
        transform={rotateLabels? `rotate(90, ${width + 20}, ${textLabelY - 10})` : ''}>
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
    const {
      onChange, value, scale, reverseScale, className, disabled,
    } = this.props
    let rotateLabel = this.props.rotateLabel
    const step = Math.round(scale(1) - scale(0))
    if (!rotateLabel) {rotateLabel = 0}
    return <g className={className + " test-values"}>
      <line x1={scale(0)} x2={scale(value)} y1={0} y2={0} />
      <text x={scale(value)} y={20}
        transform={`rotate(${-rotateLabel}, ${scale(value)}, 20)`}
      >
        {value}
      </text>
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
    const width=560, height=150
    return (
      <div>
      <Svg width={width} height={height}>
        <ConnectedSvgInputs />
      </Svg>
      </div>
    )
}