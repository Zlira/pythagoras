import React from 'react'
// todo maybe shun react-draggable altogether and just 
// overlay a transparent range input on the triangle
import Draggable from 'react-draggable'
import { connect } from 'react-redux'

import ResizableTriangle from './ResizableTriangle'
import { setTriangleWidth, setTriangleHeight } from '../../actions'

// todo make vertical and horizontal into one
const DraggableHorizontal = connect()(({ initialWidth, x, y, dispatch }) => {
    // todo add bounds
    // todo when component mounts fire one event to set triange width to initialWidth
    return (
        <Draggable axis='x' onDrag={
            (e, ui) => dispatch(setTriangleWidth(ui.x + initialWidth))
          }>
          <circle r='10' cx={x} cy={y} fill='white' />
        </Draggable>
    )
})

const DraggableVertical = connect()(({ initialHeight, x, y, dispatch }) => {
    // todo add bounds
    // todo when component mounts fire one event to set triange width to initialWidth
    return (
        <Draggable axis='y' onDrag={
            (e, ui) => dispatch(setTriangleHeight((-ui.y) + initialHeight))
          }>
          <circle r='10' cx={x} cy={y} fill='white' />
        </Draggable>
    )
})


function RightTriangleVariants() {
    const width = 500,
          height = 350,
          triangleWidth = width * .7,
          triangleHeight = height * .8,
          padding = 20
    return (
        <svg width={width} height={height}>
            <ResizableTriangle contHeight={height} bCoords={{x: padding, y: padding}}
              width={triangleWidth} height={triangleHeight} />
            <DraggableHorizontal initialWidth={triangleWidth} 
              x={triangleWidth + padding} 
              y={height - padding} />
            <DraggableVertical initialHeight={triangleHeight} 
              x={padding} 
              y={height - padding - triangleHeight} />
        </svg>
    )
}

export default RightTriangleVariants