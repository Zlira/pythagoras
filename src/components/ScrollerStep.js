import React from 'react'


function scrollamaStep ({children, stepIndex, isActive=false}) {
    return (
      <section className={"step" + (isActive? " active" : "")}
        id={'step-' + stepIndex}
      >
        { children }
       </section>
    )
}


export default scrollamaStep