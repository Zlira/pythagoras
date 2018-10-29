import React from 'react'
// todo maybe shun react-draggable altogether and just
// overlay a transparent range input on the triangle
import Draggable from 'react-draggable'
import { connect } from 'react-redux'

import Svg from './Svg'
import ResizableTriangle from './ResizableTriangle'
import { Hypothenuse, Catheti } from './StepTwo/Lables'
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


function Label({posSettings, children}) {
    return (
        <p className="label" style={posSettings}>{children}</p>
    )
}

// todo make a transition of the formula to concrete values from
// step 1 to step 2
// todo make a grid to be able to measure the length visually
// todo explain what the units are
function RightTriangleVariants() {
    const width = 500,
          height = 350,
          triangleWidth = width * .7,
          triangleHeight = height * .8,
          paddingLeft = 20,
          paddingBottom = 20
    // todo fix a bug: after moving the sliders, going to the next (or prev) step, and
    // returning to this one again the triangle 'remembers' the changes to the width and
    // height but the sliders are at their default positions
    return (
        <div className='step-2' style={{width: width}}>
          <Svg width={width} height={height}>
              <ResizableTriangle
                contHeight={height}
                bCoords={{x: paddingLeft, y: paddingBottom}}
                width={triangleWidth} height={triangleHeight} />
              <DraggableHorizontal initialWidth={triangleWidth}
                x={triangleWidth + paddingLeft}
                y={height - paddingBottom} />
              <DraggableVertical initialHeight={triangleHeight}
                x={paddingLeft}
                y={height - paddingBottom - triangleHeight} />
          </Svg>
          <Label posSettings={{top: '80px', right: '120px'}}>
            <Catheti />
          </Label>
          <Label posSettings={{top: '40px', right: '120px'}}>
            <Hypothenuse />
          </Label>
        </div>
    )
}

export default RightTriangleVariants