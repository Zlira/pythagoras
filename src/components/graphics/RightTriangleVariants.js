import React from 'react'
import Draggable from 'react-draggable'
import { connect } from 'react-redux'

import Svg from './Svg'
import RightTriangle from './RightTriangle'
import DraggingIcon from './DragginigIcon'
import { Hypothenuse, Catheti } from './StepTwo/Lables'
import { setTriangleWidth, setTriangleHeight } from '../../actions'
import './RightTriangleVariants.css'
import TriangleGrids from './TriangleGrid'
import { rightTrAngle } from './Helpers'


function mapStateToProps(state) {
    return {
        trWidth: state.triangleWidth,
        trHeight: state.triangleHeight,
        highlightId: state.highlightId,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTrWidth: width => dispatch(setTriangleWidth(width)),
        setTrHeight: height => dispatch(setTriangleHeight(height)),
    }
}

// todo make vertical and horizontal into one
const DraggableHorizontal = ({
    initialWidth, x, y, setWidth, highlighted=false
}) => {
    return (
        <Draggable axis='x' onDrag={
            (e, ui) => setWidth(ui.x + initialWidth)
          } bounds={{left: -initialWidth, right: 50}}>
          <g>
            <DraggingIcon x={x} y={y} isHorizontal={true} highlighted={highlighted}/>
          </g>
        </Draggable>
    )
}


const DraggableVertical = ({
    initialHeight, x, y, setHeight, highlighted=false,
}) => {
    return (
        <Draggable axis='y' onDrag={
            (e, ui) => setHeight((-ui.y) + initialHeight)
          } bounds={{top: -20, bottom: initialHeight}}>
          <g>
            <DraggingIcon x={x} y={y} highlighted={highlighted}/>
          </g>
        </Draggable>
    )
}

// unify with lables from step 1
function Label({posSettings, children}) {
    return (
        <p className="label" style={posSettings}>{children}</p>
    )
}


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
        // fix overflow and grid
        <div className='step-2 resizible-triangle' style={{width: this.width}}>
          <Svg width={this.width} height={this.height}>
            <TriangleGrids
              containerHeight={this.height} containerWidth={this.width}
              snapLeft={this.paddingLeft} snapRight={this.paddingLeft + this.props.trWidth}
              snapBottom={this.height - this.paddingBottom}
              angle={rightTrAngle(this.props.trHeight, this.props.trWidth)}
              />
            <RightTriangle
              contHeight={this.height}
              bCoords={{x: this.paddingLeft, y: this.paddingBottom}}
              width={this.props.trWidth} height={this.props.trHeight}
              aXLabelShift={-20}
              cXLabelShift={20}
              showSideLengths />
            <DraggableHorizontal initialWidth={this.initTrWidth}
              x={this.initTrWidth + this.paddingLeft}
              y={this.height - this.paddingBottom}
              setWidth={this.props.setTrWidth}
              highlighted={this.props.highlightId === 'highlight-drag-tr-h'}/>
            <DraggableVertical initialHeight={this.initTrHeight}
              x={this.paddingLeft}
              y={this.height - this.paddingBottom - this.initTrHeight}
              setHeight={this.props.setTrHeight}
              highlighted={this.props.highlightId === 'highlight-drag-tr-v'}/>
          </Svg>
          <Label posSettings={{top: this.height + 20, right: '120px'}}>
            <Catheti />
          </Label>
          <Label posSettings={{top: this.height + 50, right: '120px'}}>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RightTriangleVariants)