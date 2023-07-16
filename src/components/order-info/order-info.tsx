import order from './order-info.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface OrderInfoProps {
    id: string | number;
    name: string;
    status: string;
    ingredients: any;
    date: string;
}

function OrderInfo(props: OrderInfoProps){
    return (
        <div className={order.container}>
            <div className={order.header + ' mb-15'}>
                <div className={order.top + ' mb-10'}>
                    <span className={order.id}>
                        {props.id}
                    </span>
                </div>
                <div className={order.name + ' text text_type_main-medium mb-3'}>
                    {props.name}
                </div>
                <div className={order.status + ' text text_type_main-default'}>
                    {props.status}
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
    );
}

export default OrderInfo;
