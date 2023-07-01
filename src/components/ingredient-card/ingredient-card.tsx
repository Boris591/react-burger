import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import card from "./ingredient-card.module.css";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";

interface IngredientCardProps {
    id: number;
    count: number;
    img: string;
    name: string;
    price: number;
    type?: string;
    image_mobile?: string;
}
const IngredientCard: React.FC<IngredientCardProps> = (props) => {
    const location = useLocation();
    const ingredientId = props.id;
    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: { ...props },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <Link
            to={{
                pathname: `/ingredients/${ingredientId}`,
            }}
            state={{background: location}}
        >
            <div ref={dragRef} style={{ opacity }} className={card.card}>
                {props.count > 0 &&
                    <Counter count={props.count} size="default" />
                }
                <div className="img pl-4 pr-4 mb-1">
                    <img src={props.img} alt={props.name} />
                </div>
                <div className="info">
                    <div className={card.price + " mb-1"}>
                        <span className={card.value + " text_type_digits-default"}>{props.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <div className={card.name}>
                        <h4 className="text_type_main-small">{props.name}</h4>
                    </div>
                </div>
            </div>
        </Link>

    );
}

export default IngredientCard;
