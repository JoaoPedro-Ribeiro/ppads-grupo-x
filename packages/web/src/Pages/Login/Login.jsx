import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logintitle from '../../Components/Logintitle/Logintitle';
import './Login.css'
import api from '../../services/axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setStayLoggedIn(event.target.checked);
    };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = 'https://ppads-grupo-x.onrender.com/login';
      const loginData = {
        email: username,
        password: password,
        stayLoggedIn: stayLoggedIn
      };

      const response = await api.post(url, loginData);

      if (response.data.token) {
        const jwtToken = response.data.token;

        localStorage.setItem('token', jwtToken);

        navigate('/home');
      } else {
        setErrorMessage("Login falhou. Verifique suas credenciais.");
      }
    } catch (error) {
      setErrorMessage("Erro ao fazer login. Tente novamente.");
      console.log('Erro ao fazer login: ', error);
    }
  };

  return (
  <main>
    <div className='LoginPage'>
      <Logintitle />
      <div className='formLogin'>
        <div className='container'>
          <form onSubmit={handleSubmit}>
          <h2>LOGIN</h2>
          <div className='input-field'>
            <input type='email' placeholder='EMAIL' onChange={(e) => setUsername(e.target.value)} value={username}></input>
          </div>
          <div className='input-field'>
            <input type='password' placeholder='SENHA' onChange={(e) => setPassword(e.target.value)} value={password}></input>
          </div>

          <div className="recall-forget">
            <label>
              <input type="checkbox" onChange={handleCheckboxChange} />
              MANTER CONECTADO
            </label>
            <a href="/redefine">ESQUECEU A SENHA?</a>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          
          <button>ENTRAR</button>
          </form>
        </div>  
      </div>
    </div>
  </main>
  )
}

export default Login
