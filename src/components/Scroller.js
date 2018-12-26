import React from 'react'

import ScrollerSteps from './ScrollerSteps'
import ScrollerResponseElements from './ScrollerResponseElements'
import ScrollController from './ScrollController'


function Scroller() {
    return (
      <div className="scroller-container">
        <ScrollerResponseElements />
        <ScrollerSteps />
        <ScrollController/>
      </div>
    )
}


export default Scroller