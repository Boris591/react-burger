import {getCookie} from "../../utils/help-methods";
import {BASE_URL, ORDER_POINT} from "../../utils/constants";
import {fetchWithRefresh} from "./auth";
import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, RESET_ORDER_NUMBER} from "./constants/order";
import {AppDispatch} from "../types";

export interface GetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface GetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly number: number
}

export interface GetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

export interface ResetOrderNumberAction {
    readonly type: typeof RESET_ORDER_NUMBER;
    readonly number: ''
}

export type OrderActions =
    | GetOrderRequestAction
    | GetOrderSuccessAction
    | GetOrderFailedAction
    | ResetOrderNumberAction;


export const getOrder = (ids: {ingredients: string[] }) => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });

        fetchWithRefresh(BASE_URL + ORDER_POINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie('accessToken')
            },
            body: JSON.stringify(ids),
        })
            .then(data => {
                dispatch({type: GET_ORDER_SUCCESS, number: data.order.number})
            })
            .catch(() => dispatch({type: GET_ORDER_FAILED}));
    }
}
