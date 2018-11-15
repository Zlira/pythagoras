import React, { Component } from 'react';
import './App.css';

import scrollama from 'scrollama'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { setScrollerStep } from './actions'
import RootReducer from './reducers'
import Scroller from './components/Scroller'


const store = createStore(
  RootReducer, {
    // todo calculate this based on postion
    activeStep: 0,
    triangleWidth: null,
    triangleHeight: null,
    selectedCharacter: 'harry',
    lawfullness: 0,
    goodness: 0,
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
                          store.dispatch(setScrollerStep(stepAttrs.index))
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
