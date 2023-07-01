import ConstructorCard from "../constructor-card/constructor-card";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {UPDATE_ITEMS} from "../../services/actions/construct";

interface Ingredient {
    id: string;
    dragId: string;
    type: string;
    image_mobile: string;
    price: number;
    name: string;
}

interface ConstructorIngredientsListProps {
    ingredients: Ingredient[];
}

function ConstructorIngredientsList(props: ConstructorIngredientsListProps) {
    const dispatch: any = useDispatch();
    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        const dragCard = props.ingredients[dragIndex];
        const newCards = [...props.ingredients]

        newCards.splice(dragIndex, 1)
        newCards.splice(hoverIndex, 0, dragCard)

        dispatch({
            type: UPDATE_ITEMS,
            items: newCards,
        })
    }, [props.ingredients, dispatch]);
    return (
        <>
            {
                props.ingredients.map((prod, i) =>
                    <ConstructorCard dragId={prod.dragId} key={i} index={i} tp={prod.type} id={prod.id} type="default" blocked={false} img={prod.image_mobile} price={prod.price} name={prod.name} moveCard={moveCard} />
                )
            }
        </>
    );
}

export default ConstructorIngredientsList;
