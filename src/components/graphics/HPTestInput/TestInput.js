import React from 'react'
import { connect } from 'react-redux'

import { setLawfullness, setGoodness } from '../../../actions'

function TestInput({className, onChange, defaultValue }) {
    return (
      <div>
        <input type="range" min="-10" max="10" step="1"
          style={{width: "400px"}} list="tickmarks" 
          className={className} onChange={onChange} 
          defaultValue={defaultValue} />
      </div>
    )
}

export const LawfullnessInput = connect(
    (state) => ({defaultValue: state.lawfullness}),
    (dispatch) => ({onChange: e => dispatch(setLawfullness(e.target.value))})
)(TestInput)


export const GoodnessInput = connect(
    (state) => ({defaultValue: state.goodness}),
    (dispatch) => ({onChange: e => dispatch(setGoodness(e.target.value))})
)(TestInput)