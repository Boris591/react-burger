import {useState} from "react";
import ingredients from "./burger-ingredients.module.css";
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import ScrollBlock from "../scroll-block/scroll-block";
import IngredientCard from "../ingredient-card/ingredient-card";

function BurgerIngredients(){
    const [current, setCurrent] = useState('one');
    return (
        <div className={ingredients.wrapper + " pt-10"}>
            <h2 className={ingredients.title + " text_type_main-large"}>
                Соберите бургер
            </h2>
            <div style={{ display: 'flex' }} className="mt-5 mb-10">
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <ScrollBlock height={'756px'}>
                <section className="mb-10">
                    <h3 className={ingredients['title-section'] + " text_type_main-medium"}>Булки</h3>
                    <div className={ingredients.cards + " pl-4"}>
                        <IngredientCard img={'https://code.s3.yandex.net/react/code/bun-01.png'} price={20} name="Краторная булка N-200i" count={0} />
                        <IngredientCard img={'https://code.s3.yandex.net/react/code/bun-01.png'} price={20} name="Краторная булка N-200i" count={1} />
                        <IngredientCard img={'https://code.s3.yandex.net/react/code/bun-01.png'} price={20} name="Краторная булка N-200i" count={1} />
                        <IngredientCard img={'https://code.s3.yandex.net/react/code/bun-01.png'} price={20} name="Краторная булка N-200i" count={1} />
                    </div>
                </section>
                <section className="mb-10">
                    <h3 className={ingredients['title-section'] + " text_type_main-medium"}>Соусы</h3>
                    <div className={ingredients.cards + " pl-4"}>
                        <IngredientCard img={'https://code.s3.yandex.net/react/code/bun-01.png'} price={20} name="Краторная булка N-200i" count={1} />
                        <IngredientCard img={'https://code.s3.yandex.net/react/code/bun-01.png'} price={20} name="Краторная булка N-200i" count={1} />
                        <IngredientCard img={'https://code.s3.yandex.net/react/code/bun-01.png'} price={20} name="Краторная булка N-200i" count={1} />
                        <IngredientCard img={'https://code.s3.yandex.net/react/code/bun-01.png'} price={20} name="Краторная булка N-200i" count={1} />
                    </div>
                </section>
            </ScrollBlock>
        </div>
    );

}

export default BurgerIngredients;