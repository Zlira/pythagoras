import React from 'react'
import { connect } from 'react-redux'

const colors = {
    red: '#d12200',
    green: '#759800',
    blue: '#2d719d',
    yellow: '#f29b00',
}

function SupScript({child}) {
    // this contains an ugly hack for dealing with
    // superscript in ff
    return (
        <tspan>
          <tspan dy="-10" fontSize=".8em">{child}</tspan>
          <tspan dy="+10"> </tspan>
        </tspan>
    )
}

function Triangle({contWidth, contHeight, highlightId}) {
    const padding = 20
    // todo triangle side length should move to state
    const A = {
            x: padding, y: contHeight * .2 - padding
        },
        B = {
            x: padding, y: contHeight - padding
        },
        C = {
            x: contWidth * .7 + padding, y: contHeight - padding
        }

    // todo move strokeWidth to stylesheet
    // todo make a TriangleSide component
    return (
        <g className='triangle'>
            <line x1={A.x} x2={C.x} y1={A.y} y2={C.y} 
                  stroke={colors.red}
                  className={
                      highlightId === 'highlight-hypothenuse' || highlightId === 'highlight-right-triangle'
                      ? 'highlighted'
                      : ''
                    }
                  strokeWidth='3px' />
            <line x1={A.x} x2={B.x} y1={A.y} y2={B.y}
                  stroke={colors.blue}
                  className={
                    highlightId === 'highlight-cathetus' || highlightId === 'highlight-right-triangle'
                    ? 'highlighted'
                    : ''
                  }
                  strokeWidth='3px' />
            <line x1={B.x} x2={C.x} y1={B.y} y2={C.y}
                  stroke={colors.yellow}
                  className={
                    highlightId === 'highlight-cathetus' || highlightId === 'highlight-right-triangle'
                    ? 'highlighted'
                    : ''
                  }
                  strokeWidth='3px' />
            <text x={A.x} y={A.y - 5}>A</text>
            <text x={B.x} y={B.y} dominantBaseline='hanging'>B</text>
            <text x={C.x} y={C.y} dominantBaseline='hanging'>C</text>
            <text x={B.x + 45} y={B.y - 45}>
                <tspan fill={colors.blue} > AB</tspan><SupScript child='2'/> +  
                <tspan fill={colors.yellow}> BC</tspan><SupScript child='2'/> = 
                <tspan fill={colors.red}> AC</tspan><SupScript child='2'/>
            </text>
        </g>
    )
}


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