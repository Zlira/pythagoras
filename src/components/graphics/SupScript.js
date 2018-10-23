import React from 'react'


function SupScript({child}) {
    // this contains an ugly hack for dealing with
    // superscript in ff
    return (
        <tspan>
          <tspan dy="-10" fontSize=".8em">{child}</tspan>
          <tspan dy="+10"> </tspan>
        </tspan>
    )
}


export default SupScript