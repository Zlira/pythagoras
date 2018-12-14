import React from 'react'
import {bisectLeft} from 'd3-array'


class formulaHandler {
  // convert tokens to representation (without sqr and sqrt for now)
  // move cursor so it treats var name as one element
  // add new tokens given cursor position (add spaces, return new cursor position)
  // remove tokens given selection bounds, direction (return new cursor position)
  // replace tokens givent selection bounds, new token (retrun new cursor position)
  constructor() {
    this.tokens = []
  }

  _getTokenIdeces() {
    let count = 0
    const indeces = []
    for (const token of this.tokens) {
      if (indeces.length) {
        count++
      }
      indeces.push({
        start: count,
        end: count += token.symbol.length
      })
    }
    return indeces
  }

  addToken(token, cursorPosition) {
    let insertIndex
    const newToken = {symbol: token}
    const tokenIndeces = this._getTokenIdeces()
    if (cursorPosition.start === cursorPosition.end) {
      insertIndex = bisectLeft(
        tokenIndeces.map(e => e.start),
        cursorPosition.start
      )
    } else {
      insertIndex = this.tokens.length
    }
    // debugger
    this.tokens.splice(insertIndex, 0, newToken)
    return (
      (tokenIndeces[insertIndex - 1]? tokenIndeces[insertIndex - 1].end : 0) +
      token.length +
      (insertIndex? 1 : 0))
    }

  repr() {
    return this.tokens.map(el => el.symbol).join(' ')
  }
}

function InsertTokenButton({token, handleClick}) {
  return <button onClick={handleClick}>{token}</button>
}

function EditorControls({addToken}) {
  const vars = ['AB', 'BC']
  const operators = ['+', '-', '×', '÷', '^2', '√']
  const opButtons = operators.map(
    el => <InsertTokenButton
             key={el} token={el}
             handleClick={() => addToken(el)}/>
  )
  const varButtons = vars.map(
    el => <InsertTokenButton
             key={el} token={el}
             handleClick={() => addToken(el)}/>
  )
  return (
    <div className="editorControls">
      <div className="variables">{varButtons}</div>
      <div className="operators">{opButtons}</div>
    </div>
  )
}


export default class FormulaEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formula: ''
    }
    this.formulaHandler = new formulaHandler()
    this.inputRef = React.createRef()

    this.addToken = this.addToken.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate() {
    if (this.nextCursorPos) {
      this.inputRef.current.setSelectionRange(
        this.nextCursorPos, this.nextCursorPos
      )
    }
    this.nextCursorPos = undefined
  }

  componentDidMount() {
    this.inputRef.current.addEventListener(
      'keypress', this.handleKeydown, false
    )
  }

  componentWillUnmount() {
    this.inputRef.current.removeEventListener(
      'keypress', this.handleKeydown
    )
  }

  addToken(token) {
    const selection = {
      start: this.inputRef.current.selectionStart,
      end: this.inputRef.current.selectionEnd,
    }
    this.nextCursorPos = this.formulaHandler.addToken(token, selection)
    this.setState({
      formula: this.formulaHandler.repr(),
    })
    this.inputRef.current.focus()
  }

  handleKeydown(keyDownEvent) {
    const whitelistedKeys = [
      16, 35, 36, 37, 38, 39, 40, 9, 13, 8, 46
    ]
    if (!whitelistedKeys.includes(keyDownEvent.keyCode)) {
      keyDownEvent.preventDefault()
      keyDownEvent.stopPropagation()
    }
  }

  handleChange(event) {
    this.setState({
      formula: event.target.value
    })
  }

  render() {
    return (
      <div className="formula-editor">
        <EditorControls addToken={this.addToken} />
        <div className="formula-style-elements">
          <span>some invisible text</span>
        </div>
        <input
          type="text"
          value={this.state.formula}
          ref={this.inputRef}
          onChange={this.handleChange}
        ></input>
      </div>
    )
  }
}