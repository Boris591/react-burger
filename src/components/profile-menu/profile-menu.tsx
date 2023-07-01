import profile from "../../pages/profile/profile.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import {useDispatch} from "react-redux";
import {logoutRequest} from "../../services/actions/auth";

function ProfileMenu() {
    const dispatch: any = useDispatch();
    const logout = () => {
        dispatch(logoutRequest());
    };
    return (
        <ul className={profile.menu}>
            <li>
                <NavLink to={'/profile'} end>
                    <span className="text text_type_main-medium">
                        Профиль
                    </span>
                </NavLink>
            </li>
            <li>
                <NavLink to={'/profile/orders'}>
                    <span className="text text_type_main-medium">
                        История заказов
                    </span>
                </NavLink>
            </li>
            <li onClick={logout}>
                <span className="text text_type_main-medium">
                    Выход
                </span>
            </li>
        </ul>
    );
}

export default ProfileMenu;
