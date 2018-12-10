import React from 'react'
import {connect} from 'react-redux'
import { scaleLinear } from 'd3-scale'

import Values from './Values'
import CoordPlane from '../CoordinatePlane'
import AlignmentSector from './AlignmentSector'
import Svg from '../Svg'


export function coordSystemParams() {
  const width = 400, height = 400,
    paddingLeft = 80, paddingTop = 40
  return {
    width: width,
    height: height,
    paddingLeft: paddingLeft,
    paddingTop: paddingTop,
    svgWidth: width + 2*paddingLeft,
    svgHeight: height + 2*paddingTop,
    xScale: scaleLinear().range([0, width]).domain([-10, 10]),
    yScale: scaleLinear().range([height, 0]).domain([-10, 10]),
  }
}


export function CoordSystemSVG({children}) {
  const {svgWidth, svgHeight, paddingLeft, paddingTop } = coordSystemParams()
  return (
    <Svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${paddingLeft}, ${paddingTop})`}>
        { children }
      </g>
    </Svg>
  )
}


function CoordSystem({lawfullness, goodness, highlightId}) {
    const { width, height } = coordSystemParams()
    return (
      <CoordSystemSVG>
          <AlignmentSector containerWidth={width} containerHeight={height}
            lawfullness={lawfullness} goodness={goodness}
            highlightId={highlightId}/>
          <CoordPlane width={width} height={height} />
          <Values width={width} height={height} lawfullness={lawfullness}
            goodness={goodness} />
      </CoordSystemSVG>
    )
}

export default connect(
  state => ({
    lawfullness: state.lawfullness,
    goodness: state.goodness,
    highlightId: state.highlightId,
  })
)(CoordSystem)