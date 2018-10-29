import React from 'react'


function CharacterPic({picSrc, alignementVals, xScale, yScale, state='normal'}) {
    const picWidth = 80
    return (
        <image href={picSrc}
          x={xScale(alignementVals[0]) - picWidth/2}
          y={yScale(alignementVals[1]) - picWidth/2} width={picWidth}
          height={picWidth}
          opacity={state === 'deselected'? .35 : 1}
          filter={state === 'selected'? 'url(#glow-filter)' : null}
          />
    )
}


export default CharacterPic