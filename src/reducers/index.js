function RootReducer(state={}, action) {
    switch (action.type) {
        case 'SET_SCROLLER_STEP':
          return {
              ...state,
              activeStep: action.activeStep,
          }
        case 'SET_HIGHLIGHT_ID':
          return {
              ...state,
              highlightId: action.highlightId,
          }
        default:
          return state
    }
}

export default RootReducer