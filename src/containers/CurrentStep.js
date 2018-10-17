import { connect } from 'react-redux'
import StepIndicator from '../components/StepIndicator'


function mapStateToProps(state) {
    return {
        scrollStep: state.scrollStep
    }
}


export default connect(
    mapStateToProps
)(StepIndicator)