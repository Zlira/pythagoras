import React from 'react'
import { connect } from 'react-redux'

import { setHighlightId } from '../actions'


function HighlightElement({
    // todo make possible to pass other props
    children, highlightId, isActive, activate, inactivate,
    otherMatchingIds
}) {
    const className = highlightId + ' highlight' +
      (isActive? ' highlighted' : '')
    const wrappedChildren = React.Children.map(
        children,
        child => React.cloneElement(child, {
            ...child.props,
            className: (child.props.className || '') + ' ' + className,
            onMouseOver: activate,
            onMouseOut: inactivate,
        })
    )
    return (
        <>
          {wrappedChildren}
        </>
    )
}

function mapStateToProps(state, ownProps) {
    let matchingIds = ownProps.otherMatchingIds || []
    matchingIds = matchingIds.concat([ownProps.highlightId])
    return {
        isActive: matchingIds.includes(state.highlightId)
    }
}


function mapDispatchToProps(dispatch, ownProps) {
    return {
        activate: () => {
            dispatch(setHighlightId(ownProps.highlightId, ownProps.step))
        },
        inactivate: () => dispatch(setHighlightId(null))
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps,
)(HighlightElement)