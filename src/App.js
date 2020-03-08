import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

import Header from './components/Header'
import MainComponent from './components/MainComponent';

const store = createStore(rootReducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store ={store}>
      <Header />
      <MainComponent />
    </Provider>
  );
}

export default App;
