import React from 'react'

import Svg from '../Svg'
import Scale from '../Scale'
import SelectedCharacters from '../SelectedCharacters'
import CoordPlane from '../CoordinatePlane'
import GlowFilter from '../GlowFilter'
import { ValuePoint } from '../TestValuesPoint'
import characterAlignments from '../Characters/index'
import TwoPointDistances from '../ValueSections/index'


function CharVsChar({char1, char2}) {
    // todo need to make this DRY with scales and
    // transformed g
    const width = 400, height = 400,
          paddingLeft = 80, paddingTop = 40,
          svgWidth = width + 2*paddingLeft,
          svgHeight = height + 2*paddingTop,
          xScale = Scale([0, width], [-10, 10]),
          yScale = Scale([height, 0], [-10, 10]),
          char1Vals = characterAlignments[char1].vals,
          char2Vals = characterAlignments[char2].vals

    return (
        <Svg width={svgWidth} height={svgHeight}>
          <defs>
            <GlowFilter filterId='glow-filter'/>
          </defs>
          <g transform={`translate(${paddingLeft}, ${paddingTop})`}>
            <CoordPlane width={width} height={height}/>
            <SelectedCharacters yScale={yScale} xScale={xScale}
              selectedCharacters={['snape', 'hermione']} />
            <ValuePoint yScale={yScale} xScale={xScale}
              lawfullness={char1Vals[0]} goodness={char1Vals[1]}/>
            <ValuePoint yScale={yScale} xScale={xScale}
              lawfullness={char2Vals[0]} goodness={char2Vals[1]}
              />
            <TwoPointDistances xScale={xScale} yScale={yScale}
              userGoodness={char1Vals[1]} userLawfullness={char1Vals[0]}
              otherLawfullness={char2Vals[0]} otherGoodness={char2Vals[1]}
              drawLines={['solid', 'solid', null, null]} diagonal={'solid'}/>
          </g>
        </Svg>
    )
}


export default CharVsChar