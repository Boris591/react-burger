import {createRef, useEffect, useMemo, useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import ScrollBlock from "../scroll-block/scroll-block";
import IngredientCard from "../ingredient-card/ingredient-card";
import burger from "./burger-ingredients.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {UPDATE_INGREDIENT_INFO} from "../../services/actions/ingredients";

function BurgerIngredients() {
    const dispatch = useDispatch();
    const categories = useMemo(() => [
        {name: "Булки", code: "bun"},
        {name: "Соусы", code: "sauce"},
        {name: "Начинки", code: "main"}
    ], []);
    let height = 716;
    const [currentPosCategory, setCurrentPosCategory] = useState(0);
    const catLength = categories.length;
    const [catRefs, setCatRefs] = useState([]);
    const [current, setCurrent] = useState(categories[0].code);
    const ingredientInfo = useSelector(store => store.ingredients.ingredientInfo);
    const ingredients = useSelector(store => store.ingredients.ingredients);

    useEffect(() => {
        // add or remove refs
        setCatRefs((catRefs) =>
            Array(catLength)
                .fill()
                .map((_, i) => catRefs[i] || createRef()),
        );
    }, [catLength]);

    useEffect(() =>{
        if(catRefs.length > 0){
            catRefs.some((el,index)=>{
                if(currentPosCategory - el.current.offsetHeight < el.current.offsetTop){
                    setCurrent(categories[index].code);
                    return true;
                }
                return false;
            })

        }

    }, [currentPosCategory, catRefs, categories]);

    useEffect(() => {

    }, []);

    const handleTab = (pos) => {
        setCurrentPosCategory(pos);
    };

    const clickTab = (index) => {
        handleTab(catRefs[index].current.offsetTop);
    }

    const openPopup = (id) => {
        dispatch({
            type: UPDATE_INGREDIENT_INFO,
            info: ingredients.find(e => e._id === id)
        });
    }

    const closePopup = () => {
        dispatch({
            type: UPDATE_INGREDIENT_INFO,
            info: null
        });
    }

    return (
        <div className={burger.wrapper + " pt-10"}>
            <h2 className={burger.title + " text_type_main-large"}>
                Соберите бургер
            </h2>
            <div style={{display: 'flex'}} className="mt-5 mb-10">
                {
                    categories.map((category,i) =>
                        <Tab key={category.code} value={category.code} active={current === category.code}
                             onClick={() => clickTab(i)}>
                            {category.name}
                        </Tab>
                    )
                }
            </div>
            <ScrollBlock height={height + 'px'} handleTab={handleTab} currentPos={currentPosCategory}>
                {
                    categories.map((category, j) =>
                        <section ref={catRefs[j]} key={j} className="mb-10">
                            <h3 className={burger['title-section'] + " text_type_main-medium"}>{category.name}</h3>
                            <div className={burger.cards + " pl-4"}>
                                {
                                    ingredients.filter(e => e.type === category.code).map((ingredient, i) =>
                                        <IngredientCard
                                            showInfo={openPopup}
                                            id={ingredient._id}
                                            key={i}
                                            img={ingredient.image}
                                            price={ingredient.price}
                                            name={ingredient.name}
                                            type={ingredient.type}
                                            image_mobile={ingredient.image_mobile}
                                            count={ingredient.count}
                                        />
                                    )
                                }
                            </div>
                        </section>
                    )
                }
            </ScrollBlock>
            {ingredientInfo &&
                <Modal title="Детали ингридиента" closeModal={closePopup}>
                    <IngredientDetails {...ingredientInfo} />
                </Modal>
            }
        </div>
    );

}


export default BurgerIngredients;
