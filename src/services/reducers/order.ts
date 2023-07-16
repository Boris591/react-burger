import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, RESET_ORDER_NUMBER} from "../actions/constants/order";
import {OrderActions} from "../actions/order";

type OrderState = {
    number: number | '',
    orderRequest: boolean,
    orderFailed: boolean,
}

const initialState: OrderState = {
    number: '',
    orderRequest: false,
    orderFailed: false,
};

export const orderReducer = (state = initialState, action: OrderActions) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: false,
                number: action.number
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
            };
        }
        case RESET_ORDER_NUMBER: {
            return {
                ...state,
                number: ''
            };
        }
        default: {
            return state;
        }
    }
};
