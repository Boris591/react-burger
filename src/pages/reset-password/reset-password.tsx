import React, {useEffect, useState} from "react";
import AuthForm from "../../components/auth-form/auth-form";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import InfoLine from "../../components/info-line/info-line";
import {useSelector} from "../../services/types/hooks";
import {useDispatch} from "../../services/types/hooks";
import {Navigate, useNavigate} from "react-router-dom";
import {getResetPass} from "../../services/actions/auth";
import {RootState} from "../../services/types";

interface FormState {
    token: string;
    password: string;
}

const ResetPassword = () => {
    const [form, setValue] = useState<FormState>({ token: '', password: '' });
    const passRes = useSelector((store: RootState) => store.auth.forgotPassSuccess);
    const passResetRes = useSelector((store: RootState) => store.auth.passResetSuccess);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const resetPass = () => {
        if(form.password && form.token){
           dispatch(getResetPass(form));
        }
    };

    useEffect(() => {
        if(passResetRes){
            navigate('/login');
        }
    }, [passResetRes, navigate]);

    if(!passRes){
        return <Navigate to="/forgot-password" replace/>
    }

    return (
        <AuthForm title={"Восстановление пароля"}>
            <PasswordInput
                onChange={onChange}
                value={form.password}
                name={'password'}
                placeholder="Введите новый пароль"
                extraClass="mb-6"
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={onChange}
                value={form.token}
                name={'token'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <Button onClick={resetPass} htmlType="button" type="primary" size="medium" extraClass="mb-20">
                Сохранить
            </Button>
            <InfoLine label="Вспомнили пароль?" txt="Войти" link="/login"/>
        </AuthForm>
    );
}

export default ResetPassword;
