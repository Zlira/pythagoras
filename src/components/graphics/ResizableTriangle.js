import { connect } from 'react-redux'

import Triange from './Triangle'


function mapStateToProps(state) {
    return {
        width: state.triangleWidth,
        height: state.triangleHeight,
    }
}


export default connect(
    mapStateToProps
)(Triange)