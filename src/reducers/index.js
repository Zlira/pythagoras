function RootReducer(state={}, action) {
    switch (action.type) {
        case 'SET_SCROLL_STEP':
          return {
              ...state,
              scrollStep: action.scrollStep,
          }
        default:
          return state
    }
}

export default RootReducer