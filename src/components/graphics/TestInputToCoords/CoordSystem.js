import React from 'react'
import {connect} from 'react-redux'
import anime from 'animejs'

import Values from './Values'
import CoordPlane from '../CoordinatePlane'
import Svg from '../Svg'
import { SvgTestInputs } from '../HPTestInput/HarryPotterTest'


class CoordSystem extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      show: props.stepDirection === 'down'? 'testInputs' : 'Coords',
    }
    let obj = {first: 0, second: 0}
    let running = true
    let tl = anime.timeline({
      complete: () => {running = false},
      update: e => console.log(obj.first, obj.second)
    });
    tl.add({
      targets: obj,
      first: 100,
      duration: 1000,
      easing: 'linear',
    }).add({
      targets: obj,
      easing: 'linear',
      second: 100,
      duration: 500,
    })
    setTimeout(
      () => {
        console.log('reversing', obj, running);
        if (running) {
          tl.reverse()
        } else {
          tl.direction = 'reverse'; tl.restart()
        }
      },
      800
    )
    this.timeline = {
      testInputs: 0,
      coordGird: 1000,
      values: 1500,
    }
  }

  componentWillUnmount() {
    clearTimeout(this.coordGirdTimer)
    clearTimeout(this.showValuesTimer)
  }

  // pass components durations and delays in transition prop
  componentDidMount() {
    if (this.props.stepDirection === "down") {
      this.coordGirdTimer = setTimeout(
        () => this.setState({show: 'coordGrid'}),
        this.timeline.coordGird
      )
      this.showValuesTimer = setTimeout(
        () => this.setState({show: 'values'}),
        this.timeline.values
      )
    }
  }

  render() {
    const width = 400, height = 400,
          paddingLeft = 80, paddingTop = 40,
          svgWidth = width + 2*paddingLeft,
          svgHeight = height + 2*paddingTop,
          {lawfullness, goodness} = this.props
    const testInputs = (
      <SvgTestInputs lawfullness={lawfullness}
        goodness={goodness} transition disabled key='testInput' />
    ),
    coordPlane = (
      <g transform={`translate(${paddingLeft}, ${paddingTop})`} key='coordPlane'>
        <CoordPlane width={width} height={height}
          transitioned />
      </g>
    ),
    values = (
      <g transform={`translate(${paddingLeft}, ${paddingTop})`} key='values'>
        <Values width={width} height={height} lawfullness={lawfullness}
          goodness={goodness} transition />
      </g>
    )
    let content
    switch (this.state.show) {
      case 'testInputs':
        content = testInputs
        break
      case 'coordGrid':
        content = [coordPlane, testInputs]
        break
      case 'values':
        content = [coordPlane, values]
        break
      default:
        content = [coordPlane, values]
    }
    return (
        <Svg width={svgWidth} height={svgHeight}>
         {content}
        </Svg>
    )
  }
}

export default connect(
  state => ({
    lawfullness: state.lawfullness,
    goodness: state.goodness
  })
)(CoordSystem)