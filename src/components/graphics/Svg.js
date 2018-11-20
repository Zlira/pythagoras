import React from 'react'


export default ({width, height, children, style}) => {
    return (
        <svg width={width} height={height} style={style}
          xmlns="http://www.w3.org/2000/svg">
          {children}
        </svg>
    )
}