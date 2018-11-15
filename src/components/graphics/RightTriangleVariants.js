import React from 'react'
// todo maybe shun react-draggable altogether and just
// overlay a transparent range input on the triangle
import Draggable from 'react-draggable'
import { connect } from 'react-redux'

import Svg from './Svg'
import RightTriangle from './RightTriangle'
import DraggingIcon from './DragginigIcon'
import { Hypothenuse, Catheti } from './StepTwo/Lables'
import { setTriangleWidth, setTriangleHeight } from '../../actions'
import './resizibleTriangle.css'


function mapStateToProps(state) {
    return {
        trWidth: state.triangleWidth,
        trHeight: state.triangleHeight,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTrWidth: width => dispatch(setTriangleWidth(width)),
        setTrHeight: height => dispatch(setTriangleHeight(height)),
    }
}

// todo make vertical and horizontal into one
const DraggableHorizontal = ({ initialWidth, x, y, setWidth }) => {
    // todo add bounds
    // todo when component mounts fire one event to set triange width to initialWidth
    return (
        <Draggable axis='x' onDrag={
            (e, ui) => setWidth(ui.x + initialWidth)
          } bounds={{left: -initialWidth, right: 50}}>
          <g>
            <DraggingIcon x={x} y={y} isHorizontal={true}/>
          </g>
        </Draggable>
    )
}


const DraggableVertical = ({ initialHeight, x, y, setHeight}) => {
    // todo add bounds
    // todo when component mounts fire one event to set triange width to initialWidth
    return (
        <Draggable axis='y' onDrag={
            (e, ui) => setHeight((-ui.y) + initialHeight)
          } bounds={{top: -20, bottom: initialHeight}}>
          <g>
            <DraggingIcon x={x} y={y}/>
          </g>
        </Draggable>
    )
}


function Label({posSettings, children}) {
    return (
        <p className="label" style={posSettings}>{children}</p>
    )
}


// fix bugs with sliders
// create new slider icon
// use appropriate cursor style to that sliders
// (maybe add a grid)

class RightTriangleVariants extends React.Component {
    constructor(props) {
        super(props)
        // todo dry with prev steps
        this.width = 500
        this.height = 250
        this.initTrWidth = this.width * .7
        this.initTrHeight = this.height * .8
        this.paddingLeft = 80
        this.paddingBottom = 30
    }

    componentDidMount() {
        //if (this.props.trHeight == null && this.props.trWidth == null) {
        this.props.setTrHeight(this.initTrHeight)
        this.props.setTrWidth(this.initTrWidth)
        //}
    }

    render() {
        return (
        // todo maybe wrap all steps in divs whit step-n class?
        // but this is step-3 now
        // todo use yScale insted of contHeight for Triangle
        <div className='step-2 resizible-triangle' style={{width: this.width}}>
          <Svg width={this.width} height={this.height}>
              <RightTriangle
                contHeight={this.height}
                bCoords={{x: this.paddingLeft, y: this.paddingBottom}}
                width={this.props.trWidth} height={this.props.trHeight} />
              <DraggableHorizontal initialWidth={this.initTrWidth}
                x={this.initTrWidth + this.paddingLeft}
                y={this.height - this.paddingBottom}
                setWidth={this.props.setTrWidth}/>
              <DraggableVertical initialHeight={this.initTrHeight}
                x={this.paddingLeft}
                y={this.height - this.paddingBottom - this.initTrHeight}
                setHeight={this.props.setTrHeight} />
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
}

// todo make a transition of the formula to concrete values from
// step 1 to step 2
// todo make a grid to be able to measure the length visually
// todo explain what the units are
    // todo fix a bug: after moving the sliders, going to the next (or prev) step, and
    // returning to this one again the triangle 'remembers' the changes to the width and
    // height but the sliders are at their default positions

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RightTriangleVariants)