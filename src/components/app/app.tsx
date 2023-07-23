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
import {UPDATE_INGREDIENT_INFO} from "../../services/actions/constants/ingredients";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Orders from "../../pages/profile/orders/orders";
import Feed from "../../pages/feed/feed";
import OrderInfo from "../order-info/order-info";
import {useDispatch} from "../../services/types/hooks";

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
    const closePopupOrder = () => {
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
                <Route path='/feed/:orderId' element={<OrderInfo auth={false}/>}/>
                <Route path="/profile/orders" element={<ProtectedRouteElement auth={true} redirect="/login" element={<Orders />} />} />
                <Route path="/profile/orders/:orderId" element={<ProtectedRouteElement auth={true} redirect="/login" element={<OrderInfo auth={true}/>} />} />
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
                <Route
                    path='/feed/:orderId'
                    element={
                        <Modal title="" closeModal={closePopupOrder}>
                            <OrderInfo auth={false}/>
                        </Modal>
                    }
                />
                <Route
                    path='/profile/orders/:orderId'
                    element={
                        <Modal title="" closeModal={closePopupOrder}>
                            <OrderInfo auth={true}/>
                        </Modal>
                    }
                />
            </Routes>
            }
        </>
    );
}

export default App;
