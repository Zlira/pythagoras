import React from 'react'

import CurrentStep from './CurrentStep'
import StepUpdateButton from './StepUpdateButton'


function Stepper() {
    return <div>
        <CurrentStep/>
        <StepUpdateButton />
    </div>
}

export default Stepper