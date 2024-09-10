import { useState } from 'react';
import Logintitle from '../../Components/Logintitle/Logintitle';
import './Login.css'
import api from '../../services/axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
      event.preventDefault();

      console.log(username, password)

      console.log("Envio");
  }

  // Isso é um exemplo ;)
  const handleTestLink = async (event) => {
    event.preventDefault()

    try {
      const url = 'https://ppads-grupo-x.onrender.com'
      const response = await api.get(`${url}`)
      console.log('Resposta da API: ', response.data)
    } catch (error) {
      console.error('Error ao fazer requisição: ', error)
    }
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
            <a href="/redefine" onClick={handleTestLink}>ESQUECEU A SENHA?</a>
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
