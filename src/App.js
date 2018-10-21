import React, { Component } from 'react';
import './App.css';

import scrollama from 'scrollama'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { setScrollerStep } from './actions'
import RootReducer from './reducers'
import Scroller from './components/Scroller'


const store = createStore(RootReducer)

class App extends Component {
  componentDidMount() {
    // todo maybe this shouldn't be here
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
