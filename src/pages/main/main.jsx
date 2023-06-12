import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getIngredients} from "../../services/actions/ingredients";
import main from "./main.module.css";
import AppPanel from "../../components/app-panel/app-panel";

function Main() {
    const dispatch = useDispatch();
    const error = useSelector(store => store.ingredients.ingredientsFailed);

    useEffect(() =>{
        dispatch(getIngredients());
    }, [dispatch]);
    return (
        <>
            <main className={main.main}>
                {error ?
                    <h1>Ошибка! </h1> :
                    <AppPanel />
                }
            </main>
        </>
    );
}

export default Main;
