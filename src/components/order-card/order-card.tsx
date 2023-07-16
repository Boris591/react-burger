import orderCard from './order-card.module.css';
import bgCircle from '../../images/ingredient-circle.svg';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
interface OrderCardProps {
    id: string;
    name: string;
    date: string;
    price: number;
    status?: string;
    ids: string[]

}

function OrderCard(props: OrderCardProps): JSX.Element{
    return (
        <div className={orderCard.card + ' mb-4'}>
            <div className={orderCard.inner + ' p-6'}>
                <div className={orderCard.header}>
                    <div className={orderCard.id + ' text text_type_digits-default'}>
                        <span>{props.id}</span>
                    </div>
                    <div className={orderCard.date + ' text text_type_main-default text_color_inactive'}>
                        <span>{props.date}</span>
                    </div>
                </div>
                <div className={orderCard.body}>
                    <div className={orderCard.name + ' text text_type_main-medium'}>
                        {props.name}
                    </div>
                    {props.status &&
                        <div className={orderCard.status + ' text text_type_main-default'}>
                            {props.status}
                        </div>
                    }
                </div>
                <div className={orderCard.footer}>
                    <ul className={orderCard.icons}>

                    </ul>
                    <div className={orderCard.price}>
                        <div className={orderCard.priceVal + ' text text_type_digits-default'}>
                            {props.price}
                        </div>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCard;
