import {constructReducer, initialState} from "./construct";
import * as types from "../actions/constants/construct";
import {testItem, bun} from "../../utils/dataTest";

describe('constructReducer', () => {
    it('should return initialState', () => {
        expect(constructReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle DELETE_ELEMENT', () => {
        const newItem = {...testItem, dragId: "4b14e1da-1780-4096-9a25-f2c2b4e88f3f"};
        const action = {
            type: types.DELETE_ELEMENT,
            dragId: "35da0e51-4740-426d-81c0-dd8832246df8",
        }
        const newState = initialState;
        newState.items = [
            testItem,
            newItem
        ];
        const nextState = constructReducer(newState, action);
        expect(nextState.items).toEqual([
            newItem
        ]);
    });

    it('should handle ADD_ELEMENT', () => {
        const action = {
            type: types.ADD_ELEMENT,
            item: testItem,
        }
        const newState = initialState;
        newState.items = [testItem];
        const nextState = constructReducer(newState, action);
        expect(nextState.items).toEqual([
            testItem,
            testItem
        ]);
    });

    it('should handle UPDATE_ITEMS', () => {
        const action = {
            type: types.UPDATE_ITEMS,
            items: [
                testItem,
                {...testItem, dragId: "4b14e1da-1780-4096-9a25-f2c2b4e88f3f"}
            ]
        }
        const nextState = constructReducer(initialState, action);
        expect(nextState.items).toEqual([
            testItem,
            {...testItem, dragId: "4b14e1da-1780-4096-9a25-f2c2b4e88f3f"}
        ]);
    });

    it('should handle UPDATE_BUNS', () => {
        const action = {
            type: types.UPDATE_BUNS,
            buns: [
                bun,
                bun
            ]
        };
        const nextState = constructReducer(initialState, action);
        expect(nextState.buns).toEqual([
            bun,
            bun
        ]);
    });

    it('should handle UPDATE_PRICE', () => {
        const action = {
            type: types.UPDATE_PRICE,
            price: 1255
        };
        const nextState = constructReducer(initialState, action);
        expect(nextState.price).toBe(1255);
    });
});
