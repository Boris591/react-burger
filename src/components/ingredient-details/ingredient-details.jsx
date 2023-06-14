import ingredient from "./ingredient-details.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getIngredients, UPDATE_INGREDIENT_INFO} from "../../services/actions/ingredients";
import {useParams} from "react-router-dom";

function IngredientDetails(){
    const ingredientInfo = useSelector(store => store.ingredients.ingredientInfo);
    const ingredients = useSelector(store => store.ingredients.ingredients);
    let { ingredientId } = useParams();
    const dispatch = useDispatch();
    const params = [
        {
            label: "Калории,ккал",
            value: 'calories'
        },
        {
            label: "Белки, г",
            value: 'proteins'
        },
        {
            label: "Жиры, г",
            value: 'fat'
        },
        {
            label: "Углеводы, г",
            value: 'carbohydrates'
        },
    ];
    useEffect(() => {
        if(ingredients.length === 0){
            dispatch(getIngredients());
        }
    },[dispatch, ingredients]);

    useEffect(() => {
        dispatch({
            type: UPDATE_INGREDIENT_INFO,
            info: ingredients.find(e => e._id === ingredientId)
        });
    }, [ingredients, dispatch, ingredientId]);

    return (
        <>
            {
                ingredientInfo ?
                    <div className={ingredient.details + " mt-3"}>
                        <div className={ingredient.container}>
                            <div className={ingredient.img}>
                                <img src={ingredientInfo.image_large} alt={ingredientInfo.name}/>
                            </div>
                            <div className={ingredient.name + " mt-4"}>
                                <span className="text text_type_main-medium">{ingredientInfo.name}</span>
                            </div>
                            <ul className={ingredient.info + " mt-8"}>
                                {
                                    params.map((element, i) =>
                                        <li key={i} className={ingredient['info-element']}>
                                            <span className="text text_type_main-default">{element.label}</span>
                                            <span className="text text_type_digits-default mt-2">{ingredientInfo[element.value]}</span>
                                        </li>
                                    )}
                            </ul>
                        </div>
                    </div> : null
            }
        </>
    );
}
export default IngredientDetails;
