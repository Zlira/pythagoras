function RootReducer(state={}, action) {
    switch (action.type) {
        case 'SET_SCROLLER_STEP':
          return {
              ...state,
              activeStep: action.activeStep,
              stepDirection: action.stepDirection,
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
        case 'START_TRANSITION':
          if (state.activeTransitions.includes(action.name)) {
            return state
          }
          return {
            ...state,
            activeTransitions: [
              ...state.activeTransitions,
              action.name
            ]
          }
        case 'END_TRANSITION':
          return {
            ...state,
            activeTransitions: state.activeTransitions.filter(
              tr => tr !== action.name
            )
          }
        default:
          return state
    }
}

export default RootReducer