import ScrollBlock from "../scroll-block/scroll-block";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import construct from "./burger-constructor.module.css";
import ConstructorCard from "../constructor-card/constructor-card";
import {useEffect, useState} from "react";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {BASE_URL, ORDER_POINT} from "../../utils/constants";
import {getOrder} from "../../utils/api-methods";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {ADD_ELEMENT} from "../../services/actions/construct";
import { v4 as uuidv4 } from 'uuid';
import ConstructorIngredientsList from "../constructor-ingredients-list/constructor-ingredients-list";
function BurgerConstructor(){
    const dispatch = useDispatch();
    const order_url = BASE_URL + ORDER_POINT;
    const [orderNumber, setOrderNumber] = useState(null);
    const [error, setError] = useState(null);
    const blockedProductId = "643d69a5c3f7b9001cfa093c";
    const [blockedElements, setBlockedElements] = useState([]);
    const activeElements = useSelector(store => store.construct.items);
    const [finalPrice, setFinalPrice] = useState(0);

    const [{ isHover }, dropTargerRef] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            dispatch({
                type: ADD_ELEMENT,
                item: {
                    ...item,
                    dragId: uuidv4(),
                }
            })
        }
    });




    const closePopup = () => {
        setOrderNumber(null);
    }

    const startOrder = () => {
        const ids = activeElements.map(item => item._id);
        getOrder(setOrderNumber, setError, order_url, {
            "ingredients": [blockedProductId, ...ids]
        });
    }

    return (
        <div ref={dropTargerRef} className={"pt-25"}>
            <div className={construct.list}>
                {blockedElements.length > 0 &&
                    <ConstructorCard type="first" blocked img={blockedElements[0].image_mobile} price={blockedElements[0].price} name={blockedElements[0].name + " вверх"} />
                }
                <ScrollBlock height={'464px'}>
                    {
                        activeElements &&
                        <ConstructorIngredientsList ingredients={activeElements} />
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
