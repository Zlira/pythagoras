import React from 'react'
import { connect } from 'react-redux'

import RightTriangleParts from './graphics/RightTriangleParts/index'
import RightTriangleVariants from './graphics/RightTriangleVariants/index'
import DeathlyHallows from './graphics/DeathlyHallowsImg/index'
import HarryPotterTest from './graphics/HPTestInput/HarryPotterTest'
import TestInputsToCoords from './graphics/TransitionSteps/TestInputsToCoords'
import CoordSystem from './graphics/CoordSystem/CoordSystem'
import CharacterIntro from './graphics/StepSix/CharectersIntro'
import CoordSysToCharIntro from './graphics/TransitionSteps/CoordsToCharacterInro'
import ValuesDifference from './graphics/StepSeven/ValuesDifference'
import DistanceToCharacter from './graphics/StepEight/DistanceToCharacter'
import DistanceToCharacters from './graphics/StepNine/DistanceToCharacters'
import CharVsChar from './graphics/StepTen/CharacterVsCharacter'
import Result from './graphics/StepTwelve/Result'


class ScrollerResponseElements extends React.Component {
  constructor(props) {
    super(props)
    this.justFinishedTransitions = []
  }
  componentWillUpdate(newProps) {
    const finishedTransitions = this.props.activeTransitions.filter(
      tr => !newProps.activeTransitions.includes(tr)
    )
    this.justFinishedTransitions = finishedTransitions
  }
  render() {
    const { activeStep, stepDirection } = this.props
    const stepToElement = [
        <RightTriangleParts />,
        <RightTriangleParts />,
        <RightTriangleVariants />,
        <DeathlyHallows />,
        <HarryPotterTest />,
        <TestInputsToCoords stepDirection={stepDirection} />,
        // <CharacterIntro />,
        <CoordSysToCharIntro />,
        <ValuesDifference />,
        <DistanceToCharacter />,
        <DistanceToCharacters/>,
        <CharVsChar char1="snape" char2="hermione"/>,
        <CharVsChar char1="snape" char2="harry"/>,
        <Result />,
    ]
    let comp = stepToElement[activeStep]
    // todo clean up the mess
    if (
        activeStep === 4 &&
        stepDirection === 'up' &&
        !this.justFinishedTransitions.includes('TestInputsToCoords')
    ) {
      comp = stepToElement[activeStep + 1]
    }
    if (
      activeStep === 5 &&
      (stepDirection === 'up' ||
       this.justFinishedTransitions.includes('TestInputsToCoords'))
    ) {
      comp = <CoordSystem />
    }
    return (
          <div className="scroller-response-els">
            {comp}
          </div>
    )
  }
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