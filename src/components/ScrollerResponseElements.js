import React from 'react'
import { connect } from 'react-redux'

import RightTriangleParts from './graphics/RightTriangleParts'
import RightTriangleVariants from './graphics/RightTriangleVariants'
import DeathlyHallows from './graphics/StepThree/DeathlyHallows'
import HarryPotterTest from './graphics/StepFour/HarryPotterTest'
import CoordSystem from './graphics/StepFive/CoordSystem'
import CharacterIntro from './graphics/StepSix/CharectersIntro'
import ValuesDifference from './graphics/StepSeven/ValuesDifference'
import DistanceToCharacter from './graphics/StepEight/DistanceToCharacter'
import DistanceToCharacters from './graphics/StepNine/DistanceToCharacters'


function ScrollerResponseElements({ activeStep }) {
    const stepToElement = [
        <RightTriangleParts />,
        <RightTriangleVariants />,
        <DeathlyHallows />,
        <HarryPotterTest />,
        <CoordSystem />,
        <CharacterIntro />,
        <ValuesDifference />,
        <DistanceToCharacter />,
        <DistanceToCharacters/>,
    ]
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