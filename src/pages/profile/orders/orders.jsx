import profile from "../profile.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

function Orders(){
    return (
        <div className={profile.page}>
            <div className={profile.container}>
                <div className={profile.col}>
                    <ul className={profile.menu}>
                        <li>
                            <NavLink to={'/profile'}>
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
                        <li>
                            <span className="text text_type_main-medium">
                                Выход
                            </span>
                        </li>
                    </ul>
                    <div className="text text_type_main-default text_color_inactive mt-20">
                        Orders
                    </div>
                </div>
                <div className={profile.col}>
                    <div className={profile.content}>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;
