import AppHeader from "../components/app-header/app-header";
import React from "react";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

function Login(){
    return (
        <form action="">
            <EmailInput
                onChange={'gg'}
                value={'gg'}
                name={'email'}
                isIcon={false}
            />
            <PasswordInput
                onChange={onChange}
                value={value}
                name={'password'}
                extraClass="mb-2"
            />
            <Button htmlType="button" type="primary" size="medium">
                Войти
            </Button>
        </form>
    );
}
