import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredients";
import {constructReducer} from "./construct";
import {orderReducer} from "./order";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    construct: constructReducer,
    order: orderReducer
});
