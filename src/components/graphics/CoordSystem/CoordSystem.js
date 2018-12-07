import React from 'react'
import {connect} from 'react-redux'

import Values from './Values'
import CoordPlane from '../CoordinatePlane'
import AlignmentSector from './AlignmentSector'
import Svg from '../Svg'


function CoordSystem({lawfullness, goodness, highlightId}) {
    const width = 400, height = 400,
          paddingLeft = 80, paddingTop = 40,
          svgWidth = width + 2*paddingLeft,
          svgHeight = height + 2*paddingTop
    return (
        <Svg width={svgWidth} height={svgHeight}>
          <g transform={`translate(${paddingLeft}, ${paddingTop})`} key='values'>
            <AlignmentSector containerWidth={width} containerHeight={height}
              lawfullness={lawfullness} goodness={goodness}
              highlightId={highlightId}/>
            <CoordPlane width={width} height={height} />
            <Values width={width} height={height} lawfullness={lawfullness}
              goodness={goodness} />
          </g>
        </Svg>
    )
}

export default connect(
  state => ({
    lawfullness: state.lawfullness,
    goodness: state.goodness,
    highlightId: state.highlightId,
  })
)(CoordSystem)