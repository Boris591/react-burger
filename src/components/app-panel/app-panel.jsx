import panel from "./app-panel.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import PropTypes from "prop-types";
function AppPanel(props){
    return (
        <div className={panel.panel}>
            <div className={panel.container}>
                <div className={panel.col}>
                    <BurgerIngredients data={props.data} />
                </div>
                <div className={panel.col}>
                    <BurgerConstructor data={props.data} />
                </div>
            </div>
        </div>
    );
}

AppPanel.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
    })),
};

export default AppPanel;