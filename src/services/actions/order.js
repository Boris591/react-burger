import {request} from "../../utils/help-methods";
import {BASE_URL, ORDER_POINT} from "../../utils/constants";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const RESET_ORDER_NUMBER = 'RESET_ORDER_NUMBER';

export const getOrder = (ids) => {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });

        request(BASE_URL + ORDER_POINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ids),
        })
            .then(data => {
                dispatch({type: GET_ORDER_SUCCESS, number: data.order.number})
            })
            .catch(() => dispatch({type: GET_ORDER_FAILED}));
    }
}
