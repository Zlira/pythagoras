import React from 'react'
import {bisectLeft, bisect} from 'd3-array'
import math from 'mathjs'

import { defaultTriangleSize } from './graphics/RightTriangle'
import { pxToUnits, toFixed, hypothenuseLen } from './graphics/Helpers'

const OPERATORS = {
  plus: {math: '+', display: '+'},
  minus: {math: '-', display: '-'},
  multiply: {math: '*', display: '×'},
  divide: {math: '/', display: '÷'},
  // todo add start and end so this also works with
  // square of a square
  square: {math: '^2', display: '^2', component: <sup>2</sup>},
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
      // add one for each separator
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
    // TODO if token being replaced has matching token remove it also
    let insertIndex = selectedTokens.start
    const insertLength = selectedTokens.end - selectedTokens.start
    if (newToken.start) {
      const start = newToken.start
      const end = newToken.end
      this.tokens.splice(insertIndex, 0, start)
      this.tokens.splice(insertIndex + 1 + insertLength, 0, end)
      // for moving cursor to the end of seleciton
      if (insertLength) { insertIndex = insertIndex + 1 + insertLength }
    } else {
      this.tokens.splice(insertIndex, insertLength, newToken)
    }
    return (
      this.tokens
          .slice(0, insertIndex + 1)
          .map(t => t.display.length)
          .reduce((acc, val)=> acc + val) + insertIndex
    )
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

  eval(context) {
    const strippedContext = {}
    for (let [key, val] of Object.entries(context)) {
      strippedContext[key] = val.val
    }
    return math.eval(
      this.tokens.map(el => el.math).join(' '), strippedContext
    )
  }

  renderContex(context) {
    const elements = this.tokens.map(
      (token, i) => {
        if (token.name in context) {
          return (
            <span key={i} className={context[token.name].className}>
              {context[token.name].val + ' '}
            </span>)
        } else {
          const content = token.component? token.component : token.display
          return (
            <React.Fragment key={i}>{content}{' '}</React.Fragment>
          )
        }
      }
    )
    return (<>{elements}</>)
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


function ResultValue({value, correctValue, correctClass}) {
  if (value === 'NaN') {
    return (
      <span title="Не можливо обичлслити значення" className='with-tooltip'>
        {value}
      </span>
    )
  } else if (value === correctValue) {
    return <span className={correctClass}>{value}</span>
  }
  return <span>{value}</span>
}


export default class FormulaEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formula: '',
      result: 'NaN',
    }
    const AB = pxToUnits(defaultTriangleSize.height),
      BC = pxToUnits(defaultTriangleSize.width)
    this.hypothenuse = toFixed(hypothenuseLen(AB, BC))
    console.log(this.hypothenuse)
    this.triangleSize = {
      AB: {val: AB, className: 'cathetus-2'},
      BC: {val: BC, className: 'cathetus-1'},
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
    let result
    try {
      // TODO mathjs takes 'AB AB' as a valid expression evaluating
      // it as multiplication. Is it OK?
      result = this.formulaHandler.eval(this.triangleSize)
      result = toFixed(result)
    } catch (e) {
      result = 'NaN'
    }
    if (this.state.result !== result) {
      this.setState({result: result})
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
        <p>
          = {this.formulaHandler.renderContex(this.triangleSize)} {''}
          = <ResultValue
               value={this.state.result}
               correctValue={this.hypothenuse}
               correctClass='hypothenuse'/>
        </p>
      </div>
    )
  }
}