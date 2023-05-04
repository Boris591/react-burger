import ScrollBlock from "../scroll-block/scroll-block";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import construct from "./burger-constructor.module.css";
import ConstructorCard from "../constructor-card/constructor-card";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
function BurgerConstructor(props){
    const products = props.data;
    const blockedProductId = "60666c42cc7b410027a1a9b1";
    const [blockedElements, setBlockedElements] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        const element = products.find(e => e._id === blockedProductId);
        if(element) setBlockedElements([element, element]);
    },[products]);
    useEffect(() => {
        const sumBlocked = blockedElements.reduce((sum, el) => sum + el.price, 0);
        const sumDef = products.reduce((sum, el) => sum + el.price, 0);
        setFinalPrice(sumBlocked + sumDef);
    },[products, blockedElements]);

    return (
        <div className={"pt-25"}>
            <div className={construct.list}>
                {blockedElements.length > 0 &&
                    <ConstructorCard type="first" blocked img={blockedElements[0].image_mobile} price={blockedElements[0].price} name={blockedElements[0].name} />
                }
                <ScrollBlock height={'464px'}>
                    {
                        products.map((prod, i) =>
                            <ConstructorCard key={i} type="default" blocked={false} img={prod.image_mobile} price={prod.price} name={prod.name} />
                        )
                    }
                </ScrollBlock>
                {blockedElements.length > 1 &&
                    <ConstructorCard type="last" blocked img={blockedElements[1].image_mobile} price={blockedElements[1].price} name={blockedElements[1].name} />
                }
            </div>
            <div className={construct.result + " mt-10"}>
                <div className={construct.price + " mr-10"}>
                    <span className="text text_type_digits-medium mr-2">{finalPrice}</span>
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
    data: PropTypes.arrayOf(PropTypes.shape({
        image_mobile: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })),
};

export default BurgerConstructor;