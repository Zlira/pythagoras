import React, { Component } from 'react';
import scrollama from 'scrollama'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { setScrollerStep } from './actions'
import RootReducer from './reducers'
import Scroller from './components/Scroller'

import './App.css'
import './Highlight.css'


const store = createStore(
  RootReducer, {
    // todo calculate this based on postion
    activeStep: 0,
    stepDirection: 'down',
    triangleWidth: null,
    triangleHeight: null,
    selectedCharacter: 'harry',
    lawfullness: 0,
    goodness: 0,
    activeTransitions: [],
    forbiddenToScrollPast: null,
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class App extends Component {
  componentDidMount() {
    // todo maybe this shouldn't be here
    // todo rewrite this using connect (to avoid using store directly)
    // todo deal with step when reloading the page
    this.scrollama_ = scrollama()
                        .setup({step: '.step', 'offset': .3})
                        .onStepEnter(stepAttrs => {
                          store.dispatch(
                            setScrollerStep(stepAttrs.index, stepAttrs.direction)
                          )
                        })
  }

  render() {
    return (
      <article>
        <Provider store={store}>
          <Scroller />
        </Provider>
      </article>
    );
  }
}


export default App;
