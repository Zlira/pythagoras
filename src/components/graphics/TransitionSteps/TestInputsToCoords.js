import React from 'react'
import anime from 'animejs'
import {connect} from 'react-redux'

import Values from '../TestInputToCoords/Values'
import CoordPlane from '../CoordinatePlane'
import Svg from '../Svg'
import { SvgTestInputs } from '../HPTestInput/HarryPotterTest'


class TestInputsToCoords extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      showTestInputs: false,
      showCoordsGrid: false,
      showValues: false,
    }
    this.tranistionState = {
        testInputsTr: 0,
        coordGridTrVertical: 0,
        coordGridTrHorizontal: 0,
        valuesTr: 0,
        running: false,
    }
  }
  componentWillUnmount() {
    anime.remove(this.tranistionState)
  }

  componentDidMount() {
    this.tl = anime.timeline({
      begin: () => {
          this.tranistionState.running = true
          this.setState({showTestInputs: true})
        },
      complete: () => {this.tranistionState.running = false},
    })
    this.tl.add({
      testInputsTr: 1,
      targets: this.tranistionState,
      elasticity: 0,
      duration: 1000,
      update: () => this.setState({
        testInputsTr: this.tranistionState.testInputsTr
      })
    }).add({
      coordGridTrVertical: 1,
      targets: this.tranistionState,
      begin: () => this.setState({showCoordsGrid: true}),
      duration: 500,
      easing: 'easeInQuad',
      update: () => this.setState({
        coordGridTrVertical: this.tranistionState.coordGridTrVertical
      })
    }).add({
      coordGridTrHorizontal: 1,
      targets: this.tranistionState,
      duration: 500,
      easing: 'easeInQuad',
      update: () => this.setState({
        coordGridTrHorizontal: this.tranistionState.coordGridTrHorizontal
      })
    }).add({
      coordGridTrHorizontal: 1,
      begin: () => this.setState({
        showValues: true,
        showTestInputs: false,
      }),
      targets: this.tranistionState,
      valuesTr: 1,
      duration: 800,
      offset: '+=200',
      easing: 'linear',
      update: () => this.setState({
          valuesTr: this.tranistionState.valuesTr
      })
    })
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