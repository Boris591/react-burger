import ScrollBlock from "../scroll-block/scroll-block";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import construct from "./burger-constructor.module.css";
import ConstructorCard from "../constructor-card/constructor-card";
import {useEffect} from "react";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {getOrder, RESET_ORDER_NUMBER} from "../../services/actions/order";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {ADD_ELEMENT, UPDATE_BUNS, UPDATE_PRICE} from "../../services/actions/construct";
import { v4 as uuidv4 } from 'uuid';
import ConstructorIngredientsList from "../constructor-ingredients-list/constructor-ingredients-list";
import {INCREASE_COUNT_INGREDIENT, UPDATE_COUNT_INGREDIENT} from "../../services/actions/ingredients";
import {useNavigate} from "react-router-dom";

function BurgerConstructor(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderNumber = useSelector(store => store.order.number);
    const user = useSelector(store => store.auth.user);
    const error = useSelector(store => store.order.orderFailed);
    const blockedElements = useSelector(store => store.construct.buns);
    const activeElements = useSelector(store => store.construct.items);
    const finalPrice = useSelector(store => store.construct.price);

    const [{ isHover }, dropTargerRef] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            if(item.type === 'bun'){
                if(blockedElements.length > 0){
                    dispatch({
                        type: UPDATE_COUNT_INGREDIENT,
                        id: blockedElements[0].id,
                        count: 0
                    })
                }
                dispatch({
                    type: UPDATE_BUNS,
                    buns: [
                        item,
                        item
                    ]
                });
                dispatch({
                    type: UPDATE_COUNT_INGREDIENT,
                    id: item.id,
                    count: 2
                });
            }else{
                dispatch({
                    type: ADD_ELEMENT,
                    item: {
                        ...item,
                        dragId: uuidv4(),
                    }
                });
                dispatch({
                    type: INCREASE_COUNT_INGREDIENT,
                    id: item.id,
                    count: 2
                });
            }
        }
    });

    useEffect(() => {
        const sumBlocked = blockedElements.reduce((sum, el) => sum + el.price, 0);
        const sumDef = activeElements.reduce((sum, el) => sum + el.price, 0);
        dispatch({
            type: UPDATE_PRICE,
            price: sumBlocked + sumDef
        });
    },[dispatch, activeElements, blockedElements]);

    const closePopup = () => {
        dispatch({type: RESET_ORDER_NUMBER});
    }

    const startOrder = () => {
        if(!user){
            navigate("/login");
            return;
        }
        const ids = {
            ingredients: activeElements.map(item => item.id)
        };
        if(blockedElements.length > 0){
            ids.ingredients.unshift(blockedElements[0].id);
            ids.ingredients.push(blockedElements[1].id);
        }
        dispatch(getOrder(ids));
    }

    return (
        <div className={"pt-25"}>
            <div ref={dropTargerRef} className={construct.list}>
                {(isHover || (blockedElements.length === 0 && activeElements.length === 0)) &&
                    <div className={construct.help}>
                        <span className={"text_type_main-small"}>
                            Перетащите ингридиенты сюда
                        </span>
                    </div>
                }
                {blockedElements.length > 0 &&
                    <ConstructorCard tp='bun' type="first" blocked img={blockedElements[0].image_mobile} price={blockedElements[0].price} name={blockedElements[0].name + " вверх"} />
                }
                <ScrollBlock height={'464px'}>
                    {
                        activeElements &&
                        <ConstructorIngredientsList ingredients={activeElements} />
                    }
                </ScrollBlock>
                {blockedElements.length > 1 &&
                    <ConstructorCard tp='bun' type="last" blocked img={blockedElements[1].image_mobile} price={blockedElements[1].price} name={blockedElements[1].name + " низ"} />
                }
            </div>
            {(blockedElements.length > 0 || activeElements.length > 0) &&
                <div className={construct.result + " mt-10"}>
                    <div className={construct.price + " mr-10"}>
                        <span className="text text_type_digits-medium mr-2">{finalPrice}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button onClick={startOrder} htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            }
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
