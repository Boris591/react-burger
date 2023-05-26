
import {BASE_URL, INGREDIENTS_POINT} from "../../utils/constants";
import {request} from "../../utils/help-methods";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredients = () => {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        request(BASE_URL + INGREDIENTS_POINT)
            .then(data => dispatch({type: GET_INGREDIENTS_SUCCESS, ingredients: data.data}))
            .catch(() => dispatch({type: GET_INGREDIENTS_FAILED}));
    }
}