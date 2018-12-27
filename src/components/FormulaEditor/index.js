import React from 'react'
import { connect } from 'react-redux'

import { defaultTriangleSize } from '../graphics/RightTriangle'
import { pxToUnits, toFixed, hypothenuseLen } from '../graphics/Helpers'
import { forbidToScrollPast } from '../../actions'
import FormulaHandler from './Handler'
import ControlPanel from './ControlPanel'

import './FormulaEditor.css'


function ResultValue({value, correctValue, correctClass}) {
  if (value === 'NaN') {
    return (
      <span title="Неможливо обичлслити значення" className='with-tooltip'>
        ?
      </span>
    )
  } else if (value === correctValue) {
    return (<span className={correctClass} style={{fontWeight: 'bold'}}>
      {value}
    </span>)
  }
  return <span>{value}</span>
}

function FormulaInput({ formula, inputRef, handleChange }) {
  return (
    <div className="formula-input">
      <div className="input-label">AC =</div>
      <div className="formula-style-elements">
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


function ResultBlock({ calculation, result, correctResult }) {
  const calc = calculation.length
    ? <>= {calculation} {''}</>
    : null
  return (
    <div className='result-block'>
      {calc}
      = <ResultValue
           value={result} correctValue={correctResult}
           correctClass='hypothenuse'/>
    </div>
  )
}


class FormulaEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formula: '',
      result: 'NaN',
    }
    const AB = pxToUnits(defaultTriangleSize.height),
      BC = pxToUnits(defaultTriangleSize.width)
    this.hypothenuse = toFixed(hypothenuseLen(AB, BC))
    this.triangleSize = {
      AB: {val: AB, className: 'cathetus-2'},
      BC: {val: BC, className: 'cathetus-1'},
    }
    this.formulaHandler = new FormulaHandler()
    this.nextStepId = 'step-' + (parseInt(this.props.stepIndex) + 1)

    this.inputRef = React.createRef()

    this.addToken = this.addToken.bind(this)
    this.removeToken = this.removeToken.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getCursorPos = this.getCursorPos.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    this.controllScroll = this.controllScroll.bind(this)
    this.resultIsCorrect = this.resultIsCorrect.bind(this)
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
    this.controllScroll()
  }

  controllScroll() {
    if (
      this.resultIsCorrect() ||
      (this.props.activeStep < this.props.stepIndex)
    ) {
      this.props.forbidScroll(null)
    } else {
      this.props.forbidScroll(this.nextStepId)
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

  resultIsCorrect() {
    /* check with one other value to make sure */
    if (this.state.result !== this.hypothenuse) {
      return false
    }
    const sqrtOfTwo = this.formulaHandler.eval({
      AB: {val: 1},
      BC: {val: 1},
    })
    return toFixed(sqrtOfTwo) === toFixed(Math.sqrt(2))
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
        <ControlPanel addToken={this.addToken} />
        <FormulaInput
          formula={this.state.formula}
          inputRef={this.inputRef}
          handleChange={this.handleChange}
        />
        <ResultBlock
          calculation={this.formulaHandler.renderContex(this.triangleSize)}
          result={this.state.result} correctResult={this.hypothenuse}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    activeStep: state.activeStep,
  }),
  (dispatch) => ({
    forbidScroll: elementId => dispatch(forbidToScrollPast(elementId))
  })
)(FormulaEditor)