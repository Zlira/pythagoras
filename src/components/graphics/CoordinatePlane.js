import React from 'react'
import anime from 'animejs'

import './CoordinatePlane.css'


class CoordGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      linesLengths: props.transition
        ? Array(4).fill(0)
        : Array(4).fill(props.width)
    }
  }

  componentWillUnmount() {
    anime.remove(this.linesLengths)
  }

  componentDidMount() {
    if (this.props.transition) {
      this.animateAppear()
    }
  }

  animateAppear() {
    this.linesLengths = this.state.linesLengths.map(i => ({len: i}))
    anime({
      targets: this.linesLengths,
      // todo this only works if width and height are the same
      len: this.props.width,
      delay: (el,i) => i*100,
      duration: 300,
      easing: 'easeInQuad',
      update: anim => this.setState({
        linesLengths: this.linesLengths.map(i => i.len)
      })
    })
  }

  render () {
    const {width, height} = this.props
    const xGridSpacing = Math.round(width / 3),
          yGridSpacing = Math.round(height / 3)
    const verticalLines = [...Array(4).keys()].map(
      i => <line key={'v'+ i}
            x1={xGridSpacing*i} x2={xGridSpacing*i} y1={0}
            y2={this.state.linesLengths[i]}/>
    )
    const horizontalLines = [...Array(4).keys()].map(
      i => <line key={'v' + i} x1={0} x2={this.state.linesLengths[i]}
            y1={yGridSpacing*i} y2={yGridSpacing*i}/>
    )
    return (
        <g className='coord-grid'>
          {verticalLines}
          {horizontalLines}
        </g>
    )
  }
}


function CoordAxes({width, height}) {
    const xPos = Math.round(width / 2),
          yPos = Math.round(height / 2)
    return (
        <g className='coord-axes'>
            <line x1={xPos} x2={xPos} y1='0' y2={height} />
            <line x1={0} x2={width} y1={yPos} y2={yPos} />
        </g>
    )
}


function CoordLabels({width, height}) {
  return (
    <g>
      <text x={width/2 - 18} y={-10}>Добро</text>
      <text x={width/2 - 18} y={height + 16}>Зло</text>
      <text x={0 - 5} y={height/2 + 6} textAnchor="end">Хаос</text>
      <text x={width + 5} y={height/2 + 6}>Закон</text>
    </g>
  )
}


export default ({width, height, transitioned}) => {
  return (
    <g className='coord-system'>
      <CoordGrid width={width} height={height} transition={transitioned} />
      <CoordAxes width={width} height={height} />
      <CoordLabels width={width} height={height} />
    </g>
  )
}