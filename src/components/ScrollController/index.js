import React from 'react'
import { connect } from 'react-redux'

import ScrollHandler from './ScrollHandler'
import ScrollDown from './ScrollDown'
import './ScrollController.css'


class ScrollController extends React.Component {
  constructor(props) {
    super(props)
    this.scrollHandler = new ScrollHandler()
  }

  componentDidUpdate() {
    if (!this.props.forbiddenToScrollPast) {
      this.scrollHandler.allow()
    } else {
      this.scrollHandler.prevent(this.props.forbiddenToScrollPast)
    }
  }

  render() {
    return <ScrollDown allowed={!this.props.forbiddenToScrollPast}/>
  }
}


export default connect(
  (state) => ({forbiddenToScrollPast: state.forbiddenToScrollPast})
)(ScrollController)