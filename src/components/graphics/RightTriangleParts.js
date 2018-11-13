import React from 'react'
import { connect } from 'react-redux'

import colors from './colors'
import Triangle from './RightTriangle/index'
import Svg from './Svg'
import {
    RightTriangleDefinition, HypothenuseDefinition,
    CathetusDefinition, PythagorasFormula
} from './Definitions/'


function RightTriangleParts({ highlightId }) {
    const width = 500,
          height = 250,
          paddingLeft = 80,
          defsPosition = {
            top: height + 36,
            left: paddingLeft - 3,
          }
    const definitions = {
        "highlight-right-triangle":
          <RightTriangleDefinition width="350px" top={defsPosition.top} left={defsPosition.left} />,
        "highlight-cathetus":
          <CathetusDefinition width="350px" top={defsPosition.top} left={defsPosition.left} color={colors.green}/>,
        "highlight-hypothenuse":
          <HypothenuseDefinition width="350px" top={defsPosition.top} left={defsPosition.left}/>,
    }
    // todo maybe make one element with content g
    // and padding and use scales
    return (
      <div>
        <Svg width={width} height={height}>
            <Triangle contHeight={height} highlightId={highlightId}
              bCoords={{x: paddingLeft, y: 30}} width={width * .7}
              height={height * .8}
              showRightAngle={highlightId}/>
        </Svg>
        <PythagorasFormula left={160} top={height - 10} highlightId={highlightId}/>
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