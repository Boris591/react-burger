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
