import React, {useEffect, useState} from "react";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import profile from "./profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import {updateUserInfo} from "../../services/actions/auth";
import ProfileMenu from "../../components/profile-menu/profile-menu";

interface FormState {
    email: string;
    name: string;
    password: string;
    [key: string]: string;
}
function Profile(){
    const user = useSelector((store: any) => store.auth.user);
    const dispatch: any = useDispatch();
    const [form, setValue] = useState<FormState>({ email: '', name: '', password: '' });
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if(user){
            setValue({...form, email: user.email, name: user.name});
        }
    }, [user]);

    const save = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let data: Partial<FormState> = {};
        for (let key in form) {
            if(form[key] !== user[key]){
                data[key] = form[key];
            }
        }

        if(Object.keys(data).length > 0){
            dispatch(updateUserInfo(data));
        }
    };
    const reset = () => {
        setValue({
            password: '',
            name: user.name,
            email: user.email
        });
    }
    return (
        <div className={profile.page}>
            <div className={profile.container}>
                <div className={profile.col}>
                    <ProfileMenu/>
                    <div className="text text_type_main-default text_color_inactive mt-20">
                        В этом разделе вы можете <br/>
                        изменить свои персональные данные
                    </div>
                </div>
                <div className={profile.col}>
                    <div className={profile.content}>
                        <form onSubmit={save}>
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

                            <Input
                                placeholder={'Email'}
                                type={'email'}
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

                            {
                                user.name !== form.name || user.email !== form.email || form.password !== '' ?
                                <>
                                    <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20 mr-2">
                                        Сохранить
                                    </Button>
                                    <Button onClick={reset} htmlType="button" type="primary" size="medium" extraClass="mb-20">
                                        Отменить
                                    </Button>
                                </> : null
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;