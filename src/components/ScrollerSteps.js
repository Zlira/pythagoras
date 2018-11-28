import React from 'react'
import { connect } from 'react-redux'

import ScrollerStep from './ScrollerStep'
import steps from './StepsContents'


function ScrollerSteps({ activeStep }) {
    return (
        <div className='scroller-steps'>
          {steps.map(
            (el, index) => (<ScrollerStep
                             children={el}
                             isActive={index === activeStep}/>)
          )}
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
)(ScrollerSteps)