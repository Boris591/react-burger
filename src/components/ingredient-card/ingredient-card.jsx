import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import card from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";

function IngredientCard(props){
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
            key={ingredientId}
            to={{
                pathname: `/ingredients/${ingredientId}`,
                state: { background: location },
            }}
        >
            <div ref={dragRef} style={{ opacity }} className={card.card} onClick={() => props.showInfo(props.id)}>
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

IngredientCard.propTypes = {
    id: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    showInfo: PropTypes.func.isRequired
};

export default IngredientCard;
