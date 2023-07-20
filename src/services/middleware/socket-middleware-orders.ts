import type {AnyAction, Middleware, MiddlewareAPI} from 'redux';

import type { ApplicationActions, AppDispatch, RootState } from '../types';
import {
    WS_ORDERS_CONNECTION_CLOSED,
    WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_CONNECTION_START,
    WS_ORDERS_CONNECTION_SUCCESS, WS_ORDERS_GET_INFO, WS_ORDERS_SEND_INFO
} from "../actions/constants/ws-orders";
import {wsActionsOrders, WSOrdersActions} from "../actions/wsorders";
import {getCookie} from "../../utils/help-methods";
import {wsActionsOrdersType} from "../types/data";

export const socketMiddlewareOrders = (wsUrl: string, auth: boolean, wsActions: wsActionsOrdersType = wsActionsOrders): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next: (item: AnyAction) => void) => (action: AnyAction) => {
            const {dispatch} = store;
            const { type, payload } = action;


            if (type === WS_ORDERS_CONNECTION_START) {
                if(auth){
                    socket = new WebSocket(`${wsUrl}?token=${getCookie('accessToken')}`);
                }else{
                    socket = new WebSocket(wsUrl);
                }
            }
            if (socket) {
                // функция, которая вызывается при открытии сокета
                socket.onopen = event => {
                    dispatch({ type: WS_ORDERS_CONNECTION_SUCCESS, payload: event });
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {
                    dispatch({ type: WS_ORDERS_CONNECTION_ERROR, payload: event });
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = event => {
                    const { data } = event;
                    dispatch({
                        type: WS_ORDERS_GET_INFO,
                        orders: JSON.parse(data).orders,
                        total: JSON.parse(data).total,
                        totalToday: JSON.parse(data).totalToday
                    });
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = event => {
                    dispatch({ type: WS_ORDERS_CONNECTION_CLOSED, payload: event });
                };

                if (type === WS_ORDERS_CONNECTION_CLOSED) {
                    socket.close();
                }

                if (type === WS_ORDERS_SEND_INFO) {
                    const token = getCookie('accessToken');
                    socket.send(JSON.stringify({
                        ...payload,
                        //token: token
                    }));
                }
            }

            next(action);
        };
    }) as Middleware;
};
