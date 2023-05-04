import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import card from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
function IngredientCard(props){
    return (
        <div className={card.card}>
            {props.count > 0 &&
                <Counter count={props.count} size="default" />
            }
            <div className="img pl-4 pr-4 mb-1">
                <img src={props.img} />
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
    name: PropTypes.string.isRequired
};

export default IngredientCard;