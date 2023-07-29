import {ADD_ELEMENT, DELETE_ELEMENT, UPDATE_BUNS, UPDATE_ITEMS, UPDATE_PRICE} from "./constants/construct";

export interface AddElementAction {
    readonly type: typeof ADD_ELEMENT;
    readonly item: any
}

export interface DeleteElementAction {
    readonly type: typeof DELETE_ELEMENT;
    readonly dragId: string
}

export interface UpdatePriceAction {
    readonly type: typeof UPDATE_PRICE;
    readonly price: number
}

export interface UpdateItemsAction {
    readonly type: typeof UPDATE_ITEMS;
    readonly items: any
}

export interface UpdateBunsAction {
    readonly type: typeof UPDATE_BUNS;
    readonly buns: any
}

export type ConstructActions =
    | AddElementAction
    | DeleteElementAction
    | UpdatePriceAction
    | UpdateItemsAction
    | UpdateBunsAction;
