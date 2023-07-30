import * as types from "../actions/constants/order";
import {orderReducer} from "./order";

const initialState = {
    number: '',
    orderRequest: false,
    orderFailed: false
};

describe('orderReducer', () => {
    it('should return initialState', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_ORDER_REQUEST', () => {
        const action = {
            type: types.GET_ORDER_REQUEST
        };
        const nextState = orderReducer(initialState, action);
        expect(nextState.orderRequest).toBe(true);
    });

    it('should handle GET_ORDER_SUCCESS', () => {
        const action = {
            type: types.GET_ORDER_SUCCESS,
            number: 12345
        };
        const nextState = orderReducer(initialState, action);
        expect(nextState.orderRequest).toBe(false);
        expect(nextState.orderFailed).toBe(false);
        expect(nextState.number).toBe(12345);
    });

    it('should handle GET_ORDER_FAILED', () => {
        const action = {
            type: types.GET_ORDER_FAILED
        };
        const nextState = orderReducer(initialState, action);
        expect(nextState.orderRequest).toBe(false);
        expect(nextState.orderFailed).toBe(true);
    });

    it('should handle RESET_ORDER_NUMBER', () => {
        const action = {
            type: types.RESET_ORDER_NUMBER
        };
        const nextState = orderReducer(initialState, action);
        expect(nextState.number).toBe('');
    });

});
