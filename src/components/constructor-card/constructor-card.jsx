import {CurrencyIcon, DeleteIcon, DragIcon, LockIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import card from "./constructor-card.module.css";
import PropTypes from "prop-types";
import IngredientCard from "../ingredient-card/ingredient-card";

function ConstructorCard(props){
    return (
        <div className={card.card + " pl-8"}>
            <div className={card.drag}>
                {!props.blocked &&
                    <DragIcon type="primary" />
                }
            </div>
            <div className={card.main + " pr-8 pl-6 " + props.type}>
                <div className={card.img + " mr-5"}>
                    <img src={props.img}/>
                </div>
                <span className={card.name + " text_type_main-default mr-5"}>
                    {props.name}
                </span>
                <div className={card.other}>
                    <div className={card.price + " mr-5"}>
                        <span className="text text_type_digits-default">{props.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    {props.blocked ?
                        <LockIcon type="secondary" /> :
                        <DeleteIcon type="primary" />
                    }
                </div>
            </div>

        </div>
    );
}

ConstructorCard.propTypes = {
    count: PropTypes.number,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    blocked: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['first', 'default', 'last']),
};

export default ConstructorCard;