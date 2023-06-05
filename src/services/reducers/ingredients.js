import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_COUNT_INGREDIENT,
    DECREASE_COUNT_INGREDIENT,
    UPDATE_COUNT_INGREDIENT,
    UPDATE_INGREDIENT_INFO
} from "../actions/ingredients";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientInfo: null
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.ingredients
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false,
            };
        }
        case INCREASE_COUNT_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients].map(item =>
                    item._id === action.id ? { ...item, count: ++item.count } : item
                )
            };
        }
        case DECREASE_COUNT_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients].map(item =>
                    item._id === action.id ? { ...item, count: --item.count } : item
                )
            };
        }
        case UPDATE_COUNT_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients].map(item =>
                    item._id === action.id ? { ...item, count: action.count } : item
                )
            };
        }
        case UPDATE_INGREDIENT_INFO: {
            return {
                ...state,
               ingredientInfo: action.info
            };
        }
        default: {
            return state;
        }
    }
};
