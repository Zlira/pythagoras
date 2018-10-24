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
        case 'SET_TRIANGLE_WIDTH':
          return {
              ...state,
              triangleWidth:  action.triangleWidth,
          }
        case 'SET_TRIANGLE_HEIGHT':
          return {
            ...state,
            triangleHeight: action.triangleHeight,
          }
        default:
          return state
    }
}

export default RootReducer