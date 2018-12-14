import React from 'react'

function OperatorButton({operator, handleClick}) {
  return <button onClick={handleClick}>{operator}</button>
}


function EditorControls({addToken}) {
  const vars = ['AB', 'BC']
  const operators = ['+', '-', '×', '÷', '^2', '√']
  const opButtons = operators.map(
    el => <OperatorButton
             key={el} operator={el}
             handleClick={() => addToken(el)}/>
  )
  const varButtons = vars.map(
    el => <button key={el}>{el}</button>
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
    this.inputRef = React.createRef()

    this.addToken = this.addToken.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.inputRef.current.addEventListener('keypress', this.handleKeydown, false)
  }

  addToken(token) {
    this.setState(
      prevState => ({
          formula: prevState.formula + token,
      })
    )
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