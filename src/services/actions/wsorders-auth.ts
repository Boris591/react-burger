import {Order} from "../types/data";
import {
    WS_ORDERS_CONNECTION_CLOSED_AUTH,
    WS_ORDERS_CONNECTION_ERROR_AUTH,
    WS_ORDERS_CONNECTION_START_AUTH,
    WS_ORDERS_CONNECTION_SUCCESS_AUTH, WS_ORDERS_GET_INFO_AUTH, WS_ORDERS_SEND_INFO_AUTH
} from "./constants/ws-orders-auth";

export interface WSOrdersConnectionStartActionAuth {
    readonly type: typeof WS_ORDERS_CONNECTION_START_AUTH;
}

export interface WSOrdersConnectionSuccessActionAuth {
    readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS_AUTH;
}

export interface WSOrdersConnectionErrorActionAuth {
    readonly type: typeof WS_ORDERS_CONNECTION_ERROR_AUTH;
    readonly payload: Event;
}

export interface WSOrdersGetInfoActionAuth {
    readonly type: typeof WS_ORDERS_GET_INFO_AUTH;
    readonly orders: Order[];
    readonly total: number;
    readonly totalToday: number;
}

export interface WSOrdersSendInfoActionAuth {
    readonly type: typeof WS_ORDERS_SEND_INFO_AUTH;
}

export interface WSOrdersConnectionClosedActionAuth {
    readonly type: typeof WS_ORDERS_CONNECTION_CLOSED_AUTH;
}

export type WSOrdersActionsAuth =
    | WSOrdersConnectionStartActionAuth
    | WSOrdersConnectionSuccessActionAuth
    | WSOrdersConnectionErrorActionAuth
    | WSOrdersGetInfoActionAuth
    | WSOrdersSendInfoActionAuth
    | WSOrdersConnectionClosedActionAuth;

export const wsActionsOrdersAuth = {
    wsOrdersStart: WS_ORDERS_CONNECTION_START_AUTH,
    wsOrdersSuccess: WS_ORDERS_CONNECTION_SUCCESS_AUTH,
    wsOrdersClose: WS_ORDERS_CONNECTION_CLOSED_AUTH,
    wsOrdersError: WS_ORDERS_CONNECTION_ERROR_AUTH,
    wsOrdersGetInfo: WS_ORDERS_GET_INFO_AUTH,
    wsOrdersSendInfo: WS_ORDERS_SEND_INFO_AUTH
};
