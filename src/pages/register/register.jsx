import React, {useEffect, useState} from "react";
import AuthForm from "../../components/auth-form/auth-form";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import InfoLine from "../../components/info-line/info-line";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getNewReg} from "../../services/actions/auth";

function Register(){
    const user = useSelector(store => store.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setValue] = useState({ name: '', email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const setReg = () => {
        if(form.name && form.email && form.password){
            dispatch(getNewReg(form));
        }
    };



    useEffect(() => {
        if(user){
            navigate('/');
        }
    }, [user]);


    return (
        <AuthForm title={"Регистрация"}>
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
            />

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
            <Button onClick={setReg} htmlType="button" type="primary" size="medium" extraClass="mb-20">
                Зарегистрироваться
            </Button>
            <InfoLine label="Уже зарегистрированы?" txt="Войти" link="/login"/>
        </AuthForm>
    );
}

export default Register;
