import panel from "./app-panel.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import React from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

function AppPanel(){
    return (
        <div className={panel.panel}>
            <DndProvider backend={HTML5Backend}>
                <div className={panel.container}>
                    <div className={panel.col}>
                        <BurgerIngredients />
                    </div>
                    <div className={panel.col}>
                        <BurgerConstructor />
                    </div>
                </div>
            </DndProvider>
        </div>
    );
}

export default AppPanel;
