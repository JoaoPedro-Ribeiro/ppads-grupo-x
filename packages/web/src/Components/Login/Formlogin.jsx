import React from 'react';
import "./Formlogin.css";

import { useState } from 'react';

//TO DO: verificar bug de não receber os dados se a pessoa usa as sugestões do navegador
//TO DO: aplicar validações para o preenchimento dos campos
const Formlogin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(username, password)

        console.log("Envio");
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
            <h2>LOGIN</h2>
            <div className='input-field'>
                <input type='email' placeholder='EMAIL' onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div className='input-field'>
                <input type='password' placeholder='SENHA' onChange={(e) => setPassword(e.target.value)}></input>
            </div>

            <div className="recall-forget">
                <label>
                    <input type="checkbox" />
                    MANTER CONECTADO
                </label>
                <a href="#">ESQUECEU A SENHA?</a>
            </div>

            <button>ENTRAR</button>

            <div className="singnup-link">
                <a href="#">CRIAR UMA CONTA</a>
            </div>
            </form>
        </div>
    )
  }

export default Formlogin
