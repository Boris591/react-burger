
import {BASE_URL, INGREDIENTS_POINT} from "../../utils/constants";
import {request} from "../../utils/help-methods";
import {
    DECREASE_COUNT_INGREDIENT,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_COUNT_INGREDIENT, UPDATE_COUNT_INGREDIENT, UPDATE_INGREDIENT_INFO
} from "./constants/ingredients";
import {AppDispatch, AppThunk} from "../types";
import {Ingredient} from "../types/data";

export interface GetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface GetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: Ingredient[];
}

export interface GetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IncreaseCountIngredientAction {
    readonly type: typeof INCREASE_COUNT_INGREDIENT;
    readonly id: string;
}

export interface DecreaseCountIngredientAction {
    readonly type: typeof DECREASE_COUNT_INGREDIENT;
    readonly id: string;
}

export interface UpdateCountIngredientAction {
    readonly type: typeof UPDATE_COUNT_INGREDIENT;
    readonly id: string;
    readonly count: number;
}

export interface UpdateIngredientInfoAction {
    readonly type: typeof UPDATE_INGREDIENT_INFO;
    readonly info: Ingredient;
}

export type IngredientsActions =
    | GetIngredientsRequestAction
    | GetIngredientsSuccessAction
    | GetIngredientsFailedAction
    | IncreaseCountIngredientAction
    | DecreaseCountIngredientAction
    | UpdateCountIngredientAction
    | UpdateIngredientInfoAction;


export const getIngredients: AppThunk = () => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        request(BASE_URL + INGREDIENTS_POINT)
            .then(data => {
                data.data.forEach((e: Ingredient) => e.count = 0);
                dispatch({type: GET_INGREDIENTS_SUCCESS, ingredients: data.data})
            })
            .catch(() => dispatch({type: GET_INGREDIENTS_FAILED}));
    }
}
