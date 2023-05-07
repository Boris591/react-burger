import PropTypes from "prop-types";
import ingredient from "./ingredient-details.module.css";

function IngredientDetails(props){
    const params = [
        {
            label: "Калории,ккал",
            value: props.calories
        },
        {
            label: "Белки, г",
            value: props.proteins
        },
        {
            label: "Жиры, г",
            value: props.fat
        },
        {
            label: "Углеводы, г",
            value: props.carbohydrates
        },
    ];
    return (
        <div className={ingredient.details + " mt-3"}>
            <div className={ingredient.container}>
                <div className={ingredient.img}>
                    <img src={props.image_large} alt={props.name}/>
                </div>
                <div className={ingredient.name + " mt-4"}>
                    <span className="text text_type_main-medium">{props.name}</span>
                </div>
                <ul className={ingredient.info + " mt-8"}>
                    {params.map((element, i) =>
                        <li key={i} className={ingredient['info-element']}>
                            <span className="text text_type_main-default">{element.label}</span>
                            <span className="text text_type_digits-default mt-2">{element.value}</span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

IngredientDetails.propTypes = {
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired
};
export default IngredientDetails;