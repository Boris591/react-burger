import React, {useEffect, useState} from "react";
import panel from "../../components/app-panel/app-panel.module.css";
import {WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_CONNECTION_START} from "../../services/actions/constants/ws-orders";
import {useDispatch, useSelector} from "react-redux";
import OrderList from "../../components/order-list/order-list";
import {getIngredients} from "../../services/actions/ingredients";
import AllInfoOrders from "../../components/all-info-orders/all-info-orders";
import {Order} from "../../services/types/data";

const Feed: React.FC = () => {
    const dispatch: any = useDispatch();
    const orders = useSelector((store: any) => store.wsOrders.ordersAll);
    const total = useSelector((store: any) => store.wsOrders.total);
    const totalToday = useSelector((store: any) => store.wsOrders.totalToday);
    const [working, setWorking] = useState<number[]>([]);
    const [done, setDone] = useState<number[]>([]);
    useEffect(() => {
        dispatch(getIngredients());
        dispatch({
            type: WS_ORDERS_CONNECTION_START
        });
        return () => {
            dispatch({ type: WS_ORDERS_CONNECTION_CLOSED });
        };
    }, [dispatch]);
    useEffect(() => {
        if(orders.length > 0){
            setWorking(orders.filter((el: Order) => el.status !== 'done').map((el: Order) => el.number));
            setDone(orders.filter((el: Order) => el.status === 'done').map((el: Order) => el.number));
        }
    }, [orders]);
    return (
        <div className={panel.panel}>
            <div className={panel.container}>
                <div className={panel.col}>
                    <h2 className={"text_type_main-large"}>
                        Лента заказов
                    </h2>
                    <OrderList orders={orders}/>
                </div>
                <div className={panel.col}>
                    <AllInfoOrders
                        all={total}
                        today={totalToday}
                        working={working}
                        done={done}
                    />
                </div>
            </div>
        </div>
    );
}

export default Feed;
