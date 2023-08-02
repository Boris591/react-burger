import * as types from "../actions/constants/ws-orders";
import {wsOrdersReducer, initialState} from "./wsorders";

describe('wsOrdersReducer', () => {
    it('should return initialState', () => {
        expect(wsOrdersReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle WS_ORDERS_CONNECTION_SUCCESS', () => {
        const action = {
            type: types.WS_ORDERS_CONNECTION_SUCCESS
        };
        const nextState = wsOrdersReducer(initialState, action);
        expect(nextState.error).toBe(undefined);
        expect(nextState.wsConnected).toBe(true);
    });

    it('should handle WS_ORDERS_CONNECTION_ERROR', () => {
        const action = {
            type: types.WS_ORDERS_CONNECTION_ERROR,
            payload: 'error'
        };
        const nextState = wsOrdersReducer(initialState, action);
        expect(nextState.error).toBe('error');
        expect(nextState.wsConnected).toBe(false);
    });

    it('should handle WS_ORDERS_CONNECTION_CLOSED', () => {
        const action = {
            type: types.WS_ORDERS_CONNECTION_CLOSED
        };
        const nextState = wsOrdersReducer(initialState, action);
        expect(nextState.error).toBe(undefined);
        expect(nextState.wsConnected).toBe(false);
    });

    it('should handle WS_ORDERS_GET_INFO', () => {
        const action = {
            type: types.WS_ORDERS_GET_INFO,
            total: 400,
            totalToday: 50,
            orders: [
                {
                    _id: '64c69d6482e277001bfa59c1',
                    ingredients: [
                        '643d69a5c3f7b9001cfa093c',
                        '643d69a5c3f7b9001cfa0944',
                        '643d69a5c3f7b9001cfa0940',
                        '643d69a5c3f7b9001cfa093c'
                    ],
                    status: 'done',
                    name: 'Традиционный-галактический метеоритный краторный бургер',
                    createdAt: '2023-07-30T17:27:00.725Z',
                    updatedAt: '2023-07-30T17:27:00.888Z',
                    number: 15144
                }
            ]
        };
        const nextState = wsOrdersReducer(initialState, action);
        expect(nextState.error).toBe(undefined);
        expect(nextState.total).toBe(400);
        expect(nextState.totalToday).toBe(50);
        expect(nextState.ordersAll).toEqual(
            [
                {
                    _id: '64c69d6482e277001bfa59c1',
                    ingredients: [
                        '643d69a5c3f7b9001cfa093c',
                        '643d69a5c3f7b9001cfa0944',
                        '643d69a5c3f7b9001cfa0940',
                        '643d69a5c3f7b9001cfa093c'
                    ],
                    status: 'done',
                    name: 'Традиционный-галактический метеоритный краторный бургер',
                    createdAt: '2023-07-30T17:27:00.725Z',
                    updatedAt: '2023-07-30T17:27:00.888Z',
                    number: 15144
                }
            ]
        );
    });
});
