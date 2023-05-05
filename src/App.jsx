import React, {useEffect, useState} from 'react';
import AppHeader from "./components/app-header/app-header";
import AppPanel from "./components/app-panel/app-panel";
import app from './App.module.css';

function App() {
    const apiIngredients = "https://norma.nomoreparties.space/api/ingredients";
    const [products, setProducts] = useState([]);
    useEffect(() =>{
        const getProducts = async () => {
            try {
                const res = await fetch(apiIngredients);
                const data = await res.json();
                setProducts(data.data);
            } catch (err) {
                console.log(err.message);
            }
        }

        getProducts();

    }, []);
    return (
        <main className={app.main}>
            <AppHeader/>
            <AppPanel data={products}/>
        </main>
    );
}

export default App;
