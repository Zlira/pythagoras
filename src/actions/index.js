export const setScrollerStep = activeStep => ({
    type: 'SET_SCROLLER_STEP',
    activeStep,
})

// todo think of a better name
export const setHighlightId = highlightId => ({
    type: 'SET_HIGHLIGHT_ID',
    highlightId,
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
    lawfullness,
})


export const setGoodness = goodness => ({
    type: 'SET_GOODNESS',
    goodness,
})