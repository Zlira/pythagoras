import React from 'react'


export function Square(props) {
  return <>
    {props.children}<sup style={{display: 'inline-block', width: '11.5px'}}>2</sup>
  </>
}


export function SquareRoot({children}) {
  return <span className='radical'><span>{children}</span></span>
}


export class SquareRootSvg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
    }
    this.childRef = React.createRef()

    this.updateSize = this.updateSize.bind(this)
  }

  updateSize() {
    const bbox = this.childRef.current.getBoundingClientRect()
    if (this.state.width !== bbox.width || this.state.height !== bbox.height) {
      this.setState({
        width: bbox.width,
        height: bbox.height,
      })
    }
  }

  componentDidMount() {
    this.updateSize()
  }

  componentDidUpdate() {
    this.updateSize()
  }

  render() {
    let { width, height } = this.state
    const paddingTop = 6
    const scale = height/10,
      paddingLeft = 4.4 * scale
    const line1Points = [
      [0, 6],
      [1, 6],
      [2.5, 10],
      [5.5, 1],
      [width, 1]
    ]
    const child = React.Children.count(this.props.children)
      ? this.props.children
      : <span className="sqrt-placeholder">&nbsp;</span>
    return (
      <span style={{position: "relative", whiteSpace: "nowrap"}}>
        <svg
          width={width} height={height}
          style={{position: "absolute", top: `-${(paddingTop + 2)}px`}}
        >
          <g transform={`scale(${scale})`}>
            <polyline points={
              line1Points.map(el => `${el[0]}, ${el[1]}`).join(' ')}
              stroke='#2F343F'
              fill='none'
              strokeWidth='.5px'
            />
          </g>
        </svg>
        <span style={{paddingLeft: `${paddingLeft}px`, display: "inline-block"}} ref={this.childRef}>
          {child}
        </span>
      </span>
    )
  }
}


export function PlaceHolder() {
  return <span className="math-placeholder">x</span>
}
