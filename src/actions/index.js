export const setScrollerStep = (activeStep, direction) => ({
    type: 'SET_SCROLLER_STEP',
    stepDirection: direction,
    activeStep,
})

// todo think of a better name
export const setHighlightId = (highlightId, step) => ({
    type: 'SET_HIGHLIGHT_ID',
    highlightId,
    step,
})


export const setTriangleWidth = triangleWidth => ({
    type: 'SET_TRIANGLE_WIDTH',
    triangleWidth,
})


export const setTriangleHeight = triangleHeight => ({
    type: 'SET_TRIANGLE_HEIGHT',
    triangleHeight,
})


export const setLawfullness = lawfullness => ({
    type: 'SET_LAWFULLNESS',
    lawfullness: parseInt(lawfullness),
})


export const setGoodness = goodness => ({
    type: 'SET_GOODNESS',
    goodness: parseInt(goodness),
})


export const selectCharacter = character => ({
    type: 'SELECT_CHARACTER',
    selectedCharacter: character,
})


export const startTransition = name => ({
    type: 'START_TRANSITION',
    name: name,
})


export const endTransition = name => ({
    type: 'END_TRANSITION',
    name: name,
})