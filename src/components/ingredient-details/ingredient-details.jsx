import PropTypes from "prop-types";

function IngredientDetails(props){
    return (
        <div className={"details"}>
            <div className="img">
                <img src={props.img} alt=""/>
            </div>
            <div className="name">
                <span>{props.name}</span>
            </div>
            <div className="description">
                <p>{props.description}</p>
            </div>
            <ul className="info">
                <li className="info-element">
                    <span className="info-label">Калории,ккал</span>
                    <span className="info-desc">{props.calories}</span>
                </li>
                <li className="info-element">
                    <span className="info-label">Белки, г</span>
                    <span className="info-desc">{props.proteins}</span>
                </li>
                <li className="info-element">
                    <span className="info-label">Жиры, г</span>
                    <span className="info-desc">{props.fat}</span>
                </li>
                <li className="info-element">
                    <span className="info-label">Углеводы, г</span>
                    <span className="info-desc">{props.carbohydrates}</span>
                </li>
            </ul>
        </div>
    );
}

IngredientDetails.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired
};
export default IngredientDetails;