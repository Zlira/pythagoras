import React from 'react'
import {connect} from 'react-redux'

import Values from '../TestInputToCoords/Values'
import CoordPlane from '../CoordinatePlane'
import Svg from '../Svg'
import { SvgTestInputs } from '../HPTestInput/HarryPotterTest'
import AnimeWrapper from '../../AnimeWrapper'


class TestInputsToCoords extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      showTestInputs: false,
      showCoordsGrid: false,
      showValues: false,
      // todo add transition values
    }
    this.tranistionState = {
        testInputsTr: 0,
        coordGridTrVertical: 0,
        coordGridTrHorizontal: 0,
        valuesTr: 0,
    }
    this.animeTransitions = new AnimeWrapper(
      this.getTransitionConf(), this.tranistionState
    )

    this.getTransitionConf = this.getTransitionConf.bind(this)
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
          update: () => this.setState({
            testInputsTr: this.tranistionState.testInputsTr
          })
        },
        forward: {
          testInputsTr: 1,
          begin: () => this.setState({showTestInputs: true})
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
          begin: () => this.setState({showCoordsGrid: true}),
        },
        backward: {
          coordGridTrVertical: 0,
          complete: () => this.setState({showCoordsGrid: false})
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
        }
      }, {
        common: {
          targets: this.tranistionState,
          duration: 800,
          offset: '+=200',
          easing: 'linear',
          update: () => this.setState({
              valuesTr: this.tranistionState.valuesTr
          })
        },
        forward: {
          valuesTr: 1,
          begin: () => this.setState({
            showValues: true,
            showTestInputs: false,
          })
        },
        backward: {
          valuesTr: 0,
          complete: () => this.setState({
            showValues: false,
            showTestInputs: true,
          }),
          begin: () => this.setState({
            showValues: true,
            showCoordsGrid: true,
            showTestInputs: false,
          })
        }
      }
    ]
  }

  componentDidMount() {
    this.animeTransitions.runForward()
  }

  render() {
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
          {this.state.showCoordsGrid? coordGrid : null}
          {this.state.showValues? values : null}
        </g>
        {this.state.showTestInputs? testInputs : null}
      </Svg>
    )
  }
}

export default connect(
  state => ({
    lawfullness: state.lawfullness,
    goodness: state.goodness
  })
)(TestInputsToCoords)