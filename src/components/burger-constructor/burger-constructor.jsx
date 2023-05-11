import ScrollBlock from "../scroll-block/scroll-block";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import construct from "./burger-constructor.module.css";
import ConstructorCard from "../constructor-card/constructor-card";
import {useContext, useEffect, useState} from "react";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {BurgerContext} from "../../services/burger-context";
import {apiOrder} from "../../utils/constants";
import {getOrder} from "../../utils/api-methods";
function BurgerConstructor(){
    const products = useContext(BurgerContext);
    const [orderNumber, setOrderNumber] = useState(null);
    const [error, setError] = useState(null);
    const blockedProductId = "643d69a5c3f7b9001cfa093c";
    const [blockedElements, setBlockedElements] = useState([]);
    const [activeElements, setActiveElements] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        const element = products.find(e => e._id === blockedProductId);
        setActiveElements(
            products.filter(e => e.type !== 'bun')
        );
        if(element) setBlockedElements([element, element]);
    },[products]);

    useEffect(() => {
        const sumBlocked = blockedElements.reduce((sum, el) => sum + el.price, 0);
        const sumDef = activeElements.reduce((sum, el) => sum + el.price, 0);
        setFinalPrice(sumBlocked + sumDef);
    },[activeElements, blockedElements]);

    const closePopup = () => {
        setOrderNumber(null);
    }

    const startOrder = () => {
        const ids = activeElements.map(item => item._id);
        getOrder(setOrderNumber, setError, apiOrder, {
            "ingredients": [blockedProductId, ...ids]
        });
    }

    return (
        <div className={"pt-25"}>
            <div className={construct.list}>
                {blockedElements.length > 0 &&
                    <ConstructorCard type="first" blocked img={blockedElements[0].image_mobile} price={blockedElements[0].price} name={blockedElements[0].name + " вверх"} />
                }
                <ScrollBlock height={'464px'}>
                    {
                        activeElements.map((prod, i) =>
                            <ConstructorCard key={i} type="default" blocked={false} img={prod.image_mobile} price={prod.price} name={prod.name} />
                        )
                    }
                </ScrollBlock>
                {blockedElements.length > 1 &&
                    <ConstructorCard type="last" blocked img={blockedElements[1].image_mobile} price={blockedElements[1].price} name={blockedElements[1].name + " низ"} />
                }
            </div>
            <div className={construct.result + " mt-10"}>
                <div className={construct.price + " mr-10"}>
                    <span className="text text_type_digits-medium mr-2">{finalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={startOrder} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {orderNumber &&
                <Modal closeModal={closePopup}>
                    {error ?
                        <h3>Ошибка заказа! Попробуйте позже.</h3> :
                        <OrderDetails number={orderNumber} />
                    }
                </Modal>
            }
        </div>
    );
}

export default BurgerConstructor;