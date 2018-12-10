import React from 'react'
import {connect} from 'react-redux'
import anime from 'animejs'
import { scaleLinear } from 'd3-scale'

import Values from '../CoordSystem/Values'
import { UlabeledPoint, PointLabel } from '../TestValuesPoint'
import { coordSystemParams, CoordSystemSVG} from '../CoordSystem/CoordSystem'
import CoordPlane from '../CoordinatePlane'
import AlignmentSector from '../CoordSystem/AlignmentSector'
import colors from '../colors'

// forward transition:
// alignment sector, values lines and points on coordinates disappear,
// values labels move from their old positions to under the combined value
// character appear one by one fading in


class CoordSystem extends React.Component {
  constructor(props) {
    super(props)

    this.transitionVals = {
      lawLabelColor: colors.blue,
      goodLableColor: colors.purple,
      labelMoveProgress: 0,
    }
    this.state = {
      ...this.transitionVals,
      fadeCoords: false,
    }
  }

  componentWillUnmount() {
    clearTimeout(this.fadeCoordsTimer)
    anime.remove(this.transitionVals)
  }

  componentDidMount() {
    this.setState({fadeCoords: false})
    this.fadeCoordsTimer = setTimeout(
      () => this.setState({fadeCoords: true}),
      10
    )
    this.transitionVals = {
      lawLabelColor: colors.blue,
      goodLableColor: colors.purple,
      labelMoveProgress: 0,
    }
    anime({
      targets: this.transitionVals,
      lawLabelColor: colors.darkGrey,
      goodLableColor: colors.darkGrey,
      labelMoveProgress: 1,
      easing: 'linear',
      duration: 500,
      update: () => this.setState({
        lawLabelColor: this.transitionVals.lawLabelColor,
        goodLableColor: this.transitionVals.goodLableColor,
        labelMoveProgress: this.transitionVals.labelMoveProgress,
      })
    })
  }

  render() {
   const {lawfullness, goodness, highlightId} = this.props
    const { width, height, xScale, yScale } = coordSystemParams()
    const fadeOutClass = this.state.fadeCoords? 'fade-out-progress': 'fade-out-appear'
    return (
      <CoordSystemSVG>
        <g className={fadeOutClass}>
          <AlignmentSector containerWidth={width} containerHeight={height}
              lawfullness={lawfullness} goodness={goodness}/>
        </g>
        <CoordPlane width={width} height={height} />
        <g className={fadeOutClass}>
          <Values width={width} height={height} lawfullness={lawfullness}
              goodness={goodness} />
        </g>
        <UlabeledPoint goodness={goodness} lawfullness={lawfullness}
          xScale={xScale} yScale={yScale}/>
        <MigratingLabels goodness={goodness} lawfullness={lawfullness}
          xScale={xScale} yScale={yScale}
          goodColor={this.state.goodLableColor}
          lawColor={this.state.lawLabelColor}
          progress={this.state.labelMoveProgress} />
        </CoordSystemSVG>
    )
  }
}

class MigratingLabels extends React.Component  {
  constructor(props) {
    super(props)
    this.lawLabelRef = React.createRef()
    this.goodLabelRef= React.createRef()
    this.textLabelRef = React.createRef()
    this.state = {
      lawLabelEndX: 0,
      goodLabelEndX: 0,
    }
    this.getMigratingLabels = this.getMigratingLabels.bind(this)
  }

  componentDidMount() {
    const lawWidth = this.lawLabelRef.current.getComputedTextLength(),
      goodWidth = this.goodLabelRef.current.getComputedTextLength(),
      textBBox = this.textLabelRef.current.getBBox()
    this.setState({
      lawLabelEndX: Math.round(textBBox.x + lawWidth / 2),
      goodLabelEndX: Math.round(textBBox.x + (textBBox.width - goodWidth) + goodWidth/2),
    })
  }

  getMigratingLabels() {
    const {
      goodness, lawfullness, xScale, yScale, progress,
      goodColor, lawColor
      } = this.props
    const xVal = xScale(lawfullness),
      yVal = yScale(goodness),
      xCenter = (xScale.range()[0] + xScale.range()[1]) / 2,
      yCenter = (yScale.range()[0] + yScale.range()[1]) / 2,
      padding = 20,
      progressScale = () => scaleLinear().domain([0 ,1]),
      lawXValScale = progressScale().range(
        [xVal, this.state.lawLabelEndX]
      ),
      lawYValRange = progressScale().range([
        yCenter + (goodness > 0? padding : -padding),
        yVal + 24,
      ]),
      goodXValScale = progressScale().range([
        xCenter + (lawfullness <= 0? padding : -padding),
        this.state.goodLabelEndX
      ]),
      goodYValRange = progressScale().range([yVal, yVal + 24])
    return (
      <g className="test-values">
        <text
          y={lawYValRange(progress)}
          x={lawXValScale(progress)} style={{fill: lawColor}}
        >
          {lawfullness}
        </text>
        <text
          x={goodXValScale(progress)}
          y={goodYValRange(progress)} style={{ fill: goodColor }}
        >
          {goodness}
        </text>
      </g>)
  }

  render() {
    const { goodness, lawfullness, xScale, yScale } = this.props
    let miratingLabels = null
    if (this.state.lawLabelEndX && this.state.goodLabelEndX) {
      miratingLabels = this.getMigratingLabels()
    }
    return (
      <>
      <g style={{opacity: 0}}>
        <g className="test-values">
          <PointLabel goodness={goodness} lawfullness={lawfullness}
            yScale={yScale} xScale={xScale}
            textRef={this.textLabelRef} lawRef={this.lawLabelRef}
            goodRef={this.goodLabelRef}
          />
        </g>
      </g>
      {miratingLabels}
      </>
    )
  }
}


export default connect(
  state => ({
    lawfullness: state.lawfullness,
    goodness: state.goodness,
    highlightId: state.highlightId,
  })
)(CoordSystem)