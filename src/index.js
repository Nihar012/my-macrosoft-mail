import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as actionTypes from './store/actions/actionTypes';
import AuthReducer from './store/reducers/auth';
import ComposeEmailReducer from './store/reducers/composeEmail';
import EmailsReducer from './store/reducers/emails';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';

const appReducer = combineReducers({
  auth: AuthReducer,
  composeEmail: ComposeEmailReducer,
  emails: EmailsReducer
})

const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOGOUT) {
    state = undefined
}

  return appReducer(state, action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
