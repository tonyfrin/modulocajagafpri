import React from "react";
import { Form1 } from "../abstracts/Form";

const Login = (props) => {

    return (
        <>
            <main className="gs-container gs-main-login">
                <Form1 
                title='Iniciar Sesión'
                SubTitle='Ingresa tus credenciales'
                typeInputUp='text'
                FunctionInputUp={event => props.username(event.target.value)}
                PlaceInputUp = 'Usuario o Email'
                typeInputDown= 'password'
                FunctionInputDown={event => props.password(event.target.value)}
                PlaceInputDown='Contraceña'
                ButtonTitle='Ingresar'
                ButtonFunction={props.handleSubmit}
                GsButton ={true}
                GsColor='#07b2e7'
                autoCompleteInputUp='on'
                autoCompleteInputDown='on'
                />
            </main>
        </>
    )
}

export default Login;