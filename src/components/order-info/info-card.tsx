import order from './order-info.module.css';
import bgCircle from '../../images/ingredient-circle.svg';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
interface InfoCardProps {
    name: string;
    img: string;
    count: number;
    price: number;
}
function InfoCard(props: InfoCardProps){
    return (
        <div className={order.card + ' mb-4'}>
            <div className={order.cardImg + ' mr-4'}>

            </div>
            <div className={order.cardName}>
                {props.name}
            </div>
            <div className={order.price + ' text text_type_digits-default'}>
                <span>{props.count} X {props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    );
}

export default InfoCard;
