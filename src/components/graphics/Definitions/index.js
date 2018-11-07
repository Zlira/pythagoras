import React from 'react'

import './definitions.css'
import colors from '../colors'


function Definition({top, left, width, children}) {
    return (
      <div style={{position: 'absolute', top: top, left: left, width: width}}
        className="graphics-definition">
        {children}
      </div>
    )
}


export function RightTriangleDefinition({top, left, width}) {
    return (<Definition top={top} left={left} width={width}>
        <p><dfn>Прямокутний трикутник</dfn> — трикутник із одним прямим кутом (90&deg;)</p>
    </Definition>)
}

export function HypothenuseDefinition({top, left, width}) {
    return (
        <Definition top={top} left={left} width={width}>
          <p><dfn style={{color: colors.red}}>Гіпотенуза</dfn> — сторона напроти прямого кута</p>
        </Definition>
    )
}


export function CathetusDefinition({top, left, width, color}) {
    return (
        <Definition top={top} left={left} width={width}>
          <p><dfn style={{color: color}}>Катет</dfn> — сторона, прилегла до прямого кута</p>
        </Definition>
    )
}
