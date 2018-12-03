import React from 'react'

import Svg from '../Svg'
import CoordPlane from '../CoordinatePlane'
import Scale from '../Scale'
import { UserValuePoint } from '../TestValuesPoint'
// todo check the reason why import from '../Characters' doesn't work
import characterAlignment from '../Characters/index'
import CharacterPic from '../Characters/CharacterPic'


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
              xScale={xScale} yScale={yScale} key={name} />
        )
    }
    return (
        <Svg width={svgWidth} height={svgHeight}>
          <g transform={`translate(${paddingLeft}, ${paddingTop})`}>
            <CoordPlane width={width} height={height}>
              <g className='character-pictures'>
                {imgs}
              </g>
            </CoordPlane>
            <UserValuePoint xScale={xScale} yScale={yScale} />
          </g>
        </Svg>
    )
}