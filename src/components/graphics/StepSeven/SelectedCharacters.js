import React from 'react'

import CharacterPic from '../Characters/CharacterPic'
import characterAlignment from '../Characters/index'



function Characters({xScale, yScale, selectedCharacter}) {
    const imgs = []
    for (const [name, vals] of Object.entries(characterAlignment)) {
        imgs.push(
            <CharacterPic picSrc={vals.src} alignementVals={vals.vals}
                xScale={xScale} yScale={yScale}
                state={name === selectedCharacter? 'selected' : 'deselected'}
                key={name} />
        )
    }
    return <g>
        {imgs}
    </g>
}

export default Characters