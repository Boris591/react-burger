import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import card from "./ingredient-card.module.css";
import PropTypes from "prop-types";

function IngredientCard(props){
    return (
        <div className={card.card} onClick={props.showInfo}>
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
    );
}

IngredientCard.propTypes = {
    count: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    showInfo: PropTypes.func.isRequired
};

export default IngredientCard;