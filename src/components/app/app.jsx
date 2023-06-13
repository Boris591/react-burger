import React from 'react';
import AppHeader from "../app-header/app-header";
import {BrowserRouter as Router, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import Profile from "../../pages/profile/profile";
import ResetPassword from "../../pages/reset-password/reset-password";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Main from "../../pages/main/main";
import {ProtectedRouteElement} from "../protected-route-element/protected-route-element";
import ModalSwitch from "../modal-switch/modal-switch";
import {useDispatch, useSelector} from "react-redux";
import {UPDATE_INGREDIENT_INFO} from "../../services/actions/ingredients";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

function App() {
    const location = useLocation();
    let background = location.state && location.state.background;
    const ingredientInfo = useSelector(store => store.ingredients.ingredientInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const closePopup = () => {
        dispatch({
            type: UPDATE_INGREDIENT_INFO,
            info: null
        });
        navigate(-1);
    };
    console.log(location.state);
    return (
        <>
            <AppHeader/>

            <Routes location={background || location}>

                <Route path="/" element={<Main />} >

                </Route>
                <Route path='/ingredients/:ingredientId' element={<IngredientDetails {...ingredientInfo} />} />

                <Route path="/login" element={<ProtectedRouteElement auth={false} redirect="/" element={<Login />} />} />
                <Route path="/register" element={<ProtectedRouteElement auth={false} redirect="/" element={<Register />} />} />
                <Route path="/profile" element={<ProtectedRouteElement auth={true} redirect="/login" element={<Profile />} />} />
                <Route path="/reset-password" element={<ProtectedRouteElement auth={false} redirect="/login" element={<ResetPassword />} />} />
                <Route path="/forgot-password" element={<ProtectedRouteElement auth={false} redirect="/" element={<ForgotPassword />} />} />

            </Routes>
            {background &&
            <Routes>
                <Route
                    path='/ingredients/:ingredientId'
                    element={
                        <Modal title="Детали ингридиента" closeModal={closePopup}>
                            <IngredientDetails {...ingredientInfo} />
                        </Modal>
                    }
                />
            </Routes>
            }
        </>
    );
}

export default App;
