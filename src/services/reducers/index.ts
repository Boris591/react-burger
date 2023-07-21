import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredients";
import {constructReducer} from "./construct";
import {orderReducer} from "./order";
import {authReducer} from "./auth";
import {wsOrdersReducer} from "./wsorders";
import {wsOrdersAuthReducer} from "./wsorders-auth";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    construct: constructReducer,
    order: orderReducer,
    auth: authReducer,
    wsOrders: wsOrdersReducer,
    wsOrdersAuth: wsOrdersAuthReducer
});
