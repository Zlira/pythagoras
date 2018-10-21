import React from 'react'
import { connect } from 'react-redux'

import { setHighlightId } from '../actions'


function HighlightText({ children, highlightId, isActive, activate, inactivate}) {
    return (
        <span className={'highlight ' + (isActive? 'active' : '')}
              onMouseOver={activate}
              onMouseOut={inactivate}>
          {children}
        </span>
    )
}


function mapStateToProps(state, ownProps) {
    return {
        isActive: state.highlightId === ownProps.highlightId
    }
}


function mapDispatchToProps(dispatch, ownProps) {
    return {
        activate: () => {
            dispatch(setHighlightId(ownProps.highlightId))
        },
        inactivate: () => dispatch(setHighlightId(null))
    }
}


export default connect(
    mapStateToProps, mapDispatchToProps
)(HighlightText)
