import React from 'react'
import { connect } from 'react-redux'

import getClosestCharacter from '../Characters/closestCharacter'
import './Result.css'


function Result({lawfullness, goodness}) {
    const closestChar = getClosestCharacter(lawfullness, goodness)
    return (
        <div className='test-result'>
          <img src={closestChar.src} alt={closestChar.ukName}
            width={150} height={150} />
          <span><span>{closestChar.quote}</span></span>
        </div>
    )
}


export default connect(
    state => ({
        lawfullness: state.lawfullness,
        goodness: state.goodness,
    })
)(Result)