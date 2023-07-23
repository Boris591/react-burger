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

export interface IngredientOrder extends Ingredient {
    count: number
}

export interface Order {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: 'created' | 'done' | 'pending';
    _id: string;
    [key: string]: any;
}

export type wsActionsOrdersType = {
    wsOrdersStart: string,
    wsOrdersSuccess: string,
    wsOrdersClose: string,
    wsOrdersError: string,
    wsOrdersGetInfo: string,
    wsOrdersSendInfo: string
};
