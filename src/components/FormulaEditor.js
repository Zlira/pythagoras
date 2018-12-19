import React from 'react'
import {bisectLeft, bisect} from 'd3-array'
import math from 'mathjs'

const OPERATORS = {
  plus: {math: '+', display: '+'},
  minus: {math: '-', display: '-'},
  multiply: {math: '*', display: '×'},
  divide: {math: '/', display: '÷'},
  square: {math: '^2', display: '^2'},
  sqrt: {
    start: {math: 'sqrt(', display: 'sqrt('},
    end: {math: ')', display: ')'}
  }
}

// todo realy need tests for this one
class FormulaHandler {
  // convert tokens to representation for mathjs
  // convert tokens to representation for display
  // move cursor so it treats var name as one element
  // return correct cursor position
  constructor() {
    this.tokens = []

    this.addToken = this.addToken.bind(this)
    this.removeToken = this.removeToken.bind(this)
    this.repr = this.repr.bind(this)
    this._getSelectedTokens = this._getSelectedTokens.bind(this)
    this._getTokenIdeces = this._getTokenIdeces.bind(this)
    this._getFullToken = this._getFullToken.bind(this)
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
        end: count += token.display.length
      })
    }
    return indeces
  }

  _getSelectedTokens(cursorPosition) {
    const tokenIndeces = this._getTokenIdeces()
    const insertStartIndex = bisectLeft(
      tokenIndeces.map(e => e.start),
      cursorPosition.start
    )
    const insertEndIndex = bisect(
      tokenIndeces.map(e => e.end), cursorPosition.end
    )
    return {
      start: insertStartIndex,
      end: insertEndIndex,
    }
  }

  _getFullToken(token) {
    if (token.type === 'variable') {
      return {
        ...token,
        math: token.name,
        display: token.name,
      }
    } else if (token.type === 'operator') {
      const operator = OPERATORS[token.name]
      if (operator.start) {
        const start = {...token, ...operator.start}
        const end = {...token, ...operator.end, matchingToken: start}
        start.matchingToken = end
        return {start: start, end: end}
      } else {
        return {...token, ...operator}
      }
    }
  }

  addToken(token, cursorPosition) {
    const newToken = this._getFullToken(token)
    const selectedTokens = this._getSelectedTokens(cursorPosition)
    const tokenIndeces = this._getTokenIdeces()
    let insertIndex = selectedTokens.start
    const insertLength = selectedTokens.end - selectedTokens.start
    if (newToken.start) {
      const start = newToken.start
      const end = newToken.end
      this.tokens.splice(insertIndex, 0, start)
      insertIndex ++
      this.tokens.splice(insertIndex + insertLength, 0, end)
    } else {
      this.tokens.splice(insertIndex, insertLength, newToken)
    }
    // todo doesn't work for sqrt and is confusing anyway, just create one smart
    // function to deal with cursor position
    return (
      (tokenIndeces[insertIndex - 1]? tokenIndeces[insertIndex - 1].end : 0) +
      token.length +
      (insertIndex? 1 : 0))
    }

  removeToken(cursorPosition, direction) {
    const selectedTokens = this._getSelectedTokens(cursorPosition)
    const tokenIndeces = this._getTokenIdeces()
    let startDelIndex = selectedTokens.start
    let delCount = selectedTokens.end - selectedTokens.start
    if (selectedTokens.start === selectedTokens.end) {
      delCount += 1
      if (direction === 'backward') {
        startDelIndex = startDelIndex - 1
      }
    }
    const tokensToDelete = this.tokens.slice(startDelIndex, startDelIndex + delCount)
    const mathcingTokensToDelete = (
      tokensToDelete.filter(el => el.matchingToken).map(el => el.matchingToken)
    )
    this.tokens.splice(startDelIndex, delCount)
    this.tokens = this.tokens.filter(el => !mathcingTokensToDelete.includes(el))
    return tokenIndeces[startDelIndex]?
      tokenIndeces[startDelIndex].start :
      this.repr().length
  }

  repr() {
    return this.tokens.map(el => el.display).join(' ')
  }

  toMath() {
    return this.tokens.map(el => el.math).join(' ')
  }
}

function InsertTokenButton({token, handleClick}) {
  let symbol = token.name
  if (token.type === 'operator') {
    symbol = OPERATORS[token.name].display
      ? OPERATORS[token.name].display
      : OPERATORS[token.name].start.display
  }
  return <button onClick={() => handleClick(token)}>{symbol}</button>
}

function EditorControls({addToken}) {
  const vars = ['AB', 'BC']
  const operators = ['plus', 'minus', 'multiply', 'divide', 'square', 'sqrt']
  const opButtons = operators.map(
    el => <InsertTokenButton
             key={el} token={{type: 'operator', name: el}}
             handleClick={addToken}/>
  )
  const varButtons = vars.map(
    el => <InsertTokenButton
             key={el} token={{type: 'variable', name: el}}
             handleClick={addToken}/>
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
    this.formulaHandler = new FormulaHandler()
    this.inputRef = React.createRef()

    this.addToken = this.addToken.bind(this)
    this.removeToken = this.removeToken.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getCursorPos = this.getCursorPos.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
  }

  componentDidUpdate() {
    if (this.nextCursorPos !== undefined) {
      this.inputRef.current.setSelectionRange(
        this.nextCursorPos, this.nextCursorPos
      )
    }
    this.nextCursorPos = undefined
    try {
      console.log(math.eval(this.formulaHandler.toMath(), {AB: 4, BC: 3}))
    } catch (e) {
      console.log(e)
    }
  }

  componentDidMount() {
    this.inputRef.current.addEventListener(
      'keydown', this.handleKeydown, false
    )
  }

  componentWillUnmount() {
    this.inputRef.current.removeEventListener(
      'keydown', this.handleKeydown
    )
  }

  getCursorPos() {
    return {
      start: this.inputRef.current.selectionStart,
      end: this.inputRef.current.selectionEnd,
    }
  }

  addToken(token) {
    const selection = this.getCursorPos()
    this.nextCursorPos = this.formulaHandler.addToken(token, selection)
    this.setState({
      formula: this.formulaHandler.repr(),
    })
    this.inputRef.current.focus()
  }

  removeToken(direction) {
    const selection = this.getCursorPos()
    this.nextCursorPos = this.formulaHandler.removeToken(
      selection, direction
    )
    this.setState({
      formula: this.formulaHandler.repr(),
    })
    this.inputRef.current.focus()
  }

  handleKeydown(keyDownEvent) {
    const keyCode = keyDownEvent.keyCode
    const whitelistedKeys = [
      16, 35, 36, 37, 38, 39, 40, 9, 13,
    ]
    if (!whitelistedKeys.includes(keyCode)) {
      keyDownEvent.preventDefault()
      keyDownEvent.stopPropagation()
    }
    if (keyCode === 8) {
      this.removeToken('backward')
    } else if (keyCode === 46) {
      this.removeToken('forward')
    }
  }

  handleChange(event) {
    this.setState({
      formula: event.target.value
    })
  }
  // todo doesn't behave well when input element is too narrow
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