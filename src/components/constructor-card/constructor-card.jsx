import {CurrencyIcon, DeleteIcon, DragIcon, LockIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import card from "./constructor-card.module.css";
import PropTypes from "prop-types";
import DragIngredient from "../drag-ingredient/drag-ingredient";
import {DELETE_ELEMENT} from "../../services/actions/construct";
import {useDispatch} from "react-redux";
import {DECREASE_COUNT_INGREDIENT} from "../../services/actions/ingredients";

function ConstructorCard(props){
    const dispatch = useDispatch();
    const deleteElement = () => {
        dispatch({
            type: DELETE_ELEMENT,
            dragId: props.dragId
        });
        dispatch({
            type: DECREASE_COUNT_INGREDIENT,
            id: props.id,
        });
    };
    return (
        <>
            {
                props.tp === 'bun' ?
                    <div className={card.card + " pl-8"}>
                        <div className={card.drag}>
                        </div>
                        <div className={card.main + " pr-8 pl-6 " + props.type}>
                            <div className={card.img + " mr-5"}>
                                <img src={props.img} alt={props.name}/>
                            </div>
                            <span className={card.name + " text_type_main-default mr-5"}>
                                {props.name}
                            </span>
                            <div className={card.other}>
                                <div className={card.price + " mr-5"}>
                                    <span className="text text_type_digits-default">{props.price}</span>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <LockIcon type="secondary" />
                            </div>
                        </div>
                    </div>
                    :
                    <DragIngredient {...props} class={card.card + " pl-8"}>
                        <div className={card.drag}>
                            <DragIcon type="primary" />
                        </div>
                        <div className={card.main + " pr-8 pl-6 " + props.type}>
                            <div className={card.img + " mr-5"}>
                                <img src={props.img} alt={props.name}/>
                            </div>
                            <span className={card.name + " text_type_main-default mr-5"}>
                                {props.name}
                            </span>
                            <div className={card.other}>
                                <div className={card.price + " mr-5"}>
                                    <span className="text text_type_digits-default">{props.price}</span>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <div onClick={deleteElement} className={card.delete}>
                                    <DeleteIcon type="primary" />
                                </div>
                            </div>
                        </div>
                    </DragIngredient>
            }
        </>
    );
}

ConstructorCard.propTypes = {
    id: PropTypes.string,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    blocked: PropTypes.bool.isRequired,
    dragId: PropTypes.string,
    moveCard: PropTypes.func,
    tp: PropTypes.string,
    index: PropTypes.number,
    type: PropTypes.oneOf(['first', 'default', 'last']),
};

export default ConstructorCard;
