import React from 'react'


const StepUpdater = ({ incrementScrollStep }) => {
    return (
        <button onClick={incrementScrollStep}>
            Step +1
        </button>
    )
}

export default StepUpdater