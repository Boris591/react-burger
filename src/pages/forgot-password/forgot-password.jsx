import React, {useEffect, useState} from "react";
import AuthForm from "../../components/auth-form/auth-form";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import InfoLine from "../../components/info-line/info-line";
import {getForgotPass} from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function ForgotPassword(){
    const [form, setValue] = useState({ email: '' });
    const passRes = useSelector(store => store.auth.forgotPassSuccess);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const forgotPass = () => {
        if(form.email){
            dispatch(getForgotPass(form));
        }
    };

    useEffect(() => {
       if(passRes){
           navigate('/reset-password');
       }
    });

    return (
        <AuthForm title={"Восстановление пароля"}>
            <EmailInput
                onChange={onChange}
                value={form.email}
                name={'email'}
                isIcon={false}
                extraClass="mb-6"
                placeholder="Укажите e-mail"
            />
            <Button onClick={forgotPass} htmlType="button" type="primary" size="medium" extraClass="mb-20">
                Восстановить
            </Button>
            <InfoLine label="Вспомнили пароль?" txt="Войти" link="/login"/>
        </AuthForm>
    );
}

export default ForgotPassword;
