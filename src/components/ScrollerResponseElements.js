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

    this.shouldShowTransition = this.shouldShowTransition.bind(this)
  }

  componentWillUpdate(newProps) {
    const finishedTransitions = this.props.activeTransitions.filter(
      tr => !newProps.activeTransitions.includes(tr)
    )
    this.justFinishedTransitions = finishedTransitions
  }

  shouldShowTransition() {
    // todo make it more robust using this.transitionSteps
    const { activeStep, stepDirection } = this.props
    if (this.justFinishedTransitions.length) {
      return
    }
    if (
      (activeStep === 4 && stepDirection === 'up') ||
      (activeStep === 5 && stepDirection === 'down')
    ) {
      return '4, 5'
    } else if (
      (activeStep === 5 && stepDirection === 'up') ||
      (activeStep === 6 && stepDirection === 'down')
    ) {
      return '5, 6'
    }

  }
  render() {
    const { activeStep, stepDirection } = this.props
    const staticSteps = [
      <RightTriangleParts />,
      <RightTriangleParts />,
      <RightTriangleVariants />,
      <DeathlyHallows />,
      <HarryPotterTest />,
      <CoordSystem />,
      <CharacterIntro />,
      <ValuesDifference />,
      <DistanceToCharacter />,
      <DistanceToCharacters/>,
      <CharVsChar char1="snape" char2="hermione"/>,
      <CharVsChar char1="snape" char2="harry"/>,
      <Result />,
    ]
    this.transitionSteps = {
      '4, 5': {
        component: <TestInputsToCoords stepDirection={stepDirection} />,
        name: 'TestInputsToCoords',
      },
      '5, 6': {
        component: <CoordSysToCharIntro stepDirection={stepDirection} />,
        name: 'CoordsToCharacterIntor',
      }
    }
    const transitionStep = this.shouldShowTransition()
    let comp = transitionStep
      ? this.transitionSteps[transitionStep].component
      : staticSteps[activeStep]

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