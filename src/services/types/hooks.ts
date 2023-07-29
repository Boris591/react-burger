import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import {AppDispatch, AppThunk, RootState} from "./index";


// Теперь этот хук «знает» структуру хранилища
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
// @ts-ignore
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
