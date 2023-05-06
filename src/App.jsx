import React, {useEffect, useState} from 'react';
import AppHeader from "./components/app-header/app-header";
import AppPanel from "./components/app-panel/app-panel";
import app from './App.module.css';

function App() {
    const apiIngredients = "https://norma.nomoreparties.space/api/ingredients";
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const getProducts = async () => {
        fetch(apiIngredients)
            .then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data.data);
                }else{
                    setError(res);
                }
            }).catch(e => setError(e));
    }
    useEffect(() =>{
        getProducts();

    }, []);
    return (
        <main className={app.main}>
            <AppHeader/>
            {error ?
                <h1>Ошибка! </h1> :
                <AppPanel data={products}/>
            }

        </main>
    );
}

export default App;
