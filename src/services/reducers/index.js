import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredients";
import {constructReducer} from "./construct";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    construct: constructReducer
});
