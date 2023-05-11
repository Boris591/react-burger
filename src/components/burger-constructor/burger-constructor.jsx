import ScrollBlock from "../scroll-block/scroll-block";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import construct from "./burger-constructor.module.css";
import ConstructorCard from "../constructor-card/constructor-card";
import {useContext, useEffect, useState} from "react";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {BurgerContext} from "../../services/burger-context";
function BurgerConstructor(){
    const products = useContext(BurgerContext);
    const orderNumber = '034536';
    const blockedProductId = "643d69a5c3f7b9001cfa093c";
    const [blockedElements, setBlockedElements] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const element = products.find(e => e._id === blockedProductId);
        if(element) setBlockedElements([element, element]);
    },[products]);
    useEffect(() => {
        const sumBlocked = blockedElements.reduce((sum, el) => sum + el.price, 0);
        const sumDef = products.reduce((sum, el) => sum + el.price, 0);
        setFinalPrice(sumBlocked + sumDef);
    },[products, blockedElements]);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

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
                <Button onClick={togglePopup} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {showPopup &&
                <Modal closeModal={togglePopup}>
                    <OrderDetails number={orderNumber} />
                </Modal>
            }
        </div>
    );
}

export default BurgerConstructor;