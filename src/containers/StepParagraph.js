import React from 'react'
import { connect } from 'react-redux'

// todo maybe add highlighted element id
function StepP({lawfullness, goodness, selectedCharacter, children}) {
    const wrappedChildren = children.map(
        child => typeof child === 'string'? <>{child}</> : child
    )
    const chlidrenWithProps = React.Children.map(
        wrappedChildren,
        child => {
            // todo maybe thers' a better way to check this
            return typeof child.type === 'string'
            ? child
            : React.cloneElement(child, {
                ...child.props,
                goodness: goodness,
                lawfullness: lawfullness,
                selectedCharacter: selectedCharacter,
            })
        }
    )
    return <p>
       { chlidrenWithProps }
    </p>
}

export default connect(
    state => ({
        goodness: state.goodness,
        lawfullness: state.lawfullness,
        selectedCharacter: state.selectedCharacter
    })
)(StepP)