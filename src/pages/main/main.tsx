import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getIngredients} from "../../services/actions/ingredients";
import main from "./main.module.css";
import AppPanel from "../../components/app-panel/app-panel";
import {getCookie} from "../../utils/help-methods";
import {getUserRequest} from "../../services/actions/auth";
import {WS_ORDERS_CONNECTION_START} from "../../services/actions/constants/ws-orders";

const Main: React.FC = () => {
    const dispatch = useDispatch();
    const error = useSelector((store: any) => store.ingredients.ingredientsFailed);

    useEffect(() =>{
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');
        if(accessToken && refreshToken){
            // @ts-ignore
            dispatch(getUserRequest())
        }
        // @ts-ignore
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
