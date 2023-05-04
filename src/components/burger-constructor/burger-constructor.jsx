import ScrollBlock from "../scroll-block/scroll-block";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import construct from "./burger-constructor.module.css";
import ConstructorCard from "../constructor-card/constructor-card";
import {useState} from "react";
import PropTypes from "prop-types";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
function BurgerConstructor(props){
    const [products, setProducts] = useState(props.data);
    return (
        <div className={"pt-25"}>
            <div className={construct.list}>
                <ConstructorCard type="first" blocked={true} img={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'} price={20} name="Краторная булка N-200i" />
                <ScrollBlock height={'464px'}>
                    {
                        products.map((prod, i) =>
                            <ConstructorCard key={i} type="default" blocked={false} img={prod.image_mobile} price={prod.price} name={prod.name} />
                        )
                    }
                </ScrollBlock>
                <ConstructorCard type="last" blocked={true} img={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'} price={20} name="Краторная булка N-200i" />
            </div>
            <div className={construct.result + " mt-10"}>
                <div className={construct.price + " mr-10"}>
                    <span className="text text_type_digits-medium mr-2">610</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.array.isRequired
};

export default BurgerConstructor;