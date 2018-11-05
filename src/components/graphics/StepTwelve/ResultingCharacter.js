import React from 'react'

import getClosestCharacter from '../Characters/closestCharacter'


// todo move this to characters maybe

export default ({lawfullness, goodness}) => {
    const closestChar = getClosestCharacter(lawfullness, goodness)
    return <span>{closestChar.ukName}</span>
}