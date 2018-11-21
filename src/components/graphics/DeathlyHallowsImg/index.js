import React from 'react'

import dhLogo from '../../../imgs/deathly_hallows.svg'
import { CSSTransition } from 'react-transition-group'
import './DeathlyHallowsImg.css'


export default () => {
    return (
      <div>
        <CSSTransition timeout={200} classNames="dh-img" appear in>
          <img src={dhLogo} style={{position: 'relative', left: '80px'}}
            alt="Смертельні реліквії" width="405px"/>
        </CSSTransition>
      </div>
    )
}