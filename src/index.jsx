import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import {BrowserRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux';
import {rootReducer} from "./services/reducers";
import thunk from 'redux-thunk';
import App from "./components/app/app";

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);
const root = ReactDOM.createRoot(
  document.getElementById('root') //as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <Router>
            <App />
          </Router>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your main, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
