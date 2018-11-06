import React from 'react'

import CharacterPic from './Characters/CharacterPic'
import characterAlignment from './Characters/index'



function Characters({xScale, yScale, selectedCharacters, handleClick}) {
    const imgs = []
    for (const [name, vals] of Object.entries(characterAlignment)) {
        imgs.push(
            <CharacterPic picSrc={vals.src} alignementVals={vals.vals}
                xScale={xScale} yScale={yScale}
                name={name}
                state={selectedCharacters.includes(name)? 'selected' : 'deselected'}
                key={name} handleClick={handleClick}/>
        )
    }
    return <g>
        {imgs}
    </g>
}

export default Characters