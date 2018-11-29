import React from 'react'
import anime from 'animejs'

import Scale from '../Scale'


class Values extends React.Component {
  constructor(props) {
    super(props)
    if (props.transition) {
      this.state = {
        lawLen: 0,
        goodLen: 0,
        showPoint: false,
      }
    } else {
      this.state = {
        lawLen: this.props.lawfullness || 0,
        goodLen: this.props.goodness || 0,
        showPoint: true,
      }
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
    // nothing to transition here
    if (!this.props.lawfullness || !this.props.goodness) {
      this.setState({showPoint: true})
      return
    }
    anime({
      targets: this.copiedState,
      lawLen: this.props.lawfullness,
      goodLen: this.props.goodness,
      duration: 500,
      easing: 'easeInQuad',
      run: anim => this.setState({
        lawLen: this.copiedState.lawLen,
        goodLen: this.copiedState.goodLen,
      }),
      complete: anim => this.setState({
        ...this.copiedState,
        showPoint: true
      })
    })
  }

  render() {
    let {width, height, lawfullness, goodness} = this.props
    goodness = goodness || 0
    lawfullness = lawfullness || 0
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
            <line x1={xScale(0)} x2={xScale(this.state.lawLen)} y1={yVal} y2={yVal}
              className="axis-to-val dashed"/>
          </g>
          <g className="goodness-value">
            <line x1={xVal} x2={xVal} y1={yScale(this.state.goodLen)} y2={yCenter}
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
            { this.state.showPoint? <circle r='7' cx={xVal} cy={yVal} /> : null}
          </g>
        </g>
      )
    }
}

export default Values;