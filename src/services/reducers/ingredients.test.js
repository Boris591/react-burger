import * as types from "../actions/constants/ingredients";
import {ingredientsReducer, initialState} from "./ingredients";
import {ingredientBun, ingredientItem} from "../../utils/dataTest";

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
                ingredientBun
            ]
        };
        const nextState = ingredientsReducer(initialState, action);
        expect(nextState.ingredientsRequest).toBe(false);
        expect(nextState.ingredientsFailed).toBe(false);
        expect(nextState.ingredients).toEqual([
            ingredientBun
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
            ingredientBun,
            ingredientItem
        ];
        const nextState = ingredientsReducer(newState, action);
        expect(nextState.ingredients).toEqual([
            ingredientBun,
            {...ingredientItem, count: ingredientItem.count++}
        ])
    });

    it('should handle DECREASE_COUNT_INGREDIENT', () => {
        const action = {
            type: types.DECREASE_COUNT_INGREDIENT,
            id: '60666c42cc7b410027a1a9b5'
        };
        const newState = initialState;
        newState.ingredients = [
            ingredientBun,
            ingredientItem
        ];
        const nextState = ingredientsReducer(newState, action);
        expect(nextState.ingredients).toEqual([
            ingredientBun,
            {...ingredientItem, count: ingredientItem.count--},
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
            ingredientBun,
            ingredientItem
        ];
        const nextState = ingredientsReducer(newState, action);
        expect(nextState.ingredients).toEqual([
            ingredientBun,
            {...ingredientItem, count: 0},
        ])
    });

    it('should handle UPDATE_INGREDIENT_INFO', () => {
        const action = {
            type: types.UPDATE_INGREDIENT_INFO,
            info: ingredientItem
        };

        const nextState = ingredientsReducer(initialState, action);
        expect(nextState.ingredientInfo).toEqual(ingredientItem)
    });

})
