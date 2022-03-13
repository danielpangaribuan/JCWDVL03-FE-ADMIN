import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import usersReducer from './reducers/users-reducer';
import transactionsReducer from './reducers/transactions-reducer';
import transactionDetailReducer from './reducers/transactionDetail-reducer';
import transactionUpdateStatusReducer from './reducers/transactionUpdateStatus-reducer';
import comboStatusTransactionReducer from './reducers/transactionStatusCombo-reducer';
import locationReducer from './reducers/location-reducer';
import reportTotalDataReducer from './reducers/reportTotalData-reducer';
import reportSalesProductReducer from './reducers/reportSalesProduct-reducer';
import ProductReducer from './reducers/product-reducer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style-starter.css';

const allReducer = combineReducers({
  users: usersReducer,
  transactions: transactionsReducer,
  transactionDetail: transactionDetailReducer,
  transactionUpdateStatus: transactionUpdateStatusReducer,
  transactionStatusCombo: comboStatusTransactionReducer,
  location: locationReducer,
  reportTotalData: reportTotalDataReducer,
  reportSalesProduct: reportSalesProductReducer,
  products : ProductReducer,
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
