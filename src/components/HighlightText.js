import React from 'react'
import { connect } from 'react-redux'

import { setHighlightId } from '../actions'


function HighlightText({ children, highlightId, step, isActive, activate, inactivate}) {
    const className = highlightId + ' highlight' +
      (isActive? ' highlighted' : '')
    return (
        <span className={className}
              onMouseOver={activate}
              onMouseOut={inactivate}>
          {children}
        </span>
    )
}


function mapStateToProps(state, ownProps) {
    return {
        isActive: state.highlightId === ownProps.highlightId,
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
    mapStateToProps, mapDispatchToProps
)(HighlightText)
