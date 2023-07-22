import order from './order-info.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getIngredients} from "../../services/actions/ingredients";
import {UPDATE_ORDER_INFO} from "../../services/actions/constants/order";
import {
    WS_ORDERS_CONNECTION_CLOSED_AUTH,
    WS_ORDERS_CONNECTION_START_AUTH
} from "../../services/actions/constants/ws-orders-auth";
import {WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_CONNECTION_START} from "../../services/actions/constants/ws-orders";
import {Ingredient, Order} from "../../services/types/data";

interface OrderInfoProps {
    auth: boolean
}

function OrderInfo(props: OrderInfoProps){
    const orders  =
        useSelector((store: any) => props.auth ? store.wsOrdersAuth.ordersAll : store.wsOrders.ordersAll);
    const ingredientsAll = useSelector((store: any) => store.ingredients.ingredients);
    let { orderId } = useParams();
    const [orderInfo, setOrderInfo] = useState<Order | null>(null);
    const [ingredientsOrder, setIngredientsOrder] = useState(null);
    const dispatch: any = useDispatch();


    useEffect(() => {
        if(ingredientsAll.length === 0){
            dispatch(getIngredients());
        }
    },[dispatch, ingredientsAll]);

    useEffect(() => {
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
    }, [dispatch, props.auth]);

    useEffect(() => {
        if(orders.length > 0){
            setOrderInfo(
                orders.find((el: Order) => el._id === orderId)
            );
        }
    }, [orders]);

    useEffect(() => {
        setIngredientsOrder(
            ingredientsAll.filter((el: Ingredient) => orderInfo?.ingredients.includes(el._id))
        );
    }, [orderInfo, ingredientsAll]);
    return (
        <>
            {orderInfo &&
                <div className={order.container}>
                    <div className={order.header + ' mb-15'}>
                        <div className={order.top + ' mb-10'}>
                    <span className={order.id}>
                        {orderInfo.number}
                    </span>
                        </div>
                        <div className={order.name + ' text text_type_main-medium mb-3'}>
                            {orderInfo.name}
                        </div>
                        <div className={order.status + ' text text_type_main-default'}>
                            {orderInfo.status}
                        </div>
                    </div>
                    <div className={order.body + ' mb-10'}>
                        <div className={order.label + ' mb-6 text text_type_main-medium'}>
                            Состав:
                        </div>
                        <div className={order.list}>

                        </div>
                    </div>
                    <div className={order.footer}>
                        <div className={order.date}>

                        </div>
                        <div className={order.price + ' text text_type_digits-default'}>
                            <span></span>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default OrderInfo;
