import React from 'react'

import characterAlignments from '../Characters/index'


export default ({grCase, selectedCharacter}) => {
    if (!selectedCharacter) {return ''}
    const attrName = 'ukName' + (grCase? grCase : '')
    return (
        <span>{characterAlignments[selectedCharacter][attrName] + ' '}</span>
    )
}