import React from 'react'
import {connect} from 'react-redux'
import { scaleLinear, scaleQuantize } from 'd3-scale'
import { interpolateRgb } from 'd3-interpolate'

import Values from '../CoordSystem/Values'
import { UlabeledPoint, PointLabel } from '../TestValuesPoint'
import { coordSystemParams, CoordSystemSVG} from '../CoordSystem/CoordSystem'
import CoordPlane from '../CoordinatePlane'
import AlignmentSector from '../CoordSystem/AlignmentSector'
import colors from '../colors'
import characterAlignment from '../Characters/index'
import CharacterPic from '../Characters/CharacterPic'
import AnimeWrapper from '../../AnimeWrapper'
import {startTransition, endTransition} from '../../../actions'

// forward transition:
// alignment sector, values lines and points on coordinates disappear,
// values labels move from their old positions to under the combined value
// character appear one by one fading in


class CoordsToCharacterIntro extends React.Component {
  constructor(props) {
    super(props)

    this.showCharScale = scaleQuantize()
      .domain([0, 1])
      .range([...Array(
        Object.keys(characterAlignment).length + 1
      ).keys()])
    this.transitionState = {
      labelMoveProgress: 0,
      showCharacters: 0,
      fadeCoords: 0,
    }
    this.state = {
      ...this.transitionState,
      currAnimation: undefined,
    }
    this.animeTransitions = new AnimeWrapper(
      'CoordsToCharacterIntor', this.getTransitionConf(),
      this.transitionState,
      this.props.startTransition, this.props.endTransition,
      (currAnimation) => this.setState({
        currAnimation: currAnimation
      })
    )

    this.getTransitionConf = this.getTransitionConf.bind(this)
  }

  getTransitionConf() {
    return [
      {
        common: {
          targets: this.transitionState,
          duration: 400,
          update: () => this.setState({
            fadeCoords: Math.ceil(this.transitionState.fadeCoords)
          })
        },
        forward: {
          fadeCoords: 1,
        },
        backward: {
          fadeCoords: 0,
        }
      },
      {
        common: {
          targets: this.transitionState,
          easing: 'linear',
          duration: 500,
          update: () => this.setState({
            labelMoveProgress: this.transitionState.labelMoveProgress,
          })
        },
        forward: {
          labelMoveProgress: 1,
        },
        backward: {
          labelMoveProgress: 0
        }
      }, {
        common: {
          targets: this.transitionState,
          showCharacters: 1,
          easing: 'linear',
          duration: 4000,
          update: () => this.setState({
            showCharacters: this.showCharScale(
              this.transitionState.showCharacters
            ),
          })
        },
        forward: {
          showCharacters: 1,
        },
        backward: {
          showCharacters: 0,
          duration: 800,
        }
      }
    ]
  }

  componentDidMount() {
    if (this.props.stepDirection === 'up') {
      this.animeTransitions.runBackward()
    } else {
      this.animeTransitions.runForward()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stepDirection !== this.props.stepDirection) {
      if (this.props.stepDirection === 'up') {
        this.animeTransitions.runBackward()
      } else if (this.props.stepDirection === 'down') {
        this.animeTransitions.runForward()
      }
    }
  }

  componentWillUnmount() {
    this.animeTransitions.clear()
  }

  render() {
    const {lawfullness, goodness } = this.props
    const { width, height, xScale, yScale } = coordSystemParams()
    const fadeOutClass = this.state.fadeCoords? 'fade-out-progress': 'fade-out-appear'
    return (
      <CoordSystemSVG>
        <g className={fadeOutClass}>
          <AlignmentSector containerWidth={width} containerHeight={height}
              lawfullness={lawfullness} goodness={goodness}/>
        </g>
        <CoordPlane width={width} height={height} />
        <CharacterPics xScale={xScale} yScale={yScale}
          showTill={this.state.showCharacters} />
        <g className={fadeOutClass}>
          <Values width={width} height={height} lawfullness={lawfullness}
              goodness={goodness} />
        </g>
        <UlabeledPoint goodness={goodness} lawfullness={lawfullness}
          xScale={xScale} yScale={yScale}/>
        <MigratingLabels goodness={goodness} lawfullness={lawfullness}
          xScale={xScale} yScale={yScale}
          progress={this.state.labelMoveProgress} />
      </CoordSystemSVG>
    )
  }
}


// todo move it somewhere or just use react transition group
// for this
class AppearingComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      className: 'fade-in-appear'
    }
  }

  componentWillUnmount() {
    clearTimeout(this.classUpdateTimer)
  }

  componentDidMount() {
    this.classUpdateTimer = setTimeout(
      () => this.setState({className: 'fade-in-progress'}), 10
    )
  }

  render() {
    return this.props.children(this.state.className)
  }
}


function CharacterPics({xScale, yScale, showTill=9}) {
    const imgs = []
    const chars =[...Object.entries(characterAlignment)]
    chars.sort(
       (char1, char2) => {
         const char1Vals = char1[1].vals, char2Vals = char2[1].vals
         if (char1Vals[1] !== char2Vals[1]) {
           return char2Vals[1] - char1Vals[1]
         } else {
           return char1Vals[0] - char2Vals[0]
         }
       }
    )
    for (const [name, vals] of chars.slice(0, showTill)) {
        imgs.push(
          <AppearingComponent key={name}>
            {className =>
              <CharacterPic picSrc={vals.src} alignementVals={vals.vals}
                xScale={xScale} yScale={yScale} className={className} />}
          </AppearingComponent>
        )
    }
    return (
      <g className="character-pictures">
        { imgs }
      </g>
    )
}

class MigratingLabels extends React.Component {
  constructor(props) {
    super(props)
    this.lawLabelRef = React.createRef()
    this.goodLabelRef= React.createRef()
    this.textLabelRef = React.createRef()
    this.state = {
      lawLabelEndX: 0,
      goodLabelEndX: 0,
    }
    this.goodColorInterpol = interpolateRgb(colors.purple, colors.darkGrey)
    this.lawColorInterpol = interpolateRgb(colors.blue, colors.darkGrey)

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
          x={lawXValScale(progress)}
          style={{fill: this.lawColorInterpol(progress)}}
        >
          {lawfullness}
        </text>
        <text
          x={goodXValScale(progress)}
          y={goodYValRange(progress)}
          style={{ fill: this.goodColorInterpol(progress) }}
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
  }),
  // todo these dispatch function can be simplified
  dispatch => ({
    startTransition: name => dispatch(startTransition(name)),
    endTransition: name => dispatch(endTransition(name)),
  })
)(CoordsToCharacterIntro)