import React from 'react'
import {bisectLeft, bisect} from 'd3-array'
import math from 'mathjs'
import OPERATORS from './Operators'


function buildComponent(index, token, children, context) {
  if (token.name in context) {
    return (
      <span key={index} className={context[token.name].className}>
        {context[token.name].val + ' '}
      </span>
    )
  } else if (token.component) {
    return React.createElement(token.component, {key: index, children: children})
  } else {
    return <React.Fragment key={index}>{token.display + ' '}</React.Fragment>
  }
}


function getNestedComponent(currIndex, currVal, tokenIter, context) {
  if (!currVal.matchingToken) {
    return buildComponent(currIndex, currVal, undefined, context)
  } else {
    const children = []
    let done, nextIndex, nextVal
    while (!done) {
      ({value: [nextIndex, nextVal], done} = tokenIter.next())
      if (nextVal === currVal.matchingToken) {
        return buildComponent(currIndex, currVal, children, context)
      } else {
        children.push(
          getNestedComponent(nextIndex, nextVal, tokenIter, context)
        )
      }
    }
  }
}


function componentsFromTokens(tokens, context) {
  const tokensIter = tokens.entries()
  const components = []
  for (const [index, val] of tokensIter) {
    components.push(getNestedComponent(index, val, tokensIter, context))
  }
  return components
}


// todo really need tests for this one
export default class FormulaHandler {
  // convert tokens to representation for mathjs
  // convert tokens to representation for display
  // move cursor so it treats var name as one element
  // return correct cursor position
  constructor() {
    this.tokens = []

    this.addToken = this.addToken.bind(this)
    this.removeToken = this.removeToken.bind(this)
    this.clear = this.clear.bind(this)
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

  clear() {
    this.tokens = []
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
    return componentsFromTokens(this.tokens, context)
  }
}
