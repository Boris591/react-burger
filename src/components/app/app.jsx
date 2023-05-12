import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import AppPanel from "../app-panel/app-panel";
import app from './app.module.css';
import {BASE_URL, INGREDIENTS_POINT} from "../../utils/constants";
import {getElements} from "../../utils/api-methods";
import {BurgerContext} from "../../services/burger-context";

function App() {
    const ingredients_url = BASE_URL + INGREDIENTS_POINT;
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() =>{
        getElements(setProducts, setError, ingredients_url);
    }, []);
    return (
        <>
            <AppHeader/>
            <main className={app.main}>
                {error ?
                    <h1>Ошибка! </h1> :
                    <BurgerContext.Provider value={products}>
                        <AppPanel />
                    </BurgerContext.Provider>
                }
            </main>
        </>
    );
}

export default App;
