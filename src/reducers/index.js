function RootReducer(state={}, action) {
    switch (action.type) {
        case 'SET_SCROLLER_STEP':
          return {
              ...state,
              activeStep: action.activeStep,
          }
        // todo maybe move this to a step level
        case 'SET_HIGHLIGHT_ID':
          return {
              ...state,
              highlightId: action.step === state.activeStep? action.highlightId : null,
          }
        // todo move this to a local level
        case 'SET_TRIANGLE_WIDTH':
          return {
              ...state,
              triangleWidth:  action.triangleWidth,
          }
        // todo move this to a local level
        case 'SET_TRIANGLE_HEIGHT':
          return {
            ...state,
            triangleHeight: action.triangleHeight,
          }
        case 'SET_LAWFULLNESS':
          return {
            ...state,
            lawfullness: action.lawfullness,
          }
        case 'SET_GOODNESS':
          return {
            ...state,
            goodness: action.goodness,
          }
        // todo maybe move this to a step level
        case 'SELECT_CHARACTER':
          return {
            ...state,
            selectedCharacter: action.selectedCharacter,
          }
        default:
          return state
    }
}

export default RootReducer