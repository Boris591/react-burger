import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {socketMiddlewareOrders} from "./services/middleware/socket-middleware-orders";
import {WS_ORDERS_ALL_POINT, WS_ORDERS_POINT} from "./utils/constants";
import {wsActionsOrders} from "./services/actions/wsorders";
import {wsActionsOrdersAuth} from "./services/actions/wsorders-auth";
import {rootReducer} from "./services/reducers";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(
        thunk,
        socketMiddlewareOrders(WS_ORDERS_ALL_POINT, wsActionsOrders, false),
        socketMiddlewareOrders(WS_ORDERS_POINT, wsActionsOrdersAuth, true)
    ));
export const store = createStore(rootReducer, enhancer);
