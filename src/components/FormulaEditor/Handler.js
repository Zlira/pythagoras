import React from 'react'
import {bisectLeft, bisect} from 'd3-array'
import math from 'mathjs'
import OPERATORS from './Operators'


function buildComponent(key, token, children, context) {
  if (token.name in context) {
    return (
      <span key={key} className={context[token.name].className}>
        {context[token.name].val}
      </span>
    )
  } else if (token.component) {
    return React.createElement(token.component, {key: key, children: children})
  } else {
    return <React.Fragment key={key}>{token.display}</React.Fragment>
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
        if (nextVal.clearLeft && isSeparator(children[children.length - 1])) {
          children.pop()
        }
        return buildComponent(currIndex, currVal, children, context)
      } else {
        insertWithSeparator(
          nextVal, children,
          (token, key) => getNestedComponent(key, token, tokenIter, context),
          false
        )
      }
    }
  }
}

function Separator() {
  return <span> </span>
}

function isSeparator(component) {
  if (!component) {
    return false
  }
  return component.type.name === 'Separator'
}


function insertWithSeparator(token, collection, mapFunc, isLast) {
  const prevComponent = collection[collection.length - 1]
  if (token.clearLeft && isSeparator(prevComponent)) {
    collection.pop()
  }
  collection.push(mapFunc(token, collection.length))
  if (!isLast && !token.clearRight) {
    collection.push(<Separator key={collection.length}/>)
  }

}


function componentsFromTokens(tokens, context) {
  const tokensIter = tokens.entries(),
    components = []

  for (const [index, val] of tokensIter) {
    insertWithSeparator(
      val, components,
      (token, key) => getNestedComponent(key, token, tokensIter, context),
      index === tokens.length - 1
    )
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
    let count = 0, noPrevSep = false
    const indeces = []
    for (const token of this.tokens.filter(t => t.display.length)) {
      // add one for each separator
      if (indeces.length && !token.clearLeft && !noPrevSep) {
        count++
      }
      indeces.push({
        start: count,
        end: count += token.display.length
      })
      noPrevSep = token.clearRight
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
    // todo this doesn't work right
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
    let display = '', noPrevSep = false
    const sep = ' '
    for (const [index, el] of this.tokens.entries()) {
      if (el.clearLeft && !noPrevSep) {
        display = display.slice(0, -1)
      }
      display += el.display
      if (index !== this.tokens.length - 1 && !el.clearRight) {
        display += sep
      }
      noPrevSep = el.clearRight
    }
    return display
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
