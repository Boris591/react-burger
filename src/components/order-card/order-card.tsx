import orderCard from './order-card.module.css';
import bgCircle from '../../images/ingredient-circle.svg';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "../../services/types/hooks";
import {Ingredient} from "../../services/types/data";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {ordersStatusInfo} from "../../utils/constants";
import {RootState} from "../../services/types";
interface OrderCardProps {
    id: string;
    number: number;
    name: string;
    date: string;
    status?: 'done' | 'created' | 'pending';
    ids: string[]

}

function OrderCard(props: OrderCardProps): JSX.Element{
    const ingredients = useSelector((store: RootState) => store.ingredients.ingredients);
    const [info, SetInfo] = useState([]);
    const [imgs, setImgs] = useState<string[]>([]);
    const [price, setPrice] = useState<number>(0);
    const [moreCount, setMoreCount] =  useState<number>(0);
    const location = useLocation();
    const getImgs = () => {
        let img: string[] = info.map((el: Ingredient) => el.image_mobile);
        if(img.length > 6){
            img = img.slice(0, 6);
            setMoreCount(info.length - img.length);
        }
        setImgs(img);
    }

    const getPrice = () => {
        let price = 0;
        props.ids.forEach(el =>{
            // @ts-ignore
            price += ingredients.find((item: Ingredient) => item._id === el).price;
        });
        setPrice(price);
    }

    useEffect(() => {
        // @ts-ignore
        SetInfo(ingredients.filter((el: Ingredient) => props.ids.includes(el._id)));
    }, [ingredients, props.ids]);

    useEffect(() => {
        if(info.length > 0){
            getImgs();
            getPrice();
        }
    }, [info]);
    return (
        <Link
            to={{
                pathname: `${props.id}`,
            }}
            state={{background: location}}
            className={orderCard.card + ' mb-4'}
        >
            <div className={orderCard.inner + ' p-6'}>
                <div className={orderCard.header}>
                    <div className={orderCard.id + ' text text_type_digits-default'}>
                        <span>#{props.number}</span>
                    </div>
                    <div className={orderCard.date + ' text text_type_main-default text_color_inactive'}>
                        <span>
                            {new Date(props.date).toLocaleString('ru', {day: 'numeric', month: 'long'})} {new Date(props.date).toLocaleString('ru', {timeStyle: 'short'})}
                        </span>
                    </div>
                </div>
                <div className={'mt-6 mb-6 ' + orderCard.body}>
                    <div className={orderCard.name + ' text text_type_main-medium'}>
                        {props.name}
                    </div>
                    {props.status &&
                        <div className={orderCard.status + ' text text_type_main-default'}>
                            {ordersStatusInfo[props.status]}
                        </div>
                    }
                </div>
                <div className={orderCard.footer}>
                    {imgs &&
                        <ul className={orderCard.icons}>
                            {imgs.map((el, i) =>
                                <li style={{zIndex: imgs.length - i}} className={orderCard.icon} key={i}>
                                    <img className={orderCard.iconBg} src={bgCircle} alt=""/>
                                    <img className={orderCard.iconImg + ' ' + (moreCount > 0 && i === imgs.length -1 ? orderCard.iconImgHidden : '')} src={el} alt=""/>
                                    {(moreCount > 0 && i === imgs.length -1) &&
                                        <div className={orderCard.moreCount}>
                                            <span className="text text_type_main-default">+{moreCount}</span>
                                        </div>
                                    }
                                </li>
                            )
                            }
                        </ul>
                    }
                    <div className={orderCard.price}>
                        <div className={orderCard.priceVal + ' text text_type_digits-default'}>
                            {price}
                        </div>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OrderCard;
