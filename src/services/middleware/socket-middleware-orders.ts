import type {AnyAction, MiddlewareAPI} from 'redux';
import {getCookie} from "../../utils/help-methods";
import {wsActionsOrdersType} from "../types/data";

export const socketMiddlewareOrders =  (wsUrl: string, wsActions: wsActionsOrdersType, auth: boolean) =>
    (store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;
        return (next: (item: AnyAction) => void) => (action: AnyAction) => {
            const {dispatch} = store;
            const { type, payload } = action;
            const { wsOrdersStart, wsOrdersSuccess, wsOrdersClose, wsOrdersError, wsOrdersGetInfo, wsOrdersSendInfo } = wsActions;

            if (type === wsOrdersStart) {
                if(auth){
                    const tk = getCookie('accessToken');
                    console.log(auth, `${wsUrl}?token=${tk?.replace('Bearer ', '')}`);
                    socket = new WebSocket(`${wsUrl}?token=${tk?.replace('Bearer ', '')}`);
                }else{
                    socket = new WebSocket(wsUrl);
                }
            }
            if (socket) {
                // функция, которая вызывается при открытии сокета
                socket.onopen = event => {
                    dispatch({ type: wsOrdersSuccess, payload: event });
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {
                    dispatch({ type: wsOrdersError, payload: event });
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = event => {
                    const { data } = event;
                    console.log(wsOrdersGetInfo);
                    dispatch({
                        type: wsOrdersGetInfo,
                        orders: JSON.parse(data).orders,
                        total: JSON.parse(data).total,
                        totalToday: JSON.parse(data).totalToday
                    });
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = event => {
                    dispatch({ type: wsOrdersClose, payload: event });
                };

                if (type === wsOrdersClose) {
                    socket.close();
                }

                if (type === wsOrdersSendInfo) {
                    const token = getCookie('accessToken');
                    socket.send(JSON.stringify({
                        ...payload,
                        token: token
                    }));
                }
            }

            next(action);
        };
};
