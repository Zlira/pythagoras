import React from 'react'

import colors from './colors'
import SupScript from './SupScript'


export default ({x, y}) => {
    return (
        <text x={x} y={y} className='pythagoras-formula'>
            <tspan fill={colors.blue} > AB</tspan><SupScript child='2'/> +  
            <tspan fill={colors.yellow}> BC</tspan><SupScript child='2'/> = 
            <tspan fill={colors.red}> AC</tspan><SupScript child='2'/>
        </text>
    )

}