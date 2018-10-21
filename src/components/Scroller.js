import React from 'react'

import ScrollerSteps from './ScrollerSteps'
import ScrollerResponseElements from './ScrollerResponseElements'


function Scroller() {
    return (
        <div className="scroller-container">
          <ScrollerSteps />
          <ScrollerResponseElements />
        </div>
    )
}


export default Scroller