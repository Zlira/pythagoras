import { connect } from 'react-redux'
import { setScrollStep } from '../actions'
import StepUpdater from '../components/StepUpdater'


let currStep = 0

function mapDispatchToProps(dispatch) {
    console.log(dispatch)
    return {
        incrementScrollStep: () => {
            currStep++
            // console.log(currStep)
            return dispatch(setScrollStep(currStep))
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(StepUpdater)