import React from 'react'

import '../graphics/animationKeyframes.css'
import './pythagorasFormula.css'
import colors from '../graphics/colors'
import HighligthElement from '../../containers/HighlightElement'


export default ({highlightId, step=0}) => {
    return (
      <p className="pythagoras-formula">
        <HighligthElement highlightId="highlight-cathetus" step={step}>
          <span style={{color: colors.green}} className='cathetus-2'>
            AB
          </span>
        </HighligthElement>
        <sup>2</sup>{' + '}
        <HighligthElement highlightId="highlight-cathetus" step={step}>
          <span style={{color: colors.yellow}} className='cathetus-1'>
            BC
          </span>
        </HighligthElement>
        <sup>2</sup>{' = '}
        <HighligthElement highlightId="highlight-hypothenuse" step={step}>
          <span style={{color: colors.red}} className='hypothenuse'>
            AC
          </span>
        </HighligthElement>
        <sup>2</sup>
      </p>
    )
}