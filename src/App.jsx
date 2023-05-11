import React, {useEffect, useState} from 'react';
import AppHeader from "./components/app-header/app-header";
import AppPanel from "./components/app-panel/app-panel";
import app from './App.module.css';
import {apiIngredients} from "./utils/constants";
import {getElements} from "./utils/api-methods";
import {BurgerContext} from "./services/burger-context";

function App() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() =>{
        getElements(setProducts, setError, apiIngredients);
    }, []);
    return (
        <main className={app.main}>
            <AppHeader/>
            {error ?
                <h1>Ошибка! </h1> :
                <BurgerContext.Provider value={products}>
                    <AppPanel />
                </BurgerContext.Provider>
            }

        </main>
    );
}

export default App;
