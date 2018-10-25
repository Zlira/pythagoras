import React from 'react'
import { connect } from 'react-redux'

import RightTriangleParts from './graphics/RightTriangleParts'
import RightTriangleVariants from './graphics/RightTriangleVariants'
import DeathlyHallows from './graphics/StepThree/DeathlyHallows'
import HarryPotterTest from './graphics/StepFour/HarryPotterTest'


function ScrollerResponseElements({ activeStep }) {
    const stepToElement = {
        0: <RightTriangleParts />,
        1: <RightTriangleVariants />,
        2: <DeathlyHallows />,
        3: <HarryPotterTest />,
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