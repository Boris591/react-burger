import React, {useEffect, useState} from "react";
import AuthForm from "../../components/auth-form/auth-form";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import InfoLine from "../../components/info-line/info-line";
import {getForgotPass} from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const ForgotPassword: React.FC = () => {
    const [form, setValue] = useState({ email: '' });
    const passRes = useSelector((store: any) => store.auth.forgotPassSuccess);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const forgotPass = (event: React.FormEvent) => {
        event.preventDefault();
        if(form.email){
            // @ts-ignore
            dispatch(getForgotPass(form));
        }
    };

    useEffect(() => {
       if(passRes){
           navigate('/reset-password');
       }
    });

    return (
        <AuthForm submit={forgotPass} title={"Восстановление пароля"}>
            <EmailInput
                onChange={onChange}
                value={form.email}
                name={'email'}
                isIcon={false}
                extraClass="mb-6"
                placeholder="Укажите e-mail"
            />
            <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                Восстановить
            </Button>
            <InfoLine label="Вспомнили пароль?" txt="Войти" link="/login"/>
        </AuthForm>
    );
}

export default ForgotPassword;
