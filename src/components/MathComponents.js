import React from 'react'


export function Square(props) {
  return <>{props.children}<sup>2</sup></>
}


export function SquareRoot({children}) {
  return <span className='radical'><span>{children}</span></span>
}


export function PlaceHolder() {
  return <span className="math-placeholder">&nbsp;</span>
}
