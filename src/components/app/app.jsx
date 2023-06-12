import React from 'react';
import AppHeader from "../app-header/app-header";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import Profile from "../../pages/profile/profile";
import ResetPassword from "../../pages/reset-password/reset-password";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Main from "../../pages/main/main";
import {ProtectedRouteElement} from "../protected-route-element/protected-route-element";

function App() {
    return (
        <Router>
            <AppHeader/>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<ProtectedRouteElement auth={false} redirect="/" element={<Login />} />} />
                <Route path="/register" element={<ProtectedRouteElement auth={false} redirect="/" element={<Register />} />} />
                <Route path="/profile" element={<ProtectedRouteElement auth={true} redirect="/login" element={<Profile />} />} />
                <Route path="/reset-password" element={<ProtectedRouteElement auth={false} redirect="/login" element={<ResetPassword />} />} />
                <Route path="/forgot-password" element={<ProtectedRouteElement auth={false} redirect="/" element={<ForgotPassword />} />} />
            </Routes>
        </Router>
    );
}

export default App;
