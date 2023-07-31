import ScrollBlock from "../scroll-block/scroll-block";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import construct from "./burger-constructor.module.css";
import ConstructorCard from "../constructor-card/constructor-card";
import {useEffect} from "react";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {RESET_ORDER_NUMBER} from "../../services/actions/constants/order";
import {getOrder} from "../../services/actions/order";
import {useSelector} from "../../services/types/hooks";
import {useDispatch} from "../../services/types/hooks";
import {useDrop} from "react-dnd";
import {ADD_ELEMENT, UPDATE_BUNS, UPDATE_PRICE} from "../../services/actions/constants/construct";
import { v4 as uuidv4 } from 'uuid';
import ConstructorIngredientsList from "../constructor-ingredients-list/constructor-ingredients-list";
import {INCREASE_COUNT_INGREDIENT, UPDATE_COUNT_INGREDIENT} from "../../services/actions/constants/ingredients";
import {useNavigate} from "react-router-dom";
import {RootState} from "../../services/types";

interface BurgerConstructorProps {}

function BurgerConstructor(props: BurgerConstructorProps): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // @ts-ignore
    const orderNumber = useSelector((store: RootState) => store.order.number) as number | '';
    const user = useSelector((store: RootState) => store.auth.user);
    // @ts-ignore
    const error = useSelector((store: RootState) => store.order.orderFailed);
    const blockedElements = useSelector((store: RootState) => store.construct.buns);
    const activeElements = useSelector((store: RootState) => store.construct.items);
    const finalPrice = useSelector((store: RootState) => store.construct.price);

    const [{ isHover }, dropTargerRef] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item: any) {
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
                        uniqueId: uuidv4()
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
        const sumBlocked = blockedElements.reduce((sum: number, el: any) => sum + el.price, 0);
        const sumDef = activeElements.reduce((sum: number, el: any) => sum + el.price, 0);
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
            ingredients: activeElements.map((item: any) => item.id)
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
                    <ConstructorCard id={blockedElements[0].id} tp='bun' type="first" blocked img={blockedElements[0].image_mobile} price={blockedElements[0].price} name={blockedElements[0].name + " вверх"} />
                }
                <ScrollBlock height={'464px'}>
                    {
                        activeElements &&
                        <ConstructorIngredientsList ingredients={activeElements} />
                    }
                </ScrollBlock>
                {blockedElements.length > 1 &&
                    <ConstructorCard id={blockedElements[1].id} tp='bun' type="last" blocked img={blockedElements[1].image_mobile} price={blockedElements[1].price} name={blockedElements[1].name + " низ"} />
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
