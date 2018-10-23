import React from 'react'
import { connect } from 'react-redux'

import GlowFilter from './GlowFilter'
import colors from './colors'
import Triangle from './Triangle'



function RightTriangleDefinition() {
    return (
        <text>
            <tspan fontWeight="bold">Прямокутний трикутник</tspan> — трикутник із 
            <tspan x="0" dy='1.5em'>одним прямим кутом (90&deg;)</tspan>
        </text>
    )
}


function CathetusDefinition() {
    // todo think what to do with this
    const color = Math.random() > .5? colors.blue : colors.yellow
    return (
        <text>
            <tspan fontWeight="bold" fill={color}>
                Катет
            </tspan> — сторона, прилегла до прямого кута
        </text>
    )
}


function HypothenuseDefinition() {
    return (
        <text>
            <tspan fontWeight="bold" fill={colors.red}>
                Гіпотенуза
            </tspan> — сторона напроти прямого кута
        </text>
    )
}


function RightTriangleParts({ highlightId }) {
    const width = 500,
          height = 250
    const definitions = {
        "highlight-right-triangle": <RightTriangleDefinition/>,
        "highlight-cathetus": <CathetusDefinition/>,
        "highlight-hypothenuse": <HypothenuseDefinition/>,
    }
    return (
      <svg width={width} height={height}>
        <defs>
          <GlowFilter filterId='highlight-glow-filter' />
        </defs>
        <Triangle contWidth={width} contHeight={height} highlightId={highlightId} />
        <g className='definition'
           transform="translate(135, 60)">
            {definitions[highlightId] || null}
        </g>
      </svg>
    )
}


function mapStateToProps(state) {
    return {
        highlightId: state.highlightId,
    }
}

export default connect(mapStateToProps)(RightTriangleParts)