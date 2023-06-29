import form from "./auth-form.module.css";
import React from "react";

interface AuthFormProps {
    title: string;
    submit: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = (props) => {
    return (
        <div className={form.container}>
            <h1 className="text text_type_main-medium mb-6">
                {props.title}
            </h1>
            <form onSubmit={props.submit} className={form.form}>
                {props.children}
            </form>
        </div>
    );
}

export default AuthForm;
