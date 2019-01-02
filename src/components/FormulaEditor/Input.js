import React from 'react'

export default function FormulaInput({ formula, inputRef, handleChange, calculation }) {
  return (
    <div className="formula-input">
      <div className="input-label">AC =</div>
      <div className="formula-style-elements">
        {calculation}
      </div>
      <input
        type="text"
        value={formula}
        ref={inputRef}
        onChange={handleChange}
      ></input>
    </div>
  )
}

