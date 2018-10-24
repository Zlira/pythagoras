import React from 'react'
import { connect } from 'react-redux'

import RightTriangleParts from './graphics/RightTriangleParts'
import RightTriangleVariants from './graphics/RightTriangleVariants'


function ScrollerResponseElements({ activeStep }) {
    const stepToElement = {
        0: <RightTriangleParts />,
        1: <RightTriangleVariants />,
    }
    return (
          <div className="scroller-response-els">
            {stepToElement[activeStep]}
          </div>
    )
}


function mapStateToProps(state) {
    return {
        activeStep: state.activeStep,
    }
}


export default connect(
    mapStateToProps
)(ScrollerResponseElements)