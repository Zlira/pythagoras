import React from 'react'

import CoordPlane from '../CoordinatePlane'
import Scale from '../Scale'
import UserValue from './UserValue'

import bellatrix from '../../../imgs/characters/bellatrix.png'
import filch from '../../../imgs/characters/filch.png'
import fred_and_george from '../../../imgs/characters/fred_and_george.png'
import harry from '../../../imgs/characters/harry.png'
import hermione from '../../../imgs/characters/hermione.png'
import lockhart from '../../../imgs/characters/lockhart.png'
import snape from '../../../imgs/characters/snape.png'
import umbridge from '../../../imgs/characters/umbridge.png'
import voldemort from '../../../imgs/characters/voldemort.png'


const characterAlignment = {
    'fred_and_george': {src: fred_and_george, vals: [-10, 10]},
    'harry': {src: harry, vals: [0, 10]},
    'hermione': {src: hermione, vals: [10, 10]},
    'lockhart': {src: lockhart, vals: [-10, 0]},
    'spane': {src: snape, vals: [0, 0]},
    'filch': {src: filch, vals: [10, 0]},
    'bellatrix': {src: bellatrix, vals: [-10, -10]},
    'voldemort': {src: voldemort, vals: [0, -10]},
    'umbridge': {src: umbridge, vals: [10, -10]},
}


function CharacterPic({picSrc, alignementVals, xScale, yScale}) {
    const picWidth = 80 
    return (
        <image href={picSrc} x={xScale(alignementVals[0]) - picWidth/2}
          y={yScale(alignementVals[1]) - picWidth/2} width={picWidth} 
          height={picWidth}/>
    )
}


export default () => {
    const width = 400, height = 400,
          paddingLeft = 80, paddingTop = 40,
          svgWidth = width + 2*paddingLeft,
          svgHeight = height + 2*paddingTop,
          xScale = Scale([0, width], [-10, 10]),
          yScale = Scale([height, 0], [-10, 10])
    const imgs = []

    for (const [name, vals] of Object.entries(characterAlignment)) {
        imgs.push(
            <CharacterPic picSrc={vals.src} alignementVals={vals.vals}
              xScale={xScale} yScale={yScale} key={name}/>
        )
    }
    return (
        <svg width={svgWidth} height={svgHeight} xmlns="http://www.w3.org/2000/svg">
          <g transform={`translate(${paddingLeft}, ${paddingTop})`}>
            <CoordPlane width={width} height={height}/>
            <g className='character-pictures'>
              {imgs}
            </g>
            <UserValue xScale={xScale} yScale={yScale} />
          </g>
        </svg>
    )
}