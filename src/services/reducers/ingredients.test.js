import * as types from "../actions/constants/ingredients";
import {ingredientsReducer} from "./ingredients";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientInfo: null
};

describe('ingredientsReducer', () => {
    it('should return initialState', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        const action = {
            type: types.GET_INGREDIENTS_REQUEST
        };
        const nextState = ingredientsReducer(initialState, action);
        expect(nextState.ingredientsRequest).toBe(true);
    });

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        const action = {
            type: types.GET_INGREDIENTS_SUCCESS,
            ingredients: [
                {
                    "_id":"60666c42cc7b410027a1a9b1",
                    "name":"Краторная булка N-200i",
                    "type":"bun",
                    "proteins":80,
                    "fat":24,
                    "carbohydrates":53,
                    "calories":420,
                    "price":1255,
                    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                    "__v":0
                }
            ]
        };
        const nextState = ingredientsReducer(initialState, action);
        expect(nextState.ingredientsRequest).toBe(false);
        expect(nextState.ingredientsFailed).toBe(false);
        expect(nextState.ingredients).toEqual([
            {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
            }
        ])
    });

    it('should handle GET_INGREDIENTS_FAILED', () => {
        const action = {
            type: types.GET_INGREDIENTS_FAILED
        };
        const nextState = ingredientsReducer(initialState, action);
        expect(nextState.ingredientsRequest).toBe(false);
        expect(nextState.ingredientsFailed).toBe(true);
    });

    it('should handle INCREASE_COUNT_INGREDIENT', () => {
        const action = {
            type: types.INCREASE_COUNT_INGREDIENT,
            id: '60666c42cc7b410027a1a9b5'
        };
        const newState = initialState;
        newState.ingredients = [
            {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "count": 0,
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
            },
            {
                "_id":"60666c42cc7b410027a1a9b5",
                "name":"Говяжий метеорит (отбивная)",
                "type":"main",
                "count": 2,
                "proteins":800,
                "fat":800,
                "carbohydrates":300,
                "calories":2674,
                "price":3000,
                "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                "__v":0
            },
        ];
        const nextState = ingredientsReducer(newState, action);
        expect(nextState.ingredients).toEqual([
            {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "count": 0,
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
            },
            {
                "_id":"60666c42cc7b410027a1a9b5",
                "name":"Говяжий метеорит (отбивная)",
                "type":"main",
                "count": 3,
                "proteins":800,
                "fat":800,
                "carbohydrates":300,
                "calories":2674,
                "price":3000,
                "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                "__v":0
            },
        ])
    });

    it('should handle DECREASE_COUNT_INGREDIENT', () => {
        const action = {
            type: types.DECREASE_COUNT_INGREDIENT,
            id: '60666c42cc7b410027a1a9b5'
        };
        const newState = initialState;
        newState.ingredients = [
            {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "count": 0,
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
            },
            {
                "_id":"60666c42cc7b410027a1a9b5",
                "name":"Говяжий метеорит (отбивная)",
                "type":"main",
                "count": 3,
                "proteins":800,
                "fat":800,
                "carbohydrates":300,
                "calories":2674,
                "price":3000,
                "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                "__v":0
            },
        ];
        const nextState = ingredientsReducer(newState, action);
        expect(nextState.ingredients).toEqual([
            {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "count": 0,
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
            },
            {
                "_id":"60666c42cc7b410027a1a9b5",
                "name":"Говяжий метеорит (отбивная)",
                "type":"main",
                "count": 2,
                "proteins":800,
                "fat":800,
                "carbohydrates":300,
                "calories":2674,
                "price":3000,
                "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                "__v":0
            },
        ])
    });

    it('should handle UPDATE_COUNT_INGREDIENT', () => {
        const action = {
            type: types.UPDATE_COUNT_INGREDIENT,
            id: '60666c42cc7b410027a1a9b5',
            count: 0
        };
        const newState = initialState;
        newState.ingredients = [
            {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "count": 0,
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
            },
            {
                "_id":"60666c42cc7b410027a1a9b5",
                "name":"Говяжий метеорит (отбивная)",
                "type":"main",
                "count": 1,
                "proteins":800,
                "fat":800,
                "carbohydrates":300,
                "calories":2674,
                "price":3000,
                "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                "__v":0
            },
        ];
        const nextState = ingredientsReducer(newState, action);
        expect(nextState.ingredients).toEqual([
            {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "count": 0,
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
            },
            {
                "_id":"60666c42cc7b410027a1a9b5",
                "name":"Говяжий метеорит (отбивная)",
                "type":"main",
                "count": 0,
                "proteins":800,
                "fat":800,
                "carbohydrates":300,
                "calories":2674,
                "price":3000,
                "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                "__v":0
            },
        ])
    });

    it('should handle UPDATE_INGREDIENT_INFO', () => {
        const action = {
            type: types.UPDATE_INGREDIENT_INFO,
            info: {
                "_id":"60666c42cc7b410027a1a9b5",
                "name":"Говяжий метеорит (отбивная)",
                "type":"main",
                "proteins":800,
                "fat":800,
                "carbohydrates":300,
                "calories":2674,
                "price":3000,
                "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                "__v":0,
                "count": 0
            },
        };

        const nextState = ingredientsReducer(initialState, action);
        expect(nextState.ingredientInfo).toEqual({
            "_id":"60666c42cc7b410027a1a9b5",
            "name":"Говяжий метеорит (отбивная)",
            "type":"main",
            "proteins":800,
            "fat":800,
            "carbohydrates":300,
            "calories":2674,
            "price":3000,
            "image":"https://code.s3.yandex.net/react/code/meat-04.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
            "__v":0,
            "count": 0
        })
    });

})
