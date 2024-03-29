import React, {useEffect, useState} from "react";
import panel from "../../components/app-panel/app-panel.module.css";
import {WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_CONNECTION_START} from "../../services/actions/constants/ws-orders";
import {useSelector} from "../../services/types/hooks";
import {useDispatch} from "../../services/types/hooks";
import OrderList from "../../components/order-list/order-list";
import {getIngredients} from "../../services/actions/ingredients";
import AllInfoOrders from "../../components/all-info-orders/all-info-orders";
import {Order} from "../../services/types/data";
import {RootState} from "../../services/types";

const Feed: React.FC = () => {
    const dispatch = useDispatch();
    const orders = useSelector((store: RootState) => store.wsOrders.ordersAll);
    const total = useSelector((store: RootState) => store.wsOrders.total);
    const totalToday = useSelector((store: RootState) => store.wsOrders.totalToday);
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
