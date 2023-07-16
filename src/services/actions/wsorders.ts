import {
    WS_ORDERS_CONNECTION_CLOSED,
    WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_CONNECTION_START,
    WS_ORDERS_CONNECTION_SUCCESS, WS_ORDERS_GET_INFO, WS_ORDERS_SEND_INFO
} from "./constants/ws-orders";
import {Order} from "../types/data";

export interface WSOrdersConnectionStartAction {
    readonly type: typeof WS_ORDERS_CONNECTION_START;
}

export interface WSOrdersConnectionSuccessAction {
    readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS;
}

export interface WSOrdersConnectionErrorAction {
    readonly type: typeof WS_ORDERS_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface WSOrdersGetInfoAction {
    readonly type: typeof WS_ORDERS_GET_INFO;
    readonly orders: Order[];
}

export interface WSOrdersSendInfoAction {
    readonly type: typeof WS_ORDERS_SEND_INFO;
}

export interface WSOrdersConnectionClosedAction {
    readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
}

export type WSOrdersActions =
    | WSOrdersConnectionStartAction
    | WSOrdersConnectionSuccessAction
    | WSOrdersConnectionErrorAction
    | WSOrdersGetInfoAction
    | WSOrdersSendInfoAction
    | WSOrdersConnectionClosedAction;
