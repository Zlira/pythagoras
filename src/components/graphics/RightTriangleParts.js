import React from 'react'
import { connect } from 'react-redux'

import GlowFilter from './GlowFilter'
import colors from './colors'
import Triangle from './RightTriangle/index'
import PythagorasFormula from './PythagorasFormula'
import Svg from './Svg'
import { RightTriangleDefinition, HypothenuseDefinition, CathetusDefinition} from './Definitions/'


function RightTriangleParts({ highlightId }) {
    const width = 500,
          height = 250
    const definitions = {
        "highlight-right-triangle":
          <RightTriangleDefinition width="350px" top="0px" left="180px" />,
        "highlight-cathetus":
          <CathetusDefinition width="350px" top="0px" left="180px" color={colors.blue}/>,
        "highlight-hypothenuse":
          <HypothenuseDefinition width="350px" top="0px" left="180px"/>,
    }
    // todo maybe make one element with content g
    // and padding
    return (
      <div>
        <Svg width={width} height={height}>
            <defs>
              <GlowFilter filterId='highlight-glow-filter' />
            </defs>
            <Triangle contHeight={height} highlightId={highlightId}
              bCoords={{x: 80, y: 30}} width={width * .7}
              height={height * .8} />
            <PythagorasFormula x={125} y={height - 65} />
        </Svg>
        {definitions[highlightId]}
      </div>
    )
}


function mapStateToProps(state) {
    return {
        highlightId: state.highlightId,
    }
}

export default connect(mapStateToProps)(RightTriangleParts)