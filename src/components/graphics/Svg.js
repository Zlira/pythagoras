import React from 'react'


export default ({width, height, children}) => {
    return (
        <svg width={width} height={height}
          xmlns="http://www.w3.org/2000/svg">
          {children}
        </svg>
    )
}