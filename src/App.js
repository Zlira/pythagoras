import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import RootReducer from './reducers'
import Stepper from './containers/Stepper'


const store = createStore(RootReducer)

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Provider store={store}>
            <Stepper />
          </Provider>
        </header>
      </div>
    );
  }
}

export default App;
