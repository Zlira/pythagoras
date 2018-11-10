import React from 'react'

import '../graphics/animationKeyframes.css'
import './pythagorasFormula.css'
import colors from '../graphics/colors'
import { highlightClass } from '../graphics/RightTriangle'


export default ({highlightId}) => {
    const currHighlightClass =
      idsMatchingEl => highlightClass(highlightId, idsMatchingEl)
    return (
      <p className="pythagoras-formula">
        <span style={{color: colors.green}}
          className={'cathetus-2 ' + currHighlightClass(['highlight-cathetus'])}>
          AB
        </span><sup>2</sup>{' + '}
        <span style={{color: colors.yellow}}
          className={'cathetus-1 ' + currHighlightClass(['highlight-cathetus'])}>
           BC
        </span><sup>2</sup>{' = '}
        <span style={{color: colors.red}}
          className={'hypothenuse ' + currHighlightClass(['highlight-hypothenuse'])}>
          AC
        </span><sup>2</sup>
      </p>
    )
}