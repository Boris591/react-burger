import panel from "./app-panel.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import data from "../../utils/data";
function AppPanel(){
    return (
        <div className={panel.panel}>
            <div className={panel.container}>
                <div className={panel.col}>
                    <BurgerIngredients data={data} />
                </div>
                <div className={panel.col}>
                    <BurgerConstructor data={data} />
                </div>
            </div>
        </div>
    );
}

export default AppPanel;