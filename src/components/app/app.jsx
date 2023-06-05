import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import AppPanel from "../app-panel/app-panel";
import app from './app.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";

function App() {
    const dispatch = useDispatch();
    const error = useSelector(store => store.ingredients.ingredientsFailed);

    useEffect(() =>{
        dispatch(getIngredients());
    }, [dispatch]);
    return (
        <>
            <AppHeader/>
            <main className={app.main}>
                {error ?
                    <h1>Ошибка! </h1> :
                    <AppPanel />
                }
            </main>
        </>
    );
}

export default App;
