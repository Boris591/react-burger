import {createRef, useEffect, useMemo, useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import ScrollBlock from "../scroll-block/scroll-block";
import IngredientCard from "../ingredient-card/ingredient-card";
import burger from "./burger-ingredients.module.css";
import PropTypes from 'prop-types';

function BurgerIngredients(props) {
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
    const ingredients = props.data;

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

    const handleTab = (pos) => {
        setCurrentPosCategory(pos);
    };

    const clickTab = (index) => {
        handleTab(catRefs[index].current.offsetTop);
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
                                        <IngredientCard key={i} img={ingredient.image} price={ingredient.price}
                                                        name={ingredient.name} count={1}/>
                                    )
                                }
                            </div>
                        </section>
                    )
                }
            </ScrollBlock>
        </div>
    );

}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })),
};


export default BurgerIngredients;