import {AuthActions} from "../actions/auth";
import {Action, ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {ConstructActions} from "../actions/construct";
import {IngredientsActions} from "../actions/ingredients";
import {OrderActions} from "../actions/order";
import {WSOrdersActions} from "../actions/wsorders";
import {store} from "../../index";

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
export type ApplicationActions = AuthActions | ConstructActions | IngredientsActions | OrderActions | WSOrdersActions;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, ApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = Dispatch<ApplicationActions>;
