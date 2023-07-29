import order from './order-info.module.css';
import bgCircle from '../../images/ingredient-circle.svg';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientOrder} from "../../services/types/data";
interface InfoCardProps {
    name: string;
    image_mobile: string;
    count: number;
    price: number;
}
function InfoCard(props: IngredientOrder){
    return (
        <div className={order.card + ' mb-4 pr-6'}>
            <div className={order.wrInner}>
                <div className={order.icon + ' mr-4'}>
                    <img className={order.iconBg} src={bgCircle} alt=""/>
                    <img className={order.iconImg} src={props.image_mobile} alt=""/>
                </div>
                <div className={order.cardName + ' text text_type_main-default'}>
                    {props.name}
                </div>
            </div>
            <div className={order.price + ' text text_type_digits-default ml-4'}>
                <span className='mr-2'>{props.count} X {props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    );
}

export default InfoCard;
