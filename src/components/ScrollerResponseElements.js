import React from 'react'
import { connect } from 'react-redux'

import RightTriangleParts from './graphics/RightTriangleParts/index'
import RightTriangleVariants from './graphics/RightTriangleVariants/index'
import DeathlyHallows from './graphics/DeathlyHallowsImg/index'
import HarryPotterTest from './graphics/HPTestInput/HarryPotterTest'
import CoordSystem from './graphics/TransitionSteps/TestInputsToCoords'
import CharacterIntro from './graphics/StepSix/CharectersIntro'
import ValuesDifference from './graphics/StepSeven/ValuesDifference'
import DistanceToCharacter from './graphics/StepEight/DistanceToCharacter'
import DistanceToCharacters from './graphics/StepNine/DistanceToCharacters'
import CharVsChar from './graphics/StepTen/CharacterVsCharacter'
import Result from './graphics/StepTwelve/Result'


function ScrollerResponseElements({ activeStep, stepDirection, activeTransitions }) {
    const stepToElement = [
        <RightTriangleParts />,
        <RightTriangleParts />,
        <RightTriangleVariants />,
        <DeathlyHallows />,
        <HarryPotterTest />,
        <CoordSystem stepDirection={stepDirection} />,
        <CharacterIntro />,
        <ValuesDifference />,
        <DistanceToCharacter />,
        <DistanceToCharacters/>,
        <CharVsChar char1="snape" char2="hermione"/>,
        <CharVsChar char1="snape" char2="harry"/>,
        <Result />,
    ]
    let comp = stepToElement[activeStep]
    if (
        activeStep === 4 &&
        stepDirection === 'up'
    ) {
      comp = stepToElement[activeStep + 1]
    }
    return (
          <div className="scroller-response-els">
            {comp}
          </div>
    )
}


function mapStateToProps(state) {
    return {
        activeStep: state.activeStep,
        stepDirection: state.stepDirection,
        activeTransitions: state.activeTransitions,
    }
}


export default connect(
    mapStateToProps
)(ScrollerResponseElements)