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
import {socketMiddlewareOrders} from "./services/middleware/socket-middleware-orders";
import {WS_ORDERS_ALL_POINT, WS_ORDERS_POINT} from "./utils/constants";
import {wsActionsOrders} from "./services/actions/wsorders";
import {wsActionsOrdersAuth} from "./services/actions/wsorders-auth";

const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
const enhancer = composeEnhancers(
    applyMiddleware(
        thunk,
        socketMiddlewareOrders(WS_ORDERS_ALL_POINT, wsActionsOrders, false),
        socketMiddlewareOrders(WS_ORDERS_POINT, wsActionsOrdersAuth, true)
    ));
export const store = createStore(rootReducer, enhancer);
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
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
