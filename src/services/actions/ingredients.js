
import {BASE_URL, INGREDIENTS_POINT} from "../../utils/constants";
import {request} from "../../utils/help-methods";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const INCREASE_COUNT_INGREDIENT = 'INCREASE_COUNT_INGREDIENT';
export const DECREASE_COUNT_INGREDIENT = 'DECREASE_COUNT_INGREDIENT';
export const UPDATE_COUNT_INGREDIENT = 'UPDATE_COUNT_INGREDIENT';

export const getIngredients = () => {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        request(BASE_URL + INGREDIENTS_POINT)
            .then(data => {
                data.data.forEach(e => e.count = 0);
                dispatch({type: GET_INGREDIENTS_SUCCESS, ingredients: data.data})
            })
            .catch(() => dispatch({type: GET_INGREDIENTS_FAILED}));
    }
}
