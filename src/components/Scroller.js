import React from 'react'

import ScrollerSteps from './ScrollerSteps'
import ScrollerResponseElements from './ScrollerResponseElements'
import ScrollDown from './ScrollDown'


function Scroller() {
    return (
        <div className="scroller-container">
          <ScrollerResponseElements />
          <ScrollerSteps />
          <ScrollDown/>
        </div>
    )
}


export default Scroller