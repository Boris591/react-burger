import {useDispatch, useSelector} from "react-redux";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {UPDATE_INGREDIENT_INFO} from "../../services/actions/ingredients";
import {Route, Router, Routes, useLocation, useNavigate} from "react-router-dom";

const ModalSwitch = () => {
    const dispatch = useDispatch();
    const ingredientInfo = useSelector(store => store.ingredients.ingredientInfo);
    const location = useLocation();
    const navigate = useNavigate();
    let background = location.state && location.state.background;

    const closePopup = () => {
        dispatch({
            type: UPDATE_INGREDIENT_INFO,
            info: null
        });
        navigate(-1);
    };

    return (
        <>
            <Routes location={background || location}>
                <Route path='/ingredients/:ingredientId' element={<IngredientDetails {...ingredientInfo} />} />
            </Routes>
            {background && (
                <Route
                    path='/ingredients/:ingredientId'
                    element={
                        <Modal title="Детали ингридиента" closeModal={closePopup}>
                            <IngredientDetails {...ingredientInfo} />
                        </Modal>
                    }
                />
            )}
        </>
    );

    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
};

export default ModalSwitch;
