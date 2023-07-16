import type { Middleware, MiddlewareAPI } from 'redux';

import type { ApplicationActions, AppDispatch, RootState } from '../types';
import {
    WS_ORDERS_CONNECTION_CLOSED,
    WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_CONNECTION_START,
    WS_ORDERS_CONNECTION_SUCCESS, WS_ORDERS_GET_INFO, WS_ORDERS_SEND_INFO
} from "../actions/constants/ws-orders";

export const socketMiddlewareOrders = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: ApplicationActions) => {
            const { dispatch, getState } = store;
            const { type } = action;


            if (type === WS_ORDERS_CONNECTION_START) {
                socket = new WebSocket(wsUrl);
                console.log(socket);
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
                    console.log(JSON.parse(data).orders);
                    dispatch({ type: WS_ORDERS_GET_INFO, orders: JSON.parse(data).orders });
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = event => {
                    dispatch({ type: WS_ORDERS_CONNECTION_CLOSED, payload: event });
                };

                if (type === WS_ORDERS_SEND_INFO) {
                    //const message = payload;
                    // функция для отправки сообщения на сервер
                    //socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};
