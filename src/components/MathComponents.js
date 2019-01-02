import React from 'react'


export function Square(props) {
  return <>{props.children}<sup>2</sup></>
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
  }

  componentDidUpdate() {
    const bbox = this.childRef.current.getBoundingClientRect()
    if (this.state.width !== bbox.width || this.state.height !== bbox.height) {
      this.setState({
        width: bbox.width,
        height: bbox.height,
      })
    }
  }

  render() {
    let { width, height } = this.state
    const paddingTop = 6
    const scale = height/10,
      paddingLeft = 6 * scale
    const line1Points = [
      [0, 6],
      [1, 6],
      [2.5, 10],
      [5.5, 1],
      [width, 1]
    ]
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
          {this.props.children || <span>placehold<sup>er</sup> placehold<sub>er</sub></span>}
        </span>
      </span>
    )
  }
}


export function PlaceHolder() {
  return <span className="math-placeholder">x</span>
}
