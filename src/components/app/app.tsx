import React from 'react';
import AppHeader from "../app-header/app-header";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import Profile from "../../pages/profile/profile";
import ResetPassword from "../../pages/reset-password/reset-password";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Main from "../../pages/main/main";
import {ProtectedRouteElement} from "../protected-route-element/protected-route-element";
import {useDispatch} from "react-redux";
import {UPDATE_INGREDIENT_INFO} from "../../services/actions/constants/ingredients";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Orders from "../../pages/profile/orders/orders";
import {WS_ORDERS_CONNECTION_START} from "../../services/actions/constants/ws-orders";
import Feed from "../../pages/feed/feed";

function App() {
    const location = useLocation();
    let background = location.state && location.state.background;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const closePopup = () => {
        dispatch({
            type: UPDATE_INGREDIENT_INFO,
            info: null
        });
        navigate(-1);
    };

    return (
        <>
            <AppHeader/>

            <Routes location={background || location}>

                <Route path="/" element={<Main />} >

                </Route>
                <Route path='/ingredients/:ingredientId' element={<IngredientDetails  />} />
                <Route path='/feed' element={<Feed/>}/>
                <Route path='/feed/:id' element={<Feed/>}/>
                <Route path="/profile/orders" element={<ProtectedRouteElement auth={true} redirect="/login" element={<Orders />} />} />
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
                            <IngredientDetails />
                        </Modal>
                    }
                />
            </Routes>
            }
        </>
    );
}

export default App;
