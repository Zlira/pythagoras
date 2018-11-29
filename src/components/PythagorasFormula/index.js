import React from 'react'

import '../graphics/animationKeyframes.css'
import './pythagorasFormula.css'
import colors from '../graphics/colors'
import HighligthElement from '../../containers/HighlightElement'


export default ({highlightId, step=0}) => {
    const hypSqStyle = highlightId === 'highlight-square'
      ? {border: `3px solid ${colors.green}`, padding: '3px'}
      : {}
    return (
      <p className="pythagoras-formula">
        <HighligthElement highlightId="highlight-cathetus" step={step}>
          <span style={{color: colors.purple}} className='cathetus-2'>
            AB
          </span>
        </HighligthElement>
        <sup>2</sup>{' + '}
        <HighligthElement highlightId="highlight-cathetus" step={step}>
          <span style={{color: colors.blue}} className='cathetus-1'>
            BC
          </span>
        </HighligthElement>
        <sup>2</sup>{' = '}
        <span style={hypSqStyle}>
          <HighligthElement highlightId="highlight-hypothenuse" step={step}>
            <span style={{color: colors.green}} className='hypothenuse'>
              AC
            </span>
          </HighligthElement>
          <sup>2</sup>
        </span>
      </p>
    )
}