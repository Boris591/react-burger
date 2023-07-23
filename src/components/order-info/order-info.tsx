import order from './order-info.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getIngredients} from "../../services/actions/ingredients";
import {
    WS_ORDERS_CONNECTION_CLOSED_AUTH,
    WS_ORDERS_CONNECTION_START_AUTH
} from "../../services/actions/constants/ws-orders-auth";
import {WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_CONNECTION_START} from "../../services/actions/constants/ws-orders";
import {Ingredient, IngredientOrder, Order} from "../../services/types/data";
import {ordersStatusInfo} from "../../utils/constants";
import ScrollBlock from "../scroll-block/scroll-block";
import InfoCard from "./info-card";
import {RootState} from "../../services/types";

interface OrderInfoProps {
    auth: boolean
}

function OrderInfo(props: OrderInfoProps){
    const orders  =
        useSelector((store: RootState) => props.auth ? store.wsOrdersAuth.ordersAll : store.wsOrders.ordersAll);
    const ingredientsAll = useSelector((store: RootState) => store.ingredients.ingredients);
    let { orderId } = useParams();
    const [price, setPrice] = useState<number>(0);
    const [countInfo, setCountInfo] = useState<Record<string, string>>();
    const [orderInfo, setOrderInfo] = useState<Order | null>(null);
    const [ingredientsOrder, setIngredientsOrder] = useState<IngredientOrder[] | null>(null);
    const dispatch = useDispatch();

    const getPrice = () => {
        let price = 0;
        orderInfo?.ingredients.forEach(el =>{
            // @ts-ignore
            price += ingredientsAll.find((item: Ingredient) => item._id === el).price;
        });
        setPrice(price);
    }

    useEffect(() => {
        if(ingredientsAll.length === 0){
            // @ts-ignore
            dispatch(getIngredients());
        }
    },[dispatch, ingredientsAll]);

    useEffect(() => {
        if(orders.length === 0){
            dispatch(props.auth ?
                {type: WS_ORDERS_CONNECTION_START_AUTH}
                :
                {type: WS_ORDERS_CONNECTION_START}
            );
            return () => {
                dispatch(props.auth ?
                    {type: WS_ORDERS_CONNECTION_CLOSED_AUTH}
                    :
                    {type: WS_ORDERS_CONNECTION_CLOSED}
                );
            };
        }
    }, [dispatch, props.auth]);

    useEffect(() => {
        if(orders.length > 0){
            setOrderInfo(
                // @ts-ignore
                orders.find((el: Order) => el._id === orderId)
            );
        }
    }, [orders]);

    useEffect(() => {
        // @ts-ignore
        setIngredientsOrder(ingredientsAll.filter((el: Ingredient) => orderInfo?.ingredients.includes(el._id)));
        setCountInfo(orderInfo?.ingredients.reduce((acc: any, el: string) => {
            if (!acc) acc = {};
            acc[el] = (acc[el] || 0) + 1;
            return acc;
        }, {}));
        getPrice();
    }, [orderInfo, ingredientsAll]);

    return (
        <>
            {orderInfo &&
                <div className={order.container + ' pb-6'}>
                    <div className={order.header + ' mb-15'}>
                        <div className={order.top + ' mb-10'}>
                            <span className={order.id + ' text text_type_digits-default'}>
                                #{orderInfo.number}
                            </span>
                        </div>
                        <div className={order.name + ' text text_type_main-medium mb-3'}>
                            {orderInfo.name}
                        </div>
                        <div className={order.status + ' ' + (orderInfo.status === 'done' ? order.green : '') + ' text text_type_main-default'}>
                            {ordersStatusInfo[orderInfo.status]}
                        </div>
                    </div>
                    {(ingredientsOrder &&countInfo) &&
                        <div className={order.body + ' mb-10'}>
                            <div className={order.label + ' mb-6 text text_type_main-medium'}>
                                Состав:
                            </div>
                            <div className={order.list}>
                                <ScrollBlock height='320px'>
                                    {ingredientsOrder.map((el: Ingredient, i) =>
                                        <InfoCard key={i} {...el} count={+countInfo[el._id]}/>
                                    )}
                                </ScrollBlock>
                            </div>
                        </div>
                    }
                    <div className={order.footer}>
                        <div className={order.date + ' text text_type_main-default text_color_inactive'}>
                            {new Date(orderInfo.createdAt).toLocaleString('ru', {day: 'numeric', month: 'long'})} {new Date(orderInfo.createdAt).toLocaleString('ru', {timeStyle: 'short'})}
                        </div>
                        <div className={order.price + ' text text_type_digits-default'}>
                            <span className='mr-2'>{price}</span>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default OrderInfo;
