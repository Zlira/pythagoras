import React from 'react'

import StepIndicator from './StepIndicator'
import ScrollerSteps from './ScrollerSteps'


function Scroller() {
    return (
        <div className="scroller-container">
          <ScrollerSteps />
          <div className="scroller-response-els">
           <StepIndicator />
          </div>
        </div>
    )
}


export default Scroller