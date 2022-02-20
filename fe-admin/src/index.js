import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import membersReducer from './reducers/members-reducer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style-starter.css';

const allReducer = combineReducers({
  members: membersReducer,
});

const STORE = createStore(allReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

ReactDOM.render(
  <Provider store={STORE}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
