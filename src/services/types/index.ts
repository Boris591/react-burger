import {store} from "../store";
import {AuthActions} from "../actions/auth";
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";
import {ConstructActions} from "../actions/construct";
import {IngredientsActions} from "../actions/ingredients";
import {OrderActions} from "../actions/order";

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type ApplicationActions = AuthActions | ConstructActions | IngredientsActions | OrderActions;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, ApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;
