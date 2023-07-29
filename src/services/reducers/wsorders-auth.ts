import {Order} from "../types/data";
import {
    WS_ORDERS_CONNECTION_CLOSED_AUTH,
    WS_ORDERS_CONNECTION_ERROR_AUTH,
    WS_ORDERS_CONNECTION_SUCCESS_AUTH, WS_ORDERS_GET_INFO_AUTH
} from "../actions/constants/ws-orders-auth";
import {WSOrdersActionsAuth} from "../actions/wsorders-auth";

type WSOrdersStateAuth = {
    wsConnected: boolean;
    messages: any;
    total: number;
    totalToday: number;
    ordersAll: Order[];
    error?: Event;
}

const initialState: WSOrdersStateAuth = {
    wsConnected: false,
    total: 0,
    totalToday: 0,
    messages: [],
    ordersAll: []
};

export const wsOrdersAuthReducer = (state = initialState, action: WSOrdersActionsAuth) => {
    switch (action.type) {
        case WS_ORDERS_CONNECTION_SUCCESS_AUTH:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        case WS_ORDERS_CONNECTION_ERROR_AUTH:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_ORDERS_CONNECTION_CLOSED_AUTH:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };
        case WS_ORDERS_GET_INFO_AUTH:
            return {
                ...state,
                error: undefined,
                ordersAll: action.orders,
                total: action.total,
                totalToday: action.totalToday,
            };
        default:
            return state;
    }
};
