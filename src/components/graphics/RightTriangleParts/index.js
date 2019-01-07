import React from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import anime from 'animejs'

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
    <polyline points={points.map(el => el.join(',')).join(' ')} stroke={colors.green}
      fill="none" transform={`rotate(${-rotateAngle}, ${startX}, ${startY})`}
      strokeWidth="4.8px"/>
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
      aLabelShift: 0,
      showSquare: false,
    }
    this.scaleTriangle = this.scaleTriangle.bind(this)
  }

  componentDidUpdate(prevProps) {
    const sqareId = 'highlight-square'
    if (prevProps.highlightId !== sqareId && this.props.highlightId === sqareId) {
      this.scaleTriangle('shrink')
    }
    if (prevProps.highlightId === sqareId && this.props.highlightId !== sqareId) {
      this.scaleTriangle('expand')
    }
  }

  scaleTriangle(direction) {
    const vars = {
      shrink: {
        thisTransitionName: 'animeRectShrink',
        oppositeTransition: this.animeRectExpand,
        targetWidth: this.minTrWidth,
        targetHeight: this.minTrHeight,
      },
      expand: {
        thisTransitionName: 'animeRectExpand',
        oppositeTransition: this.animeRectShrink,
        targetWidth: this.initTrWidth,
        targetHeight: this.initTrHeight,
      }
    }
    const {
      thisTransitionName, oppositeTransition, targetWidth, targetHeight
    } = vars[direction]
    if (oppositeTransition && !oppositeTransition.completed) {
      oppositeTransition.reverse()
    }
    if (this[thisTransitionName]) {
      this[thisTransitionName].pause()
    }
    const copiedState = {...this.state}
    this[thisTransitionName] = anime({
      targets: copiedState,
      width: targetWidth,
      height: targetHeight,
      begin: anim => {
        if (direction === 'expand') {
          this.setState(prevState => ({showSquare: false}))
        }
      },
      complete: anim => {
        if (direction === 'shrink' && !anim.reversed) {
          this.setState(prevState => ({showSquare: true}))
        }
      },
      run: anim => {
        this.setState(prevState => ({
          width: copiedState.width,
          height: copiedState.height,
        }))}
    })
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
        <Svg width={this.width} height={this.height} style={{overflow: 'visible'}}
          className={this.props.highlightId? 'fade' : ''}>
            <Triangle contHeight={this.height}
              bCoords={bCoords} width={this.state.width}
              height={this.state.height}
              showRightAngle={this.props.highlightId && this.props.highlightId !== 'highlight-square'}
              aXLabelShift={this.state.aLabelShift}/>
            <CSSTransition timeout={{enter: 200, exit: 0}} in={this.state.showSquare}
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