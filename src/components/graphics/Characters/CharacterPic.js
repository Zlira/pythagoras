import React from 'react'


function CharacterPic({picSrc, alignementVals, name, xScale, yScale, state='normal',
                       handleClick=null, className}) {
    const picWidth = 80
    return (
        <image href={picSrc}
          x={xScale(alignementVals[0]) - picWidth/2}
          y={yScale(alignementVals[1]) - picWidth/2} width={picWidth}
          id={name}
          height={picWidth}
          opacity={state === 'deselected'? .35 : 1}
          filter={state === 'selected'? 'url(#glow-filter)' : null}
          onClick={handleClick}
          className={className}
          />
    )
}


export default CharacterPic