import { useState } from 'react';
import Logintitle from '../../Components/Logintitle/Logintitle';
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
      event.preventDefault();

      console.log(username, password)

      console.log("Envio");
  }

  return (
  <main>
    <div className='LoginPage'>
      <Logintitle />
      <div className='formLogin'>
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
            <a href="/redefine">ESQUECEU A SENHA?</a>
          </div>

          <button>ENTRAR</button>
          </form>
        </div>  
      </div>
    </div>
  </main>
  )
}

export default Login
