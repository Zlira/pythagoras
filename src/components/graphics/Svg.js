import React from 'react'


export default ({width, height, children, style, className}) => {
    return (
        <svg width={width} height={height} style={style} className={className}
          xmlns="http://www.w3.org/2000/svg">
          {children}
        </svg>
    )
}