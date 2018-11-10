import React from 'react'

import ScrollerSteps from './ScrollerSteps'
import ScrollerResponseElements from './ScrollerResponseElements'


function Scroller() {
    return (
        <div className="scroller-container">
          <ScrollerResponseElements />
          <ScrollerSteps />
        </div>
    )
}


export default Scroller