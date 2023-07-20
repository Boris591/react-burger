import {WSOrdersActions} from "../actions/wsorders";
import {
    WS_ORDERS_CONNECTION_CLOSED,
    WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_CONNECTION_SUCCESS,
    WS_ORDERS_GET_INFO
} from "../actions/constants/ws-orders";
import {Order} from "../types/data";
import orders from "../../pages/profile/orders/orders";

type WSOrdersState = {
    wsConnected: boolean;
    messages: any;
    total: number;
    totalToday: number;
    ordersAll: Order[];
    error?: Event;
}

const initialState: WSOrdersState = {
    wsConnected: false,
    total: 0,
    totalToday: 0,
    messages: [],
    ordersAll: []
};

export const wsOrdersReducer = (state = initialState, action: WSOrdersActions) => {
    switch (action.type) {
        case WS_ORDERS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        case WS_ORDERS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_ORDERS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };
        case WS_ORDERS_GET_INFO:
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
