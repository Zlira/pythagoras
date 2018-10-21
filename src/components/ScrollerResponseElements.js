import React from 'react'
import { connect } from 'react-redux'

import RightTriangleParts from './graphics/RightTriangleParts'


function ScrollerResponseElements({ activeStep }) {
    const stepToElement = {
        0: <RightTriangleParts />,
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