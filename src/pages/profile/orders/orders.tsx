import profile from "../profile.module.css";
import ProfileMenu from "../../../components/profile-menu/profile-menu";
import OrderList from "../../../components/order-list/order-list";

import {useEffect} from "react";
import {
    WS_ORDERS_CONNECTION_CLOSED_AUTH,
    WS_ORDERS_CONNECTION_START_AUTH
} from "../../../services/actions/constants/ws-orders-auth";
import {getIngredients} from "../../../services/actions/ingredients";
import {useDispatch, useSelector} from "../../../services/types/hooks";
import {RootState} from "../../../services/types";

const Orders: React.FC = () => {
    const dispatch = useDispatch();
    const orders = useSelector((store: RootState) => store.wsOrdersAuth.ordersAll);

    useEffect(() => {
        dispatch(getIngredients());
        dispatch({
            type: WS_ORDERS_CONNECTION_START_AUTH
        });
        return () => {
            dispatch({ type: WS_ORDERS_CONNECTION_CLOSED_AUTH });
        };
    }, []);
    return (
        <div className={profile.page}>
            <div className={profile.container}>
                <div className={profile.col}>
                    <ProfileMenu/>
                    <div className="text text_type_main-default text_color_inactive mt-20">
                        Orders
                    </div>
                </div>
                <div className={profile.col}>
                    <div className={profile.content}>
                        <OrderList orders={orders}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;
