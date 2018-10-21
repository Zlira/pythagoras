function RootReducer(state={}, action) {
    switch (action.type) {
        case 'SET_SCROLLER_STEP':
          return {
              ...state,
              activeStep: action.activeStep,
          }
        default:
          return state
    }
}

export default RootReducer