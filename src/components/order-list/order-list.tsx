import ScrollBlock from "../scroll-block/scroll-block";
import OrderCard from "../order-card/order-card";
import {Order} from "../../services/types/data";

interface OrderListProps {
    orders: Order[]
}

function OrderList(props: OrderListProps){
    return (
        <ScrollBlock height="870px">
            {props.orders.map((el: Order, i: number) =>
                <OrderCard
                    key={i}
                    id={el._id}
                    number={el.number}
                    name={el.name}
                    date={el.createdAt}
                    ids={el.ingredients}
                />
            )}
        </ScrollBlock>
    );
}

export default OrderList;
