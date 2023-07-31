import {ADD_ELEMENT, DELETE_ELEMENT, UPDATE_BUNS, UPDATE_ITEMS, UPDATE_PRICE} from "../actions/constants/construct";
import {ConstructActions} from "../actions/construct";

type ConstructState = {
    items: any[],
    buns: any[];
    price: number;
}

export const initialState: ConstructState = {
    items: [],
    buns: [],
    price: 0
};

export const constructReducer = (state = initialState, action: ConstructActions) => {
    switch (action.type) {
        case DELETE_ELEMENT: {
            return { ...state, items: [...state.items].filter(item => item.dragId !== action.dragId) };
        }
        case ADD_ELEMENT: {
            return {
                ...state,
                items: [...state.items, action.item]
            };
        }
        case UPDATE_ITEMS: {
            return {
                ...state,
                items: action.items
            };
        }
        case UPDATE_BUNS: {
            return {
                ...state,
                buns: action.buns
            };
        }
        case UPDATE_PRICE: {
            return {
                ...state,
                price: action.price
            };
        }
        default: {
            return state;
        }
    }
};
