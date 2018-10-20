import React, { Component } from 'react';
import './App.css';

import scrollama from 'scrollama'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { setScrollStep } from './actions'
import RootReducer from './reducers'
import Scroller from './components/Scroller'


const store = createStore(RootReducer)

class App extends Component {
  componentDidMount() {
    this.scrollama_ = scrollama()
                        .setup({step: '.step', 'offset': .4})
                        .onStepEnter(stepAttrs => {
                          store.dispatch(setScrollStep(stepAttrs.index + 1))
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
