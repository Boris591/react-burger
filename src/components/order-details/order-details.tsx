import done from "../../images/done.svg";
import order from "./order-details.module.css";

interface OrderDetailsProps {
    number: number;
}
function OrderDetails(props: OrderDetailsProps): JSX.Element {
    return (
        <div className={order.order + " pt-20 pb-20"}>
            <div className={order.main}>
                <span className={order.number + " text text_type_digits-large"}>
                    {props.number}
                </span>
                <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            </div>
            <img className="mt-15" src={done} alt=""/>
            <div className={order.description + " mt-15"}>
                <span className="text text_type_main-default">Ваш заказ начали готовить</span>
                <p className="text text_type_main-default mt-2">Дождитесь готовности на орбитальной станции</p>
            </div>
        </div>
    );
}

export default OrderDetails;
