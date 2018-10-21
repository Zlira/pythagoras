import React from 'react'


function scrollamaStep ({children, isActive=false}) {
    // todo make isActive work
    return (<section className={"step" + (isActive? " active" : "")}>
      { children } 
    </section>)
}


export default scrollamaStep