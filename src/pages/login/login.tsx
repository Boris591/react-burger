import React, {useEffect, useState} from "react";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import AuthForm from "../../components/auth-form/auth-form";
import InfoLine from "../../components/info-line/info-line";
import {useDispatch, useSelector} from "react-redux";
import {getLogin} from "../../services/actions/auth";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
    const [form, setValue] = useState({ email: '', password: '' });
    const user = useSelector((store: any) => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const login = (event: React.FormEvent) => {
        event.preventDefault();
        if(form.email && form.password){
            // @ts-ignore
            dispatch(getLogin(form));
        }
    };

    useEffect(() => {
        if(user){
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <AuthForm submit={login} title={"Вход"}>
            <EmailInput
                onChange={onChange}
                value={form.email}
                name={'email'}
                isIcon={false}
                extraClass="mb-6"
            />

            <PasswordInput
                onChange={onChange}
                value={form.password}
                name={'password'}
                extraClass="mb-6"
            />
            <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                Войти
            </Button>
            <InfoLine label="Вы — новый пользователь?" txt="Зарегистрироваться" link="/register"/>
            <InfoLine label="Забыли пароль?" txt="Восстановить пароль" link="/forgot-password"/>
        </AuthForm>
    );
}

export default Login;
