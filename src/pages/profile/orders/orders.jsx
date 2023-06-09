import profile from "../profile.module.css";
import React from "react";
import ProfileMenu from "../../../components/profile-menu/profile-menu";

function Orders(){
    return (
        <div className={profile.page}>
            <div className={profile.container}>
                <div className={profile.col}>
                    <ProfileMenu/>
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
