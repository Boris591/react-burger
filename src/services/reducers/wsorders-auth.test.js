import * as types from "../actions/constants/ws-orders-auth";
import {wsOrdersAuthReducer} from "./wsorders-auth";

const initialState = {
    wsConnected: false,
    total: 0,
    totalToday: 0,
    messages: [],
    ordersAll: []
};

describe('wsOrdersAuthReducer', () => {
    it('should return initialState', () => {
        expect(wsOrdersAuthReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle WS_ORDERS_CONNECTION_SUCCESS_AUTH', () => {
        const action = {
            type: types.WS_ORDERS_CONNECTION_SUCCESS_AUTH
        };
        const nextState = wsOrdersAuthReducer(initialState, action);
        expect(nextState.error).toBe(undefined);
        expect(nextState.wsConnected).toBe(true);
    });

    it('should handle WS_ORDERS_CONNECTION_ERROR_AUTH', () => {
        const action = {
            type: types.WS_ORDERS_CONNECTION_ERROR_AUTH,
            payload: 'error'
        };
        const nextState = wsOrdersAuthReducer(initialState, action);
        expect(nextState.error).toBe('error');
        expect(nextState.wsConnected).toBe(false);
    });

    it('should handle WS_ORDERS_CONNECTION_CLOSED_AUTH', () => {
        const action = {
            type: types.WS_ORDERS_CONNECTION_CLOSED_AUTH
        };
        const nextState = wsOrdersAuthReducer(initialState, action);
        expect(nextState.error).toBe(undefined);
        expect(nextState.wsConnected).toBe(false);
    });

    it('should handle WS_ORDERS_GET_INFO_AUTH', () => {
        const action = {
            type: types.WS_ORDERS_GET_INFO_AUTH,
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
        const nextState = wsOrdersAuthReducer(initialState, action);
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
