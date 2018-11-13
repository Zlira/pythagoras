import React from 'react'

import '../graphics/animationKeyframes.css'
import './pythagorasFormula.css'
import colors from '../graphics/colors'
import { highlightClass } from '../graphics/RightTriangle'
import HighligthElement from '../../containers/HighlightElement'


export default ({highlightId, step=0}) => {
    const currHighlightClass =
      idsMatchingEl => highlightClass(highlightId, idsMatchingEl)
    return (
      <p className="pythagoras-formula">
        <HighligthElement highlightId="highlight-cathetus" step={step}>
          <span style={{color: colors.green}}
            className={'cathetus-2 ' + currHighlightClass(['highlight-cathetus'])}>
            AB
          </span>
        </HighligthElement>
        <sup>2</sup>{' + '}
        <HighligthElement highlightId="highlight-cathetus" step={step}>
          <span style={{color: colors.yellow}}
            className={'cathetus-1 ' + currHighlightClass(['highlight-cathetus'])}>
            BC
          </span>
        </HighligthElement>
        <sup>2</sup>{' = '}
        <HighligthElement highlightId="highlight-hypothenuse" step={step}>
          <span style={{color: colors.red}}
            className={'hypothenuse ' + currHighlightClass(['highlight-hypothenuse'])}>
            AC
          </span>
        </HighligthElement>
        <sup>2</sup>
      </p>
    )
}