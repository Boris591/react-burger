import panel from "./app-panel.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
function AppPanel(){
    return (
        <div className={panel.panel}>
            <div className={panel.container}>
                <div className={panel.col}>
                    <BurgerIngredients />
                </div>
                <div className={panel.col}>
                    <BurgerConstructor />
                </div>
            </div>
        </div>
    );
}

export default AppPanel;