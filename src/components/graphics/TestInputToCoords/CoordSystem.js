import React from 'react'
import {connect} from 'react-redux'
import { Transition } from 'react-transition-group'

import Values from './Values'
import CoordPlane from '../CoordinatePlane'
import Svg from '../Svg'
import { SvgTestInputs } from '../HPTestInput/HarryPotterTest'


class CoordSystem extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      show: props.stepDirection === 'down'? 'testInputs' : 'Coords',
      inputsTransitioning: false,
    }

  }

  componentDidMount() {
    /*
    this.changeTimer = setTimeout(
      () => this.setState({show: 'coords'}), 1000)
    */
  }

  render() {
    const width = 400, height = 400,
          paddingLeft = 80, paddingTop = 40,
          svgWidth = width + 2*paddingLeft,
          svgHeight = height + 2*paddingTop,
          {lawfullness, goodness} = this.props
    const content = this.state.show === 'testInputs'
      // todo add a class for disabled inputs to change cursor
      ? <Transition in={true} timeout={20} appear>
          {state => {
            return <SvgTestInputs lawfullness={lawfullness}
            goodness={goodness} transitioned={
              state === 'entered'
            }
            disabled />}}
        </Transition>
      : <g transform={`translate(${paddingLeft}, ${paddingTop})`}>
          <CoordPlane width={width} height={height}/>
          <Values width={width} height={height} />
        </g>
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