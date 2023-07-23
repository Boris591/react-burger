import React, {useEffect, useState} from "react";
import AuthForm from "../../components/auth-form/auth-form";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import InfoLine from "../../components/info-line/info-line";
import {useSelector} from "../../services/types/hooks";
import {useDispatch} from "../../services/types/hooks";
import {useNavigate} from "react-router-dom";
import {getNewReg} from "../../services/actions/auth";

const Register: React.FC = () => {
    const user = useSelector((store: any) => store.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setValue] = useState({ name: '', email: '', password: '' });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const setReg = (event: React.FormEvent) => {
        event.preventDefault();
        if(form.name && form.email && form.password){
           dispatch(getNewReg(form));
        }
    };



    useEffect(() => {
        if(user){
            navigate('/');
        }
    }, [user, navigate]);


    return (
        <AuthForm submit={setReg} title={"Регистрация"}>
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
            <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                Зарегистрироваться
            </Button>
            <InfoLine label="Уже зарегистрированы?" txt="Войти" link="/login"/>
        </AuthForm>
    );
}

export default Register;
