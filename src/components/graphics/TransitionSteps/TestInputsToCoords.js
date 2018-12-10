import React from 'react'
import {connect} from 'react-redux'

import Values from '../CoordSystem/Values'
import CoordPlane from '../CoordinatePlane'
import Svg from '../Svg'
import { SvgTestInputs } from '../HPTestInput/HarryPotterTest'
import AnimeWrapper from '../../AnimeWrapper'
import {startTransition, endTransition} from '../../../actions'


class TestInputsToCoords extends React.Component {
  constructor(props) {
    super(props)
    this.tranistionState = {
        testInputsTr: 0,
        coordGridTrVertical: 0,
        coordGridTrHorizontal: 0,
        valuesTr: 0,
    }
    this.state ={
      ...this.tranistionState,
      currAnimation: undefined,
    }
    this.animeTransitions = new AnimeWrapper(
      'TestInputsToCoords', this.getTransitionConf(),
      this.tranistionState, this.props.startTranistion,
      this.props.endTransition,
      (currAnimation) => this.setState({
        currAnimation: currAnimation
      })
    )

    this.getTransitionConf = this.getTransitionConf.bind(this)
    this.getVisibilityFromCurrAnimation = this.getVisibilityFromCurrAnimation.bind(this)
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

  getTransitionConf() {
    return [
      {
        common: {
          targets: this.tranistionState,
          elasticity: 0,
          duration: 1000,
          update: () => {
            this.setState({
              testInputsTr: this.tranistionState.testInputsTr
            })
          }
        },
        forward: {
          testInputsTr: 1,
        },
        backward: {
          testInputsTr: 0,
        }
      }, {
        common: {
          targets: this.tranistionState,
          duration: 500,
          easing: 'easeInQuad',
          update: () => this.setState({
            coordGridTrVertical: this.tranistionState.coordGridTrVertical
          })
        },
        forward: {
          coordGridTrVertical: 1,
        },
        backward: {
          coordGridTrVertical: 0,
          duration: 200,
        },
      }, {
        common: {
          targets: this.tranistionState,
          duration: 500,
          easing: 'easeInQuad',
          update: () => this.setState({
            coordGridTrHorizontal: this.tranistionState.coordGridTrHorizontal
          })
        },
        forward: {
          coordGridTrHorizontal: 1,
        },
        backward: {
          coordGridTrHorizontal: 0,
          duration: 200,
        }
      }, {
        common: {
          targets: this.tranistionState,
          duration: 800,
          easing: 'linear',
          update: () => this.setState({
              valuesTr: this.tranistionState.valuesTr
          })
        },
        forward: {
          valuesTr: 1,
          offset: '+=200',
        },
        backward: {
          valuesTr: 0,
          duration: 200,
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

  getVisibilityFromCurrAnimation() {
    // todo maybe this can be a little more concise
    switch (this.state.currAnimation) {
      case 'testInputsTr':
        return {
          showCoordsGrid: false,
          showTestInputs: true,
          showValues: false,
        }
      case 'coordGridTrVertical':
        return {
          showCoordsGrid: true,
          showTestInputs: true,
          showValues: false,
        }
      case 'coordGridTrHorizontal':
        return {
          showCoordsGrid: true,
          showTestInputs: true,
          showValues: false,
        }
      case 'valuesTr':
        return {
          showCoordsGrid: true,
          showTestInputs: false,
          showValues: true
        }
      default:
        if (this.props.stepDirection === 'up') {
          return {
            showValues: true,
            showCoordsGrid: true,
            showTestInputs: false,
        }} else {
            return {
            showCoordsGrid: false,
            showTestInputs: true,
            showValues: false
            }
          }
        }
    }


  render() {
    const {
      showValues, showCoordsGrid, showTestInputs
    } = this.getVisibilityFromCurrAnimation(
      this.state.currAnimation
    )
    const width = 400, height = 400,
          paddingLeft = 80, paddingTop = 40,
          svgWidth = width + 2*paddingLeft,
          svgHeight = height + 2*paddingTop,
          {lawfullness, goodness} = this.props
    const testInputs = (
      <SvgTestInputs lawfullness={lawfullness}
        goodness={goodness}
        transition={this.state.testInputsTr}
        disabled />
    ),
    coordGrid = (
      <CoordPlane width={width} height={height}
        gridTransVert={this.state.coordGridTrVertical}
        gridTransHoriz={this.state.coordGridTrHorizontal}
        />
    ),
    values = (
      <Values width={width} height={height}
        lawfullness={lawfullness}
        goodness={goodness}
        transition={this.state.valuesTr} />
    )
    return (
      <Svg width={svgWidth} height={svgHeight}>
        <g transform={`translate(${paddingLeft}, ${paddingTop})`} key='coordPlane'>
          {showCoordsGrid? coordGrid : null}
          {showValues? values : null}
        </g>
        {showTestInputs? testInputs : null}
      </Svg>
    )
  }
}

export default connect(
  state => ({
    lawfullness: state.lawfullness,
    goodness: state.goodness
  }),
  dispatch => ({
    startTranistion: name => dispatch(startTransition(name)),
    endTransition: name => dispatch(endTransition(name)),
  })
)(TestInputsToCoords)