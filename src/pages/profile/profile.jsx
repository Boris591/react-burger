import React, {useEffect, useState} from "react";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import profile from "./profile.module.css"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateUserInfo} from "../../services/actions/auth";

function Profile(){
    const user = useSelector(store => store.auth.user);
    const dispatch = useDispatch();
    const [form, setValue] = useState({ email: '', name: '', password: '' });
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if(user){
            setValue({...form, email: user.email, name: user.name});
        }
    }, [user]);

    const save = () => {
        let data = {};
        for (let key in form) {
            if(form[key] !== user[key]){
                data[key] = form[key];
            }
        }

        if(Object.keys(data).length > 0){
            dispatch(updateUserInfo(data));
        }
    };
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
                        В этом разделе вы можете <br/>
                        изменить свои персональные данные
                    </div>
                </div>
                <div className={profile.col}>
                    <div className={profile.content}>
                        <form>
                            <Input
                                type={'text'}
                                placeholder={'Имя'}
                                onChange={onChange}
                                value={form.name}
                                name={'name'}
                                error={false}
                                errorText={'Ошибка'}
                                size={'default'}
                                extraClass="mb-6"
                                icon="EditIcon"
                            />

                            <EmailInput
                                onChange={onChange}
                                value={form.email}
                                name={'email'}
                                icon="EditIcon"
                                extraClass="mb-6"
                            />

                            <PasswordInput
                                onChange={onChange}
                                value={form.password}
                                name={'password'}
                                extraClass="mb-6"
                                icon="EditIcon"
                            />

                            <Button onClick={save} htmlType="button" type="primary" size="medium" extraClass="mb-20">
                                Сохранить
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
