import React from 'react'
import { connect } from 'react-redux'


function StepInidicator({activeStep}) {
    return(
      <p>Current step: { activeStep }</p>
    )
}

function mapStateToProps(state) {
    return {
        activeStep: state.activeStep
    }
}

export default connect(
    mapStateToProps
)(StepInidicator)