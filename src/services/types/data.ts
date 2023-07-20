import {
    WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_CONNECTION_START,
    WS_ORDERS_CONNECTION_SUCCESS, WS_ORDERS_GET_INFO
} from "../actions/constants/ws-orders";

export interface User {
    name: string;
    email: string;
    password: string;
    [key: string]: any;
};

export interface Ingredient {
    _id: string;
    name: string;
    type: "main" | "bun";
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    [key: string]: any;
}

export interface Order {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    _id: string;
    [key: string]: any;
}

export type wsActionsOrdersType = {
    wsOrdersStart: string,
    wsOrdersSuccess: string,
    wsOrdersClose: string,
    wsOrdersError: string,
    wsOrdersGetInfo: string
};
