import {constructReducer} from "./construct";
import * as types from "../actions/constants/construct";

const initialState = {
    items: [],
    buns: [],
    price: 0
};

describe('constructReducer', () => {
    it('should return initialState', () => {
        expect(constructReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle DELETE_ELEMENT', () => {
        const action = {
            type: types.DELETE_ELEMENT,
            dragId: "35da0e51-4740-426d-81c0-dd8832246df8",
        }
        const newState = initialState;
        newState.items = [
            {
                id: "643d69a5c3f7b9001cfa0942",
                img: "https://code.s3.yandex.net/react/code/sauce-02.png",
                price: 90,
                name: "Соус Spicy-X",
                type: "sauce",
                image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                count: 0,
                dragId: "35da0e51-4740-426d-81c0-dd8832246df8"
            },
            {
                id: "643d69a5c3f7b9001cfa0942",
                img: "https://code.s3.yandex.net/react/code/sauce-02.png",
                price: 90,
                name: "Соус Spicy-X",
                type: "sauce",
                image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                count: 0,
                dragId: "4eabac7c-269a-456f-97c1-cce495471774"
            },
            {
                id: "643d69a5c3f7b9001cfa0941",
                img: "https://code.s3.yandex.net/react/code/meat-01.png",
                price: 424,
                name: "Биокотлета из марсианской Магнолии",
                type: "main",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                count: 0,
                dragId: "4b14e1da-1780-4096-9a25-f2c2b4e88f3f"
            }];
        const nextState = constructReducer(newState, action);
        expect(nextState.items).toEqual([
            {
                id: "643d69a5c3f7b9001cfa0942",
                img: "https://code.s3.yandex.net/react/code/sauce-02.png",
                price: 90,
                name: "Соус Spicy-X",
                type: "sauce",
                image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                count: 0,
                dragId: "4eabac7c-269a-456f-97c1-cce495471774"
            },
            {
                id: "643d69a5c3f7b9001cfa0941",
                img: "https://code.s3.yandex.net/react/code/meat-01.png",
                price: 424,
                name: "Биокотлета из марсианской Магнолии",
                type: "main",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                count: 0,
                dragId: "4b14e1da-1780-4096-9a25-f2c2b4e88f3f"
            }
        ]);
    });

    it('should handle ADD_ELEMENT', () => {
        const action = {
            type: types.ADD_ELEMENT,
            item: {
                id: "643d69a5c3f7b9001cfa0942",
                img: "https://code.s3.yandex.net/react/code/sauce-02.png",
                price: 90,
                name: "Соус Spicy-X",
                type: "sauce",
                image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                count: 0,
                dragId: "35da0e51-4740-426d-81c0-dd8832246df8"
            },
        }
        const newState = initialState;
        newState.items = [
            {
                id: "643d69a5c3f7b9001cfa0942",
                img: "https://code.s3.yandex.net/react/code/meat-01.png",
                price: 424,
                name: "Биокотлета из марсианской Магнолии",
                type: "main",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                count: 0,
                dragId: "35da0e51-4740-426d-81c0-dd8832246df8"
            },
        ];
        const nextState = constructReducer(newState, action);
        expect(nextState.items).toEqual([
            {
                id: "643d69a5c3f7b9001cfa0942",
                img: "https://code.s3.yandex.net/react/code/meat-01.png",
                price: 424,
                name: "Биокотлета из марсианской Магнолии",
                type: "main",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                count: 0,
                dragId: "35da0e51-4740-426d-81c0-dd8832246df8"
            },
            {
                id: "643d69a5c3f7b9001cfa0942",
                img: "https://code.s3.yandex.net/react/code/sauce-02.png",
                price: 90,
                name: "Соус Spicy-X",
                type: "sauce",
                image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                count: 0,
                dragId: "35da0e51-4740-426d-81c0-dd8832246df8"
            }
        ]);
    });

    it('should handle UPDATE_ITEMS', () => {
        const action = {
            type: types.UPDATE_ITEMS,
            items: [
                {
                    id: "643d69a5c3f7b9001cfa0942",
                    img: "https://code.s3.yandex.net/react/code/sauce-02.png",
                    price: 90,
                    name: "Соус Spicy-X",
                    type: "sauce",
                    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                    count: 0,
                    dragId: "4eabac7c-269a-456f-97c1-cce495471774"
                },
                {
                    id: "643d69a5c3f7b9001cfa0941",
                    img: "https://code.s3.yandex.net/react/code/meat-01.png",
                    price: 424,
                    name: "Биокотлета из марсианской Магнолии",
                    type: "main",
                    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                    count: 0,
                    dragId: "4b14e1da-1780-4096-9a25-f2c2b4e88f3f"
                }
            ]
        }
        const nextState = constructReducer(initialState, action);
        expect(nextState.items).toEqual([
            {
                id: "643d69a5c3f7b9001cfa0942",
                img: "https://code.s3.yandex.net/react/code/sauce-02.png",
                price: 90,
                name: "Соус Spicy-X",
                type: "sauce",
                image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                count: 0,
                dragId: "4eabac7c-269a-456f-97c1-cce495471774"
            },
            {
                id: "643d69a5c3f7b9001cfa0941",
                img: "https://code.s3.yandex.net/react/code/meat-01.png",
                price: 424,
                name: "Биокотлета из марсианской Магнолии",
                type: "main",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                count: 0,
                dragId: "4b14e1da-1780-4096-9a25-f2c2b4e88f3f"
            }
        ]);
    });

    it('should handle UPDATE_BUNS', () => {
        const action = {
            type: types.UPDATE_BUNS,
            buns: [
                {
                    id: "643d69a5c3f7b9001cfa093c",
                    img: "https://code.s3.yandex.net/react/code/bun-02.png",
                    price: 1255,
                    name: "Краторная булка N-200i",
                    type: "bun",
                    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                    count: 0
                },
                {
                    id: "643d69a5c3f7b9001cfa093c",
                    img: "https://code.s3.yandex.net/react/code/bun-02.png",
                    price: 1255,
                    name: "Краторная булка N-200i",
                    type: "bun",
                    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                    count: 0
                }
            ]
        };
        const nextState = constructReducer(initialState, action);
        expect(nextState.buns).toEqual([
            {
                id: "643d69a5c3f7b9001cfa093c",
                img: "https://code.s3.yandex.net/react/code/bun-02.png",
                price: 1255,
                name: "Краторная булка N-200i",
                type: "bun",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                count: 0
            },
            {
                id: "643d69a5c3f7b9001cfa093c",
                img: "https://code.s3.yandex.net/react/code/bun-02.png",
                price: 1255,
                name: "Краторная булка N-200i",
                type: "bun",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                count: 0
            }
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
