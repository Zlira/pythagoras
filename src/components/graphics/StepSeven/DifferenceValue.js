import React from 'react'

import characters from '../Characters/index'


function DifferenceValue({lawfullness, goodness, selectedCharacter, show}) {
    const [charLawfullness, charGoodness] = characters[selectedCharacter].vals
    if (show === 'goodness') {
        return <span>{goodness - charGoodness}</span>
    } else if (show === 'lawfullness') {
        return <span>{lawfullness - charLawfullness}</span>
    }

}

export default DifferenceValue