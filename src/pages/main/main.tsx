import {useSelector} from "../../services/types/hooks";
import {useDispatch} from "../../services/types/hooks";
import React, {useEffect} from "react";
import {getIngredients} from "../../services/actions/ingredients";
import main from "./main.module.css";
import AppPanel from "../../components/app-panel/app-panel";
import {getCookie} from "../../utils/help-methods";
import {getUserRequest} from "../../services/actions/auth";
import {WS_ORDERS_CONNECTION_START} from "../../services/actions/constants/ws-orders";
import {RootState} from "../../services/types";

const Main: React.FC = () => {
    const dispatch = useDispatch();
    const error = useSelector((store: RootState) => store.ingredients.ingredientsFailed);

    useEffect(() =>{
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');
        if(accessToken && refreshToken){
           dispatch(getUserRequest())
        }
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <main className={main.main}>
            {error ?
                <h1>Ошибка! </h1> :
                <AppPanel />
            }
        </main>
    );
}

export default Main;
