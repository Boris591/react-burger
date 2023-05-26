import {ADD_ELEMENT, DELETE_ELEMENT, UPDATE_ITEMS, UPDATE_PRICE} from "../actions/construct";

const initialState = {
    items: [],
    price: 0
};

export const constructReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_ELEMENT: {
            return { ...state, items: [...state.items].filter(item => item.id !== action.id) };
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
