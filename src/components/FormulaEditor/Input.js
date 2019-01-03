import React from 'react'

export default function FormulaInput({ formula, inputRef, handleChange, mathElements }) {
  return (
    <div className="formula-input">
      <div className="input-label">AC =</div>
      <div className="formula-style-elements">
        {mathElements}
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

