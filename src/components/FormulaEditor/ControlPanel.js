import React from 'react'

import OPERATORS from './Operators'


function TokenButton({token, handleClick}) {
  let symbol = token.name
  if (token.type === 'operator') {
    let operator = OPERATORS[symbol].start? OPERATORS[symbol].start : OPERATORS[symbol]
    if (operator.component) {
      symbol = React.createElement(operator.component,)
    } else {
      symbol = operator.display
    }
  }
  return <button onClick={() => handleClick(token)}>{symbol}</button>
}


export default function ControlPanel({addToken}) {
  const vars = ['AB', 'BC']
  const operators = [
    ['plus', 'minus'], ['multiply', 'divide'], ['square', 'sqrt']
  ]
  const createButton = el => (
    <TokenButton
      key={el} token={{type: 'operator', name: el}}
      handleClick={addToken}/>)
  const opBtnGroups = operators.map(
    grp => {
      const [op, revOp] = grp
      return (
      <div key={op+ ' ' +revOp}>
        {createButton(op)}{createButton(revOp)}
      </div>)
    }
  )
  const varButtons = vars.map(
    el => <TokenButton
             key={el} token={{type: 'variable', name: el}}
             handleClick={addToken}/>
  )
  return (
    <div className="editor-controls">
      <div className="variables">
        <div className="block-label">змінні</div>
        <div className='button-block'>{varButtons}</div>
      </div>
      <div className="operators">
        <div className="block-label">дії</div>
        <div className="button-block">{opBtnGroups}</div>
      </div>
    </div>
  )
}