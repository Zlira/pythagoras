import React from 'react'
import { connect } from 'react-redux'

import Svg from '../Svg'
import Scale from '../Scale'
import SelectedCharacters from '../SelectedCharacters'
import CoordPlane from '../CoordinatePlane'
import GlowFilter from '../GlowFilter'
import { ValuePoint, UserValuePoint } from '../TestValuesPoint'
import characterAlignments from '../Characters/index'
import TwoPointDistances from '../ValueSections/index'


function DistanceToCharacter({goodness, lawfullness, selectedCharacter}) {
    // todo need to make this DRY with scales and
    // transformed g
    const width = 400, height = 400,
          paddingLeft = 80, paddingTop = 40,
          svgWidth = width + 2*paddingLeft,
          svgHeight = height + 2*paddingTop,
          xScale = Scale([0, width], [-10, 10]),
          yScale = Scale([height, 0], [-10, 10]),
          selectedCharVals = characterAlignments[selectedCharacter].vals

    return (
        <Svg width={svgWidth} height={svgHeight}>
          <defs>
            <GlowFilter filterId='glow-filter'/>
          </defs>
          <g transform={`translate(${paddingLeft}, ${paddingTop})`}>
            <CoordPlane width={width} height={height}/>
            <SelectedCharacters yScale={yScale} xScale={xScale}
              selectedCharacter={selectedCharacter} />
            <UserValuePoint yScale={yScale} xScale={xScale} />
            <ValuePoint yScale={yScale} xScale={xScale}
              lawfullness={selectedCharVals[0]}
              goodness={selectedCharVals[1]}
              />
            <TwoPointDistances xScale={xScale} yScale={yScale}
              userGoodness={goodness} userLawfullness={lawfullness}
              otherLawfullness={selectedCharVals[0]} otherGoodness={selectedCharVals[1]}
              drawLines={['solid', 'solid', null, null]} diagonal={'solid'}/>
          </g>
        </Svg>
    )
}


function mapStateToProps(state) {
    return {
        lawfullness: state.lawfullness,
        goodness: state.goodness,
        selectedCharacter: state.selectedCharacter,
    }
}


export default connect(
    mapStateToProps
)(DistanceToCharacter)