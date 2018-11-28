import React from 'react'
import { connect } from 'react-redux'
import { easeCubicIn } from 'd3-ease'
import { CSSTransition } from 'react-transition-group'

import colors from '../colors'
import Triangle from '../RightTriangle/index'
import Svg from '../Svg'
import Scale from '../Scale'
import {
    RightTriangleDefinition, HypothenuseDefinition,
    CathetusDefinition, PythagorasFormula,
    SquareDefinintion
} from '../Definitions'
import './RightTriangleParts.css'
import { rightTrAngle, hypothenuseLen } from '../Helpers'


function SquareOnHypothenuse({trWidth, trHeight, bCoords}) {
  // todo move scale to the parent element
  const yScale = Scale([250, 0], [0, 250])
  const len = hypothenuseLen(trWidth, trHeight),
        rotateAngle = 90 - rightTrAngle(trHeight, trWidth),
        startX = bCoords.x + trWidth,
        startY = yScale(bCoords.y)
  const points = [
    [startX, startY],
    [startX + len, startY],
    [startX + len, yScale(bCoords.y + len)],
    [startX, yScale(bCoords.y + len)],
  ]
  return (
    <polyline points={points.map(el => el.join(',')).join(' ')} stroke={colors.red}
      fill="none" transform={`rotate(${-rotateAngle}, ${startX}, ${startY})`}
      strokeWidth="3px"/>
  )
}

class RightTriangleParts extends React.Component {
  constructor(props) {
    super(props)

    const changeFactor = .5
    this.width = 500
    this.height = 250
    this.initTrWidth = this.width * .7
    this.initTrHeight = this.height * .8
    this.minTrWidth = this.initTrWidth * changeFactor
    this.minTrHeight = this.initTrHeight * changeFactor
    this.trTransitionDuration = 480
    this.trTransitionFreq = 20
    this.maxALabelShift = -16
    this.state = {
      width: this.initTrWidth,
      height: this.initTrHeight,
      transitionProgress: 0,
      aLabelShift: 0,
    }

    this.animateSquare = this.animateSquare.bind(this)
  }

  componentDidUpdate(prevProps) {
    const sqareId = 'highlight-square'
    if (prevProps.highlightId !== sqareId && this.props.highlightId === sqareId) {
      clearInterval(this.animateSquareTimer)
      this.setState({transitionProgress: 0})
      this.animateSquareTimer = setInterval(
        () => this.animateSquare(false), this.trTransitionFreq
      )
    }
    if (prevProps.highlightId === sqareId && this.props.highlightId !== sqareId) {
      clearInterval(this.animateSquareTimer)
      this.animateSquareTimer = setInterval(
        () => this.animateSquare(true), this.trTransitionFreq
      )
    }
  }

  animateSquare(enlarge) {
    const shouldClear = enlarge
      ? (progress) => progress <= 0
      : (progress) => progress >= 1
    this.setState(prevState => {
      const progress = prevState.transitionProgress + (
        this.trTransitionFreq / this.trTransitionDuration
      ) * (enlarge? -1 : 1)
      const width = this.minTrWidth + (this.initTrWidth - this.minTrWidth) * easeCubicIn(1 - progress),
            height = this.minTrHeight + (this.initTrHeight - this.minTrHeight) * easeCubicIn(1 - progress),
            aLabelShift = this.maxALabelShift * easeCubicIn(progress)
      if (shouldClear(progress)) {
        clearInterval(this.animateSquareTimer)
        return {
          width: enlarge? this.initTrWidth : this.minTrWidth,
          height: enlarge? this.initTrHeight : this.minTrHeight,
        }
      }
      return {
        width: width,
        height: height,
        transitionProgress: progress,
        aLabelShift: aLabelShift,
      }})
  }

  render() {
    const paddingLeft = 80,
          defsPosition = {
            top: this.height + 40,
            left: paddingLeft - 3,
          }
    const definitions = {
        "highlight-right-triangle":
          <RightTriangleDefinition width="350px" top={defsPosition.top} left={defsPosition.left} />,
        "highlight-cathetus":
          <CathetusDefinition width="350px" top={defsPosition.top} left={defsPosition.left} color={colors.green}/>,
        "highlight-hypothenuse":
          <HypothenuseDefinition width="350px" top={defsPosition.top} left={defsPosition.left}/>,
        "highlight-square":
          <SquareDefinintion width="350px" top={defsPosition.top + 10} left={defsPosition.left}/>
    }
    // todo maybe make one element with content g
    // and padding and use scales
    const bCoords = {x: paddingLeft, y: 30}
    return (
      <div>
        <Svg width={this.width} height={this.height} style={{overflow: 'visible'}}>
            <Triangle contHeight={this.height}
              bCoords={bCoords} width={this.state.width}
              height={this.state.height}
              showRightAngle={this.props.highlightId && this.props.highlightId !== 'highlight-square'}
              aXLabelShift={this.state.aLabelShift}/>
            <CSSTransition timeout={{enter: 200, exit: 0}} in={this.state.width <= this.minTrWidth}
              classNames='square' unmountOnExit mountOnEnter appear>
                {
                  state => {
                return <SquareOnHypothenuse bCoords={bCoords}
                  trWidth={this.state.width} trHeight={this.state.height}
                  key='square'/>
                  }
                }
            </CSSTransition>
        </Svg>
        <PythagorasFormula left={160} top={this.height}
          highlightId={this.props.highlightId}/>
        {definitions[this.props.highlightId]}
      </div>
    )
  }
}


function mapStateToProps(state) {
    return {
        highlightId: state.highlightId,
    }
}

export default connect(mapStateToProps)(RightTriangleParts)