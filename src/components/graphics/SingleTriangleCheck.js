import React from 'react'

import Triangle from './RightTriangle/index'
import Svg from './Svg'
import {PythagorasFormula} from './Definitions'
import TriangleGrid from './TriangleGrid'
import { rightTrAngle } from './Helpers';


function SingleTriangleCheck() {
  const width = 500,
    height = 250,
    trWidth = width * .7,
    trHeight = height * .8,
    paddingLeft = 80,
    paddingBottom = 30,
    bCoords = {x: paddingLeft, y: paddingBottom}
    return (<div className="resizible-triangle">
      <Svg width={width} height={height}>
        <TriangleGrid
          containerHeight={height}
          containerWidth={width}
          snapLeft={paddingLeft}
          snapRight={paddingLeft + trWidth}
          snapBottom={height - paddingBottom}
          angle={rightTrAngle(trHeight, trWidth)}
        />
        <Triangle
          contHeight={height} bCoords={bCoords}
          width={trWidth} height={trHeight}
          showSideLengths
        />
      </Svg>
      <PythagorasFormula left={160} top={height + 10}/>
    </div>)

}


export default SingleTriangleCheck