import React from 'react'

import CurrentStep from '../containers/CurrentStep'
import ScrollamaStep from './ScrollamaStep'


function Scroller() {
    return (
        <div className="scroller-container">
          <div className="scroller-steps">
            <ScrollamaStep children={'1'}/>
            <ScrollamaStep children={'2'}/>
            <ScrollamaStep children={'3'}/>
            <ScrollamaStep children={'4'}/>
          </div>
          <div className="scroller-response-els">
           <CurrentStep />
          </div>
        </div>
    )
}


export default Scroller